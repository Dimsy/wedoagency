import React, {Component} from 'react'
import VeilWorkaround from '../VeilWorkaround/VeilWorkaround';
import {Link} from 'react-router-dom'
import $ from "jquery";
import {connect} from "react-redux";

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
        const link = item.link;
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
            $("#veilLogo").removeClass("fadeout").addClass("fadeinSlow");
        }
	}

	render(){
		const { item, useLang } = this.props;
        const link = item.link;

		const itemTitle = useLang === 'ru' ? item.title.rendered : item.acf.titleEn;

		const body =
			<div className="portfolioItem__Info">
				<div className="portfolioItem__info-data">{itemTitle}</div>
				<div className="news__info-itemdata ">{item.acf.DataOfFinnish}</div>
			</div>;

		return (
			<div>
				<VeilWorkaround/>
				<Link to={link} onClick={this.handleClick}>
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

const mapStateToProps = state => {
    return {
        useLang: state.lang.useLang
    }
};

export default connect(mapStateToProps, {})(PortfolioItem);
