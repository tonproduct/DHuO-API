figma.showUI(__html__, { width: 380, height: 640, title: 'Form Builder — DHuO' });

const KEYS = {
  textField:        'f38be7ee3a5fd6128b4e4f9848ec931a1a96f586',
  textArea:         'a7b5f443c9926b9d7dd07f19d634cadb868e757f',
  select:           '3d2d9a7da8564710c2ab675ddb15cfc284379d6f',
  checkbox:         '077ad371261cee9dc5bf360a1668aabe715f1ad6',
  radio:            '9af86d3b97dbe3f96ce655cdf9812ea21cc20f46',
  toggle:           'bbb8bd783850e955c8126236b4b9cef70f6cc0eb',
  checkboxGroup:    '78928a9ad8188913bcb265e8f9e26699cc5bace5',
  checkboxGroupMore:'bb87af5c51a90230a127a27b5a5d08ed0c992065', // +Items?=Yes
  radioGroup:       'f93399c1261624cb7d9e58047b7f051af20c51a0',
  accordion:        'b3ef292fdaebca171860cecd5c5e4e36f0e5a044',
  chips:            '28055ae4802a49417634542e00f880347eba76b4',
};

const FILL_TYPES = new Set(['textField', 'textArea', 'select', 'checkboxGroup', 'radioGroup', 'accordion', 'chips']);
const INLINE_LABEL_TYPES = new Set(['checkbox', 'radio', 'toggle']);

async function loadFont(node) {
  const fn = node.fontName;
  if (fn !== figma.mixed) await figma.loadFontAsync(fn);
}

async function setInputLabel(instance, label) {
  const header = instance.findOne(n => n.name.trim() === '_inputHeader');
  if (!header) return;
  const textNode = header.findOne(n => n.name === 'Label' && n.type === 'TEXT');
  if (!textNode) return;
  await loadFont(textNode);
  textNode.characters = label;
}

async function setRequired(instance, required) {
  const header = instance.findOne(n => n.name.trim() === '_inputHeader');
  if (!header) return;
  // Try component property first
  try {
    const keys = Object.keys(header.componentProperties || {});
    const reqKey = keys.find(k => k.toLowerCase().includes('required') || k.toLowerCase().includes('obrigat'));
    if (reqKey) { header.setProperties({ [reqKey]: required }); return; }
  } catch(e) {}
  // Fallback: toggle visibility of "Obrigatório" text node
  const obrig = header.findOne(n => n.name === 'Obrigatório' && n.type === 'TEXT');
  if (obrig) obrig.visible = !!required;
}

async function setPlaceholder(instance, placeholder) {
  const ph = instance.findOne(n => n.name.trim() === '.placeholderText');
  if (!ph) return;
  const texts = ph.findAll(n => n.type === 'TEXT');
  if (!texts.length) return;
  for (const t of texts) await loadFont(t);
  const words = placeholder.split(' ');
  if (texts.length >= 2) {
    texts[0].characters = words[0];
    texts[1].characters = words.slice(1).join(' ') || ' ';
  } else {
    texts[0].characters = placeholder;
  }
}

async function setInlineLabel(instance, label) {
  const texts = instance.findAll(n => n.type === 'TEXT');
  const textNode = texts.find(n => n.characters.length > 0) || texts[0];
  if (!textNode) return;
  await loadFont(textNode);
  textNode.characters = label;
}

async function applyCheckboxGroup(instance, field) {
  // Footer
  try { instance.setProperties({ 'Show Footer#24255:6': field.footer !== false }); } catch(e) {}

  // Label
  if (field.label) await setInputLabel(instance, field.label);

  // Required
  if (field.required) await setRequired(instance, true);

  // Individual checkbox labels
  if (field.items && field.items.length > 0) {
    const checkboxes = instance.findAll(n => n.name === 'Checkbox' && n.type === 'INSTANCE');
    for (let i = 0; i < Math.min(field.items.length, checkboxes.length); i++) {
      const lbl = checkboxes[i].findOne(n => n.name === 'Label' && n.type === 'TEXT');
      if (lbl) { await loadFont(lbl); lbl.characters = field.items[i]; }
    }
    // Hide extra checkboxes that have no label
    for (let i = field.items.length; i < checkboxes.length; i++) {
      checkboxes[i].visible = false;
    }
  }
}

async function buildField(field, parentFrame) {
  if (field.type === 'accordion') {
    await buildAccordion(field, parentFrame);
    return;
  }

  const keyToUse = field.type === 'checkboxGroup' && field.items && field.items.length > 5
    ? KEYS.checkboxGroupMore
    : KEYS[field.type];

  if (!keyToUse) return;

  const component = await figma.importComponentByKeyAsync(keyToUse);
  const instance = component.createInstance();
  parentFrame.appendChild(instance);

  if (FILL_TYPES.has(field.type)) {
    instance.layoutSizingHorizontal = 'FILL';
  }

  // Variant adjustments
  if (field.type === 'textArea') {
    try { instance.setProperties({ 'Type': 'Text', 'Status': 'Default' }); } catch(e) {}
  }
  if (field.type === 'checkbox') {
    try { instance.setProperties({ 'Text': 'True' }); } catch(e) {}
  }

  // Apply content
  if (field.type === 'checkboxGroup') {
    await applyCheckboxGroup(instance, field);
  } else if (field.label) {
    if (INLINE_LABEL_TYPES.has(field.type)) {
      await setInlineLabel(instance, field.label);
    } else {
      await setInputLabel(instance, field.label);
    }
    if (field.required) await setRequired(instance, true);
  }

  if (field.placeholder && (field.type === 'textField' || field.type === 'textArea')) {
    await setPlaceholder(instance, field.placeholder);
  }
}

async function findAccordionMainComponent() {
  // Try import by key first (works if it's a library component)
  try {
    return await Promise.race([
      figma.importComponentByKeyAsync(KEYS.accordion),
      new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 5000)),
    ]);
  } catch(e) {}
  // Fallback: find an existing accordion instance in the file and reuse its mainComponent
  const all = figma.root.findAllWithCriteria({ types: ['INSTANCE'] });
  for (const inst of all) {
    const mc = inst.mainComponent;
    if (mc && mc.name.toLowerCase().includes('accordion')) return mc;
  }
  return null;
}

async function buildAccordion(field, parentFrame) {
  // Wrapper frame: accordion header + content
  const wrapper = figma.createFrame();
  wrapper.name = field.label || 'Accordion';
  wrapper.layoutMode = 'VERTICAL';
  wrapper.itemSpacing = 0;
  wrapper.primaryAxisSizingMode = 'AUTO';
  wrapper.counterAxisSizingMode = 'AUTO';
  wrapper.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
  wrapper.strokes = [{ type: 'SOLID', color: { r: 0.9, g: 0.9, b: 0.9 } }];
  wrapper.strokeAlign = 'INSIDE';
  wrapper.strokeWeight = 1;
  wrapper.cornerRadius = 8;
  wrapper.clipsContent = true;
  parentFrame.appendChild(wrapper);
  wrapper.layoutSizingHorizontal = 'FILL';

  // Accordion header instance
  const accComp = await findAccordionMainComponent();
  if (accComp) {
    const accInst = accComp.createInstance();
    wrapper.appendChild(accInst);
    accInst.layoutSizingHorizontal = 'FILL';
    try { accInst.setProperties({ 'Text#24053:2': field.label || 'Accordion' }); } catch(e) {
      const t = accInst.findOne(n => n.type === 'TEXT' && n.characters === 'Header Placeholder');
      if (t) { await loadFont(t); t.characters = field.label || 'Accordion'; }
    }
  } else {
    // No DS component available — create a simple styled header
    const header = figma.createFrame();
    header.layoutMode = 'HORIZONTAL';
    header.primaryAxisSizingMode = 'FIXED';
    header.counterAxisSizingMode = 'AUTO';
    header.paddingLeft = header.paddingRight = 16;
    header.paddingTop = header.paddingBottom = 12;
    header.fills = [{ type: 'SOLID', color: { r: 0.95, g: 0.95, b: 0.95 } }];
    wrapper.appendChild(header);
    header.layoutSizingHorizontal = 'FILL';
    const txt = figma.createText();
    await figma.loadFontAsync({ family: 'Inter', style: 'Medium' });
    txt.fontName = { family: 'Inter', style: 'Medium' };
    txt.characters = field.label || 'Accordion';
    txt.fontSize = 14;
    header.appendChild(txt);
  }

  // Content frame (only if has children)
  if (field.children && field.children.length > 0) {
    const contentFrame = figma.createFrame();
    contentFrame.name = '_accordionContent';
    contentFrame.layoutMode = 'VERTICAL';
    contentFrame.itemSpacing = 16;
    contentFrame.paddingTop = contentFrame.paddingBottom = 16;
    contentFrame.paddingLeft = contentFrame.paddingRight = 24;
    contentFrame.primaryAxisSizingMode = 'AUTO';
    contentFrame.counterAxisSizingMode = 'AUTO';
    contentFrame.fills = [{ type: 'SOLID', color: { r: 0.98, g: 0.98, b: 0.98 } }];
    wrapper.appendChild(contentFrame);
    contentFrame.layoutSizingHorizontal = 'FILL';

    for (const child of field.children) {
      try {
        await buildField(child, contentFrame);
      } catch(e) {
        figma.ui.postMessage({ type: 'error', field: child.label, message: e.message });
      }
    }
  }
}

figma.ui.onmessage = async (msg) => {
  if (msg.type !== 'build-form') return;

  const { fields } = msg;

  let frame;
  const sel = figma.currentPage.selection;
  if (sel.length === 1 && sel[0].type === 'FRAME') {
    frame = sel[0];
  } else {
    frame = figma.createFrame();
    frame.name = 'Formulário';
    frame.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
    frame.x = figma.viewport.center.x - 240;
    frame.y = figma.viewport.center.y - 100;
    figma.currentPage.appendChild(frame);
  }

  frame.layoutMode = 'VERTICAL';
  frame.primaryAxisSizingMode = 'AUTO';
  frame.counterAxisSizingMode = 'FIXED';
  frame.itemSpacing = 16;
  frame.paddingTop = frame.paddingBottom = 24;
  frame.paddingLeft = frame.paddingRight = 24;
  if (frame.width < 300) frame.resize(480, 100);

  for (const field of fields) {
    try {
      await buildField(field, frame);
    } catch(e) {
      figma.ui.postMessage({ type: 'error', field: field.label, message: e.message });
    }
  }

  figma.viewport.scrollAndZoomIntoView([frame]);
  figma.currentPage.selection = [frame];
  figma.ui.postMessage({ type: 'done' });
};
