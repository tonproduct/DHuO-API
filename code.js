// Figma Bridge — executes Plugin API code sent via WebSocket relay

figma.showUI(__html__, { visible: true, width: 280, height: 64 });

figma.ui.onmessage = async (msg) => {
  if (msg.type === 'status') return;

  if (msg.type === 'exec') {
    try {
      var fn = new Function('figma', 'return (async function(){\n' + msg.code + '\n})()');
      var result = await fn(figma);
      figma.ui.postMessage({ type: 'done', data: result !== undefined ? result : null });
    } catch (err) {
      const errMsg = (err && (err.message || err.toString())) || JSON.stringify(err) || 'unknown error';
      figma.ui.postMessage({ type: 'error', message: errMsg });
    }
  }
};
