import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import $ from "jquery";
import {connect} from "react-redux";
import {loadPortfolio} from "../../ducks/portfolio";

class NewsItem extends Component {
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
        const link = `./news/${item.id}`;
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
		const {item, useLang} = this.props;
		const date =  new Date(item.date);
		
		var options = {
		  day: 'numeric',
		  month:  'numeric',
		  year: 'numeric'
		};

		const title = useLang === 'ru' ? item.title.rendered : item.acf.titleEn;

		const body = <div className="news__Info">
								   <div className="news__info-item">{title}</div>
								   <div className="news__info-itemdata ">{ date.toLocaleString( 'en-GB', options)}</div>
					 </div>;

		return(
			<div className="news__wrapper" onMouseEnter={this.handlerMouseEnter} onMouseLeave={this.handlerMouseLeave}>
				<Link to={`./news/${item.id}`} onClick={this.handleClick}>
		 			<img src={item.acf.StartFoto} srcSet={item.acf.StartFotox2} className="news__img"/>
		 			{body}
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

export default connect(mapStateToProps, {})(NewsItem)