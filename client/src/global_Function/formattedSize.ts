const formattedSize = (size: number): string => {
  if (size < 1024) {
    return size + ' byte';
  }
  if (size < 1024 ** 2) {
    return (size / 1024).toFixed(1) + ' Kb';
  }
  if (size < 1024 ** 3) {
    return (size / 1024 ** 2).toFixed(1) + ' Mb';
  }

  return (size / 1024 ** 3).toFixed(1) + ' Gb';
};

export default formattedSize;
