// Broader search - list all unique component names containing keywords
const keywords = ['toggle', 'checkbox', 'radio', 'combo', 'stepper', 'informative', 'toast', 'rating', 'multiselect', 'select', 'paginator', 'breadcrumb'];

const results = {};

for (const page of figma.root.children) {
  const instances = page.findAllWithCriteria({ types: ['INSTANCE'] });
  for (const inst of instances) {
    try {
      const main = inst.mainComponent;
      if (!main) continue;
      const nameLower = main.name.toLowerCase();
      for (const kw of keywords) {
        if (nameLower.includes(kw)) {
          const baseKey = main.name.split('/')[0].trim();
          if (!results[baseKey]) {
            results[baseKey] = { key: main.key, fullName: main.name, page: page.name };
          }
        }
      }
    } catch(e) {}
  }
}

throw new Error(JSON.stringify(results, null, 2));
