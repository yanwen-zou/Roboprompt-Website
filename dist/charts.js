(() => {
  const dataset = window.RoboPromptChartData;
  const namespace = 'http://www.w3.org/2000/svg';
  const series = [
    {key: 'success', name: 'Success rate (%)', domain: dataset.successDomain, ticks: [0, 20, 40, 60, 80, 100], format: value => `${value.toFixed(1)}%`},
    {key: 'steering', name: 'Steering counts', domain: dataset.steeringDomain, ticks: [0, 1, 2, 3, 4, 5], format: value => value.toFixed(2)}
  ];

  function html(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function svgNode(tag, attributes = {}, text) {
    const node = document.createElementNS(namespace, tag);
    Object.entries(attributes).forEach(([key, value]) => node.setAttribute(key, value));
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function renderPlot(svg, panel, width) {
    if (width <= 0) return;
    const height = 286;
    const plot = {left: 32, right: width - 32, top: 30, bottom: 232};
    const x = index => plot.left + 18 + index * (plot.right - plot.left - 36) / (panel.rounds.length - 1);
    const y = (value, domain) => plot.bottom - (value - domain[0]) / (domain[1] - domain[0]) * (plot.bottom - plot.top);
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    svg.replaceChildren();
    svg.append(svgNode('title', {}, `${panel.title}: success rate and steering counts by DAgger round`));
    svg.append(svgNode('desc', {}, 'Success rate uses the left axis; steering counts use the right axis. Error bars retain the extents in the original paper figure.'));

    series[0].ticks.forEach(tick => {
      const position = y(tick, dataset.successDomain);
      svg.append(svgNode('line', {x1: plot.left, y1: position, x2: plot.right, y2: position, class: 'chart-gridline'}));
      svg.append(svgNode('text', {x: plot.left - 8, y: position + 4, 'text-anchor': 'end', class: 'chart-tick'}, tick));
    });
    series[1].ticks.forEach(tick => {
      svg.append(svgNode('text', {x: plot.right + 8, y: y(tick, dataset.steeringDomain) + 4, class: 'chart-tick'}, tick));
    });
    svg.append(svgNode('path', {d: `M${plot.left} ${plot.top}V${plot.bottom}H${plot.right}V${plot.top}`, class: 'chart-axis'}));
    panel.rounds.forEach((round, index) => {
      svg.append(svgNode('text', {x: x(index), y: 255, 'text-anchor': 'middle', class: 'chart-tick'}, round));
    });
    svg.append(svgNode('text', {x: width / 2, y: 281, 'text-anchor': 'middle', class: 'chart-axis-title'}, 'DAgger round'));

    series.forEach(config => {
      const values = panel[config.key];
      const group = svgNode('g', {class: `chart-series chart-${config.key}`});
      values.forEach((entry, index) => {
        if (!entry) return; // No steering statistic was reported for "No Steer".
        const px = x(index);
        const py = y(entry.value, config.domain);
        const upper = y(entry.high, config.domain);
        const lower = y(entry.low, config.domain);
        if (index > 0 && values[index - 1]) {
          const attributes = {x1: x(index - 1), y1: y(values[index - 1].value, config.domain), x2: px, y2: py, class: 'chart-line'};
          if (panel.rounds[index - 1] === 'No Steer') attributes['stroke-dasharray'] = '7 5';
          group.append(svgNode('line', attributes));
        }
        group.append(svgNode('path', {d: `M${px} ${upper}V${lower}M${px - 4} ${upper}H${px + 4}M${px - 4} ${lower}H${px + 4}`, class: 'chart-error', 'data-low': entry.low, 'data-high': entry.high}));
        const point = svgNode('circle', {cx: px, cy: py, r: 4.5, class: 'chart-point', 'data-value': entry.value});
        point.append(svgNode('title', {}, `${panel.title}, ${panel.rounds[index] === 'No Steer' ? 'No Steer' : `round ${panel.rounds[index]}`}: ${config.name} ${config.format(entry.value)}`));
        group.append(point);
        // Put low-count labels above the whisker so they do not collide with x ticks.
        const labelY = config.key === 'success' || lower > plot.bottom - 30 ? Math.max(14, upper - 10) : lower + 18;
        group.append(svgNode('text', {x: px, y: labelY, 'text-anchor': 'middle', class: 'chart-value'}, config.format(entry.value)));
      });
      svg.append(group);
    });
  }

  function dataTable(panel) {
    const table = html('table');
    table.append(html('caption', '', `${panel.title}: reported means`));
    const head = html('thead');
    const row = html('tr');
    ['DAgger round', ...series.map(item => item.name)].forEach(label => {
      const cell = html('th', '', label);
      cell.scope = 'col';
      row.append(cell);
    });
    head.append(row);
    table.append(head);
    const body = html('tbody');
    panel.rounds.forEach((round, index) => {
      const row = html('tr');
      const header = html('th', '', round);
      header.scope = 'row';
      row.append(header);
      series.forEach(config => row.append(html('td', '', panel[config.key][index] ? config.format(panel[config.key][index].value) : 'Not reported')));
      body.append(row);
    });
    table.append(body);
    return table;
  }

  document.querySelectorAll('[data-chart-set]').forEach(container => {
    const row = html('div', 'charts-row');
    dataset.sets[container.dataset.chartSet].panels.forEach(panel => {
      const article = html('div', 'chart-panel');
      const title = html('h4', 'chart-title', panel.title);
      if (panel.title.startsWith('\u03c0')) title.replaceChildren(document.createTextNode('\u03c0'), html('sub', '', '0.5'));
      article.append(title);
      const scales = html('div', 'chart-scales');
      series.forEach(config => scales.append(html('span', `chart-${config.key}`, config.name)));
      article.append(scales);
      const svg = svgNode('svg', {class: 'experiment-chart', role: 'img', 'aria-label': `${panel.title}: success rate and steering counts`});
      const accessibleData = html('div', 'chart-data-table');
      accessibleData.append(dataTable(panel));
      article.append(svg, accessibleData);
      row.append(article);
      const observer = new ResizeObserver(([entry]) => renderPlot(svg, panel, entry.contentRect.width));
      observer.observe(article);
    });
    const legend = html('div', 'chart-legend');
    legend.setAttribute('aria-hidden', 'true');
    series.forEach(config => {
      const item = html('span', 'chart-legend-item');
      item.append(html('i', `chart-swatch chart-${config.key}`), html('span', '', config.name));
      legend.append(item);
    });
    container.append(row, legend);
  });
})();
