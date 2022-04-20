const formattedDate = (date: number): string => {
  const dateFile = new Date(date);
  let day: number | string = dateFile.getDate();
  let month: number | string = dateFile.getMonth() + 1;
  const year = dateFile.getFullYear();
  let hours: number | string = dateFile.getHours();
  let minutes: number | string = dateFile.getMinutes();

  day = day < 10 ? '0' + day : day;
  month = month < 10 ? '0' + month : month;
  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;

  return day + '.' + month + '.' + year + '  ' + hours + ':' + minutes;
};

export default formattedDate;
