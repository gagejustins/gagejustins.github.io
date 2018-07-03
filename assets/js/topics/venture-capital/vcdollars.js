var width = 850,
height = 500,
padding=10;

var dataset;

var svg = d3.select("#vcdollars_chart")
.append("svg")
.attr("width", width)
.attr("height", height + (padding*2))
.attr("class", "d-none d-md-block");

var xScale = d3.scaleBand()
.range([0,width-100])
.paddingInner(0.05);

var yScale = d3.scaleLinear()
.rangeRound([0,height-100]);

var colorScale = d3.scaleLinear()
.rangeRound([65,240])

d3.csv("/assets/data/topics/vcdollars.csv", function(data) {

	//Set domains for x and y scales
	xScale.domain(data.map(function(d) { return parseInt(d.year); }));
    yScale.domain([0, d3.max(data, function(d) { return parseFloat(d.invested); })]);
    colorScale.domain([0, d3.max(data, function(d) { return parseFloat(d.invested); })]);
    
    //Create xAxis
    var xAxis = d3.axisBottom(xScale)
    .ticks(6)
    .tickValues([1995, 2000, 2005, 2010, 2015, 2017])
    .tickSizeOuter(0);

	//Append x axis
	svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0," + height + ")")
	.call(xAxis);

	var rects = svg.selectAll("rect")
	.data(data)
	.enter()
	.append("rect")
	.attr("x", function(d, i) {
		return xScale(d.year);
	})
	.attr("y", function(d) {
		return height - (padding*1.5) - yScale(parseFloat(d.invested));
	})
	.attr("width", xScale.bandwidth())
	.attr("height", function(d) {
		return yScale(parseFloat(d.invested));
	})
	.attr("fill", function(d) {
		return "rgb(" + colorScale(parseFloat(d.invested)) + ",0,0)";
	});

	rects.on("mouseover", function(d) {

		//Adjust opacity of the bar
		d3.select(this)
		.transition()
		.duration(300)
		.style("fill", "white");

		//Get x and y position for text tooltips 
		var xPos = parseFloat(d3.select(this).attr("x")) + xScale.bandwidth() /2 - 34;
		var yPos = parseFloat(d3.select(this).attr("y")) - 76;

		//Display tooltip text
		var tooltip = d3.select("#dollars_tooltip")
		.style("left", xPos + "px")
		.style("top", yPos + "px")
		.style("display", "inline-block")
		.select("#year").text(d.year)

		d3.select("#dollars_tooltip")
		.select("#value").text(d.invested);

		//Show tooltip
		d3.select("#dollars_tooltip")
		.classed("hidden", false);

	})
	.on("mouseout", function(d) {

		//Return bar opacity to normal
		d3.select(this)
		.transition()
		.duration(300)
		.style("fill", "rgb(" + colorScale(d.invested) + ",0,0)");

		//Remove tooltip 
		d3.select("#dollars_tooltip")
		.style("display", "none")
		.classed("hidden", true);

	});

});






