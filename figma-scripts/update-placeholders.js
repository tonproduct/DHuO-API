const updates = [
  { id: '1926:71800', text: 'Insira o ID do componente' },
  { id: '1926:70330', text: 'Insira o nome' },
  { id: '1926:71826', text: 'Insira o nome do servidor' },
  { id: '1926:71840', text: 'Insira a versão' },
  { id: '1926:71854', text: 'Insira o timeout' },
];

for (const upd of updates) {
  const tf = figma.getNodeById(upd.id);
  if (!tf) continue;

  // Busca todos os TextNodes descendentes com texto "o label" ou "Insira"
  const textNodes = tf.findAll(n => n.type === 'TEXT' && (n.characters === 'o label' || n.characters === 'Insira'));

  if (textNodes.length >= 2) {
    const words = upd.text.split(' ');
    const first = words[0];
    const rest = words.slice(1).join(' ');

    for (const t of textNodes) {
      const fn = t.fontName;
      if (fn !== figma.mixed) await figma.loadFontAsync(fn);
    }

    // "Insira" vem antes de "o label" na ordem do DOM
    textNodes[0].characters = first;
    textNodes[1].characters = rest;
  } else if (textNodes.length === 1) {
    const fn = textNodes[0].fontName;
    if (fn !== figma.mixed) await figma.loadFontAsync(fn);
    textNodes[0].characters = upd.text;
  }
}
