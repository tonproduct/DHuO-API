const selected = figma.currentPage.selection[0];
if (!selected) { figma.notify('Selecione um frame.', { error: true }); return; }

const textNodes = selected.findAll(n => n.type === 'TEXT');
const texts = textNodes.map(n => n.characters);
figma.ui.postMessage({ type: 'result', data: texts });
