interface IAdaptiveSize {
  minSize: string;
  maxSize: string;
  maxWidth: string;
  minWidth: string;
}

const adaptiveSize = ({
  minSize,
  maxSize,
  maxWidth,
  minWidth,
}: IAdaptiveSize): string => {
  const minSizeNumber = minSize.match(/\d+/);
  const maxSizeNumber = maxSize.match(/\d+/);
  const maxWidthNumber = maxWidth.match(/\d+/);
  const minWidthNumber = minWidth.match(/\d+/);

  return `calc(${minSize} + (${maxSizeNumber} - ${minSizeNumber}) * ((100vw - ${minWidth}) / (${maxWidthNumber} - ${minWidthNumber})));`;
};

export default adaptiveSize;
