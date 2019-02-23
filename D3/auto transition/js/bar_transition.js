var svg = d3.select("svg"),
    margin = {top: 20, right: 20, bottom: 160, left: 40},
    width = svg.attr("width") - margin.left - margin.right,
    height = svg.attr("height") - margin.top - margin.bottom;

var x = d3.scaleBand().rangeRound([0, width]).padding(0.1), // padding places break between categories
    y = d3.scaleLinear().rangeRound([height, 0]);

var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var data = [
    {park: "Blue Ridge PKWY", percent_visit: ".046"},
    {park: "Gateway NRA", percent_visit: ".026"},
    {park: "George Washington MEM PKWY", percent_visit: ".031"},
    {park: "Golden Gate NRA", percent_visit: ".047"},
    {park: "Grand Canyon NP", percent_visit: ".018"},
    {park: "Great Smoky Mountains NP", percent_visit: ".034"},
    {park: "Independence NHP", percent_visit: ".015"},
    {park: "Lake Mead NRA", percent_visit: ".022"},
    {park: "Lincoln Memorial", percent_visit: ".024"},
    {park: "Natchez Trace PKWY", percent_visit: ".018"},
    {park: "Vietnam Veterans MEM", percent_visit: ".016"}
];

data = data.sort(function (a, b) {
  return b.percent_visit - a.percent_visit;
});

x.domain(data.map(function(d) { return d.park; }));
y.domain([0, d3.max(data, function(d) { return d.percent_visit; })]);

g.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
         .attr("transform", "rotate(-65)" )
         .style("text-anchor", "end");

  g.append("g")
    .call(d3.axisLeft(y).ticks(10, "%"))
    .append("text");

  g.selectAll("bar")
    .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.park); })
      .attr("width", x.bandwidth())
      .attr("y", height)
      .attr("height", 0)
  .transition()
    .delay(200)
    .duration(4500)    
    .attr("y", function(d) { return y(d.percent_visit); })
    .attr("height", function(d) { return height - y(d.percent_visit); });
