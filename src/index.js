import * as d3 from 'd3';
import * as topojson from 'topojson';
import 'styles';

const url = 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/meteorite-strike-data.json';

function visualize(data) {
  const width = window.innerWidth * 0.95;
  const height = window.innerHeight * 0.8;

  const svg = d3.select('#map')
    .append('svg')
      .attr('class', 'map')
      .attr('width', width)
      .attr('height', height);

  const map = svg.append('g');

  // https://en.wikipedia.org/wiki/Web_Mercator
  const projection = d3.geoMercator()
    .translate([width / 2, height / 2])
    .scale(width / 2 / Math.PI); // 300

  const path = d3.geoPath()
    .projection(projection);

  d3.json('https://d3js.org/world-50m.v1.json', (err, world) => {
    if (err) throw err;
    map.selectAll('path')
      .data(topojson.feature(world, world.objects.land).features)
      .enter()
      .append('path')
        .attr('fill', 'rgba(255, 255, 255, 0.25)')
        .attr('stroke', 'rgba(255, 255, 255, 0.25)')
        .attr('strokeWidth', '0.5px')
        .style('vector-effect', 'non-scaling-stroke')
        .attr('d', path)
        .call(d3.zoom()
          .on('zoom', () => {
            map.attr('transform', d3.event.transform);
          }));
  });
}

d3.json(url, (err, data) => {
  if (err) throw err;
  visualize(data);
});
