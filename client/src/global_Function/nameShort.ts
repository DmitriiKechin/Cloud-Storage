const nameShort = (name: string, maxLines = 2, maxLength = 11): string => {
  let nameShort = name;

  const arrayWords = name.split(' ');

  arrayWords.forEach((word, index) => {
    if (word.length > maxLength) {
      arrayWords[index] = arrayWords[index].slice(0, maxLength - 2) + '...';
    }
  });

  let countStrings = -1;
  let sumWordsLenght = maxLength;
  let strings: Array<string> = [];

  arrayWords.forEach((word) => {
    sumWordsLenght += word.length + 1;

    if (sumWordsLenght > maxLength) {
      if (countStrings === maxLines - 1) {
        strings[countStrings] += ' ' + word;
        strings[countStrings] =
          strings[countStrings].slice(0, maxLength - 2) + '...';
      } else {
        sumWordsLenght = word.length;
        countStrings++;
        strings[countStrings] = word;
      }
    } else {
      strings[countStrings] += ' ' + word;
    }
  });

  nameShort = strings.join(' ');

  return nameShort;
};

export default nameShort;
