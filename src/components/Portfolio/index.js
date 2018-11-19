import React, {Component} from 'react';
import {connect} from 'react-redux';
import {loadPortfolio} from '../../ducks/portfolio.js';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, Image } from 'pure-react-carousel';
import PortfolioItem from './PortfolioItem';
import Loader from '../Loader';
import ErrorCmp from '../ErrorCmp';
import {PATH} from '../../config'
import './portfolio.css';
import {Link} from 'react-router-dom';
import $ from "jquery";

class Portfolio extends Component{
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
        this.redirectToLink = this.redirectToLink.bind(this);
    }

    state = {
        show: false,
        showVeil: false
    }

    redirectToLink() {
        const link = `/portfolio`;
        window.location.href = link
    }

    handleClick (e) {
        $("#veil").removeClass("fadeout").addClass("fadein");
        $("#veilLogo").removeClass("fadeout").addClass("fadein");
        if (e.defaultPrevented) {
            return;
        }
        e.preventDefault();
        setTimeout(this.redirectToLink, 3000);
    }

	componentDidMount(){
    const useLang = this.props.useLang;
		this.props.loadPortfolio(useLang);
	}

	componentWillReceiveProps(nextProps){
		if(this.props.useLang != nextProps.useLang){
			this.props.loadPortfolio(nextProps.useLang)
    }
	}

	sortBody = (a, b) => {
		const aDate = a.props.children.props.item.acf.DataOfFinnish
		const bDate = b.props.children.props.item.acf.DataOfFinnish

		var aNumberForCompare = aDate.split('/').reverse().join()
    	var bNumberForCompare = bDate.split('/').reverse().join()
        		
    return aNumberForCompare > bNumberForCompare ? -1 : (aNumberForCompare < bNumberForCompare ? 1 : 0);	
	}

	render(){
		const {useLang, entities, error, loading, catName, match} = this.props;

		if (loading) return <Loader />;
		if (error) return (<ErrorCmp error={error} />);
        $("#veil").removeClass('fadein').addClass("fadeout");
		const portfolioSlider = entities.toArray();

		if (portfolioSlider.length == 0){
			return <div>Данные временно не доступны</div>
		}		

		const checkId = this.props.match.params.id ? this.props.match.params.id : null;
		
		const filtredBody = portfolioSlider.filter(item => item.id != this.props.match.params.id);

		const body = filtredBody.map( (item) => <Slide key={item.id} index={item.id}>
        																					<PortfolioItem item={item} match={match}/>
																		      			</Slide>
     																					).sort(this.sortBody)

		const opacity = body.length > 3 ? {opacity: "1"} : {opacity: "0.3"}

		const title = this.selectTitle();
        const mobile = window.innerWidth < 768 ? true : false;

        const mobileButtonsStyle = {
        	display: "block"
		};

        const mobileButtonsBlock =	<div className='row no-gutters'>
										<div style={{width: "60%"}}>
                                            <h1 className='portfolio__title'>{title}</h1>
										</div>
										<div style={{width: "40%"}}>
											<div className="SliderButtonsPortfolio col-md-4 col-sm-6" style={mobileButtonsStyle}>
												<ButtonNext style={{paddingLeft: "0px", marginLeft: "10px"}}>
													<img src={`${PATH}/img/slider/arrow.png`} style={opacity}/>
												</ButtonNext>
												<ButtonBack>
													<img src={`${PATH}/img/slider/arrow.png`} className="sliderButtonsOpacityRevert" style={opacity}/>
												</ButtonBack>
												<div className="clear"/>
											</div>
										</div>
									</div>;

        const pcButtonsBlock =	<div className='row no-gutters'>
										<div className="col-sm-8">
											<h1 className='portfolio__title'>{title}</h1>
										</div>
										<div className="SliderButtonsPortfolio col-md-4 col-sm-6">
											<ButtonNext>
												<img src={`${PATH}/img/slider/next.svg`} style={opacity}/>
											</ButtonNext>
											<ButtonBack>
												<img src={`${PATH}/img/slider/next.svg`} className="sliderButtonsOpacityRevert" style={opacity}/>
											</ButtonBack>
											<div className="clear"/>
										</div>
									</div>;

		return (
			<div className='portfolio portfolioFadeIn'>

				<CarouselProvider naturalSlideWidth={327}
								  naturalSlideHeight={411}
								  lockOnWindowScroll={true}
								  totalSlides={mobile ? body.length + 2 : body.length}
								  visibleSlides={3}>
					<div className='container'>
						{mobile ? mobileButtonsBlock : pcButtonsBlock}
						 <div className='row no-gutters portfolioSlider'>
							<div className="col-md-12 hidePixelsWrapper">
								<Slider>
									{body}
								</Slider>
								<div className="hidePixels" />
							</div>
                            <Link to='/portfolio' className="knowMore" onClick={this.handleClick}>Смотреть все</Link>
						</div>
					  </div>
				</CarouselProvider>
			</div>	
		)	
	}

	selectTitle = () => {
		const {useLang, match} = this.props

		if (useLang != 'ru'){
			return match.path == '/' ? "Portfolio" : "All projects" 
		}
		
		return match.path == '/' ? 'Портфолио' : "Все проекты"
		
	}
}

const mapStateToProps = state => {
	return {
		useLang: state.lang.useLang,
		entities: state.portfolio.entities,
    catName: state.portfolio.catName,
		loading: state.portfolio.loading,
		error: state.portfolio.error
	}
}

export default connect(mapStateToProps, {loadPortfolio})(Portfolio)