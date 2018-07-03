var width = 650,
height = 300;

var dataset = [
  {name: 'events', value: 45, color: '#a50f15'},
  {name: 'outreach', value: 20, color: '#fb6a4a'},
  {name: 'hybrid', value: 30, color: '#de2d26'},
  {name: 'random shouting', value: 80, color: '#3f0000'}
];

var svg = d3.select("#networking_bar_chart")
.append("svg")
.attr("width", width)
.attr("height", height)
.attr("class", "d-none d-md-block");

var xScale = d3.scaleBand()
.domain(d3.range(dataset.length))
.rangeRound([0,width])
.paddingInner(0.05);

var yScale = d3.scaleLinear()
.domain([0, d3.max(dataset, function(d) { return d.value })])
.rangeRound([0,height-50]);

var rects = svg.selectAll("rect")
.data(dataset)
.enter()
.append("rect")
.attr("x", function(d, i) {
	return xScale(i)
})
.attr("y", function(d) {
	return height-yScale(d.value)
})
.attr("width", xScale.bandwidth())
.attr("height", function(d) {
	return yScale(d.value)
})
.attr("fill", function(d) {
	return d.color;
})

var text = svg.selectAll("text")
.data(dataset)
.enter()
.append("text")
.text(function(d) {
	return d.name;
})
.attr("x", function(d, i) {
	return xScale(i) + xScale.bandwidth() / 2;
})
.attr("y", function(d) {
	return height - yScale(d.value) - 25;
})
.attr("font-family", "Roboto Mono, sans-serif")
.attr("font-size", ".8em")
.attr("fill", "black")
.attr("text-anchor", "middle")

var value_text = svg.selectAll("value_text")
.data(dataset)
.enter()
.append("text")
.text(function(d) {
	if (d.name == "random shouting") {
		return "likely never";
	} else {
		return d.value + " minutes";
	}
})
.attr("x", function(d, i) {
	return xScale(i) + xScale.bandwidth() / 2;
})
.attr("y", function(d) {
	return height - 20;
})
.attr("font-family", "Roboto Mono, sans-serif")
.attr("font-size", ".8em")
.attr("fill", "white")
.attr("text-anchor", "middle")
.attr("class", "value_text")
.style("pointer-events", "none")
.style("display", "none")

rects.on("mouseover", function() {

	d3.select(this)
	.transition()
	.duration(200)
	.style("opacity", .5);

	d3.selectAll(".value_text")
	.style("display", "inline");

})
.on("mouseout", function() {

	d3.select(this)
	.transition()
	.duration(200)
	.style("opacity", 1);

	d3.selectAll(".value_text")
	.style("display", "none");

})







