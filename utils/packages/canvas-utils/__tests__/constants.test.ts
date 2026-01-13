import { DEFAULT_CANVAS_SIZE, DEFAULT_ANIMATION_TIME } from '../src/constants';

describe('constants', () => {
  it('should expose default canvas size', () => {
    expect(DEFAULT_CANVAS_SIZE).toEqual({ width: 500, height: 500 });
  });

  it('should expose default animation time', () => {
    expect(DEFAULT_ANIMATION_TIME).toBe(600);
  });
});
