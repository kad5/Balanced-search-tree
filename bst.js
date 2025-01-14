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

  insert(value) {}
  deleteItem(value) {}

  find(value, node = this.root) {
    if (value === node.data) return node;
    if (value < node.data && node.left) return this.find(value, node.left);
    if (value > node.data && node.right) return this.find(value, node.right);
    return "not in the tree";
  }

  height(node) {
    if (node === null) return -1;
    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);
    return Math.max(leftHeight, rightHeight) + 1;
  }

  isBalanced(node = this.root) {
    if (node === null) return true;
    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);
    if (Math.abs(leftHeight - rightHeight) > 1) {
      return false;
    }
    return this.isBalanced(node.left) && this.isBalanced(node.right);
  }

  depth(node, parent = this.root, depth = 0) {
    if (node.data === parent.data) return depth;
    if (node.data < parent.data)
      return this.depth(node, parent.left, depth + 1);
    if (node.data > parent.data)
      return this.depth(node, parent.right, depth + 1);
    return -1;
  }
}

function buildTree(array) {
  if (array.length === 0) return null;
  const mid = Math.floor(array.length / 2);
  const root = createNode(array[mid]);

  root.left = buildTree(array.slice(0, mid));
  root.right = buildTree(array.slice(mid + 1));

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

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const myRoot = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
prettyPrint(myRoot.root);
