import React, {Component} from 'react';
import Kids from '../Kids/kids';
import Footer from '../Footer';

class RouteKids extends Component{
    render (){
        return (
            <div>
                <Kids location={this.props.location} match={this.props.match}/>
                <Footer/>
            </div>
        )
    }
}

export default RouteKids