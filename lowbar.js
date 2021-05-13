const _ = {}

_.identity = (x) => {
  return x;
};


_.fromPairs = (arrPairs) => {
  if(!arrPairs.length) return {}
  const returnObj = {}

  for (let i = 0; i < arrPairs.length; i++) {
    returnObj[arrPairs[i][0]] = arrPairs[i][1]
  }
  return returnObj
}

 

_.map = (collection, func) => {
  let input = collection
  if (!Array.isArray(collection)) {
    const values = Object.values(collection)
    input = values
  }
   for (let i = 0; i < input.length; i++) {
     func(input[i])
   }
  return input
}

module.exports = _;

// const secondNestedElement = arrPairs[0][1]
// const firstNestedElement = arrPairs[0][0]