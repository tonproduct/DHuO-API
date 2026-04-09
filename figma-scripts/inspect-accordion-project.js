const comp = await figma.importComponentByKeyAsync('b3ef292fdaebca171860cecd5c5e4e36f0e5a044');
const inst = comp.createInstance();
figma.currentPage.appendChild(inst);

const props = inst.componentProperties
  ? Object.entries(inst.componentProperties).map(([k, v]) => ({ k, type: v.type, value: v.value }))
  : [];

function tree(node, d) {
  if (d > 4) return null;
  const out = { name: node.name, type: node.type };
  if (node.type === 'TEXT') out.chars = node.characters.slice(0, 40);
  if ('children' in node && node.children.length)
    out.ch = node.children.map(c => tree(c, d+1)).filter(Boolean);
  return out;
}

const t = tree(inst, 0);
inst.remove();
throw new Error(JSON.stringify({ props, t }));
