
import React, { Component } from 'react';
import './App.css';
import Map from './Map.js'
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
      zoom: 14
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
      });
    })


  }

  render() {
    return (
      <div>
      <main>
        <Map/>  
      </main>
      </div>
    )
  }
}

  /*Load the Maps Javascript API by creating HTML script element with JavaScript. Referred to Elharony's tutorial video 
  for guidance. Source: https://www.youtube.com/watch?v=W5LhLZqj76s&index=2&list=PLgOB68PvvmWCGNn8UMTpcfQEiITzxEEA1*/
  function renderScript(url) {
    var index=window.document.getElementsByTagName("script")[0]
    var script=window.document.createElement("script")
    script.src=url
    script.async=true
    script.defer=true
    index.parentNode.insertBefore(script, index)
  }

  export default App;
