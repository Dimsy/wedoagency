import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import $ from "jquery";

class PressItem extends Component{
    state = {
        show: false,
        showVeil: false
    }

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.redirectToLink = this.redirectToLink.bind(this);
    }

    redirectToLink() {
        const { item, match } = this.props;
        const link = `${match.path}/${item.id}`;
        window.location.href = link
    }

    handleClick (e) {
        if (e.defaultPrevented) {
            return;
        }
        e.preventDefault();
        this.setState({showVeil: true});
        setTimeout(this.redirectToLink, 3000);
    }

    componentWillUpdate(nextProps, nextState) {
        if (nextState.showVeil === true) {
            $("#veil").removeClass("fadeout").addClass("fadeinSlow");
        }
    }

	render(){
		const {item, match } = this.props
	
		const background = {
			backgroundImage: `-webkit-image-set( url(${item.acf.foto}) 1x, url(${item.acf.Fotox2}) 2x )`,
			backgroundImage: `-moz-image-set( url(${item.acf.foto}) 1x, url(${item.acf.Fotox2}) 2x )`,
			backgroundImage: `-o-image-set( url(${item.acf.foto}) 1x, url(${item.acf.Fotox2}) 2x )`,
			backgroundImage: `-ms-image-set( url(${item.acf.foto}) 1x, url(${item.acf.Fotox2}) 2x )`,
			backgroundImage: `url(${item.acf.foto})`
		};	

		/*const body = window.innerWidth > 768 ? <div className="pressItem__Inner">
																						 	<div className="pressItem__Inner-title">
																						  	{item.title.rendered}
																							</div>
																							<div className="pressItem__Inner-date">
																								{item.acf.date}
																							</div>
																						</div>
																				 : null;*/


		const body =
			<div className="pressItem__Inner">
				<div className="pressItem__Inner-title">
					{item.title.rendered}
				</div>
				<div className="pressItem__Inner-date">
					{item.acf.date}
				</div>
        	</div>;
									
		return (
				<Link to={`${match.path}/${item.id}`} onClick={this.handleClick}>
					<div className="pressItem" style={background} onMouseEnter={this.handlerMouseEnter} onMouseLeave={this.handlerMouseLeave}>
						{body}
					</div>
				</Link>
		)
	}

	handlerMouseEnter = e => {
			this.setState({
				show: true
			})
		}

	handlerMouseLeave = e => {
		this.setState({
			show: false
		})
	}
}

export default PressItem