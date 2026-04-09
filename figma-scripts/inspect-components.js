async function inspect(key, label) {
  const comp = await figma.importComponentByKeyAsync(key);
  const inst = comp.createInstance();
  figma.currentPage.appendChild(inst);

  const props = inst.componentProperties
    ? Object.entries(inst.componentProperties).map(([k, v]) => ({ k, type: v.type, value: v.value }))
    : [];

  function tree(node, d) {
    if (d > 5) return null;
    const out = { name: node.name, type: node.type };
    if (node.type === 'TEXT') out.chars = node.characters.slice(0, 30);
    if ('children' in node && node.children.length) {
      out.children = node.children.map(c => tree(c, d + 1)).filter(Boolean);
    }
    return out;
  }

  const result = { label, props, tree: tree(inst, 0) };
  inst.remove();
  return result;
}

const chk = await inspect('78928a9ad8188913bcb265e8f9e26699cc5bace5', 'CheckboxGroup');
const acc = await inspect('0132b639bf2a063a7692b6d16026967c9626fcb3', 'Accordion');

throw new Error(JSON.stringify({ chk, acc }));
