var tempsvg = d3.select("svg").attr("style", "outline: thin solid grey;"),
    margin = {top: 40, right: 10, bottom: 30, left: 10},
    width = +tempsvg.attr("width") - margin.left - margin.right,
    height = +tempsvg.attr("height") - margin.top - margin.bottom,
    outerRadius = Math.min(width, height) * 0.4 - 40,
    innerRadius = outerRadius - 30;

var svg = tempsvg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// matrix[i][j] represents the flow from the ith node in the network to the jth node, diagonal = how many of original group remain from state 1 to state 2
// Size of ribbon begin-end is (A,B):(B:A)
var matrix = [[ 95, 14, 19, 22,  9],  // accounting
              [  0, 80,  0,  0,  0],  // info systems
              [ 13, 22, 64,  4, 13],   // finance
              [  8, 17,  7,  0, 19],  // management
              [ 24, 15, 18,  3, 50]   // marketing
             ];

var groupName = ["Accounting", "Information Systems", "Finance","Management", "Marketing"]

// var formatValue = d3.formatPrefix(",.0", 1e3);

var chord = d3.chord()
    .padAngle(0.05)
    .sortSubgroups(d3.descending);

var arc = d3.arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius);

var ribbon = d3.ribbon()
    .radius(innerRadius);

var color = d3.scaleOrdinal()
    .domain(d3.range(4)) // create an array of 0 (start) to 4 (parameter) by 1 (default step)
    .range(["blanchedalmond", "orangered", "silver", "navajowhite", "azure"]);
//    .range(["olivedrab", "goldenrod", "cadetblue", "orangered", "darkorchid"]);  // https://www.w3schools.com/colors/colors_names.asp

var g = svg.append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2.2 + ")") // "centers" graph 
    .datum(chord(matrix));

var group = g.append("g")
    .attr("class", "groups")
    .selectAll("g")
    .data(function (chords) { return chords.groups; }) // chord represents the combined bidirectional flow between two nodes i and j
    .enter()
    .append("g");

group.append("path") // renders outer circle
    .style("fill", function (d) { return color(d.index); })
    .style("stroke", function (d) { return "lightgray"; })
//    .style("stroke", function (d) { return color(d.index); })
    .attr("d", arc);

group.append("text") // add group label
    .each(function (d) { d.angle = (d.startAngle + d.endAngle) / 2; })
    .attr("dx", function (d) {
    if (d.angle >= Math.PI) {return "-45px"; } else {return "45px"; }}) // space away from circle
    .attr("transform", function (d) { return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")" + "translate(" + (innerRadius + 26) + ")" + (d.angle > Math.PI ? "rotate(180)" : "");}) // where to place on arc
    .style("text-anchor", function (d) { return d.angle > Math.PI ? "end" : null; })
    .attr("class","groupLabels")
    .text(function (d) { return groupName[d.index]; });

var groupTick = group.selectAll(".group-tick")
        .data(function (d) { return groupTicks(d, 1e3); }) // returns angle for tick mark by 1000 for large numbers
        .data(function (d) { return groupTicks(d, 2e1); }) // returns angle for tick mark
        .enter().append("g")
        .attr("class", "group-tick")
        .attr("transform", function (d) { return "rotate(" + (d.angle * 180 / Math.PI - 90) + ") translate(" + outerRadius + ",0)"; });

groupTick.append("line") // ticks on outside out circle
    .attr("x2", 6);

groupTick // ticks
//    .filter(function (d) { return d.value % 5e3 === 0; }) // Show ticks in increments of 5000 for large numbers
    .filter(function (d) { return d.value >= 0; }) 
    .append("text") // text label for tick mark
    .attr("class","nodeText")
    .attr("x", 8)   // move tick mark text 8 pixels out
    .attr("dy", ".35em") // move text over slightly to "center" over tick mark
    .attr("transform", function (d) { return d.angle > Math.PI ? "rotate(180) translate(-16)" : null; })
    .style("text-anchor", function (d) { return d.angle > Math.PI ? "end" : null; })
//    .text(function (d) { return formatValue(d.value); }); // format as nk for large numbers
    .text(function (d) { return d.value; }); 

g.append("g") // arcs on inside of main circle
    .attr("class", "ribbons")
    .selectAll("path")
    .data(function (chords) { return chords; }) // chord represents the combined bidirectional flow between two nodes i and j
    .enter().append("path")
    .attr("d", ribbon)
    .style("fill", function (d) { return color(d.target.index); })
    .style("stroke", function (d) { return d3.rgb(color(d.target.index)).darker(); });

// Returns an array of tick angles and values for a given group and step
function groupTicks(d, step) {
    var k = (d.endAngle - d.startAngle) / d.value;
    return d3.range(0, d.value, step).map(function (value) {
        return {value: value, angle: value * k + d.startAngle};
    });
}

svg.append("text")
        .attr("x", 10)
        .attr("y", 5)
        .attr("class", "graphTitle")
        .text("MAJOR TRANSFERS");

svg.append("text")
        .attr("x", width - 100)
        .attr("y", height  - 10)
        .attr("class", "footnote")
        .text("data is fictitious");
