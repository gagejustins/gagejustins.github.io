link = "http://sneaker-track.com:8000/pairs_per_brand"

var col_width = parseInt(d3.select("#pairs-owned").style("width"));

var pairs_per_brand_width = col_width,
pairs_per_brand_height = 300,
pairs_per_brand_padding_x = 25,
pairs_per_brand_padding_y = 25,
pairs_per_brand_offset_x = 85,
pairs_per_brand_offset_y = 50,
pairs_per_brand_height_level = 5;

var pairs_per_brand_svg = d3.select("#pairs-per-brand")
.append("svg")
.attr("width", pairs_per_brand_width)
.attr("height", pairs_per_brand_height);

var pairs_per_brand_xScale = d3.scaleLinear()
.range([pairs_per_brand_width - pairs_per_brand_padding_x, pairs_per_brand_padding_x])

var pairs_per_brand_yScale = d3.scaleBand()
.rangeRound([pairs_per_brand_padding_y + 25, pairs_per_brand_height - pairs_per_brand_padding_y])
.paddingInner(0.05);

function generate_pairs_per_brand_graph(data, svg, width, height, padding_x, padding_y, xScale, yScale, offset_x, offset_y, height_level) {

	data.forEach(function(d) {
		d.num_owned = parseInt(d.num_owned)
	})

	//Set domains for X and Y scales
	xScale.domain([d3.max(data, function(d) { return d.num_owned }), 0]);
	yScale.domain(d3.range(data.length));

	//Define rects
	var rects = svg.selectAll("rect")
	.data(data)
	.enter()
	.append("rect")
	.attr("x", 50)
	.attr("y", function(d,i) {
		return yScale(i)
	})
	.attr("width", function(d) {
		return xScale(d.num_owned);
	})
	.attr("height", function(d) {
		return yScale.bandwidth()
	})
	.attr("fill", "red")
	.attr("transform", "translate(" + offset_x + ",0)");

	//Rects text
	var text = svg.selectAll("text")
	.data(data)
	.enter()
	.append("text")
	.text(function(d) {
		return d.brand;
	})
	.attr("x", 0)
	.attr("y", function(d,i) {
		return yScale(i) + yScale.bandwidth() / 2 + height_level
	})
	.attr("class", "legend-text");

	var rects_value_text = svg.selectAll("value_text")
	.data(data)
	.enter()
	.append("text")
	.text(function(d) {
		return d.num_owned
	})
	.attr("x", offset_x + 60)
	.attr("y", function(d,i) {
		return yScale(i) + yScale.bandwidth() / 2 + height_level
	})
	.attr("text-anchor", "left")
	.attr("font-weight", "bold")
	.attr("class", "value_text")
	.style("pointer-events", "none")
	.style("display", "none");

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

	});

}

d3.csv(link, function(data) {

	generate_pairs_per_brand_graph(data,
		pairs_per_brand_svg,
		pairs_per_brand_width,
		pairs_per_brand_height,
		pairs_per_brand_padding_x,
		pairs_per_brand_padding_y,
		pairs_per_brand_xScale,
		pairs_per_brand_yScale,
		pairs_per_brand_offset_x,
		pairs_per_brand_offset_y,
		pairs_per_brand_height_level);

})




















