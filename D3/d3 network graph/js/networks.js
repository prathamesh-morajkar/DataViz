var svg = d3.select("svg").attr("style", "outline: thin solid grey;"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

var color = d3.scaleOrdinal(d3.schemeCategory10); // https://github.com/d3/d3-scale#schemeCategory20

var simulation = d3.forceSimulation() // simulation of physics
    .force("link", d3.forceLink().distance(40).strength(.5)) // create spring link relationship between nodes with distance set between nodes 
    .force("charge", d3.forceManyBody()) // affects every node, not just link being processed
    .force("center", d3.forceCenter(width / 2, height / 2)); // "center" of the force

var graph = 
{
  "nodes": [
    {"id": "PwC", "group": 4},
    {"id": "Student 1", "group": 4},
    {"id": "Student 2", "group": 4},
    {"id": "Student 3", "group": 4},
    {"id": "Student 4", "group": 4},
    {"id": "Student 5", "group": 4},
    {"id": "Student 6", "group": 4},
    {"id": "Student 10", "group": 4},

    {"id": "Accenture", "group": 3},
    {"id": "Student 7", "group": 3},
    {"id": "Student 8", "group": 3},
    {"id": "Student 9", "group": 3}, // not linked
    {"id": "Student 11", "group": 3},

    {"id": "Deloitte", "group": 2},
    {"id": "Student 12", "group": 2},
    {"id": "Student 13", "group": 2},
    {"id": "Student 14", "group": 2},
    {"id": "Student 15", "group": 2},
    {"id": "Student 16", "group": 2},  // not linked

    {"id": "Capstone", "group": 1},
    {"id": "Hackathon", "group": 1},
    {"id": "Guest Speaker", "group": 1},
    {"id": "Competition Sponsor", "group": 1},
    {"id": "Internships", "group": 1},
    {"id": "Project", "group": 1}
  ],
  "links": [
    {"source": "Student 2", "target": "Competition Sponsor"},
    {"source": "Student 14", "target": "Competition Sponsor"},
    {"source": "Student 1", "target": "Competition Sponsor"},
    {"source": "Student 3", "target": "Competition Sponsor"},
    {"source": "Student 4", "target": "Competition Sponsor"},
    {"source": "PwC", "target": "Guest Speaker"},
    {"source": "PwC", "target": "Competition Sponsor"},
    {"source": "Student 5", "target": "Guest Speaker"},
    {"source": "Student 6", "target": "Guest Speaker"},
    {"source": "Deloitte", "target": "Project"},
    {"source": "Internships", "target": "Accenture"},
    {"source": "Deloitte", "target": "Hackathon"},
    {"source": "Student 15", "target": "Project"},
    {"source": "Student 14", "target": "Project"},
    {"source": "Internships", "target": "Student 7"},
    {"source": "Hackathon", "target": "Student 7"},
    {"source": "Internships", "target": "Student 8"},
    {"source": "Student 13", "target": "Hackathon"},
    {"source": "Student 12", "target": "Hackathon"},
    {"source": "Deloitte", "target": "Capstone"},
    {"source": "Student 10", "target": "Capstone"},
    {"source": "Student 11", "target": "Capstone"}
  ]
};

//-----------------
// Need to reformat the data for use with d3 network commands
var nodes = graph.nodes,
    nodeById = d3.map(nodes, function (d) { return d.id; }), // create data set where node referenced by name
    links = graph.links,
    bilinks = [];  // create distinct data sets

links.forEach(function (link) {
    var s = link.source = nodeById.get(link.source),
        t = link.target = nodeById.get(link.target),
        i = {}; // intermediate node
    nodes.push(i);
    links.push({source: s, target: i}, {source: i, target: t});
    bilinks.push([s, i, t]);
});
//---------------------

var link = svg.selectAll(".link")
    .data(bilinks)
    .enter().append("path")
    .attr("stroke", function (d) { return color(d.s); })
    .attr("class", "link");

var node = svg.selectAll(".node")
//    .data(nodes)
    .data(nodes.filter(function (d) { return d.id; })) // render the node of each pair once
    .enter().append("g")
    .call(d3.drag() // for interaction
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended));

node.append("circle")
      .attr("r", function (d) { if (d.id == "PwC" | d.id == "Accenture" | d.id == "Deloitte") {return 10} else {return 5} })
      .attr("class", function (d) { if (d.id == "PwC" | d.id == "Accenture" | d.id == "Deloitte") {return "centralNode"} else {return "node"} })
      .attr("fill", function (d) {if (d.group == 1) {return "black"} else {return color(d.group)} })
      .on("dblclick", dblclick);

node.append("text")
      .attr("dx", 12)
      .attr("dy", ".35em")
      .attr("class", function (d) { if (d.id == "PwC" | d.id == "Accenture" | d.id == "Deloitte") {return "centralNodeText"} else {return "nodeText"} })
      .text(function (d) { return d.id; });
    
simulation
      .nodes(nodes)
      .on("tick", ticked); // "tick" is the scheduled incremental event that captures changes as the simulation runs

simulation.force("link")
      .links(links);

svg.append("text")
        .attr("x", 10)
        .attr("y", 30)
        .attr("class", "graphTitle")
        .text("EVENT PARTICIPATION AND EMPLOYMENT");

svg.append("text")
        .attr("x", width - 80)
        .attr("y", height - 10)
        .attr("class", "footnote")
        .text("data is fictitious");

//--------------- functions
function ticked() {  // redraw "move" node and link
    link.attr("d", positionLink);
    node.attr("transform", positionNode);
}  

function positionLink(d) {
  return "M" + d[0].x + "," + d[0].y
       + "S" + d[1].x + "," + d[1].y
       + " " + d[2].x + "," + d[2].y;
}

function positionNode(d) {
  return "translate(" + d.x + "," + d.y + ")";
} 

function dragstarted(d) {
  if (!d3.event.active) simulation.alphaTarget(0.3).restart(); // restart begins the tick events
  d.fx = d.x, d.fy = d.y;
}

function dragged(d) {
  d.fx = d3.event.x, d.fy = d3.event.y;
}

function dragended(d) {
  if (!d3.event.active) simulation.alphaTarget(0);
  d.fx = null, d.fy = null;
}

function dblclick(d) {
  alert(d.id);
}
