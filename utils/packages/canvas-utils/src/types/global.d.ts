export {};

declare global {
  interface CanvasRenderingContext2D {
    getActions?: () => unknown[];
  }

  type WeappCanvasContext = {
    draw: (reserve?: boolean) => void;
    getActions?: () => unknown[];
  };

  type WeappGlobal = {
    createCanvasContext?: (id?: string) => WeappCanvasContext;
    drawCanvas?: (options: { canvasId?: string; actions?: unknown }) => void;
  };

  const wx: WeappGlobal | undefined;
}
