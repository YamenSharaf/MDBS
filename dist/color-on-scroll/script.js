var zeroWaypoint = new Waypoint({
element: document.getElementById('letterhead'),
handler: function() {
$('meta[name=theme-color]').remove();
$('head').append( '<meta name="theme-color" content="#DB649C">' );
}
});

var firstWaypoint = new Waypoint({
element: document.getElementById('about-me'),
handler: function() {
$('meta[name=theme-color]').remove();
$('head').append( '<meta name="theme-color" content="#ABAEBF">' );
}
});

var secondWaypoint = new Waypoint({
element: document.getElementById('skills'),
handler: function() {
$('meta[name=theme-color]').remove();
$('head').append( '<meta name="theme-color" content="#362143">' );
}
});

var thirdWaypoint = new Waypoint({
element: document.getElementById('portfolio'),
handler: function() {
$('meta[name=theme-color]').remove();
$('head').append( '<meta name="theme-color" content="#DB649C">' );
}
});

var fourthWaypoint = new Waypoint({
element: document.getElementById('blog'),
handler: function() {
$('meta[name=theme-color]').remove();
$('head').append( '<meta name="theme-color" content="#403049">' );
}
});
