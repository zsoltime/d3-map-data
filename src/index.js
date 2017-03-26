import { select, zoom, event, geoMercator, geoPath, json, scaleSqrt, max } from 'd3';
import { feature as topojsonFeature } from 'topojson';
import 'styles';

const url = 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/meteorite-strike-data.json';
const mapUrl = 'https://d3js.org/world-50m.v1.json';

function visualize(data) {
  const width = window.innerWidth;
  const height = window.innerHeight * 0.8;
  const white = 'rgba(255, 255, 255, 0.25)';
  const purple = '#ce93d8';

  const svg = select('#map')
    .append('svg')
      .attr('class', 'map')
      .attr('width', width)
      .attr('height', height);

  const map = svg.append('g');

  svg.call(zoom()
    .on('zoom', () => {
      map.attr('transform', event.transform);
    }));

  // https://en.wikipedia.org/wiki/Web_Mercator
  const projection = geoMercator()
    .translate([width / 2, height])
    .scale(width / 3);

  const path = geoPath()
    .projection(projection);

  json(mapUrl, (err, world) => {
    if (err) throw err;
    map.selectAll('path')
      .data(topojsonFeature(world, world.objects.countries).features)
      .enter()
      .append('path')
        .attr('fill', white)
        .attr('stroke', white)
        .attr('strokeWidth', '0.5px')
        .style('vector-effect', 'non-scaling-stroke')
        .attr('d', path);

    const meteoriteSize = scaleSqrt()
      .range([1, 75])
      .domain([0, max(data.features.map((d) => {
        const { mass } = d.properties;
        return mass ? mass * 1 : 0;
      }))]);

    const meteorites = map.append('g')
      .selectAll('circle')
        .data(data.features)
        .enter()
        .append('circle')
          .attr('class', 'meteor')
          .attr('cx', d => projection([
            d.properties.reclong,
            d.properties.reclat,
          ])[0])
          .attr('cy', d => projection([
            d.properties.reclong,
            d.properties.reclat,
          ])[1])
          .attr('r', d => meteoriteSize(d.properties.mass))
          .attr('fill', white)
          .attr('stroke', purple)
          .attr('strokeWidth', '0.5px')
          .style('vector-effect', 'non-scaling-stroke');
  });
}

json(url, (err, data) => {
  if (err) throw err;
  visualize(data);
});
