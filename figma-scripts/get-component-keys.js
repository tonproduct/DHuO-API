// Search all pages for instances of target components and get their keys
const targets = ['Toggle', 'Accordion', 'CheckboxGroup', 'RadioButtonGroup', 'ComboBox', 'Chips', 'Stepper', 'InformativeMessage', 'Toast', 'Rating', 'Multiselect'];

const results = {};

for (const page of figma.root.children) {
  const instances = page.findAllWithCriteria({ types: ['INSTANCE'] });
  for (const inst of instances) {
    try {
      const main = inst.mainComponent;
      if (!main) continue;
      const name = main.name;
      for (const t of targets) {
        if (name.includes(t) && !results[t]) {
          results[t] = { key: main.key, name: main.name, page: page.name };
        }
      }
    } catch(e) {}
  }
}

throw new Error(JSON.stringify(results, null, 2));
