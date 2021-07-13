const _ = {};

_.identity = (x) => {
	return x;
};

_.fromPairs = (arrPairs) => {
	if (!arrPairs.length) return {};
	const returnObj = {};

	for (let i = 0; i < arrPairs.length; i++) {
		returnObj[arrPairs[i][0]] = arrPairs[i][1];
	}
	return returnObj;
};

_.map = (collection, func) => {
	let input = collection;
	if (!Array.isArray(collection)) {
		const values = Object.values(collection);
		input = values;
	}
	for (let i = 0; i < input.length; i++) {
		func(input[i]);
	}
	return input;
};

_.filter = (collection, predicate) => {
	const filteredArr = [];
	if (Array.isArray(collection)) {
		for (let i = 0; i < collection.length; i++) {
			if (predicate(collection[i])) filteredArr.push(collection[i]);
		}
		return filteredArr;
	} else {
		//---- Not yet working for objects ----//
		for (const key in collection) {
			if (predicate(collection[key])) filteredArr.push(collection[key]);
		}
		return filteredArr;
	}
};

_.forEach = (collection, fn) => {
	// Got a bit confused about whether this should work for objects as well as arrays so may have made life harder for myself
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

module.exports = _;
