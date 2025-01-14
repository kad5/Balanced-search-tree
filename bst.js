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
  insert(value) {
    const newNode = createNode(value);
    if (!this.root) {
      this.root = newNode;
      return;
    }
    let node = this.root;
    while (node) {
      if (value === node.data) return;
      if (value < node.data) {
        if (!node.left) {
          node.left = newNode;
          break;
        } else node = node.left;
      }
      if (value > node.data) {
        if (!node.right) {
          node.right = newNode;
          break;
        } else node = node.right;
      }
    }
    if (this.isBalanced() === false) this.rebalance();
  }
  deleteItem(value) {
    let parent = null;
    let node = this.root;

    while (node && node.data !== value) {
      parent = node;
      if (value < node.data) {
        node = node.left;
      } else {
        node = node.right;
      }
    }
    if (!node) return;
    // leaf node
    if (!node.left && !node.right) {
      if (node === this.root) {
        this.root = null;
      } else {
        parent.left === node ? (parent.left = null) : (parent.right = null);
      }
    }
    // node with only left
    if (node.left && !node.right) {
      if (node === this.root) {
        this.root = node.left;
      } else {
        parent.left === node
          ? (parent.left = node.left)
          : (parent.right = node.left);
      }
    }
    // node with only right
    if (!node.left && node.right) {
      if (node === this.root) {
        this.root = node.right;
      } else {
        parent.left === node
          ? (parent.left = node.right)
          : (parent.right = node.right);
      }
    }
    // has both left and right
    if (node.left && node.right) {
      let tempParent = node;
      let replacementNode = node.right;
      while (replacementNode.left !== null) {
        tempParent = replacementNode;
        replacementNode = replacementNode.left;
      }
      node.data = replacementNode.data;
      tempParent.left === replacementNode
        ? (tempParent.left = replacementNode.right)
        : (tempParent.right = replacementNode.right);
    }
    if (this.isBalanced() === false) this.rebalance();
  }
  rebalance() {
    //
  }
  // example usage of the call backs myRoot.levelOrder(myRoot.depth.bind(myRoot))
  // or this next one
  logTraversal(stuff) {
    console.log(stuff);
  }

  levelOrder(callback) {
    if (!callback) {
      throw new Error("Callback function is required");
    }
    const levels = [];
    let queue = this.root ? [this.root] : [];
    while (queue.length > 0) {
      const size = queue.length;
      const level = [];
      for (let i = 0; i < size; i++) {
        const node = queue.shift();
        callback(node);
        level.push(node.data);
        if (node.left) {
          queue.push(node.left);
        }
        if (node.right) {
          queue.push(node.right);
        }
      }
      levels.push(level);
    }
    return levels;
  }
  preOrder(callback, node = this.root, nodes = []) {
    if (!callback) {
      throw new Error("Callback function is required");
    }
    if (node === null) return;
    callback(node);
    nodes.push(node.data);
    if (node.left) this.preOrder(callback, node.left, nodes);

    if (node.right) this.preOrder(callback, node.right, nodes);
    return nodes;
  }
  inOrder(callback, node = this.root, nodes = []) {
    if (!callback) {
      throw new Error("Callback function is required");
    }
    if (node === null) return;
    if (node.left) this.inOrder(callback, node.left, nodes);
    callback(node);
    nodes.push(node.data);
    if (node.right) this.inOrder(callback, node.right, nodes);
    return nodes;
  }
  postOrder(callback, node = this.root, nodes = []) {
    if (!callback) {
      throw new Error("Callback function is required");
    }
    if (node === null) return;
    if (node.left) this.postOrder(callback, node.left, nodes);
    if (node.right) this.postOrder(callback, node.right, nodes);
    callback(node);
    nodes.push(node.data);
    return nodes;
  }
  find(value, node = this.root) {
    if (value === node.data) return node;
    if (value < node.data && node.left) return this.find(value, node.left);
    if (value > node.data && node.right) return this.find(value, node.right);
    return null;
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
