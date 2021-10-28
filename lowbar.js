const _ = {};

_.identity = (x) => {
  return x;
};

_.fromPairs = (arrPairs) => {
  const pairsObj = {};

  for (let i = 0; i < arrPairs.length; i++) {
    pairsObj[arrPairs[i][0]] = arrPairs[i][1];
  }
  return pairsObj;
};

_.times = (n, func) => {
  const result = [];
  for (let index = 0; index < n; index++) {
    result.push(func(index));
  }
  return result;
};

_.map = (collection, iteratee) => {
  let map = [];

  for (const prop in collection) {
    map.push(iteratee(collection[prop], prop, collection));
  }

  return map;
};

_.filter = (collection, pred) => {
  const filteredArr = [];

  for (const prop in collection) {
    if (Array.isArray(collection)) {
      if (pred(collection[prop], prop, collection))
        filteredArr.push(collection[prop]);
    } else {
      if (pred(collection[prop], prop, collection))
        filteredArr.push([prop, collection[prop]]);
    }
  }

  return filteredArr;
};

_.forEach = (collection, fn) => {
  for (const prop in collection) {
    fn(collection[prop], prop, collection);
  }

  return collection;
};

_.invert = (obj) => {
  const invertedObj = {};
  for (const key in obj) {
    invertedObj[obj[key]] = key;
  }
  return invertedObj;
};

_.zip = (...args) => {
  const arrayCollection = [...args];
  const arrayAmount = arrayCollection[0].length;
  const zippedArrays = [];

  for (let i = 0; i < arrayAmount; i++) {
    zippedArrays.push([]);
  }

  for (let i = 0; i < arrayCollection.length; i++) {
    const set = arrayCollection[i];
    for (let j = 0; j < set.length; j++) {
      zippedArrays[j].push(set[j]);
    }
  }

  return zippedArrays;
};

_.fill = (array, value, startIndex = 0, endIndex = array.length) => {
  for (let i = startIndex; i < endIndex; i++) {
    array[i] = value;
  }
  return array;
};

_.find = (collection, predicate) => {
  for (const prop in collection) {
    if (predicate(collection[prop], prop, collection)) return collection[prop];
  }
};

_.chunk = (arr, size = 1) => {
  const innerArrCount = arr.length / size;
  const chunkedArr = [];

  let inputArrIndex = 0;

  for (let i = 0; i < innerArrCount; i++) {
    chunkedArr[i] = new Array();

    for (let j = 0; j < size; j++) {
      if (inputArrIndex > arr.length - 1) break;
      chunkedArr[i][j] = arr[inputArrIndex];
      inputArrIndex++;
    }
  }

  return chunkedArr;
};

_.remove = (array, pred) => {
  for (let i = 0; i < array.length; i++) {
    if (pred(array[i])) {
      array.splice(i, 1);
      i--;
    }
  }
  return array;
};

_.shuffle = (array) => {
  const copiedArr = [...array];
  let oldElement;

  for (let i = copiedArr.length - 1; i > 0; i--) {
    let randomIndex = Math.floor(Math.random() * (i + 1));
    oldElement = copiedArr[i];
    copiedArr[i] = copiedArr[randomIndex];
    copiedArr[randomIndex] = oldElement;
  }
  return copiedArr;
};

_.reduce = (collection, iterateeFn, accumulator) => {
  for (const prop in collection) {
    if (!accumulator) accumulator = collection[prop];

    accumulator = iterateeFn(accumulator, collection[prop], prop, collection);
  }

  return accumulator;
};

_.intersection = (...arrays) => {
  let intersectingValues = [];

  if (arrays.length < 2) {
    intersectingValues = arrays[0] || [];
  } else {
    let currentElement;
    for (let i = 0; i < arrays[0].length; i++) {
      currentElement = arrays[0][i];
      currentValIntersects = true;

      if (!arrays[0].length) break;

      for (let j = 1; j < arrays.length; j++) {
        const currentArray = arrays[j];

        if (
          _.find(currentArray, (x) => x === currentElement) !== currentElement
        )
          currentValIntersects = false;

        if (!currentValIntersects) break;
      }
      if (currentValIntersects) intersectingValues.push(currentElement);
    }
  }

  return intersectingValues;
};

module.exports = _;
