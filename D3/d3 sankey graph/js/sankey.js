var svg = d3.select("svg").attr("style", "outline: thin solid grey;"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

var formatNumber = d3.format(",.0f"),
    format = function(d) { return formatNumber(d) + " TWh"; },
    color = d3.scaleOrdinal(d3.schemeCategory10);

var school = {"nodes": [
{"name":"High School"}, // 0
{"name":"Community College"}, // 1
{"name":"Finance"}, // 2
{"name":"Accounting"}, // 3
{"name":"ITS"}, // 4    
{"name":"Marketing"}, // 5
    
{"name":"Analytics"}, // 6
{"name":"Security"}, // 7
{"name":"Consulting"}, // 8
{"name":"Banking"}, // 9
{"name":"Internal"}, // 10    
{"name":"Securities"}, // 11
{"name":"Public"}, // 12
{"name":"Audting"}, // 13    
{"name":"Internal"}, // 14
{"name":"Retail"}, // 15
{"name":"Technology"}, // 16
{"name":"Strategy"} // 17
],
"links":[
// FirstYear
    {"source":0,"target":2,"value":33},
    {"source":0,"target":3,"value":42},
    {"source":0,"target":4,"value":74},
    {"source":0,"target":5,"value":60},
// Community College
    {"source":1,"target":2,"value":7},
    {"source":1,"target":3,"value":13},
    {"source":1,"target":4,"value":11},
    {"source":1,"target":5,"value":9},
// Finance
    {"source":2,"target":9,"value":16},
    {"source":2,"target":10,"value":14},
    {"source":2,"target":11,"value":10},
// Accounting
    {"source":3,"target":12,"value":20},
    {"source":3,"target":13,"value":12},
    {"source":3,"target":7,"value":8},    
    {"source":3,"target":14,"value":15},
// Marketing
    {"source":5,"target":6,"value":30},
    {"source":5,"target":15,"value":39},
// ITS
    {"source":4,"target":6,"value":40},
    {"source":4,"target":7,"value":20},
    {"source":4,"target":12,"value":6},    
    {"source":4,"target":8,"value":19},
    // ITS Consulting
    {"source":8,"target":16,"value":10},
    {"source":8,"target":17,"value":9},

]};

var sankey = d3.sankey()
    .nodeWidth(15)
    .nodePadding(10)
    .extent([[1, 1], [width - 1, height - 6]]);

var link = svg.append("g")
    .attr("class", "links")
    .attr("fill", "none")
    .attr("stroke", "#000")
    .attr("stroke-opacity", 0.2)
  .selectAll("path");

var node = svg.append("g")
    .attr("class", "nodes")
    .attr("font-family", "sans-serif")
    .attr("font-size", 10)
  .selectAll("g");
              
sankey(school);

link = link
    .data(school.links)
    .enter().append("path")
      .attr("d", d3.sankeyLinkHorizontal())
      .attr("stroke-width", function(d) { return Math.max(1, d.width); });

// link hover values
link.append("title")
      .text(function(d) { return d.source.name + " → " + d.target.name + "\n" + format(d.value); });

node = node
    .data(school.nodes)
    .enter().append("g");

node.append("rect")
      .attr("x", function(d) { return d.x0; })
      .attr("y", function(d) { return d.y0; })
      .attr("height", function(d) { return d.y1 - d.y0; })
      .attr("width", function(d) { return d.x1 - d.x0; })
      .attr("fill", function(d) { return color(d.name.replace(/ .*/, "")); })
      .attr("stroke", "#000");

node.append("text")
      .attr("x", function(d) { return d.x0 - 6; })
      .attr("y", function(d) { return (d.y1 + d.y0) / 2; })
      .attr("dy", "0.35em")
      .attr("text-anchor", "end")
      .text(function(d) { return d.name; })
    .filter(function(d) { return d.x0 < width / 2; })
      .attr("x", function(d) { return d.x1 + 6; })
      .attr("text-anchor", "start");

svg.append("text")
        .attr("x", 10)
        .attr("y", 30)
        .attr("class", "graphTitle")
        .text("STUDENT CHOICES");

svg.append("text")
        .attr("x", width - 80)
        .attr("y", height - 10)
        .attr("class", "footnote")
        .text("data is fictitious");
