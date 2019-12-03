import React, {Component} from 'react';
import {connect} from 'react-redux';
import {loadAwards} from '../../ducks/awards.js';
import AwardsItem from './AwardsItem'
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, Image } from 'pure-react-carousel';	
import Loader from '../Loader';
import ErrorCmp from '../ErrorCmp';
import {PATH} from '../../config'

class Awards extends Component{

	componentDidMount(){
    const { useLang } = this.props
		
		this.props.loadAwards(useLang);
	}

	componentWillReceiveProps(nextProps){
		if(this.props.useLang != nextProps.useLang){
			this.props.loadAwards(nextProps.useLang)
    }
	}

	render(){

		const {useLang, entities, error, loading, catName, match} = this.props;

		if (loading) return <Loader />;
		if (error) return (<ErrorCmp error={error} />);			

		if (entities.length == 0){
			return <div>Данные временно не доступны</div>
		}

		const body = entities.map(item => <Slide key={item.id} index={item.id}>
        																<AwardsItem item={item} useLang={useLang} />
																			</Slide>)
        const isMobile = window.innerWidth < 768 ? true : false;
		const opacity = body.length > 3 ? {display: "block"} : {display: "none"}

		const slideCount = window.innerWidth < 576 ? body.length + 1 : body.length

        const mobileButtonsStyle = {
            display: "block"
        };

        const pcButtonsBlock =	<div className='row no-gutters'>
									<div className="col-sm-8">
										<h1 className='portfolio__title' style={{marginLeft: '10px'}}>{catName}</h1>
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

        const mobileButtonsBlock =	<div className='row no-gutters'>
										<div style={{width: "60%"}}>
											<h1 className='portfolio__title' style={{marginLeft: '10px'}}>{catName}</h1>
										</div>
										<div style={{width: "40%"}}>
											<div className="SliderButtonsPortfolio col-md-4 col-sm-6" style={mobileButtonsStyle}>
												<ButtonNext style={{paddingLeft: "0px", marginLeft: "10px", paddingRight: "0px"}}>
													<img src={`${PATH}/img/slider/arrow.png`} style={opacity}/>
												</ButtonNext>
												<ButtonBack>
													<img src={`${PATH}/img/slider/arrow.png`} className="sliderButtonsOpacityRevert" style={opacity}/>
												</ButtonBack>
												<div className="clear"/>
											</div>
										</div>
									</div>;

		return (
			<div className='portfolio awards'>
		  	<CarouselProvider naturalSlideWidth={327} naturalSlideHeight={411} totalSlides={slideCount} visibleSlides={3}  touchEnabled={false}>
			    <div className="container">
					{isMobile ? mobileButtonsBlock : pcButtonsBlock}
				    <div className="row awards__slide portfolioSlider">
						<div className="col-md-12 hidePixelsWrapper">
							<Slider>
						  		{body}
							</Slider>
							<div className="hidePixels" />
						</div>
					</div>
				  </div>	
				</CarouselProvider>
			</div>	
		)	
	}
}

const mapStateToProps = state => {
	return {
		useLang: state.lang.useLang,
		catName: state.awards.catName,
		entities: state.awards.entities,
		loading: state.awards.loading,
		error: state.awards.error
	}
}

export default connect(mapStateToProps, {loadAwards})(Awards)
