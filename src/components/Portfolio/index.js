import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';
import {loadPortfolio} from '../../ducks/portfolio.js';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, Image } from 'pure-react-carousel';
import PortfolioItem from './PortfolioItem';
import Loader from '../Loader';
import ErrorCmp from '../ErrorCmp';
import {PATH} from '../../config'

class Portfolio extends Component{

	componentDidMount(){
    const useLang = this.props.useLang;
		this.props.loadPortfolio(useLang);
	}

	componentWillReceiveProps(nextProps){
		if(this.props.useLang != nextProps.useLang){
			this.props.loadPortfolio(nextProps.useLang)
    }
	}

	render(){

		const {useLang, entities, error, loading, catName} = this.props;

		if (loading) return <Loader />;
		if (error) return (<ErrorCmp error={error} />);			

		
		const body = entities.data.map( (item) => 
      <Slide key={item.id} index={item.id}>
        <PortfolioItem item={item}/>
      </Slide>
     )

		return (
			<div className='portfolio'>
		  	<CarouselProvider naturalSlideWidth={327} naturalSlideHeight={411} totalSlides={body.length} visibleSlides={3}>
			    <Grid>
			 	    <Row>
					    <Col md={9}>
					      <h1>{catName}</h1>
					    </Col>
					    <Col md={3} className="SliderButtons">
						    <ButtonNext><img src={`${PATH}/img/slider/next.svg`}/></ButtonNext>
						    <ButtonBack><img src={`${PATH}/img/slider/back.svg`}/></ButtonBack>
						    <div className="clear"/>
        	    </Col>
				    </Row>
				    <Row>
        	    <Col md={12}>
						    <Slider>
                  {body}
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
    catName: state.portfolio.catName,
		loading: state.portfolio.loading,
		error: state.portfolio.error
	}
}

export default connect(mapStateToProps, {loadPortfolio})(Portfolio)