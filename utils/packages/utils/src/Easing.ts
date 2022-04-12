/**
 * @module Easing
 * @description Animation easing functions
 */

export type EasingFunction = (amount: number) => number;

/**
 * The Ease class provides a collection of easing functions for use with tween.js.
 */
const Easing = {
  Linear: {
    None: (amount: number) => amount,
  },
  Quadratic: {
    In: (amount: number) => amount * amount,
    Out: (amount: number) => amount * (2 - amount),
    InOut: (amount: number) => {
      if ((amount *= 2) < 1) {
        return 0.5 * amount * amount;
      }

      return -0.5 * (--amount * (amount - 2) - 1);
    },
  },
  Cubic: {
    In: (amount: number) => amount * amount * amount,
    Out: (amount: number) => --amount * amount * amount + 1,
    InOut: (amount: number) => {
      if ((amount *= 2) < 1) {
        return 0.5 * amount * amount * amount;
      }
      return 0.5 * ((amount -= 2) * amount * amount + 2);
    },
  },
  Quartic: {
    In: (amount: number) => amount * amount * amount * amount,
    Out: (amount: number) => 1 - --amount * amount * amount * amount,
    InOut: (amount: number) => {
      if ((amount *= 2) < 1) {
        return 0.5 * amount * amount * amount * amount;
      }

      return -0.5 * ((amount -= 2) * amount * amount * amount - 2);
    },
  },
  Quintic: {
    In: (amount: number) => amount * amount * amount * amount * amount,
    Out: (amount: number) => --amount * amount * amount * amount * amount + 1,
    InOut: (amount: number) => {
      if ((amount *= 2) < 1) {
        return 0.5 * amount * amount * amount * amount * amount;
      }

      return 0.5 * ((amount -= 2) * amount * amount * amount * amount + 2);
    },
  },
  Sinusoidal: {
    In: (amount: number) => 1 - Math.cos((amount * Math.PI) / 2),
    Out: (amount: number) => Math.sin((amount * Math.PI) / 2),
    InOut: (amount: number) => 0.5 * (1 - Math.cos(Math.PI * amount)),
  },
  Exponential: {
    In: (amount: number) => (amount === 0 ? 0 : Math.pow(1024, amount - 1)),
    Out: (amount: number) => (amount === 1 ? 1 : 1 - Math.pow(2, -10 * amount)),
    InOut: (amount: number) => {
      if (amount === 0) {
        return 0;
      }

      if (amount === 1) {
        return 1;
      }

      if ((amount *= 2) < 1) {
        return 0.5 * Math.pow(1024, amount - 1);
      }

      return 0.5 * (-Math.pow(2, -10 * (amount - 1)) + 2);
    },
  },
  Circular: {
    In: (amount: number) => 1 - Math.sqrt(1 - amount * amount),
    Out: (amount: number) => Math.sqrt(1 - --amount * amount),
    InOut: (amount: number) => {
      if ((amount *= 2) < 1) {
        return -0.5 * (Math.sqrt(1 - amount * amount) - 1);
      }
      return 0.5 * (Math.sqrt(1 - (amount -= 2) * amount) + 1);
    },
  },
  Elastic: {
    In: (amount: number) => {
      if (amount === 0) {
        return 0;
      }

      if (amount === 1) {
        return 1;
      }

      return -Math.pow(2, 10 * (amount - 1)) * Math.sin((amount - 1.1) * 5 * Math.PI);
    },
    Out: (amount: number) => {
      if (amount === 0) {
        return 0;
      }

      if (amount === 1) {
        return 1;
      }
      return Math.pow(2, -10 * amount) * Math.sin((amount - 0.1) * 5 * Math.PI) + 1;
    },
    InOut: (amount: number) => {
      if (amount === 0) {
        return 0;
      }

      if (amount === 1) {
        return 1;
      }

      amount *= 2;

      if (amount < 1) {
        return -0.5 * Math.pow(2, 10 * (amount - 1)) * Math.sin((amount - 1.1) * 5 * Math.PI);
      }

      return 0.5 * Math.pow(2, -10 * (amount - 1)) * Math.sin((amount - 1.1) * 5 * Math.PI) + 1;
    },
  },
  Back: {
    In: (amount: number) => {
      const s = 1.70158;
      return amount * amount * ((s + 1) * amount - s);
    },
    Out: (amount: number) => {
      const s = 1.70158;
      return --amount * amount * ((s + 1) * amount + s) + 1;
    },
    InOut: (amount: number) => {
      const s = 1.70158 * 1.525;
      if ((amount *= 2) < 1) {
        return 0.5 * (amount * amount * ((s + 1) * amount - s));
      }
      return 0.5 * ((amount -= 2) * amount * ((s + 1) * amount + s) + 2);
    },
  },
  Bounce: {
    In: (amount: number) => {
      return 1 - Easing.Bounce.Out(1 - amount);
    },
    Out: (amount: number) => {
      if (amount < 1 / 2.75) {
        return 7.5625 * amount * amount;
      } else if (amount < 2 / 2.75) {
        return 7.5625 * (amount -= 1.5 / 2.75) * amount + 0.75;
      } else if (amount < 2.5 / 2.75) {
        return 7.5625 * (amount -= 2.25 / 2.75) * amount + 0.9375;
      } else {
        return 7.5625 * (amount -= 2.625 / 2.75) * amount + 0.984375;
      }
    },
    InOut: (amount: number) => {
      if (amount < 0.5) {
        return Easing.Bounce.In(amount * 2) * 0.5;
      }
      return Easing.Bounce.Out(amount * 2 - 1) * 0.5 + 0.5;
    },
  },
};

export default Easing;
