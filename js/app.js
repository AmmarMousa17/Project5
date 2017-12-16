var styles = [
  {
    featureType: 'water',
    stylers: [
      { color: '#19a0d8' }
    ]
  }, {
    featureType: 'administrative',
    elementType: 'labels.text.stroke',
    stylers: [
      { color: '#ffffff' },
      { weight: 6 }
    ]
  }, {
    featureType: 'administrative',
    elementType: 'labels.text.fill',
    stylers: [
      { color: '#e85113' }
    ]
  }, {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [
      { color: '#efe9e4' },
      { lightness: -40 }
    ]
  }, {
    featureType: 'transit.station',
    stylers: [
      { weight: 9 },
      { hue: '#e85113' }
    ]
  }, {
    featureType: 'road.highway',
    elementType: 'labels.icon',
    stylers: [
      { visibility: 'off' }
    ]
  }, {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [
      { lightness: 100 }
    ]
  }, {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [
      { lightness: -100 }
    ]
  }, {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [
      { visibility: 'on' },
      { color: '#f0e4d3' }
    ]
  }, {
    featureType: 'road.highway',
    elementType: 'geometry.fill',
    stylers: [
      { color: '#efe9e4' },
      { lightness: -25 }
    ]
  }
];

var Locations = [
  {
    title: 'Giza Pyamids',
    lat: 29.977296,
    lng: 31.132496,
    type: 'Statue'
  },
  {
    title: 'TIEC',
    lat: 30.068051,
    lng: 31.019483,
    type: "Learning"
  },
  {
    title: 'Cairo University',
    lat: 30.027337,
    lng: 31.208574,
    type: 'University'

  },
  {
    title: 'My Faculty',
    lat: 30.031251,
    lng: 31.210463,
    type: 'Faculty'
  },
  {
    title: 'Giza',
    lat: 30.013056,
    lng: 31.208853,
    type: 'Governate'
  }
];
function init() {
  ko.applyBindings(new ViewModel());
};


var map;

function ViewModel() {
  var self = this;

  this.search = ko.observable("");
  this.markers = [];


  this.populateInfoWindow = function (marker, infowindow) {
    // Check to make sure the infowindow is not already opened on this marker.
    if (infowindow.marker != marker) {
      infowindow.marker = marker;
      infowindow.setContent('<div>' + marker.title + '</div>');
      infowindow.open(map, marker);
      // Make sure the marker property is cleared if the infowindow is closed.
      infowindow.addListener('closeclick', function () {
        infowindow.marker = null;
      });
    }
  }




  this.initializeMap = function () {



      map = new google.maps.Map(document.getElementById('map'), {
      center: new google.maps.LatLng(30.031251, 31.132496),
      zoom: 13,
      styles: styles
     
    });


    this.largeInfoWindow = new google.maps.InfoWindow();
    for (var i = 0; i < Locations.length; i++) {
      this.Title = Locations[i].title;
      this.Lat = Locations[i].lat;
      this.Lng = Locations[i].lng;

      this.marker = new google.maps.Marker({
        map: map,
        position: {
          lat: this.Lat,
          lng: this.Lng
        },
        title: this.Title,
        lat: this.Lat,
        lng: this.Lng,
        id: i,
        animation: google.maps.Animation.DROP
      });
       this.marker.setMap(map);
      this.markers.push(this.marker);
      this.marker.addListener('click', self.Info);
   
    }
  };

  


  self.Info = function () {
 
    self.populateInfoWindow(this, self.largeInfoWindow);


    this.setAnimation(google.maps.Animation.BOUNCE);

    setTimeout((()=> {
            this.setAnimation(null);
        }).bind(this), 700);

  };


  this.initializeMap();
  this.Locations = ko.computed(function () {
    var output = [];
    for (var i = 0; i < this.markers.length; i++) {
      var marker = this.markers[i];
      if (marker.title.toLowerCase().includes(this.search()
        .toLowerCase())) {
        output.push(marker);
        this.markers[i].setVisible(true);
      } else {
        this.markers[i].setVisible(false);
      }
    }
    return output;
  }, this);
  mapError = () => {
  // Error handling
  alert("Try Again");
};
}


