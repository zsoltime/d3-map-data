import {
  event,
  geoMercator,
  geoPath,
  json,
  max,
  mouse,
  scaleSqrt,
  select,
  timeFormat,
  zoom
} from 'd3';
import { feature as topojsonFeature } from 'topojson';
import 'styles';

const url = 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/meteorite-strike-data.json';
const mapUrl = 'https://d3js.org/world-50m.v1.json';

const displayMass = (mass) => {
  if (!mass) {
    return 'N/A';
  } else if (mass > 1e6) {
    return `${mass / 1e6}t`;
  } else if (mass > 1e3) {
    return `${mass / 1e3}kg`;
  }
  return `${mass}g`;
};

const formatDate = (date) => {
  if (!date) {
    return 'N/A';
  }
  return timeFormat('%Y')(new Date(date));
};

function visualize(data) {
  const width = window.innerWidth;
  const height = window.innerHeight * 0.8;
  const white = 'rgba(255, 255, 255, 0.25)';
  const red = '#f44336';

  const svg = select('#map')
    .append('svg')
      .attr('class', 'map')
      .attr('width', width)
      .attr('height', height);

  const map = svg.append('g');
  const tooltip = select('#map')
    .append('dl')
      .attr('class', 'tooltip');

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
        .data(data.features.sort((a, b) => b.properties.mass - a.properties.mass))
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
          .attr('stroke', red)
          .attr('strokeWidth', '0.5px')
          .style('vector-effect', 'non-scaling-stroke')
          .on('mouseover', (d) => {
            const { mass, name, year } = d.properties;
            const [lat, lon] = d.geometry.coordinates;
            const tooltipX = `calc(${mouse(document.body)[0]}px - 50%)`;
            const tooltipY = mouse(document.body)[1] / window.innerHeight > 0.7 ?
              `calc(${mouse(document.body)[1]}px - 225%)` :
              `calc(${mouse(document.body)[1]}px - 75%)`;
            const content = `
              <dt>Name</dt>
              <dd>${name}</dd>
              <dt>Mass</dt>
              <dd>${displayMass(mass)}</dd>
              <dt>Year</dt>
              <dd>${formatDate(year)}</dd>
              <dt>Coordinates</dt>
              <dd>${lat.toFixed(2)}, ${lon.toFixed(2)}</dd>
            `;
            tooltip.html(content)
              .style('transform', `translate(${tooltipX}, ${tooltipY})`);
            tooltip.transition()
              .duration(200)
              .style('opacity', 1);
          })
          .on('mouseout', () => {
            tooltip.transition()
              .duration(100)
              .style('opacity', 0);
          });
  });
}

json(url, (err, data) => {
  if (err) throw err;
  visualize(data);
});
