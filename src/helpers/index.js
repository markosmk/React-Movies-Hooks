// remove object of array with two property conditional
export const removeObject = (arr, obj, property1, property2) => {
  let newArray = [...arr];
  for (let i = 0; i < newArray.length; i++) {
    if (newArray[i][property1] === obj[property1] && newArray[i][property2] === obj[property2]) {
      newArray.splice(i, 1);
      // i--;
      break;
    }
  }
  return newArray;
};

// concat classes
export const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

export const truncateOverview = (string = '', maxLength = 50) => {
  return string.length > maxLength ? `${string.substring(0, maxLength)}…` : string;
};

export const sortByDate = (a, b) => {
  if (a.hasOwnProperty('date')) {
    if (a.date < b.date) {
      return 1;
    }
    if (a.date > b.date) {
      return -1;
    }
  }
  return 0;
};

export const convertMinsToHrsMins = (mins) => {
  let h = Math.floor(mins / 60);
  let m = mins % 60;
  h = h < 10 ? '' + h : h;
  m = m < 10 ? '0' + m : m;
  return `${h}h ${m}m`;
};

export const checkStatus = (release) => {
  const now = new Date();
  const date_release = new Date(release);
  return now !== date_release && 'Released';
};

export const getClassByRate = (vote) => {
  return vote >= 7
    ? 'text-green-500 stroke-green-500'
    : vote >= 5
    ? 'text-yellow-500 stroke-yellow-500'
    : 'text-red-500 stroke-red-500';
};
