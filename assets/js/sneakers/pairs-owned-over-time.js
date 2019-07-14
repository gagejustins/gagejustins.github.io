link = "http://167.99.20.216:8000/pairs_owned_over_time"

function responsivefy(svg) {
    // get container + svg aspect ratio
    var container = d3.select(svg.node().parentNode),
        width = parseInt(svg.style("width")),
        height = parseInt(svg.style("height")),
        aspect = width / height;

    // add viewBox and preserveAspectRatio properties,
    // and call resize so that svg resizes on inital page load
    svg.attr("viewBox", "0 0 " + width + " " + height)
        .attr("preserveAspectRatio", "xMinYMid")
        .call(resize);

    // to register multiple listeners for same event type, 
    // you need to add namespace, i.e., 'click.foo'
    // necessary if you call invoke this function for multiple svgs
    // api docs: https://github.com/mbostock/d3/wiki/Selections#on
    d3.select(window).on("resize." + container.attr("id"), resize);

    // get width of container and resize svg to fit it
    function resize() {
        var targetWidth = parseInt(container.style("width"));
        svg.attr("width", targetWidth);
        //svg.attr("height", Math.round(targetWidth / aspect));
    }
}

var col_width = parseInt(d3.select("#pairs-owned").style("width")) - 40;

var width = col_width,
height = 300,
padding_x = 25,
padding_y = 50;

var dataset;

var svg = d3.select("#pairs-owned")
.append("svg")
.attr("width", width)
.attr("height", height)
.call(responsivefy);

var xScale = d3.scaleTime()
.range([padding_x, width - padding_x])

var yScale = d3.scaleLinear()
.range([height - padding_y, padding_y])

var parseDate = d3.timeParse("%Y-%m-%d");
var formatMonth = d3.timeFormat("%b");
var formatYear = d3.timeFormat("%y");
var bisectDate = d3.bisector(function(d) { return d.date; }).left;

d3.csv(link, function(data) {
	
	data.forEach(function(d) {
		d.date = parseDate(moment.utc(d.date).format("YYYY-MM-DD"));
		d.num_owned = parseInt(d.num_owned)
	})

	//Set domains for X and Y scales
	xScale.domain(d3.extent(data, function(d) { return d.date }));
	yScale.domain([0, d3.max(data, function(d) { return d.num_owned })]);

	//Create X axis
	var xAxis = d3.axisBottom(xScale)
	.ticks(d3.timeMonth.every(4))
	.tickSizeOuter(0);

	//Append x axis
	svg.append("g")
	.attr("class", "axis")
	.attr("transform", "translate(0," + (height - padding_y) + ")")
	.call(xAxis);

	//Define line
	var line = d3.line()
	.curve(d3.curveCardinal)
	.x(function(d) { return xScale(d.date); })
	.y(function(d) { return yScale(d.num_owned); });

	//Add line path
	var path = svg.append("path")
	.datum(data)
	.attr("class", "line")
	.attr("d", line)
	.style("stroke", "red")
	.on("mouseover", function(d) {
		d3.select(this)
		.style("stroke", "#ff9999")
	})
	.on("mouseout", function(d) {
		d3.select(this)
		.style("stroke", "red")
	});

	//Group for tooltip
	var focus = svg.append("g")
	.attr("class", "focus")
	.style("display", "none");

	focus.append("circle")
	.attr("r", 6.5)
	.attr("fill", "red");

	var tooltip_rect_height = 40,
	tooltip_rect_width = 130;

	var filter = focus.append("filter")
	.attr("id", "drop-shadow")

	filter.append("feDropShadow")
	.attr("dx", 1)
	.attr("dy", 1)
	.attr("stdDeviation", 3)
	.attr("flood-color", "#C8C8C8")

	//Main tooltip rect
	focus.append("rect")
	.attr("width", tooltip_rect_width)
	.attr("height", tooltip_rect_height)
	.attr("y", -tooltip_rect_height/2)
	.attr("x", -tooltip_rect_width/2)
	.attr("rx", 3)
	.attr("class", "tooltip-rect")
	.attr("filter", "url(#drop-shadow)")

	//Function for creating rect with rounded edges on only one side
	function leftRoundedRect(x, y, width, height, radius) {
	  return "M" + (x + radius) + "," + y
	       + "h" + (width - radius)
	       + "v" + height
	       + "h" + (radius - width)
	       + "a" + radius + "," + radius + " 0 0 1 " + (-radius) + "," + (-radius)
	       + "v" + (2 * radius - height)
	       + "a" + radius + "," + radius + " 0 0 1 " + radius + "," + (-radius)
	       + "z";
	}

	//Highlight on tooltip rect
	focus.append("path")
	.attr("d", leftRoundedRect(-tooltip_rect_width/2, -tooltip_rect_height/2, tooltip_rect_width/1.6, tooltip_rect_height, 3))
	.attr("class", "tooltip-rect-highlight")

	//Tooltip date label text
	focus.append("text")
	.attr("x", -tooltip_rect_width/2 + 18)
	.attr("y", tooltip_rect_height/6)
	.attr("class", "tooltip-label-text");

	//Tooltip value text
	focus.append("text")
	.attr("x", tooltip_rect_width/4)
	.attr("y", tooltip_rect_height/6)
	.attr("class", "tooltip-value-text");

	//Overlay rectangle
	svg.append("rect")
	.attr("class", "overlay")
	.attr("width", width - padding_x)
	.attr("height", height - padding_y)
	.on("mouseover", function() {
		focus.style("display", null)
		d3.select(".line")
		.transition()
		.style("stroke", "#ff9999")
	})
	.on("mouseout", function() {
		focus.style("display", "none")
		d3.select(".line")
		.transition()
		.style("stroke", "red")
	})
	.on("mousemove", mousemove);

	function mousemove() {

		var dataset_x = xScale.invert(d3.mouse(this)[0]);
		var data_item = data[bisectDate(data, dataset_x)];

		//display tooltip
		displayTooltip(data_item);

	}

	function displayTooltip(data_item) {
 
		focus.style("display", null);

		focus.attr("transform", function() {
		if (xScale(data_item.date) < 50) {
			return "translate(" + (xScale(data_item.date) + 50) + "," + yScale(data_item.num_owned) + ")"
		} else if (xScale(data_item.date) > width - 50) {
			return "translate(" + (xScale(data_item.date) - 50) + "," + yScale(data_item.num_owned) + ")"
		} else {
			return "translate(" + xScale(data_item.date) + "," + yScale(data_item.num_owned) + ")"
		}
		});

		focus.select(".tooltip-label-text")
		.text(formatMonth(data_item.date).toUpperCase() + " " + formatYear(data_item.date));

		focus.select(".tooltip-value-text")
		.text(data_item.num_owned)
		.attr("transform", function() {
			if (data_item.num_owned < 10) {
				return "translate(" + 4 + ",0)"
			} 
		});
	}

	//Initialize tooltip in the middle of the viz on load
	var data_item = data[bisectDate(data, xScale.invert(width/2))]
	//displayTooltip(data_item);

})




















