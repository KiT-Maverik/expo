export const converter = (base: number) => {
  const pxToRem = (fontSize: number) => `${fontSize / base}rem`;

  return { pxToRem };
};
