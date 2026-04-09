try {
  const comp = await figma.importComponentByKeyAsync('b3ef292fdaebca171860cecd5c5e4e36f0e5a044');
  throw new Error('OK: ' + comp.name + ' | key: ' + comp.key);
} catch(e) {
  throw new Error('FAIL: ' + e.message);
}
