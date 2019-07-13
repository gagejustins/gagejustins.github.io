
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

function bubbleChart() {

	var width = 900,
	height = 600;

	// tooltip for mouseover functionality
	var tooltip = floatingTooltip('sneaker-tooltip', 240);

	//Locations to move bubbles to
 	var center = { x: width / 2, y: height / 2 };

	var brandCenters = {
		"Adidas": {x: width/3, y: height/2},
		"Common Projects": {x: width/2, y: height/2},
		"Nike": {x: 2*width/3, y: height/2}
	};

	//X locations of brands titles
	var brandTitleX = {
		"Adidas": 160,
		"Common Projects": width/2,
		"Nike": width - 160
	};

	//Force strength
	var forceStrength = 0.03;

	var svg = null;
	var bubbles = null;
	var nodes = [];

	//Charge function to create repulsion
	function charge(d) {
		return -Math.pow(d.radius, 2.0) * forceStrength;
	}

	//Force simulation
	var simulation = d3.forceSimulation()
	.velocityDecay(0.2)
	.force('x', d3.forceX().strength(forceStrength).x(center.x))
	.force('y', d3.forceY().strength(forceStrength).y(center.y))
	.force('charge', d3.forceManyBody().strength(charge))
	.on('tick', ticked);

	//Stop simulation if there are no nodes
	simulation.stop()

	//Color scale
	var fillColor = d3.scaleOrdinal()
	.domain(['low', 'medium', 'high'])
	.range(['red', '#ff6666', '#ff9999'])

	//Take raw data and convert it into nodes
	function createNodes(rawData) {

		//Max of data for scale domain
		var maxAmount = d3.max(rawData, function(d) { return +d.count_wears; });

		//Size bubbles based on area
		var radiusScale = d3.scalePow()
		.exponent(0.5)
		.range([2,65])
		.domain([0, maxAmount]);

		//Convert raw data to node data
		var myNodes = rawData.map(function(d) {
			return {
				id: d.sneaker_id,
				radius: radiusScale(+d.count_wears),
				value: +d.count_wears,
				name: d.sneaker_name,
				group: d.wears_group,
				brand: d.brand,
				x: Math.random() * 900,
				y: Math.random() * 800
			};
		});

		//Sort 
		myNodes.sort(function(a,b) { return b.value - a.value; });

		return myNodes;
	}

	var chart = function(selector, rawData) {

		nodes = createNodes(rawData);

		svg = d3.select(selector)
		.append("svg")
		.attr("width", width)
		.attr("height", height);

		//Bind nodes to elements
		bubbles = svg.selectAll(".bubble")
		.data(nodes, function(d) { return d.sneaker_id });

		//Create bubbles
		var bubblesE = bubbles.enter()
		.append("circle")
		.classed("bubble", true)
		.attr("r", 0)
		.attr("fill", function(d) { return fillColor(d.group); })
		.attr("stroke", function(d) { return d3.rgb(fillColor(d.group)).darker(); })
		.attr("stroke-width", 2)
     	.on('mouseover', showDetail)
      	.on('mouseout', hideDetail);

		//Merge the original empty selection and the enter selection
		bubbles = bubbles.merge(bubblesE)

		//Transition
		bubbles.transition()
		.duration(2000)
		.attr("r", function(d) { return d.radius; });

		//Run simulation
		simulation.nodes(nodes);

		//Set inital layout to single group
		groupBubbles();

	};

	//Repositioning function that works with force
	function ticked() {
		bubbles.attr("cx", function(d) { return d.x; })
		.attr("cy", function(d) { return d.y; });
	}

	//X value for each node based on brand
	function nodeBrandPos(d) {
		console.log(brandCenters[d.brand]);
		return brandCenters[d.brand].x;
	}

	//Sets viz in single group mode
	function groupBubbles() {

		hideBrandTitles();

		simulation.force('x', d3.forceX().strength(forceStrength).x(center.x));
		simulation.alpha(1).restart();
	}

  	function splitBubbles() {
    showBrandTitles();

    // @v4 Reset the 'x' force to draw the bubbles to their brand centers
    simulation.force('x', d3.forceX().strength(forceStrength).x(nodeBrandPos));

    // @v4 We can reset the alpha value and restart the simulation
    simulation.alpha(1).restart();
  }

	//Sets viz in split by brand mode
	function hideBrandTitles() {
		svg.selectAll(".brand").remove()
	}

	//Shows brand title displays
	function showBrandTitles() {
		var brandsData = d3.keys(brandTitleX);
		var brands = svg.selectAll(".brand")
		.data(brandsData);

		brands.enter()
		.append("text")
		.attr("class", "brand")
		.attr("x", function(d) { return brandTitleX[d]; })
		.attr("y", 40)
		.attr("text-anchor", "middle")
		.text(function(d) { return d.toUpperCase(); });
	}

	//Function to toggle display between grouped and single
	chart.toggleDisplay = function (displayName) {
		if (displayName === "brand" ) {
			splitBubbles();
		} else {
			groupBubbles();
		}
	};

	//Function to create tooltip
	function floatingTooltip(tooltipId, width) {

		//Variable to hold tooltip div
		var tt = d3.select("body")
		.append("div")
		.attr("class", "tooltip")
		.attr("id", tooltipId)
		.style("pointer-events", "none");

		//Set width if provided
		if (width) {
			tt.style("width", width);
		};

		//Hide tooltip initially
		hideTooltip();

		//Function to display tooltip
		function showTooltip(content, event) {
			
			tt.style("opacity", 1.0)
			.html(content);

			updatePosition(event);
		};

		function hideTooltip() {
			tt.style("opacity", 0.0);
		}

		//Figure out where to place tooltip based on mouse pos
		function updatePosition(event) {

			var xOffset = 20,
			yOffset = 10;

			var ttw = tt.style("width"),
			tth = tt.style("height");

			var wscrX = window.scrollX,
			wscrY = window.scrollY;

			var curX = (document.all) ? event.clientX + wscrX : event.pageX,
			curY = (document.all) ? event.clientY + wscrY : event.pageY;

			var ttleft = ((curX - wscrX + xOffset * 2 + ttw) > window.innerWidth) ? curX - ttw - xOffset * 2 : curX + xOffset;

			if (ttleft < wscrX + xOffset) {
				ttleft = wscrX + xOffset;
			}

			var tttop = ((curY - wscrY + yOffset * 2 + tth) > window.innerHeight) ? curY - tth - yOffset * 2 : curY + yOffset;

			if (tttop < wscrY + yOffset) {
				tttop = wscrY + yOffset;
			}

			tt.style("top", tttop + "px")
			.style("left", ttleft + "px");

		}

		return {
			showTooltip: showTooltip,
			hideTooltip: hideTooltip,
			updatePosition: updatePosition
		};
	}

	//Function to populate tooltip
	function showDetail(d) {

		//Indicate hover state
		d3.select(this)
		.attr("stroke", "black");

	    var content = '<span class="value" style="color: black; font-weight: bold; font-size: 0.9em;">' +
              d.name.toUpperCase() +
              '</span>' +
              '<span class="value" style="font-size: 0.9em; padding-left: 25px; padding-right: 5px; font-weight: bold; color: white;">' +
              (d.value - 1) +
              '</span>' +
              '</span>';

      	tooltip.showTooltip(content, d3.event);
	}

	//Function to hide tooltip
	function hideDetail(d) {

		d3.select(this)
		.attr("stroke", d3.rgb(fillColor(d.group)).darker());

		tooltip.hideTooltip();

	}

	//Return the chart
	return chart;
 
};

var myBubbleChart = bubbleChart();

//Display function
function display(data) {

	console.log(myBubbleChart("#viz", data));
}

//Sets up layout buttons
function setupButtons() {
	
	d3.select("#bubbles-toolbar")
	.selectAll("a")
	.on("click", function() {

		d3.selectAll(".dropdown-item")
		.classed("active", false);

		var button = d3.select(this);

		button.classed("active", true);

		var buttonId = button.attr("id");

		myBubbleChart.toggleDisplay(buttonId);

	});
};

//

//Load data
d3.csv("https://gist.githubusercontent.com/gagejustins/090dbfffb9882b0053eb979113e983d3/raw/fec037605d4268592680bc623eeb5cb15a306096/sneakers.csv", function(data) {
	display(data);
});
setupButtons();




























