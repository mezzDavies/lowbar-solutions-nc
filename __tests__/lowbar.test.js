const _ = require('../lowbar');

const mathCopy = Object.create(global.Math);

const mockRandom = () => {
	const mockMath = Object.create(global.Math);
	mockMath.random = jest.fn();
	global.Math = mockMath;
	console.log('MATH: mocked');
};

const resetMockRandom = () => {
	global.Math = mathCopy;
	console.log('MATH: reset');
};

describe('#identity', () => {
	test('returns the value passed as an argument', () => {
		expect(_.identity(3)).toBe(3);
		expect(_.identity('hello')).toBe('hello');
		expect(_.identity(true)).toBe(true);
	});
	test('returns a reference to the same reference type passed as an argument', () => {
		const arr = [];
		expect(_.identity(arr)).toEqual(arr);
	});
});

describe('#fromPairs', () => {
	test('returns empty obj if passed empty array', () => {
		expect(_.fromPairs([])).toEqual({});
	});
	test('return same number of key/val pairs as nested arrays args provided', () => {
		let outPut = _.fromPairs([['a', 1]]);
		expect(Object.keys(outPut).length).toBe(1);

		outPut = _.fromPairs([
			['a', 1],
			['b', 2]
		]);
		expect(Object.keys(outPut).length).toBe(2);
	});
	test('returns obj with a single key/value pair', () => {
		expect(_.fromPairs([['a', 1]])).toEqual({ a: 1 });
	});
	test('returns obj with multiple key/val pairs when given multiple nested arrays', () => {
		expect(
			_.fromPairs([
				['a', 1],
				['b', 2]
			])
		).toEqual({ a: 1, b: 2 });
		expect(
			_.fromPairs([
				['a', 1],
				['b', 2],
				['c', 3],
				['d', 4]
			])
		).toEqual({ a: 1, b: 2, c: 3, d: 4 });
	});
	test('does not mutate original array input', () => {
		const input = [['a', 1]];
		_.fromPairs(input);
		expect(input).toEqual([['a', 1]]);
	});
});

describe('#map', () => {
	test('if passed empty array or object - returns empty array', () => {
		expect(_.map([])).toEqual([]);
		expect(_.map({})).toEqual([]);
	});
	test('return array length is the same as either - array arg length or number of key/value pairs on obj arg', () => {
		const mockFunc = jest.fn();
		const inputArr = [1, 2];
		const inputObj = { a: 1, b: 2 };
		expect(_.map(inputArr, mockFunc)).toHaveLength(2);
		expect(_.map(inputObj, mockFunc)).toHaveLength(2);
	});
	test('Arrays: iteratee function is called with value, index and collection of each element', () => {
		const mockFunc = jest.fn();
		const inputArr = [1, 2];
		_.map(inputArr, mockFunc);
		expect(mockFunc).toHaveBeenCalledTimes(2);
		expect(mockFunc).toHaveBeenCalledWith(1, '0', inputArr);
		expect(mockFunc).toHaveBeenCalledWith(2, '1', inputArr);
	});
	test('Objects: iteratee is called with value, key and collection for each prop', () => {
		const mockFunc = jest.fn();
		const inputObj = { a: 1, b: 2 };

		_.map(inputObj, mockFunc);
		expect(mockFunc).toHaveBeenCalledTimes(2);
		expect(mockFunc).toHaveBeenCalledWith(1, 'a', inputObj);
		expect(mockFunc).toHaveBeenCalledWith(2, 'b', inputObj);
	});
	test('should not mutate given collection', () => {
		const mockFunc = jest.fn();
		let input = [1, 2];
		_.map(input, mockFunc);
		expect(input).toEqual([1, 2]);

		input = { a: 1, b: 2 };
		_.map(input, mockFunc);
		expect(input).toEqual({ a: 1, b: 2 });
	});
});

describe('#filter', () => {
	test('if passed empty array or object - returns empty array', () => {
		expect(_.filter({})).toEqual([]);
		expect(_.filter([])).toEqual([]);
	});
	describe('-- Arrays --', () => {
		test('should return array of length 1 - predicate return true', () => {
			const testPred = (num) => !(num % 2);
			const testArr = [2];
			expect(_.filter(testArr, testPred)).toEqual([2]);
		});
		test('should return array of length 0 - predicate return false', () => {
			const testPred = (num) => !(num % 2);
			const testArr = [1];
			expect(_.filter(testArr, testPred)).toEqual([]);
		});
		test('predicate should be called on each array element - predicate should be called with value, index and collection', () => {
			const mockFn = jest.fn();
			const testArr = [1, 2, 3, 4, 5];
			_.filter(testArr, mockFn);
			expect(mockFn).toHaveBeenCalledTimes(5);
			expect(mockFn).toHaveBeenCalledWith(1, '0', testArr);
			expect(mockFn).toHaveBeenCalledWith(2, '1', testArr);
			expect(mockFn).toHaveBeenCalledWith(3, '2', testArr);
			expect(mockFn).toHaveBeenCalledWith(4, '3', testArr);
			expect(mockFn).toHaveBeenCalledWith(5, '4', testArr);
		});
		test('should correctly filter longer arrays', () => {
			const mockFn = jest.fn().mockImplementation((num) => !(num % 2));
			const testArr = [1, 2, 3, 4, 5];
			expect(_.filter(testArr, mockFn)).toEqual([2, 4]);
			expect(mockFn).toHaveBeenCalledTimes(5);
		});
	});
	describe('-- Objects --', () => {
		test('should return array with one obj prop - predicate return true', () => {
			const testPred = (person) => !(person.age % 2);
			const testObj = { duncan: { favColour: 'red', age: 28 } };
			expect(_.filter(testObj, testPred)).toEqual([
				['duncan', { favColour: 'red', age: 28 }]
			]);
		});
		test('should return array with no obj prop - predicate return false', () => {
			const testPred = (person) => !(person.age % 2);
			const testObj = { duncan: { favColour: 'red', age: 27 } };
			expect(_.filter(testObj, testPred)).toEqual([]);
		});
		test('predicate should be called on each obj prop', () => {
			const mockFn = jest.fn();
			const testObj = { one: 1, two: 2, three: 3 };
			_.filter(testObj, mockFn);
			expect(mockFn).toHaveBeenCalledTimes(3);
			expect(mockFn).toHaveBeenCalledWith(1, 'one', testObj);
			expect(mockFn).toHaveBeenCalledWith(2, 'two', testObj);
			expect(mockFn).toHaveBeenCalledWith(3, 'three', testObj);
		});
		test('should correctly filter longer arrays', () => {
			const mockFn = jest.fn().mockImplementation((num) => !(num % 2));
			const testObj = { one: 1, two: 2, three: 3 };
			expect(_.filter(testObj, mockFn)).toEqual([['two', 2]]);
			expect(mockFn).toHaveBeenCalledTimes(3);
		});
	});
	describe('-- Side Effects --', () => {
		test('should not mutate given collection', () => {
			const testArr = [1, 2, 3, 4, 5];
			const mockFn = jest.fn();
			expect(_.filter(testArr, mockFn)).not.toBe(testArr);
			expect(testArr).toEqual([1, 2, 3, 4, 5]);
			const testObj = { one: 1, two: 2, three: 3 };
			expect(_.filter(testObj, mockFn)).not.toBe(testObj);
			expect(testObj).toEqual({ one: 1, two: 2, three: 3 });
		});
	});
});

describe('#forEach', () => {
	test('should return the given collection', () => {
		const inputObj = {};
		const inputArr = [];
		const mockFn = jest.fn();
		expect(_.forEach(inputObj, mockFn)).toBe(inputObj);
		expect(_.forEach(inputArr, mockFn)).toBe(inputArr);
	});
	test('given func should be invoked once for each element of the collection', () => {
		const inputArr = [1, 2, 3];
		const inputObj = { one: 1, two: 2, three: 3 };
		const mockFn1 = jest.fn();
		const mockFn2 = jest.fn();

		_.forEach(inputArr, mockFn1);
		expect(mockFn1).toHaveBeenCalledTimes(3);

		_.forEach(inputObj, mockFn2);
		expect(mockFn2).toHaveBeenCalledTimes(3);
	});
	describe('//--Arrays--//', () => {
		test('given func should be called with element, index and collection', () => {
			const inputArr = [1, 2, 3];
			const mockFn1 = jest.fn();
			_.forEach(inputArr, mockFn1);
			expect(mockFn1).toHaveBeenCalledTimes(3);
			expect(mockFn1).toHaveBeenCalledWith(1, '0', inputArr);
			expect(mockFn1).toHaveBeenCalledWith(2, '1', inputArr);
			expect(mockFn1).toHaveBeenCalledWith(3, '2', inputArr);
		});
	});
	describe('//--Objects--//', () => {
		test('given func should be called with value, key and collection', () => {
			const inputObj = { one: 1, two: 2, three: 3 };
			const mockFn1 = jest.fn();
			_.forEach(inputObj, mockFn1);
			expect(mockFn1).toHaveBeenCalledTimes(3);
			expect(mockFn1).toHaveBeenCalledWith(1, 'one', inputObj);
			expect(mockFn1).toHaveBeenCalledWith(2, 'two', inputObj);
			expect(mockFn1).toHaveBeenCalledWith(3, 'three', inputObj);
		});
	});
});

describe('#invert', () => {
	test('should return empty obj when given empty obj', () => {
		expect(_.invert({})).toEqual({});
	});
	test('should successfully invert obj with a single key/value pair', () => {
		expect(_.invert({ one: '1' })).toEqual({ 1: 'one' });
	});
	test('should successfully invert obj with multiple key/value pairs', () => {
		expect(_.invert({ one: '1', two: '2' })).toEqual({ 1: 'one', 2: 'two' });
	});
	test('if object contains duplicate values, subsequent values overwrite property assignments of previous values', () => {
		expect(_.invert({ one: '1', two: '2', three: '1' })).toEqual({
			1: 'three',
			2: 'two'
		});
	});
	test('should not mutate original object', () => {
		const input = { one: '1', two: '2', three: '1' };
		expect(_.invert(input)).not.toBe(input);
		expect(input).toEqual({ one: '1', two: '2', three: '1' });
	});
});

describe('#zip', () => {
	test('should return empty array when given empty array', () => {
		expect(_.zip([])).toEqual([]);
	});
	test('should correctly group first and second elements of given arrays', () => {
		const testArrays = [
			['a', 'b'],
			[1, 2]
		];
		expect(_.zip(...testArrays)).toEqual([
			['a', 1],
			['b', 2]
		]);
	});
	test('should correctly group arrays with a length > 2', () => {
		const testArrays = [
			['a', 'b', 'c'],
			[1, 2, 3]
		];
		expect(_.zip(...testArrays)).toEqual([
			['a', 1],
			['b', 2],
			['c', 3]
		]);
	});
	test('should correctly group > 2 arrays', () => {
		const testArrays = [
			['a', 'b'],
			[1, 2],
			[true, false]
		];
		expect(_.zip(...testArrays)).toEqual([
			['a', 1, true],
			['b', 2, false]
		]);
	});
	test('should not mutate the original arrays', () => {
		const testArr1 = ['a', 'b'];
		const testArr2 = [1, 2];
		_.zip(testArr1, testArr2);
		expect(testArr1).toEqual(['a', 'b']);
		expect(testArr2).toEqual([1, 2]);
	});
});

describe('#fill', () => {
	test('return an empty array when called with empty array and value', () => {
		expect(_.fill([], '*')).toEqual([]);
	});
	test('fills an array with the given value', () => {
		expect(_.fill([, , , , ,], '*')).toEqual(['*', '*', '*', '*', '*']);
	});
	test('_.fill takes a start index argument that gives the index at which to start the fill - defaults to zero', () => {
		expect(_.fill([, , ,], 5)).toEqual([5, 5, 5]);
	});
	test('_.fill takes a start index argument that gives the index at which to start the fill', () => {
		expect(_.fill([, , ,], 5, 1)).toEqual([undefined, 5, 5]);
	});
	test('_.fill takes an end index argument that gives the index at which to end the fill - defaults to array length', () => {
		expect(_.fill([, , ,], 10)).toEqual([10, 10, 10]);
	});
	test('_.fill takes an end index argument that gives the index at which to end the fill', () => {
		expect(_.fill([, , ,], 10, 0, 2)).toEqual([10, 10, undefined]);
	});
	test('SHOULD mutate the given array', () => {
		const inputArr = [, , ,];
		_.fill(inputArr, 5);
		expect(inputArr).toEqual([5, 5, 5]);
	});
});

describe('#find', () => {
	describe('//---Arrays---//', () => {
		test('return undefined if given empty array or if no matching elements found', () => {
			expect(_.find([])).toBe(undefined);
			expect(_.find([2], (x) => x === 1)).toBe(undefined);
		});
		test('predicate should be invoked with value, index and collection - invoked for every element when no match found', () => {
			const mockFn = jest.fn();
			const inputArr = [1, 2, 3];
			_.find(inputArr, mockFn);
			expect(mockFn).toHaveBeenCalledTimes(3);
			expect(mockFn).toHaveBeenCalledWith(1, '0', inputArr);
			expect(mockFn).toHaveBeenCalledWith(2, '1', inputArr);
			expect(mockFn).toHaveBeenCalledWith(3, '2', inputArr);
		});
		test('should only invoke the predicate until it returns true - then return element that passed the predicate func', () => {
			const mockFn = jest.fn().mockImplementation((x) => x === 2);
			expect(_.find([1, 2, 3], mockFn)).toBe(2);
			expect(mockFn).not.toHaveBeenCalledWith(3);
		});

		test('should not mutate the given array', () => {
			const mockFn = jest.fn().mockImplementation((x) => x === 2);
			const testArr = [1, 2, 3];
			_.find(testArr, mockFn);
			expect(testArr).toEqual([1, 2, 3]);
		});
	});
	describe('//---Objects---//', () => {
		test('return undefined if given empty object or if no matching elements found', () => {
			expect(_.find({})).toBe(undefined);
			expect(_.find({ two: 2 }, (x) => x === 1)).toBe(undefined);
		});
		test('should invoke the predicate for once for each prop - predicate should be invoked with value, key and collection', () => {
			const mockFn = jest.fn();
			const inputObj = { one: 1, two: 2, three: 3 };
			_.find(inputObj, mockFn);
			expect(mockFn).toHaveBeenCalledTimes(3);
			expect(mockFn).toHaveBeenCalledWith(1, 'one', inputObj);
			expect(mockFn).toHaveBeenCalledWith(2, 'two', inputObj);
			expect(mockFn).toHaveBeenCalledWith(3, 'three', inputObj);
		});
		test('should only invoke the predicate with prop until returns true - then returns prop that passed predicate', () => {
			const mockFn = jest.fn().mockImplementation((x) => x === 2);
			expect(_.find({ one: 1, two: 2, three: 3 }, mockFn)).toBe(2);
			expect(mockFn).not.toHaveBeenCalledWith(3);
		});
		test('should not mutate given object', () => {
			const mockFn = jest.fn().mockImplementation((x) => x === 2);
			const inputObj = { one: 1, two: 2, three: 3 };
			_.find(inputObj, mockFn);
			expect(inputObj).toEqual({ one: 1, two: 2, three: 3 });
		});
	});
});

describe('#chunk', () => {
	test('should return empty array when given empty array - no matter what number is given', () => {
		expect(_.chunk([], 2)).toEqual([]);
		expect(_.chunk([], 5)).toEqual([]);
	});
	test('inner array size should default to 1 when given no second arg', () => {
		expect(_.chunk([1, 2, 3])).toEqual([[1], [2], [3]]);
	});
	test('should return array in chunks of length 1 when given number 1', () => {
		expect(_.chunk([1], 1)).toEqual([[1]]);
		expect(_.chunk([1, 2, 3], 1)).toEqual([[1], [2], [3]]);
	});
	test('should return array in chunks of 2 which given number 2', () => {
		expect(_.chunk([1, 2, 3, 4, 5, 6], 2)).toEqual([
			[1, 2],
			[3, 4],
			[5, 6]
		]);
	});
	test('should return array in chunks > 2 depending on arg given', () => {
		expect(_.chunk([1, 2, 3, 4, 5, 6], 3)).toEqual([
			[1, 2, 3],
			[4, 5, 6]
		]);
		expect(_.chunk([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 5)).toEqual([
			[1, 2, 3, 4, 5],
			[6, 7, 8, 9, 10]
		]);
	});
	test('should return correctly chunked arrays when elements cannot be split evenly', () => {
		expect(_.chunk([1, 2, 3], 2)).toEqual([[1, 2], [3]]);
		expect(_.chunk([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 7)).toEqual([
			[1, 2, 3, 4, 5, 6, 7],
			[8, 9, 10]
		]);
	});
	test('inputted array should not be mutated', () => {
		const inputArr = [1, 2, 3, 4, 5];
		expect(_.chunk(inputArr, 2)).not.toBe(inputArr);
		expect(inputArr).toEqual([1, 2, 3, 4, 5]);
	});
});

describe('#remove', () => {
	test('return empty array if given array is empty', () => {
		expect(_.remove([], jest.fn())).toEqual([]);
	});
	test('return unchanged array if predicate is always falsy', () => {
		const mockPred = jest.fn().mockImplementation((num) => num === 2);
		expect(_.remove([1, 3, 5], mockPred)).toEqual([1, 3, 5]);
		expect(mockPred).toHaveBeenCalledTimes(3);
		expect(mockPred).toHaveBeenCalledWith(1);
		expect(mockPred).toHaveBeenCalledWith(3);
		expect(mockPred).toHaveBeenCalledWith(5);
	});
	test('should remove a single element from array if predicate returns truthy for it', () => {
		const mockPred = jest.fn().mockImplementation((num) => num === 2);
		expect(_.remove([1, 2, 3], mockPred)).toEqual([1, 3]);
		expect(mockPred).toHaveBeenCalledTimes(3);
		expect(mockPred).toHaveBeenCalledWith(1);
		expect(mockPred).toHaveBeenCalledWith(2);
		expect(mockPred).toHaveBeenCalledWith(3);
	});
	test('should remove multiple elements from an array if predicate returns truthy for them', () => {
		const mockPred = jest.fn().mockImplementation((num) => num === 2);
		expect(_.remove([1, 2, 1, 2, 1, 2], mockPred)).toEqual([1, 1, 1]);
		expect(mockPred).toHaveBeenCalledTimes(6);
	});
	test('Side effects: SHOULD mutate given array', () => {
		const mockPred = jest.fn();
		const testArr = [1, 2, 3, 4, 5];
		expect(_.remove(testArr, mockPred)).toBe(testArr);
		expect(testArr).toEqual([1, 2, 3, 4, 5]);
	});
});

describe('#shuffle', () => {
	test('should return given array when length <= 1', () => {
		expect(_.shuffle([])).toEqual([]);
		expect(_.shuffle([1])).toEqual([1]);
	});
	test('should contain all the same elements after shuffling', () => {
		const shuffled = _.shuffle([1, 2, 3]);
		expect(shuffled).toEqual(expect.arrayContaining([1, 2, 3]));
		expect(shuffled).toHaveLength(3);
	});
	test('function should assign elements to random indices with Math.random', () => {
		mockRandom();
		_.shuffle([1, 2, 3, 4]);
		expect(global.Math.random).toHaveBeenCalledTimes(3);
		resetMockRandom();
	});
	test('should not mutate given array', () => {
		const inputArr = [1, 2, 3, 4, 5];
		expect(_.shuffle(inputArr)).not.toBe(inputArr);
		expect(inputArr).toEqual([1, 2, 3, 4, 5]);
	});
});

describe('#reduce', () => {
	test('iteratee function should be called for each item in collection - // ARRAYS //', () => {
		const mockFunc = jest.fn().mockImplementation((x) => x);

		_.reduce([], mockFunc);
		expect(mockFunc).toHaveBeenCalledTimes(0);

		_.reduce([1], mockFunc);
		expect(mockFunc).toHaveBeenCalledTimes(1);
		expect(mockFunc).toHaveBeenCalledWith(1, 1, '0', [1]);
		mockFunc.mockReset();

		_.reduce([1, 2, 3], mockFunc);
		expect(mockFunc).toHaveBeenCalledTimes(3);
		expect(mockFunc).toHaveBeenCalledWith(1, 1, '0', [1, 2, 3]);
		expect(mockFunc).toHaveBeenCalledWith(2, 2, '1', [1, 2, 3]);
		expect(mockFunc).toHaveBeenCalledWith(3, 3, '2', [1, 2, 3]);
	});
	test('iteratee function should be called for each item in collection - // OBJECTS //', () => {
		const mockFunc = jest.fn().mockImplementation((x) => x);

		_.reduce({}, mockFunc);
		expect(mockFunc).toHaveBeenCalledTimes(0);

		_.reduce({ 1: 'one' }, mockFunc);
		expect(mockFunc).toHaveBeenCalledTimes(1);
		expect(mockFunc).toHaveBeenCalledWith('one', 'one', '1', { 1: 'one' });
		mockFunc.mockReset();

		_.reduce({ 1: 'one', 2: 'two', 3: 'three' }, mockFunc);
		expect(mockFunc).toHaveBeenCalledTimes(3);
		expect(mockFunc).toHaveBeenCalledWith('one', 'one', '1', {
			1: 'one',
			2: 'two',
			3: 'three'
		});
		expect(mockFunc).toHaveBeenCalledWith('two', 'two', '2', {
			1: 'one',
			2: 'two',
			3: 'three'
		});
		expect(mockFunc).toHaveBeenCalledWith('three', 'three', '3', {
			1: 'one',
			2: 'two',
			3: 'three'
		});
	});
	test('accumulator should default to first item in collection - unless provided in reduce invocation', () => {
		const mockFunc = jest.fn().mockImplementation((x) => x);
		expect(_.reduce([1], mockFunc)).toBe(1);
		expect(_.reduce([1], mockFunc, 5)).toBe(5);
	});
	test('accumulator should be updated with the result of the iteratee func', () => {
		const sum = (a, b) => a + b;
		expect(_.reduce([1, 2, 3], sum, 10)).toBe(16);
	});
	test('should not mutate given collection', () => {
		const array = [1, 2, 3];
		const object = {
			1: 'one',
			2: 'two',
			3: 'three'
		};
		const mockFunc = jest.fn();

		_.reduce(array, mockFunc);
		_.reduce(object, mockFunc);

		expect(array).toEqual([1, 2, 3]);
		expect(object).toEqual({
			1: 'one',
			2: 'two',
			3: 'three'
		});
	});
});

describe('#intersection', () => {
	test('if called with single array should return that array', () => {
		expect(_.intersection([])).toEqual([]);
		expect(_.intersection([1, 2, 3])).toEqual([1, 2, 3]);
	});
	test('should return empty array if given empty arrays', () => {
		expect(_.intersection([], [], [])).toEqual([]);
	});
	test('should return intersecting values of when called with two arrays', () => {
		expect(_.intersection([1, 2, 3], [2])).toEqual([2]);
		expect(_.intersection([1, 2, 3], [2, 3])).toEqual([2, 3]);
	});
	test('should return intersecting values when called with >2 arrays', () => {
		expect(_.intersection(['a', 'b', 'c'], ['b', 'c'], ['b', 'c'])).toEqual([
			'b',
			'c'
		]);
		expect(
			_.intersection(
				[1, 2],
				[1, 3],
				[1, 4],
				[1, 5],
				[1, 6],
				[1, 7],
				[1, 8],
				[1, 9]
			)
		).toEqual([1]);
	});
	test('mutation/reference tests ', () => {
		const array1 = [1, 2, 3];
		const array2 = [1, 2, 3];
		const array3 = [1, 2, 3];
		expect(_.intersection(array1, array2, array3)).not.toBe(array1);
		expect(array1).toEqual([1, 2, 3]);
		expect(array2).toEqual([1, 2, 3]);
		expect(array3).toEqual([1, 2, 3]);
	});
	test('edge cases', () => {
		expect(_.intersection([], [1], [1])).toEqual([]);
		expect(_.intersection([true], [true], [])).toEqual([]);
		expect(_.intersection([null], [null], [null])).toEqual([null]);
		expect(
			_.intersection([true, false], [false], [true, false], [false, true])
		).toEqual([false]);
	});
});
