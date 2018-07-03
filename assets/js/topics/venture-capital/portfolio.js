//Width and height
var w = 700;
var h = 500;
var padding = 40;
var yPadding = 40;

//Dataset
var dataset = [
[0,1],
[0,2],
[0,3],
[0,4],
[0,5],
[0,6],
[0,7],
[0,8],
[1,1],
[1,2],
[1,3],
[1,4],
[1,5],
[1,6],
[2,1],
[2,2],
[2,3],
[5,1],
[15,1],
[20,1]
];

//Create scales
var xScale = d3.scaleLinear()
.domain([0, d3.max(dataset, function(d){return d[0];})])
.range([padding, w - padding]);

var yScale = d3.scaleLinear()
.domain([0, d3.max(dataset, function(d){return d[1];})])
//Range is inverted because D3 Y goes downwards
.range([h - padding, padding]);

//Area scale
var aScale = d3.scalePow()
.exponent(1.1)
.domain([0, d3.max(dataset, function(d){return d[0];})])
.range([3,40]);

//Color scale
var colorScale = d3.scaleLinear()
.domain([0, d3.max(dataset, function(d) { return d[0]; })])
.rangeRound([115,255])

//Create svg
var svg = d3.select("#portfolio_chart")
.append("svg")
.attr("width", w)
.attr("height", h);

//Create clipping path
/*svg.append("clipPath")
.attr("id", "chart-area")
.append("rect")
.attr("x", padding * 2)
.attr("y", 0)
.attr("width", w - padding * 2)
.attr("height", h - padding)*/

//.attr("clip-path", "url(#chart-area)")

//Create circles
//Circles are grouped so as to work with the clipping path
svg.append("g")
.attr("id", "circles")
.selectAll("circle")
.data(dataset)
.enter()
.append("circle")
.attr("cx", function(d) {
	return xScale(d[0]);
})
.attr("cy", function(d) {
	return yScale(d[1]);
})
.attr("r", function(d) {
	return aScale(d[0]);
})
.attr("fill", function(d) {
	return "rgb(" + colorScale(d[0]) + ",0,0)";
});

//Create axes
var xAxis = d3.axisBottom(xScale)
.ticks(6)
.tickValues([0,1,2,5,15,20])
.tickFormat(function(d) { return d + "x" });
//.tickValues([0, 100, 250, 600])
//var formatAsPercentage = d3.format(".1%");
//.tickFormat(formatAsPercentage)

//Append x axis
svg.append("g")
.attr("class", "x axis")
.attr("transform", "translate(0," + (h - padding) + ")")
.call(xAxis);


