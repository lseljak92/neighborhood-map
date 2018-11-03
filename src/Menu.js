import React, { Component } from 'react';
import './Menu.css';
import escapeRegExp from 'escape-string-regexp'

class Menu extends Component {
    
    state={
        query: '',
        venues: this.props.venues,
        markers: this.props.markers,
        marker: this.props.marker
    }
    
    getInputData=(query) => {
        this.setState({query:query})
        let allVenues= this.props.unfilteredVenues
        let allMarkers = this.props.markers
        let markersMatch
        let venuesMatch
        this.props.markers.forEach(marker => marker.setVisible(true))

        /*Referenced to https://remotebase.io/blog/implementing-technology-search/ 
        to implement RegExp*/
        if(query.length>0) {
            const match = new RegExp(escapeRegExp(query), 'i');
            allMarkers.forEach(marker => marker.setVisible(false))
            venuesMatch = allVenues.filter((venue) => match.test(venue.venue.name))
            markersMatch = allMarkers.filter((marker) => match.test(marker.title))
            this.setState({venues: venuesMatch})
            markersMatch.forEach(marker => marker.setVisible(true))
            this.setState({allMarkers: markersMatch})
            this.props.filterVenues(venuesMatch)
        } else {
            this.setState({venues: this.props.unfilteredVenues})
               }
        }

        triggerMarker = (venueTitle) => {
            // eslint-disable-next-line
            this.props.markers.map((marker) => {
                if(marker.title === venueTitle) {
                    window.google.maps.event.trigger(marker, 'click');
                    marker.setVisible(true);
                    marker.setAnimation(window.google.maps.Animation.BOUNCE);
            /* Make marker bounce only once, setting timeout function. 
            Source: https://stackoverflow.com/questions/7339200/bounce-a-pin-in-google-maps-once */
                    setTimeout(function(){marker.setAnimation(null);}, 750);
                }else{
                    marker.setVisible(false);
                }
            })
        }

        
        hideResults = () => {
            const resultList = document.getElementById('menu')
            resultList.classList.toggle("hide")
        }

        showButton = () => {
            const button = document.getElementById('seeResults')
            button.classList.toggle("show")
        }
            
 
   render() {
    
        return(
            <div className="venues-menu">
                <div id="search" className="search-venue">
                <input type="text" placeholder="Search venues.."
                onChange={(e) => this.getInputData(e.target.value)}
                value={this.state.query}
                id="user-input" aria-label="Search venues" />
            </div>
                <button id="seeResults" className="openMenu" onClick={this.hideResults}>
                    <div class="bar1"></div>
                    <div class="bar2"></div>
                    <div class="bar3"></div>
                </button>
                <div id="menu" className="results">
                {this.props.venues.map !== 0 && (
                    <ul className="venue-results">
                        {this.props.venues.map((venue, index) => (
                            <li 
                                key={index}
                                tabIndex={index}
                                className="venue" 
                                role="button"
                                onKeyPress={() => this.triggerMarker(venue.venue.name)}
                                onClick={() => this.triggerMarker(venue.venue.name)}
                            >
                                {venue.venue.name}
                            </li>
                        ))}
                    </ul>
                )}
                </div>

            {this.state.venues.length === 0 && this.state.query !=='' &&(
                <ul className="venue-results">
                    <li className="venue">No venues with that name were found.</li>
                </ul>
            )}
            
                 </div>
                          
   )
   


   }
     
} 

export default Menu