/**
 * Continuous comfort colour ramp.
 *
 * Stops are the design-system status hues (validated for colour-vision
 * deficiency on both light and dark surfaces). Interpolation happens in OKLab
 * so the gradient is perceptually even - a naive sRGB lerp between green and
 * red muddies through grey/olive at the midpoint.
 */

interface Stop {
  /** Comfort score at this stop (1 = ideal, 0 = clearly bad). */
  p: number;
  rgb: [number, number, number];
}

// good -> warning -> serious -> critical
const RAMP: Stop[] = [
  { p: 1, rgb: hexToRgb('#0ca30c') },
  { p: 0.67, rgb: hexToRgb('#fab219') },
  { p: 0.34, rgb: hexToRgb('#ec835a') },
  { p: 0, rgb: hexToRgb('#d03b3b') },
];

/** Colour for a comfort score in [0,1]. */
export function colorForScore(score: number): string {
  const s = Math.max(0, Math.min(1, score));
  // RAMP is ordered high -> low; find the bracketing stops.
  for (let i = 0; i < RAMP.length - 1; i++) {
    const hi = RAMP[i];
    const lo = RAMP[i + 1];
    if (s <= hi.p && s >= lo.p) {
      const span = hi.p - lo.p || 1;
      const t = (s - lo.p) / span; // 0 at lo, 1 at hi
      return rgbToHex(mixOklab(lo.rgb, hi.rgb, t));
    }
  }
  return rgbToHex(s >= RAMP[0].p ? RAMP[0].rgb : RAMP[RAMP.length - 1].rgb);
}

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '');
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ];
}

function rgbToHex([r, g, b]: [number, number, number]): string {
  const c = (v: number) => Math.round(Math.max(0, Math.min(255, v)))
    .toString(16)
    .padStart(2, '0');
  return `#${c(r)}${c(g)}${c(b)}`;
}

const srgbToLinear = (c: number) => {
  const x = c / 255;
  return x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4;
};
const linearToSrgb = (c: number) => {
  const x = c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055;
  return x * 255;
};

function rgbToOklab([r, g, b]: [number, number, number]): [number, number, number] {
  const lr = srgbToLinear(r);
  const lg = srgbToLinear(g);
  const lb = srgbToLinear(b);
  const l = Math.cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb);
  const m = Math.cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb);
  const s = Math.cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb);
  return [
    0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
  ];
}

function oklabToRgb([L, A, B]: [number, number, number]): [number, number, number] {
  const l = (L + 0.3963377774 * A + 0.2158037573 * B) ** 3;
  const m = (L - 0.1055613458 * A - 0.0638541728 * B) ** 3;
  const s = (L - 0.0894841775 * A - 1.291485548 * B) ** 3;
  return [
    linearToSrgb(4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s),
    linearToSrgb(-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s),
    linearToSrgb(-0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s),
  ];
}

function mixOklab(
  a: [number, number, number],
  b: [number, number, number],
  t: number,
): [number, number, number] {
  const la = rgbToOklab(a);
  const lb = rgbToOklab(b);
  return oklabToRgb([
    la[0] + (lb[0] - la[0]) * t,
    la[1] + (lb[1] - la[1]) * t,
    la[2] + (lb[2] - la[2]) * t,
  ]);
}
