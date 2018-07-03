var pie_data = [
  {name: 'networking', percentage: 30, color: '#a50f15'},
  {name: 'diligence', percentage: 20, color: '#fb6a4a'},
  {name: 'research', percentage: 15, color: '#fcae91'},
  {name: 'pitches', percentage: 25, color: '#de2d26'},
  {name: 'legal / operations', percentage: 20, color: '#fb6a4a'},
];

var width = 950,
height = 700,
radius = 200;

var arc = d3.arc()
.outerRadius(radius - 10)
.innerRadius(100)
.cornerRadius(5);

var pie = d3.pie()
.sort(null)
.value(function(d) {
    return d.percentage;
});

var svg = d3.select('#time_pie_chart').append("svg")
.attr("width", width)
.attr("height", height)
.append("g")
.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var g = svg.selectAll(".arc")
.data(pie(pie_data))
.enter().append("g");    

g.append("path")
.attr("d", arc)
.style("fill", function(d,i) {
	return d.data.color;
});

g.append("text")
	.attr("transform", function(d) {
    var _d = arc.centroid(d);
    _d[0] *= 1.8;	//multiply by a constant factor
    _d[1] *= 1.8;	//multiply by a constant factor
    return "translate(" + _d + ")";
  })
  .attr("dy", "-5px")
  .attr("dx", "7px")
  .style("text-anchor", "middle")
  .style("font-family", "Roboto Mono, sans-serif")
  .style("font-size", ".9em")
  .style("fill", "white")
  .text(function(d) {
    return d.data.name;
  });

g.on("mouseover", function() {

	d3.select(this)
	.selectAll("path")
	.transition()
	.style("fill", "black")
	.style("opacity", .8)

	var text = d3.select(this)
	.append("text")
	.attr("transform", function(d) {
		var _d = arc.centroid(d);
		return "translate(" + _d + ")";
	})
	.style("text-anchor", "middle")
	.style("font-family", "Roboto Mono, sans-serif")
	.style("font-size", ".9em")
	.style("fill", "white")
	.attr("class", "value-text")
	.style("pointer-events", "none")
	.text(function(d) {
		return d.data.percentage + "%";
	});
})
.on("mouseout", function() {

	d3.selectAll(".value-text")
	.remove()

	d3.select(this)
	.selectAll("path")
	.transition()
	.style("fill", function(d) {
		return d.data.color;
	})

})












