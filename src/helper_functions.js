/* jshint esversion: 6 */

export const addOneInsertionSort = (array, item) => {
  let insertionIndex = array.length; // start at the end
  while (insertionIndex > 0) {
    if (item.amount > array[insertionIndex - 1].amount) { // if it fits past index - 1
      insertionIndex--; // then we move index by 1
    } else {
      break;
    }
  }

  // don't have to worry about inserting past # elements, `splice` will just insert at array.length
  array.splice(insertionIndex, 0, item); // 0 is items to be deleted at the index, 0 since we are inserting
};
