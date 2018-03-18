// function for init google map.
// need include after footer tag script with google map cdn and key

export function initMap() {
    
    // define element for show map.
    // set up zoom and coordinates of center
    
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: {lat: 59.9342802, lng: 30.3350986}
    });
    
    // show markers on map
    
    setMarkers(map);
}

// Data for the markers consisting of a name, a LatLng and a zIndex and count people for the
// order in which these markers should display on top of each other.
var places = [
    ['Филармония', 59.93575245, 30.33179283, 4, 4500],
    ['Гостинный двор', 59.93362395, 30.3339386, 5, 248]
];

function setMarkers(map) {
    // Adds markers to the map.

    // Marker sizes are expressed as a Size of X,Y where the origin of the image
    // (0,0) is located in the top left of the image.

    // Origins, anchor positions and coordinates of the marker increase in the X
    // direction to the right and in the Y direction down.
    var image = {
        url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
        // This marker is 20 pixels wide by 32 pixels high.
        size: new google.maps.Size(20, 32),
        // The origin for this image is (0, 0).
        origin: new google.maps.Point(0, 0),
        // The anchor for this image is the base of the flagpole at (0, 32).
        anchor: new google.maps.Point(0, 32)
    };

    function clickMarker() {
        console.log();
    }

    // Shapes define the clickable region of the icon. The type defines an HTML
    // <area> element 'poly' which traces out a polygon as a series of X,Y points.
    // The final coordinate closes the poly by connecting to the first coordinate.
    var shape = {
        coords: [1, 1, 1, 20, 18, 20, 18, 1],
        type: 'poly'
    };

    var markers = [];

    for (var i = 0; i < places.length; i++) {
        var place = places[i];
        var marker = new google.maps.Marker({
            position: {lat: place[1], lng: place[2]},
            map: map,
            icon: image,
            shape: shape,
            title: place[0],
            zIndex: place[3],
            cPeople: place[4]
        });
        markers.push(marker);
    }

    markers.forEach(function(marker) {
        marker.addListener('click', function(){
            console.log(marker.title + ' have registration: ' + marker.cPeople);
        });
    });
}