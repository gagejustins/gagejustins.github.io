//Alerts for browser compatibility
if (navigator.vendor ==  "Apple Computer, Inc." && !/Mobi|Android/i.test(navigator.userAgent)) {
	alert("This visualization doesn't work very well in Safari. Try using Chrome if you can!");
}

if (/Mobi|Android/i.test(navigator.userAgent)) {
    alert("This visualization doesn't work very well on mobile. Try using Chrome on Desktop if you can!")
}

var w = 1100;
var h = 650;

console.log("d3 executed!")

//Create variable for updating dataset
var newData;

var svg = d3.select("body")
            .append("svg")
              .attr("width", w)
              .attr("height", h);

//Define map projection and resizing
var projection = d3.geoAlbersUsa()
.translate([w/2.5, h/2.2])
.scale([1100]);

//Define path generator, using the Albers USA projection
var path = d3.geoPath()
.projection(projection); 

var color = d3.scaleLinear()
.range([0,255])

var tooltip = d3.select("body").append("div") 
.attr("class", "tooltip")       
.style("opacity", 0);

//Display data function
function displayData(dataset) {

	console.log("displayData executed on " + dataset);

	d3.csv("/assets/data/united-states-by-state/states-data.csv", function(data) {

		//Set domain for color scale
		color.domain([
			d3.min(data, function(d) { return parseFloat(d[dataset]); }),
			d3.max(data, function(d) { return parseFloat(d[dataset]); })
		]);

		//Load in GeoJSON data
		d3.json("/assets/js/united-states-by-state/us-states.json", function(json) {

			for (var i = 0; i < data.length; i++) {

				//Grab a state name
				var dataState = data[i].name;

				//Grab data values, and convert from string to float
				var dataValue = parseFloat(data[i][dataset]);

				//Find the corresponding state inside the GeoJSON
				for (var j = 0; j < json.features.length; j++) {

					//Grab a GeoJSON state name
					var jsonState = json.features[j].properties.name;

					//If the state name in our data is the same as the GeoJSON state name
					if (dataState == jsonState) {

						//Copy the data value into the JSON
						json.features[j].properties.value = dataValue;

						//Stop grabbing json state names
						break;
					}
				}

			}

			//Bind data and create one path per GeoJSON feature
			mapPath = svg.selectAll("path")
			.data(json.features)

			mapPath.enter()
			.append("path")
			.attr("d", path);

			//Fill states with color conditional on data value
			mapPath.transition()
			.duration(900)
			.style("fill", function(d) {

				//Get data value
				var value = d.properties.value;

				if (value) {
					return "rgb(" + color(value) + ",0,0)";
				} else {
					//If default dataset
					if (dataset == "default") {
						return "black";
					//If any other dataset
					} else {
						return "#ccc";
					}
				}
			});

			mapPath.on("mouseover", function(d) {

				//Inject data value into paragraph

				//Remove old text
				d3.select(".dropdown #value-label")
				.remove()

				//Display new text
				var paragraph = d3.select(".dropdown")
				.append("p")
				.text(function() {
					//Based on the dataset, we'll return different tooltips (formatting in terms of percentages, etc.)
					if (["manufacturing_output"].includes(dataset)) {
						return (d.properties.name + ": $" + d.properties.value + "B");
					} else if (["agriculture_dollars", "household_income"].includes(dataset)) {
						return (d.properties.name + ": $" + d.properties.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
					} else if (["unemployment_rate", "incarceration_rate", 
						"obesity_rate", "poverty_rate", "religion", "internet_use"].includes(dataset)){
						return (d.properties.name + ": " + d.properties.value + "%");
					} else if (dataset=="default"){
						return (d.properties.name);	
					} else {
						return (d.properties.name + ": " + d.properties.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
					}
				})
				.attr("id", "value-label")
				.classed("supreme", true)
				.style("font-size", "1em")
				.style("display", "inline")
				.style("margin-left", "30px");

				//Highlight current state
				d3.select(this)
				.transition()
				.duration(300)
				.style("opacity", .6);

			})
			.on("mouseout", function(d) {

				//Remove old text
				d3.select(".dropdown #value-label")
				.remove()

				//Return state to original opacity
				d3.select(this)
				.transition()
				.duration(350)
				.style("opacity", 1);
				
			});

		});

	});

};

//Display text function
function displayInformation(dataset) {

	//Load in dataset:description json file
	d3.json("/assets/data/united-states-by-state/descriptions.json", function(json) {

		var description = json[dataset];

		//Remove old text
		d3.select(".blurb #dataset-description")
		.remove()

		//Display new text
		var paragraph = d3.select(".blurb")
		.append("p")
		.html(description)
		.attr("id", "dataset-description")
		.style("font-size", "1em")
		.style("font-family", "Futura, sans-serif")
		.style("font-style", "italic");

	}); 

}

//Load initial data and description
displayData("default");
displayInformation("default");

// handle on click event
d3.select('#opts')
  .on('change', function() {
    newData = d3.select(this).property('value');
    displayInformation(newData);
    displayData(newData);
});












