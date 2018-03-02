import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';
import {loadNews} from '../../ducks/news';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, Image } from 'pure-react-carousel';
import NewsInfo from './NewsInfo'
import Loader from '../Loader';
import ErrorCmp from '../ErrorCmp';
import 'pure-react-carousel/dist/react-carousel.es.css';
import {OrderedSet} from 'immutable';
import {PATH} from '../../config'

class News extends Component{

	componentDidMount(){
    const { useLang, entities } = this.props;

    if ( entities.size == 0){
			this.props.loadNews(useLang);
    }
	}

	componentWillReceiveProps(nextProps){
		if(this.props.useLang != nextProps.useLang){
			this.props.loadNews(nextProps.useLang);
		}
	}

	render(){

		const {useLang, entities, catName, error, loading} = this.props;

		if (loading) return <Loader />;
		if (error) return (<ErrorCmp error={error} />);			


		const posts = entities.toArray();

		const body = posts.map( (item) => <Slide key={item.id} index={item.id}>
		  																	<NewsInfo item={item}/>
		 																	</Slide>
																		);

		const opacity = body.length > 3 ? {opacity: "1"} : {opacity: "0.3"}
		
		return (
			<div className='news'>
				<CarouselProvider naturalSlideWidth={327} naturalSlideHeight={307} totalSlides={body.length} visibleSlides={3}>
					<Grid>
						<Row>
							<Col md={9}>
							<h1>{catName}</h1>
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
		entities: state.news.entities,
		catName: state.news.catName,
		loading: state.news.loading,
		error: state.news.error
	}
}

export default connect(mapStateToProps, {loadNews})(News)