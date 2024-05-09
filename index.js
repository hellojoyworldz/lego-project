const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const arrWrap = arr1.concat(arr2);

Array.prototype.push.apply(arr1, arr2);
