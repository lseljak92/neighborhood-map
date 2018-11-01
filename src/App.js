
import React, { Component } from 'react';
import './App.css';
import Map from './Map.js'
import Menu from './Menu.js'
//Import axios to load and get venues from Foursquare API. Source. https://www.npmjs.com/package/axios
import axios from 'axios'

class App extends Component {

  // Declare the state of the venues (array)
  state= {
    venues: [],
    markers: []
  }

  componentDidMount(){
    this.getVenues()
  }

  //Load URL from Google Maps API. Source: https://developers.google.com/maps/documentation/javascript/tutorial
  loadMap=() => {
    renderScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyDZPYfsH0OQBZm7e-hULiD43MSrLEHtRdU&callback=initMap")
    window.initMap=this.initMap

  }

  //Get coffee venues close to North Beach in San Francisco using Foursquare API. Show a limit of 15 venues.
  //Source: https://developer.foursquare.com/docs/api.
  getVenues=() => {
    const endPoint = "https://api.foursquare.com/v2/venues/explore?"
    const parameters={
      client_id: "5HUYXTVATBZBJIRCO23F1SK2MAXO0UOXED1255F4LO04NKLI",
      client_secret: "SCY5ZF5DZ4XY4J4K2IXV13AH1S4BQNQ0O33FJZ3TRHX1DTIE",
      query: "coffee",
      near: "North Beach, San Francisco",
      limit: 15,
      v: "20180323"

    }

    axios.get(endPoint + new URLSearchParams(parameters))
      .then(response => {
        this.setState({
          //Set the state for the venues array. Get data from Foursquare API and add it to the array. Then, loadMap
          unfilteredVenues: response.data.response.groups[0].items,
          venues: response.data.response.groups[0].items
        }, this.loadMap())
      })
      //Error handling
      .catch(error => {
        console.log("Something went wrong, please refresh the page. Error " + error)
      })
  }

  //Initialize map element
  initMap=() => {
    //Create map variable with Google Maps API. Source: https://developers.google.com/maps/documentation/javascript/tutorial
    let map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 37.806053, lng: -122.410331},
      zoom: 14,

      //Change map to Retro style. Source: https://developers.google.com/maps/documentation/javascript/styling#style-type
      styles: [
          {
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#ebe3cd"
              }
            ]
          },
          {
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#523735"
              }
            ]
          },
          {
            "elementType": "labels.text.stroke",
            "stylers": [
              {
                "color": "#f5f1e6"
              }
            ]
          },
          {
            "featureType": "administrative",
            "elementType": "geometry.stroke",
            "stylers": [
              {
                "color": "#c9b2a6"
              }
            ]
          },
          {
            "featureType": "administrative.land_parcel",
            "elementType": "geometry.stroke",
            "stylers": [
              {
                "color": "#dcd2be"
              }
            ]
          },
          {
            "featureType": "administrative.land_parcel",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#ae9e90"
              }
            ]
          },
          {
            "featureType": "landscape.natural",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#dfd2ae"
              }
            ]
          },
          {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#dfd2ae"
              }
            ]
          },
          {
            "featureType": "poi",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#93817c"
              }
            ]
          },
          {
            "featureType": "poi.park",
            "elementType": "geometry.fill",
            "stylers": [
              {
                "color": "#a5b076"
              }
            ]
          },
          {
            "featureType": "poi.park",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#447530"
              }
            ]
          },
          {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#f5f1e6"
              }
            ]
          },
          {
            "featureType": "road.arterial",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#fdfcf8"
              }
            ]
          },
          {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#f8c967"
              }
            ]
          },
          {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [
              {
                "color": "#e9bc62"
              }
            ]
          },
          {
            "featureType": "road.highway.controlled_access",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#e98d58"
              }
            ]
          },
          {
            "featureType": "road.highway.controlled_access",
            "elementType": "geometry.stroke",
            "stylers": [
              {
                "color": "#db8555"
              }
            ]
          },
          {
            "featureType": "road.local",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#806b63"
              }
            ]
          },
          {
            "featureType": "transit.line",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#dfd2ae"
              }
            ]
          },
          {
            "featureType": "transit.line",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#8f7d77"
              }
            ]
          },
          {
            "featureType": "transit.line",
            "elementType": "labels.text.stroke",
            "stylers": [
              {
                "color": "#ebe3cd"
              }
            ]
          },
          {
            "featureType": "transit.station",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#dfd2ae"
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "geometry.fill",
            "stylers": [
              {
                "color": "#b9d3c2"
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#92998d"
              }
            ]
          }
        ]
      
    })
    
    //Create InfoWindows for each marker using Google Maps API. Source: https://developers.google.com/maps/documentation/javascript/infowindows
    let infowindow = new window.google.maps.InfoWindow()
      //Loop over each venue, add marker and infoWindow
      this.state.venues.forEach(showVenue => {
      
      
      let contentString = `
            <h3 style="font-weight:bold">${showVenue.venue.name}</h3>
            <p>Address: ${showVenue.venue.location.formattedAddress[0]}</p>
            <p>${showVenue.venue.location.formattedAddress[1]}</p>
            <p>${showVenue.venue.location.formattedAddress[2]}</p>
                          `
      let title = showVenue.venue.name
      
      //instantiate the markers for each venue using the Google Maps API. Source: https://developers.google.com/maps/documentation/javascript/markers
      let marker = new window.google.maps.Marker({
        //Set marker's position based on the venue's lat and lng data from Foursquare's response
        position: {lat: showVenue.venue.location.lat, lng: showVenue.venue.location.lng},
        map: map,
        title: title,
        animation: window.google.maps.Animation.DROP
      })
      
      //Push the markers to the markers array
      this.state.markers.push(marker)
      /*Add event listener for each marker. When clicked, infoWindow opens. InfoWindow should close when another
      marker is clicked.*/
      marker.addListener('click', function() {
        infowindow.setContent('<div>' + contentString + '</div>');
        infowindow.open(map, marker);
      })
    })

    
  }

  filterVenues= (venuesMatch) => {
    this.setState({venues: venuesMatch})
  }



  render() {
    return (
      <div>
        <main>
          <Menu
            unfilteredVenues={this.state.unfilteredVenues}
            venues={this.state.venues}
            markers={this.state.markers}
            filterVenues={this.filterVenues}
          />
          <Map/>  
        </main>
      </div>
    )
  }
}

  /*Load the Maps Javascript API by creating HTML script element with JavaScript. Referred to https://javascript.info/onload-onerror and to Elharony's tutorial video 
  for guidance. Source: https://www.youtube.com/watch?v=W5LhLZqj76s&index=2&list=PLgOB68PvvmWCGNn8UMTpcfQEiITzxEEA1.*/
  function renderScript(url) {
    var index=window.document.getElementsByTagName("script")[0]
    var script=window.document.createElement("script")
    script.src=url
    script.async=true
    script.defer=true
    /* Add oneerror attribute in case Google Maps fails to load*/
    script.onerror= function() {
      alert("Error loading " + this.src)
    }
    index.parentNode.insertBefore(script, index)
  }


  export default App;
