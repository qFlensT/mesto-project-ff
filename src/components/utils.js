/**
 * @param  {...Object} objects
 * @returns {boolean}
 */
const isObjectsEqual = (...objects) => {
  if (objects.length < 2) {
    throw new Error("At least two objects are required to compare");
  }

  const deepEqual = (obj1, obj2) => {
    if (obj1 === obj2) return true;
    if (
      typeof obj1 !== "object" ||
      typeof obj2 !== "object" ||
      obj1 == null ||
      obj2 == null
    ) {
      return false;
    }

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    if (keys1.length !== keys2.length) return false;

    return keys1.every(
      (key) => keys2.includes(key) && deepEqual(obj1[key], obj2[key])
    );
  };

  return objects.slice(1).every((obj) => deepEqual(objects[0], obj));
};

/**
 * @param {Object} obj
 * @param {Array<Object>} arr
 * @returns {boolean}
 */
const isObjectInArray = (obj, arr) =>
  arr.some((item) => isObjectsEqual(obj, item));

export { isObjectsEqual, isObjectInArray };
