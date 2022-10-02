console.clear();
console.log('START NEW SESSION ---------------');

const GI = require('./graph');

const g = new GI.g();
const { stringifyCords } = GI.utils;
const { parseCords } = GI.utils;

const BOARD_SIZE = 8;

// Initialize board
const board = [];

for (let i = 0; i < BOARD_SIZE; i++) {
  board.push(new Array(BOARD_SIZE));
}

// Create vertexes based for each coordinate on the board

for (let y = 0; y < BOARD_SIZE; y++) {
  for (let x = 0; x < BOARD_SIZE; x++) {
    g.addVertex(stringifyCords([x, y]));
  }
}

// Add Edges
function lockEdges(startCords, prevCords) {
  const x = startCords[0];
  const y = startCords[1];
  if (x < 0 || y < 0 || x > board.length - 1 || y > board.length - 1) return;

  const destEdges = g.adjList.get(stringifyCords(prevCords));
  if (destEdges.includes(stringifyCords(startCords))) return;

  g.addEdge(stringifyCords(prevCords), stringifyCords(startCords));

  lockEdges([x + 1, y + 2], [x, y]);
  lockEdges([x + 2, y + 1], [x, y]);
  lockEdges([x - 2, y + 1], [x, y]);
  lockEdges([x - 2, y - 1], [x, y]);
  lockEdges([x - 1, y + 2], [x, y]);
  lockEdges([x + 2, y - 1], [x, y]);
  lockEdges([x - 1, y - 2], [x, y]);
  lockEdges([x + 1, y - 2], [x, y]);
}

lockEdges([3, 3], [2, 1]);

function knightMoves(from, to) {
  const steps = g.shortestPath(stringifyCords(from), stringifyCords(to));

  console.log(`You made it in ${steps.length - 1} moves! Here's your path:`);
  steps.forEach((step) => console.log(step));
}

knightMoves([0, 0], [1, 2]);
knightMoves([0, 0], [3, 3]);
knightMoves([3, 3], [0, 0]);
knightMoves([3, 3], [4, 3]);
