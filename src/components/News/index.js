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
import './news.css';
import moment from 'moment';
import $ from "jquery";
import {Link} from 'react-router-dom';

class News extends Component{
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
        const link = `/news`;
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

    sortBody = (a, b) => {
    	console.log('a,b')
    	console.log(a,b)
        const aDate = a.date;
        const bDate = b.date;

        if (aDate === bDate) return 0;
        var aNumberForCompare = moment(aDate.split('/').reverse().join('-'));
        var bNumberForCompare = moment(bDate.split('/').reverse().join('-'));

        return aNumberForCompare.isAfter(bNumberForCompare) ? -1 : 1;
        //return aNumberForCompare > bNumberForCompare ? -1 : (aNumberForCompare < bNumberForCompare ? 1 : 0);
    }

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

		console.log(entities)
		const posts = entities.toArray().sort(this.sortBody);
		console.log(posts)
		const body = posts.map( (item) => <Slide key={item.id} index={item.id}>
		  																	<NewsInfo item={item}/>
		 																	</Slide>
																		);
		console.log(body)

		const opacity = body.length > 3 ? {opacity: "1"} : {opacity: "0.3"}
        const mobile = window.innerWidth < 768 ? true : false;

		const pcButtonsBlock =	<Row>
									<Col  sm={6} md={8}>
										<h1>{catName}</h1>
									</Col>
									<Col  sm={6} md={4} className="SliderButtons">
										<ButtonNext>
											<img src={`${PATH}/img/slider/next.svg`} style={opacity}/>
										</ButtonNext>
										<ButtonBack>
											<img src={`${PATH}/img/slider/next.svg`} className="sliderButtonsOpacityRevert" style={opacity}/>
										</ButtonBack>
										<div className="clear"/>
									</Col>
								</Row>;

        const mobileButtonsBlock =	<Row className="no-gutters">
										<div style={{width: "60%"}}>
											<h1>{catName}</h1>
										</div>
										<div style={{width: "40%"}}>
											<div className="SliderButtonsPortfolio SliderButtonsPortfolioDropRight" style={{paddingRight: "0px", display: "block"}}>
												<ButtonNext style={{paddingLeft: "0px",paddingRight: "0px", marginLeft: "10px"}}>
													<img src={`${PATH}/img/slider/arrow.png`} style={opacity}/>
												</ButtonNext>
												<ButtonBack>
													<img src={`${PATH}/img/slider/arrow.png`} className="sliderButtonsOpacityRevert" style={opacity}/>
												</ButtonBack>
												<div className="clear"/>
											</div>
										</div>
									</Row>;

		return (
			<div className='news newsFadeIn'>
				<CarouselProvider naturalSlideWidth={327} naturalSlideHeight={307} totalSlides={mobile ? body.length+2 : body.length} visibleSlides={3} touchEnabled={false}>
					<Grid>
                        {mobile ? mobileButtonsBlock : pcButtonsBlock}
						<Row className="newsSlider">
							<Col md={12} className="newsHidderPosition">
								<Slider>
									{body}
								</Slider>
								<div className="hidder" />
								<Link to='/news' className="knowMore" onClick={this.handleClick}>Смотреть все</Link>
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