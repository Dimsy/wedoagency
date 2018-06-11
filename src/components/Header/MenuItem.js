import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import $ from "jquery";

class MenuItem extends Component{

    state = {
        showVeil: false
    }

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.redirectToLink = this.redirectToLink.bind(this);
    }

    redirectToLink() {
        const { url } = this.props.item;
        //const link = `/portfolio${url}`;
        window.location.href = url
    }

    handleClick (e) {
        if (e.defaultPrevented) {
            return;
        }
        e.preventDefault();
        this.setState({showVeil: true});
        setTimeout(this.redirectToLink, 2000);
    }

    componentWillUpdate(nextProps, nextState) {
        if (nextState.showVeil === true) {
            $("#veil").removeClass("fadeout").addClass("fadein");
        }
    }

	render(){
		const {item, closeMenu} = this.props

		return(
			<Link to={item.url} onClick={this.handleClick}>
				{item.title}
	 		</Link>
		)
	}
}

export default MenuItem;