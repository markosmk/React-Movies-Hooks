// remove object of array with two property conditional
export function removeObject(arr, obj, property1, property2) {
  let newArray = [...arr];
  for (let i = 0; i < newArray.length; i++) {
    if (
      newArray[i][property1] === obj[property1] &&
      newArray[i][property2] === obj[property2]
    ) {
      newArray.splice(i, 1);
      // i--;
      break;
    }
  }
  return newArray;
}

// concat classes
export function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}
