$(function () {
    $('[data-toggle=tooltip]').tooltip();
  });

var sneakers = d3.selectAll(".sneakers").selectAll("img");

sneakers.on("mouseover", function() {

	var sneakerName = d3.select(this).property('id')
	
	//Apply the highlighted class
	//d3.select(this)
	//.classed("highlighted", true);

	//Blur other sneakers
	d3.selectAll("body img:not(#" + sneakerName + ")")
	.classed("unblurred", false)
	.classed("blurred", true);

	//Get position of sneaker image
	var xPos = d3.select(this).property('x');
	var yPos = d3.select(this).property('y');

	d3.selectAll(".tooltips")
	.append("div")
	.html("<!--tooltips for sneakers--> <div class='row sneaker_tooltip hidden'> <div class='col-md-4'> <div class='card'> <div class='card-body'> <div class='row'> <div class='col-sm-5'> <h5 class='card-title'>Brand</h5> <p class='card-text' id='brand'>Common Projects</p> <h5 class='card-title'>Model</h5> <p class='card-text' id='description'>Bball Low White</p> <h5 class='card-title'>Purchased</h5> <p class='card-text' id='purchased'>May 2018</p> </div> <div class='col-sm-7'> <h5 class='card-title'>What I Like</h5> <p class='card-text' id='comment'>This is your classic white sneaker, but with Common Projects materials and a little extra Basketball inspired detailing. Subtle but unique.</p></div> </div> </div> </div> </div> </div> <!-- end tooltips for sneakers -->")

	//Position sneaker_tooltip div on top right corner of image
	d3.select(".sneaker_tooltip")
	.classed("hidden", false)
	.style("left", function() {
		//If the selection is the two rightmost sneakers, display the tooltip a bit to the left
		if (['gats', 'pharrell'].includes(sneakerName)) {
			return xPos - 250 + "px";
		} else {
			return xPos + "px";
		}
	})
	.style("top", yPos - 265 + "px")
	.style("position", "absolute")
	.style("width", "1200px")
	.style("z-index", "999");

	//Update tooltip information
	displayTooltips(sneakerName);

})
.on("mouseout", function() {

	//Remove blur
	d3.selectAll(".sneakers img")
	.classed("blurred", false)
	.classed("unblurred", true);

	//Apply the highlighted class
	//d3.select(this)
	//.classed("highlighted", false);

	//Remove tooltip information
	d3.select(".sneaker_tooltip")
	.classed("hidden", true);

	d3.select(".sneaker_tooltip")
	.remove();

});

var guitars = d3.selectAll(".guitars").selectAll("img");

guitars.on("mouseover", function() {

	d3.select(this).classed("highlighted", true);
})
.on("mouseout", function() {
	d3.select(this)
	.classed("highlighted", false);
});

function displayTooltips(itemID) {

	//Load in tooltips.json file
	d3.json("/assets/data/tooltips.json", function(json) {

		//Select the correct json object
		var itemData = json[itemID]

		//Add in brand
		d3.select('#brand')
		.text(itemData.brand);

		//Add in description
		d3.select('#description')
		.text(itemData.description);

		//Add in purchase date
		d3.select('#purchased')
		.text(itemData.purchased);

		//Add in comment
		d3.select('#comment')
		.text(itemData.comment);

	});

}