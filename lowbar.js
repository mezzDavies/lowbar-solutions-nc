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

_.map = (collection, iteratee) => {
	let map = [];

	for (const prop in collection) {
		if (Array.isArray(collection)) {
			map.push(iteratee(collection[prop], prop, collection));
		} else {
			map.push(iteratee(collection[prop], prop, collection));
		}
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
		if (Array.isArray(collection)) {
			fn(collection[prop], prop, collection);
		} else {
			fn(collection[prop], prop, collection);
		}
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

_.shuffle = () => {};

module.exports = _;
