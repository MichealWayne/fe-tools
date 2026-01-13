/**
 * @author Wayne
 * @Date 2024-07-23 10:06:50
 */
import {
  drawLine,
  drawDashLine,
  drawPoint,
  drawRotateText,
  clearArc,
  retinaScale,
} from '../src/canvas/drawer';

describe('retinaScale', () => {
  it('should be idempotent across repeated calls', () => {
    const originalRatio = window.devicePixelRatio;
    Object.defineProperty(window, 'devicePixelRatio', { value: 2, configurable: true });

    const canvas: any = { width: 100, height: 50, style: {} };
    const ctx: any = {
      scale: jest.fn(),
      setTransform: jest.fn(),
    };

    const firstRatio = retinaScale(canvas as HTMLCanvasElement, ctx as CanvasRenderingContext2D);
    expect(firstRatio).toBe(2);
    expect(canvas.width).toBe(200);
    expect(canvas.height).toBe(100);

    const secondRatio = retinaScale(canvas as HTMLCanvasElement, ctx as CanvasRenderingContext2D);
    expect(secondRatio).toBe(2);
    expect(canvas.width).toBe(200);
    expect(canvas.height).toBe(100);

    Object.defineProperty(window, 'devicePixelRatio', { value: originalRatio, configurable: true });
  });
});

describe('drawer functions', () => {
  const createCtx = () => ({
    beginPath: jest.fn(),
    moveTo: jest.fn(),
    lineTo: jest.fn(),
    closePath: jest.fn(),
    stroke: jest.fn(),
    arc: jest.fn(),
    fill: jest.fn(),
    save: jest.fn(),
    translate: jest.fn(),
    rotate: jest.fn(),
    fillText: jest.fn(),
    restore: jest.fn(),
    clearRect: jest.fn(),
  });

  it('drawLine should draw a line with canvas APIs', () => {
    const ctx = createCtx();
    drawLine(ctx as any, { x: 0, y: 0 }, { x: 10, y: 10 });

    expect(ctx.beginPath).toHaveBeenCalled();
    expect(ctx.moveTo).toHaveBeenCalledWith(0, 0);
    expect(ctx.lineTo).toHaveBeenCalledWith(10, 10);
    expect(ctx.stroke).toHaveBeenCalled();
  });

  it('drawDashLine should call moveTo/lineTo multiple times', () => {
    const ctx = createCtx();
    drawDashLine(ctx as any, { x: 0, y: 0 }, { x: 10, y: 0 }, 2);

    expect(ctx.beginPath).toHaveBeenCalled();
    expect(ctx.moveTo).toHaveBeenCalled();
    expect(ctx.lineTo).toHaveBeenCalled();
    expect(ctx.stroke).toHaveBeenCalled();
  });

  it('drawPoint should draw arc and fill', () => {
    const ctx = createCtx();
    drawPoint(ctx as any, { x: 5, y: 6 }, '#f00', '#fff', 4, 1);

    expect(ctx.arc).toHaveBeenCalledWith(5, 6, 4, 0, Math.PI * 2, true);
    expect(ctx.fill).toHaveBeenCalled();
    expect(ctx.stroke).toHaveBeenCalled();
  });

  it('drawRotateText should apply transforms and restore', () => {
    const ctx = createCtx();
    drawRotateText(ctx as any, { x: 8, y: 9 }, 45, 'hi');

    expect(ctx.save).toHaveBeenCalled();
    expect(ctx.translate).toHaveBeenCalledWith(8, 9);
    expect(ctx.rotate).toHaveBeenCalled();
    expect(ctx.fillText).toHaveBeenCalledWith('hi', 0, 0);
    expect(ctx.restore).toHaveBeenCalled();
  });

  it('clearArc should call clearRect at least once', () => {
    const ctx = createCtx();
    clearArc(ctx as any, { x: 10, y: 10 }, 2);
    expect(ctx.clearRect).toHaveBeenCalled();
  });
});
