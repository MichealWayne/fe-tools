// Shared runtime validation for messages crossing popup, content-script and
// service-worker contexts. Keep legacy action names and fields unchanged.
(function (root) {
  const isRecord = value => value !== null && typeof value === 'object' && !Array.isArray(value);
  const isNumber = value => typeof value === 'number' && Number.isFinite(value);
  const isString = value => typeof value === 'string';
  const isOptionalString = value => value === undefined || isString(value);
  const hasFiniteFields = (value, fields) =>
    isRecord(value) && fields.every(field => isNumber(value[field]));

  const isPageMetricsResponse = value =>
    hasFiniteFields(value, [
      'totalWidth',
      'totalHeight',
      'viewportWidth',
      'viewportHeight',
      'devicePixelRatio',
      'scrollY',
    ]);
  const isScrollResponse = value => hasFiniteFields(value, ['scrollY']);
  const isSelectionResponse = value => {
    if (!isRecord(value) || typeof value.success !== 'boolean' || !isOptionalString(value.error)) {
      return false;
    }
    return (
      value.rect === undefined ||
      hasFiniteFields(value.rect, ['left', 'top', 'width', 'height'])
    );
  };
  const isCaptureResponse = value =>
    isRecord(value) &&
    typeof value.success === 'boolean' &&
    isOptionalString(value.dataUrl) &&
    isOptionalString(value.error);
  const isDownloadResponse = value =>
    isRecord(value) &&
    typeof value.success === 'boolean' &&
    (value.downloadId === undefined || isNumber(value.downloadId)) &&
    isOptionalString(value.error);

  const isTabMessage = message => {
    if (!isRecord(message) || !isString(message.action)) return false;
    if (message.action === 'getPageMetrics' || message.action === 'startElementSelect') return true;
    if (message.action === 'scrollTo') {
      return isNumber(message.y) && (message.delay === undefined || isNumber(message.delay));
    }
    return (
      message.action === 'startElementSelectAndCapture' &&
      isString(message.filename) &&
      message.filename.length > 0
    );
  };

  const isBackgroundMessage = message => {
    if (!isRecord(message) || !isString(message.action)) return false;
    if (message.action === 'captureVisibleTab') return isNumber(message.windowId);
    return (
      message.action === 'downloadImage' &&
      isString(message.dataUrl) &&
      message.dataUrl.length > 0 &&
      isOptionalString(message.filename)
    );
  };

  const isRuntimeMessage = message => {
    if (!isRecord(message) || !isString(message.action)) return false;
    if (message.action === 'getCodexQuota') return true;
    if (message.action === 'handleTabCreate') return isOptionalString(message.url);
    return (
      message.action === 'executeScriptAndHandleTabCreate' &&
      (message.type === 'translate' || message.type === 'search') &&
      isOptionalString(message.code)
    );
  };

  root.FeToolsMessageContract = Object.freeze({
    isTabMessage,
    isBackgroundMessage,
    isRuntimeMessage,
    isPageMetricsResponse,
    isScrollResponse,
    isSelectionResponse,
    isCaptureResponse,
    isDownloadResponse,
  });
})(typeof globalThis !== 'undefined' ? globalThis : this);
