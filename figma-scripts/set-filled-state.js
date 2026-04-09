const updates = [
  { id: '1926:71800', value: 'mcp-server-001' },
  { id: '1926:70330', value: 'Servidor de Produção' },
  { id: '1926:71826', value: 'servidor-mcp' },
  { id: '1926:71840', value: '1.0.0' },
  { id: '1926:71854', value: '5000' },
];

for (const upd of updates) {
  const instance = figma.getNodeById(upd.id);
  if (!instance || instance.type !== 'INSTANCE') continue;

  // Muda propriedade isFilled para Yes
  instance.setProperties({ 'isFilled': 'Yes' });

  // Busca o text node pelo conteúdo (após mudança de variante)
  const textNode = instance.findOne(n =>
    n.type === 'TEXT' &&
    n.characters !== 'ID do Componente' &&
    n.characters !== 'Nome' &&
    n.characters !== 'Nome do Servidor' &&
    n.characters !== 'Versão' &&
    n.characters !== 'Timeout'
  );

  if (textNode) {
    const fn = textNode.fontName;
    if (fn !== figma.mixed) await figma.loadFontAsync(fn);
    textNode.characters = upd.value;
  }
}
