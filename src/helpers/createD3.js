import * as d3 from 'd3';
import max from 'lodash/max';
import orderBy from 'lodash/orderBy';
import voxlens from 'voxlens';

const data = orderBy(require('./data.json'), ['state'], ['asc']);

const createD3 = () => {
  const voxlensOptions = {
  x: 'state',
  y: 'cases',
  title: 'COVID-19 Cases per US State',
  chartType: 'bar',
  };
  feedbackCollector: {
    scales: 5,
    email: 'ather@cs.washington.edu'
  },
  debug: true,
  };
  
  const getDimensions = (maxXLabel) => {
    const margin = { top: 20, right: 40, bottom: maxXLabel * 5 + 10, left: 70 };

    return {
      margin,
      height: 500 - margin.top - 20,
      width: container.offsetWidth - margin.left - margin.right,
    };
  };

  const container = document.getElementById('chart');

  let maxXLabel = max(data.map((d) => d['state'].toString().length));
  let { height, margin, width } = getDimensions(maxXLabel);
  let transform = margin.left + ',' + margin.top;

  const svg = d3
    .select('#chart')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + 40 + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + transform + ')');

  const x = d3.scaleBand().range([0, width]).padding(0.1);
  const y = d3.scaleLinear().range([height, 0]);

  x.domain(data.map((d) => d['state']));
  y.domain([0, d3.max(data, (d) => parseFloat(d['cases']))]);

  svg
    .selectAll('.bar')
    .data(data)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .style('fill', '#4682b4')
    .style('margin', '10px')
    .attr('x', (d) => x(d['state']))
    .attr('width', x.bandwidth())
    .attr('y', (d) => y(d['cases']))
    .attr('height', (d) => height - y(d['cases']))
    .call((d) => voxlens('d3', d, data, voxlensOptions));

  svg
    .append('text')
    .attr(
      'transform',
      'translate(' + width / 2 + ' ,' + (height + margin.bottom + 20) + ')',
    )
    .style('text-anchor', 'middle')
    .text('State');

  svg
    .append('text')
    .attr('transform', 'rotate(-90)')
    .attr('y', 0 - margin.left)
    .attr('x', 0 - height / 2)
    .attr('dy', '1em')
    .style('text-anchor', 'middle')
    .text('Cases');

  svg
    .append('g')
    .attr('transform', 'translate(0, ' + height + ')')
    .attr('class', 'bar-axis')
    .call(d3.axisBottom(x).ticks(data.length))
    .selectAll('text')
    .attr('y', 0)
    .attr('x', 9)
    .attr('dy', '.35em')
    .attr('transform', 'rotate(90)')
    .style('text-anchor', 'start')
    .style('opacity', 1);

  svg.append('g').attr('class', 'bar-axis').call(d3.axisLeft(y));
};

export default createD3;