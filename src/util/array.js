const isEmptyArray = array => !Array.isArray(array) || array.length < 1;

export const sortArrayOfObjectsByKey = (array, key, sortOrder = 'DESC') => {
  if (isEmptyArray(array)) return array;

  const compareDesc = (a, b) => {
    if (a[key] > b[key]) {
      return -1;
    }

    if (a[key] < b[key]) {
      return 1;
    }

    return 0;
  };

  const compareAsc = (a, b) => {
    if (a[key] < b[key]) {
      return -1;
    }

    if (a[key] > b[key]) {
      return 1;
    }

    return 0;
  };

  if (sortOrder === 'ASC') {
    return array.sort(compareAsc);
  }

  return array.sort(compareDesc);
};
