import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';
import {loadPortfolio} from '../../ducks/portfolio.js';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, Image } from 'pure-react-carousel';
import Loader from '../Loader';
import ErrorCmp from '../ErrorCmp';
import 'pure-react-carousel/dist/react-carousel.es.css';

class Portfolio extends Component{

	componentDidMount(){
        const useLang = this.props.useLang;
		this.props.loadPortfolio(useLang);
	}

	componentWillReceiveProps(nextProps){
		if(this.props.useLang != nextProps.useLang)
			this.props.loadPortfolio(nextProps.useLang)
	}

	render(){

		const {useLang, entities, error, loading} = this.props;

		if (loading) return <Loader />;
		if (error) return (<ErrorCmp error={error} />);			

		const data = entities.data;
		
		// const body = data.map( item => {
		// 	<div></div>
		// });

//<Image src="http://test.wedoagency.ru/wp-content/uploads/Portfolio/Alena_Sergey/Alena_Sergey.jpg" 
        			// 				 srcSet="http://test.wedoagency.ru/wp-content/uploads/Portfolio/Alena_Sergey/Alena_Sergey@2x.jpg 2x"
      					// 	   	 isBgImage="true"
      						   	 
      					// />	
		return (
			<div className='portfolio'>
			<CarouselProvider naturalSlideWidth={327} naturalSlideHeight={411} totalSlides={10} visibleSlides={3}>
			<Grid>
				<Row>
					<Col md={9}>
					<h1>Portfolio</h1>
					</Col>
					<Col md={3} className="SliderButtons">
						<ButtonNext><img src="../img/slider/next.svg"/></ButtonNext>
						<ButtonBack><img src="../img/slider/back.svg"/></ButtonBack>
						<div className="clear"/>
        	</Col>
				</Row>
				<Row>
        	<Col md={12}>
						<Slider>
        			<Slide index={0}>
        				<img src="http://test.wedoagency.ru/wp-content/uploads/Portfolio/Alena_Sergey/Alena_Sergey.jpg" 
        						 srcSet="http://test.wedoagency.ru/wp-content/uploads/Portfolio/Alena_Sergey/Alena_Sergey@2x.jpg 2x"/>
        			</Slide>
        			<Slide index={1}>
        				<img src="http://test.wedoagency.ru/wp-content/uploads/Portfolio/Alena_Sergey/Alena_Sergey.jpg" 
        						 srcSet="http://test.wedoagency.ru/wp-content/uploads/Portfolio/Alena_Sergey/Alena_Sergey@2x.jpg 2x"/>
        			</Slide>
        			<Slide index={2}>
        				<img src="http://test.wedoagency.ru/wp-content/uploads/Portfolio/Alena_Sergey/Alena_Sergey.jpg" 
        						 srcSet="http://test.wedoagency.ru/wp-content/uploads/Portfolio/Alena_Sergey/Alena_Sergey@2x.jpg 2x"/>
        			</Slide>
        			<Slide index={3}>
        				<img src="http://test.wedoagency.ru/wp-content/uploads/Portfolio/Alena_Sergey/Alena_Sergey.jpg" 
        						 srcSet="http://test.wedoagency.ru/wp-content/uploads/Portfolio/Alena_Sergey/Alena_Sergey@2x.jpg 2x"/>
        			</Slide>
        			<Slide index={4}>
        				<img src="http://test.wedoagency.ru/wp-content/uploads/Portfolio/Alena_Sergey/Alena_Sergey.jpg" 
        						 srcSet="http://test.wedoagency.ru/wp-content/uploads/Portfolio/Alena_Sergey/Alena_Sergey@2x.jpg 2x"/>
        			</Slide>
        			<Slide index={5}>
        				<img src="http://test.wedoagency.ru/wp-content/uploads/Portfolio/Alena_Sergey/Alena_Sergey.jpg" 
        						 srcSet="http://test.wedoagency.ru/wp-content/uploads/Portfolio/Alena_Sergey/Alena_Sergey@2x.jpg 2x"/>
        			</Slide>
        			<Slide index={6}>
        				<img src="http://test.wedoagency.ru/wp-content/uploads/Portfolio/Alena_Sergey/Alena_Sergey.jpg" 
        						 srcSet="http://test.wedoagency.ru/wp-content/uploads/Portfolio/Alena_Sergey/Alena_Sergey@2x.jpg 2x"/>
        			</Slide>
        			<Slide index={7}>
        				<img src="http://test.wedoagency.ru/wp-content/uploads/Portfolio/Alena_Sergey/Alena_Sergey.jpg" 
        						 srcSet="http://test.wedoagency.ru/wp-content/uploads/Portfolio/Alena_Sergey/Alena_Sergey@2x.jpg 2x"/>
        			</Slide>
        			<Slide index={8}>
        				<img src="http://test.wedoagency.ru/wp-content/uploads/Portfolio/Alena_Sergey/Alena_Sergey.jpg" 
        						 srcSet="http://test.wedoagency.ru/wp-content/uploads/Portfolio/Alena_Sergey/Alena_Sergey@2x.jpg 2x"/>
        			</Slide>
        			<Slide index={9}>
        				<img src="http://test.wedoagency.ru/wp-content/uploads/Portfolio/Alena_Sergey/Alena_Sergey.jpg" 
        						 srcSet="http://test.wedoagency.ru/wp-content/uploads/Portfolio/Alena_Sergey/Alena_Sergey@2x.jpg 2x"/>
        			</Slide>
        		</Slider>
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
		entities: state.portfolio.entities,
		loading: state.agencyInfo.loading,
		error: state.agencyInfo.error
	}
}

export default connect(mapStateToProps, {loadPortfolio})(Portfolio)