var chukka = d3.select("#chukka");

var sneakers = d3.selectAll(".sneakers").selectAll("img");

sneakers.on("mouseover", function() {
	d3.select(this)
	.classed("highlighted", true);
})
.on("mouseout", function() {
	d3.select(this)
	.classed("highlighted", false);
});

var guitars = d3.selectAll(".guitars").selectAll("img");

guitars.on("mouseover", function() {
	d3.select(this)
	.classed("highlighted", true);
})
.on("mouseout", function() {
	d3.select(this)
	.classed("highlighted", false);
});