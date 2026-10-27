// Page-owned selection: the popup receives only an immediate setup acknowledgement.
(function (root) {
  if (root.FeToolsElementScreenshot) return;
  let cancelSelection;
  const zh = chrome.i18n.getUILanguage().startsWith('zh');
  const tip = zh ? '点击元素截图 · Esc 取消' : 'Click an element to capture · Esc to cancel';
  const failure = zh ? '截图失败，请重新打开工具重试' : 'Capture failed. Reopen the tool to retry.';
  const frame = () => new Promise(resolve => requestAnimationFrame(resolve));
  const send = message => new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(message, response => {
      if (chrome.runtime.lastError || !response?.success) reject(new Error('Capture failed'));
      else resolve(response);
    });
  });
  const loadImage = src => new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });

  root.FeToolsElementScreenshot = {
    start(message, sendResponse) {
      cancelSelection?.();
      const highlight = document.createElement('div');
      highlight.id = 'fe-tools-node-highlight';
      highlight.style.cssText = 'position:fixed;pointer-events:none;z-index:2147483647;border:2px solid #2969f7;background:rgba(41,105,247,.12);box-sizing:border-box';
      const status = document.createElement('div');
      status.textContent = tip;
      status.style.cssText = 'position:fixed;top:12px;left:12px;z-index:2147483647;pointer-events:none;background:#182238;color:white;padding:10px 16px;border-radius:6px;font:14px sans-serif';
      document.documentElement.append(highlight, status);
      let timeout;
      const cleanup = () => {
        document.removeEventListener('mousemove', move, true);
        document.removeEventListener('click', click, true);
        document.removeEventListener('keydown', key, true);
        window.removeEventListener('pagehide', cleanup);
        clearTimeout(timeout);
        highlight.remove();
        status.remove();
        if (cancelSelection === cleanup) cancelSelection = undefined;
      };
      const move = event => {
        const rect = event.target?.getBoundingClientRect?.();
        if (!rect) return;
        Object.assign(highlight.style, {
          left: `${rect.left}px`, top: `${rect.top}px`,
          width: `${rect.width}px`, height: `${rect.height}px`,
        });
      };
      const click = async event => {
        event.preventDefault();
        event.stopImmediatePropagation();
        const rect = event.target?.getBoundingClientRect?.();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        cleanup();
        try {
          if (!rect) throw new Error('Invalid element');
          // Clip to the captured viewport, including partially visible elements.
          const left = Math.max(0, rect.left);
          const top = Math.max(0, rect.top);
          const right = Math.min(viewportWidth, rect.right);
          const bottom = Math.min(viewportHeight, rect.bottom);
          if (right <= left || bottom <= top) throw new Error('Empty element');
          await frame();
          await frame();
          const capture = await send({ action: 'captureVisibleTab' });
          const img = await loadImage(capture.dataUrl);
          const scaleX = img.width / viewportWidth;
          const scaleY = img.height / viewportHeight;
          const sx = Math.round(left * scaleX);
          const sy = Math.round(top * scaleY);
          const canvas = document.createElement('canvas');
          canvas.width = Math.min(img.width - sx, Math.round((right - left) * scaleX));
          canvas.height = Math.min(img.height - sy, Math.round((bottom - top) * scaleY));
          const ctx = canvas.getContext('2d');
          if (!ctx || !canvas.width || !canvas.height) throw new Error('Empty capture');
          ctx.drawImage(img, sx, sy, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
          await send({
            action: 'openElementScreenshotPreview',
            dataUrl: canvas.toDataURL('image/png'),
            filename: message.filename,
          });
        } catch {
          status.textContent = failure;
          document.documentElement.append(status);
          setTimeout(() => status.remove(), 8000);
        }
      };
      const key = event => {
        if (event.key === 'Escape') {
          event.preventDefault();
          event.stopImmediatePropagation();
          cleanup();
        }
      };
      cancelSelection = cleanup;
      document.addEventListener('mousemove', move, true);
      document.addEventListener('click', click, true);
      document.addEventListener('keydown', key, true);
      window.addEventListener('pagehide', cleanup);
      timeout = setTimeout(cleanup, 120000);
      sendResponse({ success: true });
    },
  };
})(window);
