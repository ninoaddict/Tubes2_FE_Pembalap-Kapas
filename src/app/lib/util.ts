export function getLegendLabels(paths: string[][]) {
  const pathsLength = paths[0].length;

  const res = [];

  for (let i = 0; i < pathsLength; i++) {
    if (i === 0 && pathsLength === 1) {
      res.push("Start / end page");
    } else if (i === 0) {
      res.push("Start page");
    } else if (i === pathsLength - 1) {
      res.push("End page");
    } else {
      const degreeOrDegrees = i === 1 ? "degree" : "degrees";
      res.push(`${i} ${degreeOrDegrees} away`);
    }
  }

  return res;
}

export function getGraphData(paths: string[][]) {
  const nodesData: { id: string }[] = [];
  const linksData = [];

  paths.forEach((path) => {
    path.forEach((node, i) => {});
  });
}
