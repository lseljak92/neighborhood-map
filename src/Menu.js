import React, { Component } from 'react';
import './Menu.css';
import escapeRegExp from 'escape-string-regexp'

class Menu extends Component {
    
    state={
        query: '',
        venues: this.props.venues
    }
    
    getInputData=(query) => {
        this.setState({query:query})
        let allVenues= this.props.unfilteredVenues
        let venuesMatch

        /*Referenced to https://remotebase.io/blog/implementing-technology-search/ 
        to implement RegExp*/
        if(query.length>0) {
            const match = new RegExp(escapeRegExp(query), 'i');
            venuesMatch = allVenues.filter((venue) => match.test(venue.venue.name))
            this.setState({venues: venuesMatch})
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
                }else{
                    marker.setVisible(false);
                }
            })
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
                <div className="results">
                {this.props.venues.map !== 0 && (
                    <ul className="venue-results">
                        {this.props.venues.map((venue, index) => (
                            <li 
                                key={index}
                                tabIndex={index}
                                className="venue" 
                                role="button"
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