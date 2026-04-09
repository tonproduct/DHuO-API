// Cria um botão vermelho no Figma na página atual
const page = figma.currentPage;

// Carrega fontes necessárias
await figma.loadFontAsync({ family: "Inter", style: "Medium" });
await figma.loadFontAsync({ family: "Inter", style: "Regular" });

// Frame do botão
const btn = figma.createFrame();
btn.name = "Button / Danger";
btn.resize(120, 36);
btn.cornerRadius = 10;
btn.fills = [{ type: 'SOLID', color: { r: 0.341, g: 0.082, b: 0.082 } }]; // red-500 ~ oklch(0.577 0.245 27.325)

// Substituir por vermelho real
btn.fills = [{
  type: 'SOLID',
  color: { r: 0.831, g: 0.153, b: 0.102 }  // oklch(0.577 0.245 27) ≈ #D4271A
}];

btn.layoutMode = 'HORIZONTAL';
btn.primaryAxisAlignItems = 'CENTER';
btn.counterAxisAlignItems = 'CENTER';
btn.paddingLeft = 16;
btn.paddingRight = 16;
btn.paddingTop = 0;
btn.paddingBottom = 0;
btn.primaryAxisSizingMode = 'AUTO';
btn.counterAxisSizingMode = 'FIXED';

// Label
const label = figma.createText();
label.characters = "Danger";
label.fontSize = 14;
label.fontName = { family: "Inter", style: "Medium" };
label.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];

btn.appendChild(label);

// Posiciona próximo ao viewport
const { x, y } = figma.viewport.center;
btn.x = x - btn.width / 2;
btn.y = y - btn.height / 2;

page.appendChild(btn);
figma.currentPage.selection = [btn];
figma.viewport.scrollAndZoomIntoView([btn]);

figma.notify('Botão vermelho criado!');
