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
        let allVenues= this.props.venues
        let venuesMatch

        /*Referenced to https://remotebase.io/blog/implementing-technology-search/ 
        to implement RegExp*/
        if(this.state.query) {
            const match = new RegExp(escapeRegExp(query), 'i');
            venuesMatch = allVenues.filter((venue) => match.test(venue.venue.name))
            this.setState({venues: venuesMatch})
            this.props.filterVenues(venuesMatch)
        } else {
            this.setState({venues: allVenues})
        }

    }
            
 
   render() {
    //const{venues}=this.props
        return(
                    <div className="search-venues-bar">
                    <div className="search-venues-input-wrapper">
                      <input type="text" placeholder="Search coffee venues" value={ this.state.query } onChange={(event) => this.getInputData(event.target.value)} 
                      />
                    </div>
                  </div>
       )

   }
     
} 

export default Menu