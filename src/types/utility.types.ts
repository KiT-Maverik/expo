export const colors = [
  "default",
  "primary",
  "tertiary",
  "secondary",
  "error",
  "warning",
  "info",
  "success",
] as const;
export type Color = (typeof colors)[number];

export const sizes = ["small", "medium", "large"] as const;
export type Size = (typeof sizes)[number];

export const extendedSizes = [...sizes, "xSmall", "xLarge", "x2Large"] as const;
export type ExtendedSize = (typeof extendedSizes)[number];

/**
 * Utility type intended to be used,
 * when you need a temporary 'any' placeholder type
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type T_TodoAny = any;

/**
 *
 * type A = ArrayElement<string[]>; // string
 * type B = ArrayElement<readonly string[]>; // string
 * type C = ArrayElement<[string, number]>; // string | number
 * type D = ArrayElement<["foo", "bar"]>; // "foo" | "bar"
 * type E = ArrayElement<(P | (Q | R))[]>; // P | Q | R
 */
export type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;
