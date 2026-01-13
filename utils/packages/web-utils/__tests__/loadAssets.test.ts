import {
  loadScript,
  loadScriptList,
  loadCss,
  loadCssList,
  loadImage,
  loadImageList,
  loadCSV,
} from '../src/loadAssets';

describe('loadAssets utils', () => {
  beforeEach(() => {
    document.head.innerHTML = '';
    document.body.innerHTML = '';
  });

  it('loadScript should resolve on load', async () => {
    const appendSpy = jest.spyOn(document.body, 'appendChild');
    const promise = loadScript('https://example.com/a.js');
    const script = appendSpy.mock.calls[0][0] as HTMLScriptElement;
    script.onload && script.onload(new Event('load'));
    await expect(promise).resolves.toMatchObject({ type: 'load' });
    appendSpy.mockRestore();
  });

  it('loadScriptList should load scripts in parallel', async () => {
    const appendSpy = jest.spyOn(document.body, 'appendChild');
    const promise = loadScriptList(['a.js', 'b.js']);
    appendSpy.mock.calls.forEach(call => {
      const script = call[0] as HTMLScriptElement;
      script.onload && script.onload(new Event('load'));
    });
    await expect(promise).resolves.toHaveLength(2);
    appendSpy.mockRestore();
  });

  it('loadCss should resolve on load event', async () => {
    const appendSpy = jest.spyOn(document.head, 'appendChild');
    const promise = loadCss('a.css');
    const link = appendSpy.mock.calls[0][0] as HTMLLinkElement;
    link.dispatchEvent(new Event('load'));
    await expect(promise).resolves.toBe(true);
    appendSpy.mockRestore();
  });

  it('loadCssList should load multiple CSS files', async () => {
    const appendSpy = jest.spyOn(document.head, 'appendChild');
    const promise = loadCssList(['a.css', 'b.css']);
    appendSpy.mock.calls.forEach(call => {
      const link = call[0] as HTMLLinkElement;
      link.dispatchEvent(new Event('load'));
    });
    await expect(promise).resolves.toHaveLength(2);
    appendSpy.mockRestore();
  });

  it('loadImage should resolve with Image', async () => {
    const originalImage = (globalThis as any).Image;
    class MockImage {
      private _src = '';
      private _onload: (() => void) | null = null;
      private _onerror: (() => void) | null = null;

      set src(val: string) {
        this._src = val;
        if (this._onload) this._onload();
      }

      get src() {
        return this._src;
      }

      set onload(handler: (() => void) | null) {
        this._onload = handler;
        if (this._src && this._onload) this._onload();
      }

      get onload() {
        return this._onload;
      }

      set onerror(handler: (() => void) | null) {
        this._onerror = handler;
      }

      get onerror() {
        return this._onerror;
      }
    }
    (globalThis as any).Image = MockImage;

    await expect(loadImage('a.png')).resolves.toBeInstanceOf(MockImage);

    (globalThis as any).Image = originalImage;
  });

  it('loadImageList should resolve multiple images', async () => {
    const originalImage = (globalThis as any).Image;
    class MockImage {
      private _src = '';
      private _onload: (() => void) | null = null;
      private _onerror: (() => void) | null = null;

      set src(val: string) {
        this._src = val;
        if (this._onload) this._onload();
      }

      get src() {
        return this._src;
      }

      set onload(handler: (() => void) | null) {
        this._onload = handler;
        if (this._src && this._onload) this._onload();
      }

      get onload() {
        return this._onload;
      }

      set onerror(handler: (() => void) | null) {
        this._onerror = handler;
      }

      get onerror() {
        return this._onerror;
      }
    }
    (globalThis as any).Image = MockImage;

    await expect(loadImageList(['a.png', 'b.png'])).resolves.toHaveLength(2);

    (globalThis as any).Image = originalImage;
  });

  it('loadCSV should create download link', () => {
    const originalCreateObjectURL = URL.createObjectURL;
    URL.createObjectURL = jest.fn().mockReturnValue('blob:url');

    const appendSpy = jest.spyOn(document.body, 'appendChild');
    const removeSpy = jest.spyOn(document.body, 'removeChild');

    loadCSV('a,b', 'test', 'csv');
    const link = appendSpy.mock.calls[0][0] as HTMLAnchorElement;
    expect(link.download).toBe('test.csv');

    URL.createObjectURL = originalCreateObjectURL;
    appendSpy.mockRestore();
    removeSpy.mockRestore();
  });
});
