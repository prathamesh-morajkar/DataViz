var svg = d3.select("svg"),
    margin = {top: 20, right: 60, bottom: 50, left: 40}
    width = +svg.attr("width"),
    height = +svg.attr("height");

var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var x = d3.scaleLinear().domain([30, 110]).range([margin.left, width - margin.right]),
    y = d3.scaleLinear().domain([0, 0.1]).range([height - margin.bottom, margin.top]);

var data = [87,81,72,57,90,70,91,85,57,84,90,84,67,100,83,96,71,93,81,87,87,81,87,85,84,92,47,92,85,85,100,79,79,61,85,43,90,76,71,91,72,66,77,79,68,97,68,41,82,66,89,81,91,71,100,75,96,91,59,85,39,79]

var n = data.length,
    bins = d3.histogram().domain(x.domain()).thresholds(40)(data),
    density = kernelDensityEstimator(kernelEpanechnikov(7), x.ticks(40))(data);

g.append("g")
    .attr("transform", "translate(0," + (height - margin.bottom) + ")")
    .call(d3.axisBottom(x))
  .append("text")
    .attr("x", width - margin.right)
    .attr("y", -6)
    .attr("fill", "#000")
    .attr("text-anchor", "end")
    .attr("font-weight", "bold")
    .text("Grades");

g.append("g")
    .attr("transform", "translate(" + margin.left + ",0)")
    .call(d3.axisLeft(y).ticks(null, "%"));

g.append("g")
    .selectAll("rect")
    .data(bins)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.x0) + 1; })
      .attr("width", function(d) { return x(d.x1) - x(d.x0) - 1; })
      .attr("y", height - margin.bottom)
      .attr("height", 0)
  .transition()
    .delay(200)
    .duration(3500)
      .attr("y", function(d) { return y(d.length / n); })
      .attr("height", function(d) { return y(0) - y(d.length / n); });

g.append("path")
      .datum(density)
      .style("fill","none")
      .attr("d",  d3.line()
          .curve(d3.curveBasis)
          .x(function(d) { return x(d[0]); })
          .y(function(d) { return y(d[1]); }))
     .transition()
       .delay(3800)
       .duration(3500)
       .attr("class", "path");

function kernelDensityEstimator(kernel, X) {
  return function(V) {
    return X.map(function(x) {
      return [x, d3.mean(V, function(v) { return kernel(x - v); })];
    });
  };
}

function kernelEpanechnikov(k) {
  return function(v) {
    return Math.abs(v /= k) <= 1 ? 0.75 * (1 - v * v) / k : 0;
  };
}