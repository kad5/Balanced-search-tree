function createNode(data) {
  return {
    data,
    left: null,
    right: null,
  };
}

class Tree {
  constructor(array) {
    const sorted = prepArray(array);
    this.root = buildTree(sorted);
  }
}

function buildTree(array) {
  if (array.length <= 1) return createNode(array[0]);

  const mid = Math.floor(array.length / 2);
  const left = array.slice(0, mid);
  const right = array.slice(mid, array.length);

  const root = createNode(array[mid]);
  root.left = buildTree(left);
  root.right = buildTree(right);

  return root;
}

function prepArray(array) {
  const uniqueArray = Array.from(removeDuplicates(array));
  return sort(uniqueArray);
}

function removeDuplicates(array) {
  return new Set(array);
}

function sort(array) {
  if (array.length < 2) {
    return array;
  } else {
    const mid = Math.floor(array.length / 2);
    const left = sort(array.slice(0, mid));
    const right = sort(array.slice(mid, array.length));
    return merge(left, right);
  }
}

function merge(left, right) {
  let result = [];
  let i = 0;
  let j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }
  return result.concat(left.slice(i)).concat(right.slice(j));
}

const myArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
//console.log(myArray)
