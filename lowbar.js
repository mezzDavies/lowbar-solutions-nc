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

	if (Array.isArray(collection)) {
		for (let i = 0; i < collection.length; i++) {
			map.push(iteratee(collection[i], i, collection));
		}
	} else {
		for (const key in collection) {
			map.push(iteratee(collection[key], key, collection));
		}
	}

	return map;
};

_.filter = (collection, predicate) => {
	const filteredArr = [];
	if (Array.isArray(collection)) {
		for (let i = 0; i < collection.length; i++) {
			if (predicate(collection[i], i, collection))
				filteredArr.push(collection[i]);
		}
		return filteredArr;
	} else {
		//---- Wasn't sure how to implement for different collection types but this works at least ----//
		for (const key in collection) {
			if (predicate(collection[key], key, collection))
				filteredArr.push([key, collection[key]]);
		}
		return filteredArr;
	}
};

_.forEach = (collection, fn) => {
	if (Array.isArray(collection)) {
		for (let i = 0; i < collection.length; i++) {
			fn(collection[i], i, collection);
		}
	} else {
		for (const key in collection) {
			fn(collection[key], key, collection);
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
	if (Array.isArray(collection)) {
		for (let i = 0; i < collection.length; i++) {
			if (predicate(collection[i], i, collection)) return collection[i];
		}
	} else {
		for (const key in collection) {
			if (predicate(collection[key], key, collection)) return collection[key];
		}
	}
};

module.exports = _;
