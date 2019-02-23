
var formatCount = d3.format(",.0f");

var svg = d3.select("svg"),
    margin = {top: 10, right: 30, bottom: 30, left: 30},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom;

var g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//var data = d3.range(1000).map(d3.randomNormal());
var data = [.1,.5,.6,.7,.3,.9,.11,.2,.06,.7,.3,.7,.9,.5,.6,.03,.04,.3,.4,.1,.8,.9,.1,.3,.2,.5,.4,.8,.7,.9,.15,.55,.65,.75,.35,.95,.11,.25,.75,.35,.74,.94,.54,.64,.34,.44,.16,.86,.96,.16,.36,.26,.56,.46,.87,.77,.91];

var x = d3.scaleLinear().rangeRound([0, width]);
var bins = d3.histogram().domain(x.domain()).thresholds(x.ticks(20))(data);
var y = d3.scaleLinear().domain([0, d3.max(bins, function(d) { return d.length; })]).range([height, 0]);

var bar = g.selectAll(".bar")
  .data(bins)
  .enter().append("g")
    .attr("class", "bar")
    .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; });

bar.append("rect")
    .attr("x", 1)
    .attr("width", x(bins[0].x1) - x(bins[0].x0) - 1)
    .attr("height", 0)
  .transition()
    .delay(200)
    .duration(4500)    
    .attr("height", function(d) { return height - y(d.length); });

bar.append("text")
    .attr("dy", ".75em")
    .attr("y", 0)
    .attr("x", 0)
    .attr("text-anchor", "middle")
    .text(function(d) { return formatCount(d.length); })
  .transition()
    .delay(200)
    .duration(4500)
    .attr("y", 6)
    .attr("x", (x(bins[0].x1) - x(bins[0].x0)) / 2);

g.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));