var w = 1200;
var h = 600;

var dataset = {
hi:10,
ak:20,
fl:30,
nh:40,
mi:50,
vt:10,
me:20,
ri:30,
ny:40,
pa:50,
nj:0,
de:10,
md:20,
va:30,
wv:40,
oh:50,
'in':0,
il:10,
ct:20,
wi:30,
nc:40,
dc:50,
ma:0,
tn:10,
ar:20,
mo:30,
ga:40,
sc:50,
ky:0,
al:10,
la:20,
ms:30,
ia:40,
mn:50,
ok:0,
tx:10,
nm:20,
ks:30,
ne:40,
sd:50,
nd:0,
wy:10,
mt:20,
co:30,
id:40,
ut:50,
az:0,
nv:10,
or:20,
wa:30,
ca:40
}

console.log("d3 executed!")

var svg = d3.select("body")
            .append("svg")
              .attr("width", w)
              .attr("height", h);

//Define map projection and resizing
var projection = d3.geoAlbersUsa()
.translate([w/2, h/2])
.scale([1300]);

//Define path generator, using the Albers USA projection
var path = d3.geoPath()
.projection(projection); 

//Define color scale
var color = d3.scaleQuantize()
.range(["#fee5d9", "#fcae91",
                   "#fb6a4a", "#de2d26", "#a50f15"]);

//Load agriculture data
d3.csv("/assets/data/united-states-by-state/us-ag-productivity.csv", function(data) {

	//Set domain for color scale
	color.domain([
		d3.min(data, function(d) { return d.value; }),
		d3.max(data, function(d) { return d.value; })
	])

	//Load in GeoJSON data
	d3.json("/assets/js/united-states-by-state/us-states.json", function(json) {

		for (var i = 0; i < data.length; i++) {

			//Grab a state name
			var dataState = data[i].state;

			//Grab a data value, and convert from string to float
			var dataValue = parseFloat(data[i].value);

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
		svg.selectAll("path")
		.data(json.features)
		.enter()
		.append("path")
		.attr("d", path)
		.style("fill", function(d) {

			//Get data value
			var value = d.properties.value

			if (value) {
				return color(value);
			} else {
				return "#ccc";
			}

		});

	})

})















