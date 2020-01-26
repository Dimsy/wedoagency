import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import $ from "jquery";
import {connect} from "react-redux";
import {loadAgencyPage} from "../../ducks/AgencyPage";

class PortfolioListItem extends Component{
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
        //const link = `${match.path}/${item.id}`;
		const link = !!item.link ? item.link : `${match.path}/${item.id}`;
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
		const { item, match, useLang } = this.props;

		const background = {
			backgroundImage: `-webkit-image-set( url(${item.acf.StartFoto}) 1x, url(${item.acf.StartFotox2}) 2x )`,
			backgroundImage: `-moz-image-set( url(${item.acf.StartFoto}) 1x, url(${item.acf.StartFotox2}) 2x )`,
			backgroundImage: `-o-image-set( url(${item.acf.StartFoto}) 1x, url(${item.acf.StartFotox2}) 2x )`,
			backgroundImage: `-ms-image-set( url(${item.acf.StartFoto}) 1x, url(${item.acf.StartFotox2}) 2x )`,
			backgroundImage: `url(${item.acf.StartFoto})`
		};	


		if(Object.keys(item).length === 0) {
			return null
		}

		const body =  <Link to={!!item.link ? item.link : `${match.path}/${item.id}`} onClick={this.handleClick}>
										<div className="portfolioListItem__Info">
											
		 							   		<div className="portfolioItem__info-data">{useLang === 'ru' ? item.title.rendered : item.acf.titleEn}</div>
 											
 											  <div className="news__info-itemdata portfolioItem__date">
								     			{item.acf.DataOfFinnish}
								      	</div>
								    	
		 						   </div>
		 						 </Link>  

		return (
				<div className="portfolioList__item" style={background} onMouseEnter={this.handlerMouseEnter} onMouseLeave={this.handlerMouseLeave}>
					{body}
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
    return{
        useLang: state.lang.useLang
    }
}

export default connect(mapStateToProps, {  })(PortfolioListItem)