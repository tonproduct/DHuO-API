// Find accordion instance in project, get its component set, find Default variant key
const instances = figma.root.findAllWithCriteria({ types: ['INSTANCE'] });
const result = {};

for (const inst of instances) {
  try {
    const main = inst.mainComponent;
    if (!main || !main.name.toLowerCase().includes('accordion')) continue;

    const set = main.parent; // ComponentSet
    if (set && set.type === 'COMPONENT_SET') {
      const variants = set.children.map(c => ({ key: c.key, name: c.name }));
      result.componentSetName = set.name;
      result.variants = variants;
      break;
    } else {
      result.singleComponent = { key: main.key, name: main.name };
    }
  } catch(e) {}
}

throw new Error(JSON.stringify(result));
