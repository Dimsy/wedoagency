import React, {Component} from 'react'
import VeilWorkaround from '../VeilWorkaround/VeilWorkaround';
import Header from '../Header'
import {Link} from 'react-router-dom'
import $ from "jquery";

class PortfolioItem extends Component{

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
        const { item } = this.props;
        const link = `/portfolio/${item.id}`;
        window.location.href = link
	}

    handleClick (e) {
		console.log("click click")
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
            $("#veilLogo").removeClass("fadeout").addClass("fadeinSlow");
        }
	}

	render(){
		const { item } = this.props;

		const body =
			<div className="portfolioItem__Info">
				<div className="portfolioItem__info-data">{item.title.rendered}</div>
				<div className="news__info-itemdata ">{item.acf.DataOfFinnish}</div>
			</div>;

		return (
			<div>
				<VeilWorkaround/>
				<Link to={`/portfolio/${item.id}`} onClick={this.handleClick}>
					<div className="portfolioItem__wrapper"  onClick={this.handleClick} onMouseEnter={this.handlerMouseEnter} onMouseLeave={this.handlerMouseLeave}>
						<img src={item.acf.StartFoto} srcSet={item.acf.StartFotox2} className="portfolioItem__img"/>
						{body}
					</div>
				</Link>
			</div>	
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

export default PortfolioItem