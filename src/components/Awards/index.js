import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';
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
        																<AwardsItem item={item} />
																			</Slide>)

		const opacity = body.length > 3 ? {opacity: "1"} : {opacity: "0.3"}

		return (
			<div className='portfolio'>
		  	<CarouselProvider naturalSlideWidth={327} naturalSlideHeight={411} totalSlides={3} visibleSlides={3}>
			    <Grid>
			 	    <Row>
					    <Col md={9}>
					      <h1 className="marginLeft10px">{catName}</h1>
					    </Col>
					  	<Col md={3} className="SliderButtons">
						    <ButtonNext>
						    	<img src={`${PATH}/img/slider/next.svg`} style={opacity}/>
						    </ButtonNext>
						    <ButtonBack>
						    	<img src={`${PATH}/img/slider/next.svg`} className="sliderButtonsOpacityRevert" style={opacity}/>
						    </ButtonBack>
						    <div className="clear"/>
        	    </Col>
				    </Row>
				    <Row>
        	    <Col md={12} className="hidePixelsWrapper">
						    <Slider>
                  {body}
        		    </Slider>
        		    <div className="hidePixels" />
        	    </Col>
            </Row>				
				  </Grid>	
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
