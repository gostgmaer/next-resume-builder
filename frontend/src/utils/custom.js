export const findIndex = (array, index) => {
  const found = array.find(function (element, ind) {
    return index === ind;
  });
  return found
};
