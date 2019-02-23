var svg = d3.select("svg").attr("style", "outline: thin solid grey;"),
    margin = {top: 50, right: 60, bottom: 60, left: 50},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom;
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var dataIS = [
        {"date": "1-Jun-17", "salary": 52000, "bonus": 8000},
        {"date": "1-Oct-17", "salary": 55000, "bonus": 6000},
        {"date": "2-Jan-18", "salary": 63000, "bonus": 7000},
        {"date": "1-Apr-18", "salary": 59000, "bonus": 6000},
        {"date": "1-Jul-18", "salary": 65000, "bonus": 5000},
        {"date": "1-Oct-18", "salary": 68000, "bonus": 6000},
        {"date": "1-Jan-19", "salary": 71100, "bonus": 8000},
        {"date": "1-Apr-19", "salary": 68000, "bonus": 7000},
        {"date": "1-Jul-19", "salary": 65000, "bonus": 6000},
        {"date": "1-Oct-19", "salary": 73000, "bonus": 8000},
        {"date": "1-Jan-20", "salary": 75000, "bonus": 9000},
        {"date": "1-Apr-20", "salary": 76200, "bonus": 10000},
        {"date": "1-Jul-20", "salary": 77000, "bonus": 11000},
        {"date": "1-Oct-20", "salary": 77000, "bonus": 12000},
        {"date": "3-Jan-21", "salary": 77000, "bonus": 9000},
        {"date": "1-Apr-21", "salary": 78000, "bonus": 11000},
        {"date": "1-Jul-21", "salary": 81000, "bonus": 13000},
        {"date": "3-Oct-21", "salary": 80000, "bonus": 12000},
        {"date": "3-Jan-22", "salary": 82000, "bonus": 15000},
        {"date": "2-Apr-22", "salary": 79000, "bonus": 14000}
    ];

var dataACCT = [
        {"date": "1-Jun-17", "salary": 48000, "bonus": 4000},
        {"date": "2-Jan-18", "salary": 51000, "bonus": 5000},
        {"date": "1-Jul-18", "salary": 49000, "bonus": 5000},
        {"date": "1-Jan-19", "salary": 59000, "bonus": 6000},
        {"date": "1-Jul-19", "salary": 55000, "bonus": 4000},
        {"date": "1-Jan-20", "salary": 52000, "bonus": 5000},
        {"date": "1-Jul-20", "salary": 55000, "bonus": 3000},
        {"date": "3-Jan-21", "salary": 57000, "bonus": 3000},
        {"date": "1-Jul-21", "salary": 55000, "bonus": 4000},
        {"date": "3-Jan-22", "salary": 52000, "bonus": 5000}
    ];

var parseTime = d3.timeParse("%d-%b-%y");
// %d - zero-padded day of the month as a decimal number [01,31]
// %b - abbreviated month name
// %y - year without century as a decimal number [00,99]

var x = d3.scaleTime()
    .range([0, width])
//  .domain([new Date(2017, 0, 1), new Date(2022, 0, 1)]) // hard code x axis ranges
    .domain(d3.extent(dataIS, function (d) { return parseTime(d.date); })); // returns min and max

var y = d3.scaleLinear()
    .range([height, 0])
    .domain([0, d3.max(dataIS, function (d) { return d.salary + d.bonus; })]);
// Using same x and y scale function for all lines


//-----------------------------------------------------------------
var line = d3.line()
    .x(function (d) { return x(parseTime(d.date)); })
    .y(function (d) { return y(d.salary + d.bonus); });

var line2 = d3.line()
    .x(function (d) { return x(parseTime(d.date)); })
    .y(function (d) { return y(d.salary); });

//-----------------------------------------------------------------

g.append("path")
      .datum(dataIS)
      .attr("d", line)
      .attr("class", "path");

g.append("text")
        .attr("class", "pathtext")
		.attr("transform", "translate(" + (width + 50) + "," + y(dataIS[dataIS.length-1].salary + dataIS[dataIS.length-1].bonus) + ")")
		.attr("dy", "8px") // offset 4 pixels from line
		.attr("text-anchor", "end") // to right justify, "start" to left jusitfy and "middle" to center
		.style("fill", "white")
		.text("IS Salary + Bonus")
   .transition()
        .delay(6000)
		.style("fill", "darkred");

//-----------------------------------------------------------------
g.append("path")
      .datum(dataIS)
      .attr("d", line2)
      .attr("class", "path2");

g.append("text")
        .attr("class", "pathtext")
		.attr("transform", "translate(" + (width + 50) + "," + y(dataIS[dataIS.length-1].salary) + ")")
		.attr("dy", "8px") // offset 4 pixels from line
		.attr("text-anchor", "end") // to right justify, "start" to left jusitfy and "middle" to center
		.style("fill", "white")
		.text("IS Salary")
   .transition()
        .delay(6000)
		.style("fill", "firebrick");

//-----------------------------------------------------------------
g.append("path")
      .datum(dataACCT)
      .attr("d", line)
      .attr("class", "path3");

g.append("text")
        .attr("class", "pathtext")
		.attr("transform", "translate(" + (width + 50) + "," + y(dataACCT[dataACCT.length-1].salary + dataACCT[dataACCT.length-1].bonus) + ")")
		.attr("dy", "8px") // offset 4 pixels from line
		.attr("text-anchor", "end") // to right justify, "start" to left jusitfy and "middle" to center
		.style("fill", "white")
		.text("Accounting Salary + Bonus")
   .transition()
        .delay(6000)
		.style("fill", "teal");


//-----------------------------------------------------------------
g.append("path")
      .datum(dataACCT)
      .attr("d", line2)
      .attr("class", "path4");

g.append("text")
        .attr("class", "pathtext")
		.attr("transform", "translate(" + (width + 50) + "," + y(dataACCT[dataACCT.length-1].salary) + ")")
		.attr("dy", "8px") // offset 4 pixels from line
		.attr("text-anchor", "end") // to right justify, "start" to left jusitfy and "middle" to center
		.style("fill", "white")
		.text("Accounting Salary")
   .transition()
        .delay(6000)
		.style("fill", "lightseagreen");

//-----------------------------------------------------------------
g.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
//    .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%Y-%m-%d")))
//    .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%A %d %B %Y")))
      .selectAll("text") 
        .style("text-anchor", "start")
        .attr("transform", "rotate(30)")
      .attr("class", "axis");

g.append("g")
      .call(d3.axisLeft(y)
           .tickFormat(d3.format("$.0s"))
           .tickValues([30000, 60000, 90000, 120000]))
      .attr("class", "axis")
    .append("text")
      .attr("fill", "#000")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.7em")
      .attr("text-anchor", "end")
      .text("Compensation");

svg.append("text")
        .attr("x", 10)
        .attr("y", 30)
        .attr("class", "graphTitle")
        .text("COMPENSATION BY MAJOR");

svg.append("text")
        .attr("x", width)
        .attr("y", height + margin.top + margin.bottom - 10)
        .attr("class", "footnote")
        .text("data is fictitious");

//----------------------------------------------------------------
// "Hide" lines behind white rectangle then transition it to no width
svg.append("rect")
    .attr("x", -1 * (width + 52))
    .attr("y", -1 * height - 48)
    .attr("height", height)
    .attr("width", width)
    .attr("transform", "rotate(180)")
    .style("fill", "#ffffff")
.transition()
    .duration(6000)
    .attr("width", 0);

