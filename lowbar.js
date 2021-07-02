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

//---- Not yet working for objects ----//
_.filter = (collection, predicate) => {
	const filteredArr = [];

	if (Array.isArray(collection)) {
		for (let i = 0; i < collection.length; i++) {
			if (predicate(collection[i])) filteredArr.push(collection[i]);
		}
	}

	return filteredArr;
};

_.forEach = (collection) => {
	return collection;
};
//takes collection and fn
//iterates and invokes fn with each iteratee
//returns collection

module.exports = _;
