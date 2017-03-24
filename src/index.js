import * as d3 from 'd3';
import 'styles';

const url = 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/meteorite-strike-data.json';

function visualize(data) {
  const margins = {
    top: 10,
    right: 10,
    bottom: 10,
    left: 10,
  };
  const canvasWidth = window.innerWidth * 0.9;
  const canvasHeight = window.innerHeight * 0.9;
  const width = canvasWidth - margins.right - margins.left;
  const height = canvasHeight - margins.top - margins.bottom;

  const map = d3.select('#map');
  const svg = map.append('svg')
    .attr('class', 'map')
    .attr('width', canvasWidth)
    .attr('height', canvasHeight);
}

d3.json(url, (err, data) => {
  if (err) throw err;
  visualize(data);
});
