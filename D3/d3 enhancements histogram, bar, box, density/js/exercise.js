const highSalary = 60000;

var svg = d3.select("svg"), // svg element defined in html doc; could otherwise select "body" and append("svg") 
    margin = {top: 20, right: 20, bottom: 160, left: 80},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom;

var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
    y = d3.scaleLinear().rangeRound([height, 0]);

var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var data = [
    {major: "Accounting", salary: "55600"},
    {major: "Business Administration", salary: "58200"},
    {major: "Economics", salary: "58900"},
    {major: "Finance", salary: "59500"},
    {major: "International Business", salary: "46100"},
    {major: "Logistics", salary: "66300"},
    {major: "MIS", salary: "65000"},
    {major: "Marketing", salary: "57500"}
]

  x.domain(data.map(function(d) { return d.major; }));
  y.domain([0, d3.max(data, function(d) { return d.salary; })]);

  g.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
         .attr("transform", "rotate(-65)" )
         .style("text-anchor", "end");

  g.append("g")
      .call(d3.axisLeft(y).ticks(5).tickFormat(d3.format("($,.0f")))
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text("salary");

  g.selectAll("bar")
    .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.major); })
      .attr("y", function(d) { return y(d.salary); })
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return height - y(d.salary); })
      .style("fill",  function (d, i) {if (d.salary >= highSalary) { return "coral"; }});

