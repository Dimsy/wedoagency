import React, {Component} from 'react';
import Kids from '../Kids/kids';

class RouteKids extends Component{
    render (){
        return (
            <div>
                <Kids location={this.props.location} match={this.props.match}/>
            </div>
        )
    }
}

export default RouteKids