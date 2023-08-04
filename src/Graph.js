import React, { useEffect } from 'react';
import createD3 from './helpers/createD3';

import './Graph.css';

const createChart = () => {
  const chartContainer = document.getElementById('chart');

  if (chartContainer) {
    chartContainer.innerHTML = '';

    createD3();
  } else {
    this.createChart();
  }
};

const Graph = () => {
  useEffect(() => createChart());

  return (
    <div id="graph">
      <h1>COVID-19 Cases per US State</h1>
      <div id="chart" />
    </div>
  );
};

export default Graph;
