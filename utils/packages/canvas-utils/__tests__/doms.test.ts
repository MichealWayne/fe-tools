import { createCanvasElem } from '../src/utils/doms';

describe('doms utils', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('should create canvas with provided dimensions', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    const canvas = createCanvasElem(container, { id: 'chart', width: 300, height: 150 });

    expect(canvas.id).toBe('chartCanvas');
    expect(canvas.width).toBe(300);
    expect(canvas.height).toBe(150);
    expect(container.querySelector('canvas')).toBe(canvas);
  });

  it('should fallback to parent size when dimensions are not provided', () => {
    const container = document.createElement('div');
    container.style.width = '400px';
    container.style.height = '200px';
    document.body.appendChild(container);

    const canvas = createCanvasElem(container, { id: 'auto' });

    expect(canvas.width).toBe(400);
    expect(canvas.height).toBe(200);
  });
});
