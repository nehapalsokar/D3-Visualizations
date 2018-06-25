'use strict';
//d3 has already been "imported"

//Move the ball (the <circle>) to the top of the slide by setting
//its `cx` attribute to 225 and its `cy` attribute to 95.
//Be sure to call the function to move the ball!
var ball = d3.select('circle');
function moveBallToTop() {
  ball.attr('cx',225);
  ball.attr('cy',95);
}
moveBallToTop(); //call function

//Add event listeners so that when the mouse is over the #cloud, it disappears
//(reappearing when the mouse leaves).
var cloud = d3.select('#cloud');
d3.select('#cloud').on('mouseover', function() {
  cloud.style('opacity',0);
})
cloud.on('mouseleave', function() {
  cloud.style('opacity',1);
})

//Add an event listener so that when the user clicks on the ball, it moves to
//the bottom of the slide (cx:415, cy:320).
//Chain the attribute change calls to the returned value from calling `transition()`
//on the selection to animate the ball!
//You can call `duration()` after `transition()` to specify the speed in ms
//(a value of 1000 looks good)
var slideCount = 0;
var message = d3.select('body').insert('p', 'svg'); //before <svg>
ball.on('click', function() {
  if(ball.attr('cy') == 95){ //if at the top
    slideCount += 1;
    ball //the slide
      .transition().duration(1000)
        .attr('cx', 415).attr('cy',320);
		console.log("You've gone down the slide " + slideCount + " times!");
    message.text("You've gone down the slide " + slideCount + " times!");
  }
  else { //otherwise, go back to top
    moveBallToTop();
  }
})

//Modify the above callback so that the ball's position _toggles_ when you click
//on it---if it is at the bottom of the slide, move to the top, and vice versa.


//Modify your script so that it *counts* how many times the ball has gone down
//the slide, logging out the count.
//Bonus: add an HTML element that shows this count!
