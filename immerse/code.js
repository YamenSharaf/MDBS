// an array of strings (hex colors)
var colors = [
  '#362143',
  '#DB649C',
  '#754792',
  '#FF9800',
  '#1976D2',
  '#9E9E9E',
  '#ff4f79',
  '#8BC34A',
  '#171717',
  '#00BCD4'
];
// Variable for the current color index
var currentColor = 0;

// On click function (Replace #click-android with the suitable ID of your target)
$('#click-android').on('click', function() {

// Color Switcher
    if (currentColor == colors.length-1) currentColor = 0;
    else currentColor++;
// Actual Change of colors
    document.body.style.backgroundColor = colors[currentColor];
    //Android status bar color attributes
    $('meta[name=theme-color]').remove();
    $('head').append( '<meta name="theme-color" content="'+colors[currentColor]+'">' );
});

// Calling the function
function click() {
}

//when the window has finished loading, update the body to the first color as fallback
window.onload = function() {
  document.body.style.backgroundColor = colors[currentColor];
}
