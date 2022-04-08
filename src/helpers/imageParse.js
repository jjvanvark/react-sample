// Tries to get image variant with given width. Fallsback to full image.
export const getImage = (im, imageWidth = 640) => {
  if (im === undefined) {
    return "";
  }
  const { link, variants } = im;
  const vars = variants.filter(({ width }) => width === imageWidth);
  return vars.length > 0 ? vars[0].link : link;
};
