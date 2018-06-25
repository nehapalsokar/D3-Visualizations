'use strict';
//d3 has already been "imported"

//size of the margins
var SVG_SIZE = { width: 600, height: 480 }
var MARGIN_SIZE = {
    left: 70,
    bottom: 70,
    top: 50,
    right: 50
}

var svg = d3.select('svg')
    .attr('width', SVG_SIZE.width).attr('height', SVG_SIZE.height);

//Use the SVG_SIZE and MARGIN_SIZE values to calculate the `width` and `height` 
//of the displayable area of the plot (where the circles will go)
var displayWidth = SVG_SIZE.width - MARGIN_SIZE.left - MARGIN_SIZE.right;
var displayHeight = SVG_SIZE.height - MARGIN_SIZE.bottom - MARGIN_SIZE.top;
//console.log(displayWidth, displayHeight);



//Define an `async` function called `createPlot()`, which will load the data and
//create the plot, following the below instructions:
async function createPlot(input_val) {
    console.log("input" + input_val)

    //load the data

    var data = await d3.csv('data/counties.csv');

    //Log out the data once it is received to confirm that it is loaded correctly.
    console.log(data);

    //Calculate the minimum and maximum values for the `population` and `poverty-rate`

    var minpopulation = d3.min(data, function (d) { return parseFloat(d.population) });
    var maxpopulation = d3.max(data, function (d) { return parseFloat(d.population) });
    var minIN = d3.min(data, function (d) { return parseFloat(d.poverty_rate) });
    var maxIN = d3.max(data, function (d) { return parseFloat(d.poverty_rate) });
    console.log(minpopulation, maxpopulation, minIN, maxIN);

    //scale for the y values. 
    var yScale = d3.scaleLinear()
        .domain([minIN * .95, maxIN])
        .range([displayHeight, 0]);

    //scale for the x values. 
    var xScale = d3.scaleLog()
        .domain([minpopulation * .9, maxpopulation])
        .range([0, displayWidth]);


    //Append a <g> element in which to place the plotted circles

    var plot = svg.append('g')
        .attr('transform', 'translate(' + MARGIN_SIZE.left + ', ' + MARGIN_SIZE.top + ')')
        .attr('width', displayWidth)
        .attr('height', displayHeight)






    //Select all of the <circle> elements in the `plot` group (there are none
    //initially) and join them with the loaded data.
    function execute_code(input_val) {
        var circles = plot.selectAll('circle').data(data);

        var selectedData = data.filter(function (d) {
            return d.poverty_rate > input_val;


        });
        console.log(selectedData)
        var circles1 = d3.selectAll('circle').data(selectedData, function (d) { return d.poverty_rate })
        //Append a new circle for each entering element, with the following attributes:
        //  `cx` (center-x) of the country's `population` scaled by the x-scale
        //  `cy` (center-y) of the country's `poverty-rate` scaled by the y-scale
        //  `r` (radius) of 10
        //  `fill` that is 'red'

        circles.enter().append('circle')
            .attr('cx', function (d) { return xScale(d.population) })
            .attr('cy', function (d) { return yScale(d.poverty_rate) })
            .attr('r', 10)
            .attr('fill', 'red')
            .style("opacity", 0)
            .on("mouseenter", function (d) { d3.selectAll('circle').data(selectedData, function (d) { return d.poverty_rate }).style("fill", 'blue'); })
            .on("mouseleave", function (d) { d3.selectAll('circle').data(selectedData, function (d) { return d.poverty_rate }).style("fill", 'red'); })
            .transition()
            .delay(function (d, i) { return i * 70 })
            .style("opacity", 0.8)

        var purplizer = d3.select('#purplize');
        purplizer.on('click', function () {
            d3.select('body').classed('purple', true);
        })

        var selectedData = data.filter(function (d) {

            return d.poverty_rate > input_val;


        });

        var circles1 = d3.selectAll('circle').data(selectedData, function (d) { return d.poverty_rate })


        var buth = d3.select('#addButton');
        buth.on('click', function () {
            console.log("yes")
            circles1.exit()
                .remove()

        })
    }

    execute_code(input_val)


    //Define an bottom axis for the x-scale. Give it 5 tick mark values 
    //using `'.0f'` as a format option (integers)
    var xAxis = d3.axisBottom(xScale).ticks(5, '.0f');

    //Append a <g> element to the svg to contain the xAxis.
    //Then `call()` the x-axis to add it to the visualization
    svg.append('g')
        .attr('transform', 'translate(' + MARGIN_SIZE.left + ',' + (displayHeight + MARGIN_SIZE.top) + ')')
        .call(xAxis);

    //Define a left axis for the y-scale. 
    var yAxis = d3.axisLeft(yScale).tickFormat(d3.format('.2s'));

    //Append a <g> element to the svg to contain the yAxis. 
    //Then `call()` the y-axis to add it to the visualization
    svg.append('g')
        .attr('transform', 'translate(' + MARGIN_SIZE.left + ',' + (MARGIN_SIZE.top) + ')')
        .call(yAxis);

    // axis titles:
    svg.append('text')
        .text('Population of county')
        .attr('transform', 'translate(' + (MARGIN_SIZE.left + displayWidth / 3) + ',' + (displayHeight + MARGIN_SIZE.top + 40) + ')')
    svg.append('text')
        .text('Poverty rate (percentage)')
        .attr('transform', 'translate(' + (MARGIN_SIZE.left - 40) + ',' + (MARGIN_SIZE.top + 2 * displayHeight / 3 + 40) + ') rotate(-90)')
}


//Default create plot function
createPlot(20);

//Button press code:
var addButton = d3.select('#searchButton');
addButton.on('click', function () {
    var svg = d3.select("svg");
    svg.selectAll("*").remove();

    var input = d3.select('input');
    var entered_val = input.property('value');
    console.log("value entered" + entered_val)
    var new_val = Number(entered_val)
    createPlot(new_val);
})