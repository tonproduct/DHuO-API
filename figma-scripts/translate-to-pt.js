// Traduz textos EN -> PT no frame selecionado (textos exatos mapeados)
const translations = {
  'label':              'rótulo',
  'Timeout':            'Tempo limite',
  'tOOLS':              'FERRAMENTAS',
  '+ Adicionar Tool':   '+ Adicionar Ferramenta',
  'Option 1':           'Opção 1',
  'PROPERTIES':         'PROPRIEDADES',
  'name':               'nome',
  'type':               'tipo',
  'required':           'obrigatório',
};

const selected = figma.currentPage.selection[0];
if (!selected) { figma.notify('Selecione um frame.', { error: true }); return; }

const textNodes = selected.findAll(n => n.type === 'TEXT');
let count = 0;
let errors = 0;

for (const node of textNodes) {
  const translated = translations[node.characters];
  if (!translated) continue;

  try {
    const len = node.characters.length;
    const fontSet = new Set();
    for (let i = 0; i < len; i++) {
      fontSet.add(JSON.stringify(node.getRangeFontName(i, i + 1)));
    }
    for (const fStr of fontSet) {
      await figma.loadFontAsync(JSON.parse(fStr));
    }

    const firstFont  = node.getRangeFontName(0, 1);
    const firstSize  = node.getRangeFontSize(0, 1);
    const firstFills = node.getRangeFills(0, 1);

    node.characters = translated;
    node.setRangeFontName(0, translated.length, firstFont);
    node.setRangeFontSize(0, translated.length, firstSize);
    node.setRangeFills(0, translated.length, firstFills);

    count++;
  } catch (e) {
    errors++;
  }
}

figma.notify(`${count} texto(s) traduzido(s)${errors ? `, ${errors} erro(s) ignorado(s)` : ''}.`);
