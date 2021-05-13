const _ = require('../lowbar');

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
    expect(_.fromPairs([])).toEqual({})
  });
  test('return same number of key/val pairs as nested arrays args provided', () => {
    let outPut = _.fromPairs([["a", 1]])
    expect(Object.keys(outPut).length).toBe(1)

    outPut = _.fromPairs([["a", 1], ["b", 2]])
    expect(Object.keys(outPut).length).toBe(2)
  });
  test('returns obj with a single key/value pair', () => {
    expect(_.fromPairs([['a', 1]])).toEqual({a: 1})
  });
  test('returns obj with multiple key/val pairs when given multiple nested arrays', () => {
    expect(_.fromPairs([['a', 1], ["b", 2]])).toEqual({a: 1, b: 2})
    expect(_.fromPairs([['a', 1], ["b", 2], ["c", 3], ["d", 4]])).toEqual({a: 1, b: 2, c:3, d: 4})
  });
  test('does not mutate original array input', () => {
    const input = [["a", 1]]
    _.fromPairs(input)
    expect(input).toEqual([["a", 1]])
  });
});


describe('#map', () => {
  test('if passed empty array or object - returns empty array', () => {
    expect(_.map([])).toEqual([])
    expect(_.map({})).toEqual([])
  });
  test('return array length is the same as either - array arg length or number of key/value pairs on obj arg', () => {
    const mockFunc = jest.fn()
    const inputArr = [1, 2]
    const inputObj = {"a": 1, "b": 2}
    expect(_.map(inputArr, mockFunc)).toHaveLength(2)
    expect(_.map(inputObj, mockFunc)).toHaveLength(2)
  });
  test('given function is called on each iteratee if passed an array', () => {
    const mockFunc = jest.fn()
    const inputArr = [1, 2]
   
    _.map(inputArr, mockFunc)
    expect(mockFunc).toHaveBeenCalledTimes(2)
  });
  test('given function is called on each value of a passed object', () => {
    const mockFunc = jest.fn()
    const inputObj = {"a": 1, "b": 2}
    
   _.map(inputObj, mockFunc)
    expect(mockFunc).toHaveBeenCalledTimes(2)
  });
  test('should not mutate given collection', () => {
    const mockFunc = jest.fn()
    let input = [1, 2]
    _.map(input, mockFunc)
    expect(input).toEqual([1, 2])

    input = {"a": 1, "b": 2}
    _.map(input, mockFunc)
    expect(input).toEqual({"a": 1, "b": 2})
  });


});
