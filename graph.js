const util = require('util');

class Graph {
  constructor() {
    this.V = 0;
    this.adjList = new Map();
  }

  addVertex(v) {
    this.adjList.set(v, []);
    this.V++;
  }

  addEdge(src, dest) {
    this.adjList.get(src).push(dest);
    this.adjList.get(dest).push(src);
  }

  printGraph() {
    const keys = this.adjList.keys();

    for (let key of keys) {
      const values = this.adjList.get(key);
      let conc = '';

      for (let value of values) {
        conc += ` -> ${value}`;
      }

      console.log(`${key}${conc}`);
    }
  }

  bfs(startingNode, cb) {
    const visited = {};

    let q = [];

    visited[startingNode] = true;
    q.push(startingNode);

    while (q.length > 0) {
      const currentQElement = q[0];
      q = q.slice(1);

      if (cb) {
        cb(currentQElement);
      }

      const adjListCurrentVertex = this.adjList.get(currentQElement);

      for (let ngb of adjListCurrentVertex) {
        if (!visited[ngb]) {
          visited[ngb] = true;
          q.push(ngb);
        }
      }
    }
  }

  specBfs(startingNode, dest) {
    const visited = {};

    let q = [];

    visited[startingNode] = true;
    q.push(startingNode);
    let conc = '';

    while (q.length > 0) {
      const currentQElement = q[0];
      q = q.slice(1);

      console.log(currentQElement);
      if (currentQElement === dest) {
        break;
      }

      const adjListCurrentVertex = this.adjList.get(currentQElement);

      for (let ngb of adjListCurrentVertex) {
        if (!visited[ngb]) {
          visited[ngb] = true;
          q.push(ngb);
        }
      }
    }
  }

  dfs(startingNode, cb) {
    const visited = {};

    return function DFSUtil(vertex, visited, cb) {
      visited[vertex] = true;

      if (cb) {
        cb(vertex);
      }

      const ngbs = this.adjList.get(vertex);

      for (let ngb of ngbs) {
        if (!visited[ngb]) {
          DFSUtil.call(this, ngb, visited, cb);
        }
      }
    }.call(this, startingNode, visited, cb);
  }

  shortestPath(from, to) {
    const visited = {};
    let q = [];
    let parentP;
    visited[from] = true;
    q.push({ node: from, length: 0 });

    let retVal;
    while (q.length > 0) {
      const currentQElement = q[0];
      q = q.slice(1);

      const adjListCurrentVertex = this.adjList.get(currentQElement.node);

      parentP = currentQElement;
      if (currentQElement.node === to) {
        retVal = currentQElement;
        break;
      }
      for (let ngb of adjListCurrentVertex) {
        if (!visited[ngb]) {
          visited[ngb] = true;
          const QItem = {
            node: ngb,
            length: currentQElement.length + 1,
            parentP: parentP,
          };
          q.push(QItem);
        }
      }
    }

    let parentStep = retVal.parentP;

    let steps = [parseCords(retVal.node)];

    while (parentStep) {
      steps.push(parseCords(parentStep.node));
      parentStep = parentStep.parentP;
    }

    steps.reverse();

    return steps;
  }
}

function stringifyCords([x, y]) {
  return `${x},${y}`;
}

function parseCords(str) {
  return str.split(',').map((val) => parseInt(val));
}

module.exports.g = Graph;
module.exports.utils = { stringifyCords, parseCords };
