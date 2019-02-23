var margin = {top: 20, right: 20, bottom: 20, left: 30};

var width = 800 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

var chartToggle = 0;

var svg = d3.select("body")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var xScale = d3.scaleLinear()
        .domain([300, 800]) // changed low value from 0 to 300
        .range([0, width]),
    yScale = d3.scaleLinear()
        .domain([0, 100])
        .range([height, 0]);

var color = d3.scaleOrdinal(d3.schemeCategory10).domain(["High", "Average", "Low", "None"]);

var data = [{ "ID": "1",  "GMAT": 730, "GPA": 3.9, "Extracurriculars": "High",   "Acceptance": 92},
         { "ID": "2",  "GMAT": 600, "GPA": 3.3, "Extracurriculars": "Medium", "Acceptance": 71},
         { "ID": "3",  "GMAT": 620, "GPA": 3.2, "Extracurriculars": "Low",    "Acceptance": 53},
         { "ID": "4",  "GMAT": 590, "GPA": 2.8, "Extracurriculars": "Low",    "Acceptance": 12},
         { "ID": "5",  "GMAT": 650, "GPA": 3.1, "Extracurriculars": "Low",    "Acceptance": 55},
         { "ID": "6",  "GMAT": 630, "GPA": 3.4, "Extracurriculars": "Medium", "Acceptance": 75},
         { "ID": "7",  "GMAT": 490, "GPA": 3.2, "Extracurriculars": "High",   "Acceptance": 65},
         { "ID": "8",  "GMAT": 630, "GPA": 3.3, "Extracurriculars": "Medium", "Acceptance": 73},
         { "ID": "9",  "GMAT": 610, "GPA": 3.2, "Extracurriculars": "Medium", "Acceptance": 68},
         { "ID": "10", "GMAT": 625, "GPA": 3.2, "Extracurriculars": "Low",    "Acceptance": 60},
         { "ID": "11", "GMAT": 605, "GPA": 3.6, "Extracurriculars": "None",   "Acceptance": 47},
         { "ID": "12", "GMAT": 675, "GPA": 3.8, "Extracurriculars": "High",   "Acceptance": 87},
         { "ID": "13", "GMAT": 550, "GPA": 2.6, "Extracurriculars": "Low",    "Acceptance": 17},
         { "ID": "14", "GMAT": 420, "GPA": 2.1, "Extracurriculars": "Medium", "Acceptance": 27},
         { "ID": "15", "GMAT": 490, "GPA": 3.2, "Extracurriculars": "None",   "Acceptance": 7}
         ];
        
var rScale = d3.scaleLinear()
                     .domain([d3.min(data, function (d) { return d.GPA; }), d3.max(data, function (d) { return d.GPA; })])
                     .range([3, 14]);

svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
            .attr("cx", function (d) { return xScale(d.GMAT); })
            .attr("cy", function (d) { return yScale(d.Acceptance); })
            .attr("fill", function (d) { return color(d.Extracurriculars); })
            .attr("r", function (d) { return rScale(d.GPA); });

svg.append("g")
 .attr("transform", "translate(0," + height + ")") 
 .attr("class", "axis")
 .call(d3.axisBottom().scale(xScale));

svg.append("g")
 .attr("class", "axis")
 .call(d3.axisLeft().scale(yScale));

d3.select("#swapButton")
    .on("click", function () {
        if (chartToggle == 1) {
            chartToggle = 0;
            d3.select(this).attr("value", "Add Training");
            svg.selectAll("circle")
                .transition()
                .duration(2000)
                .attr("cx", function (d) { return xScale(d.GMAT); })
                .attr("cy", function (d) { return yScale(d.Acceptance); });
        } else {
            chartToggle = 1;
            d3.select(this).attr("value", "Remove Training");
            svg.selectAll("circle")
                .transition()
                .duration(2000)
                .attr("cx", function (d) { 
                    if (d.GMAT < 600) { return xScale(d.GMAT + 100)} 
                    else { return xScale(d.GMAT)}; 
                })
                .attr("cy", function (d) { 
                    if (d.Acceptance < 50) { return yScale(d.Acceptance + 30)} 
                    else { return yScale(d.Acceptance + 10)}; 
                })
        };
    });