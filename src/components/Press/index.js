import React, {Component} from 'react';
import {connect} from 'react-redux';
import {loadPress} from '../../ducks/press.js';
import { Grid, Row, Col } from 'react-bootstrap';
import Loader from '../Loader';
import ErrorCmp from '../ErrorCmp';
import {Link} from 'react-router-dom';

class Press extends Component{
	constructor() {
	  super();
	  this.state = {
	    width: 'auto',
	    height: 'auto'
	  }
	}

	componentDidMount(){
		const useLang = this.props.useLang;
		this.props.loadPress(useLang);
		window.addEventListener("resize", this.updateDimensions.bind(this));
	}

	componentWillReceiveProps(nextProps){
		if(this.props.useLang != nextProps.useLang){
			 this.props.loadPress(nextProps.useLang);
		}
	}

	componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }

  updateDimensions() {
    this.setState({
    	width: window.innerWidth, 
    	height: window.innerHeight
    });
  }

	render(){

		const {entities, loading, error, useLang} = this.props;

		if (loading) return <Loader />;
		if (error) return (<ErrorCmp error={error} />);

		if (pressList === undefined) {
			return <div>Данные пока не доступны</div>
		}
        const {response, pressList} = entities;
		const knowMore = useLang == "ru" ? "Узнать больше" : "Know more"		

		const mobile = window.innerWidth < 768 ? true : false

		const mobileHeader = mobile ? <Row>
																		<div className="col-12">
																			<h1>{response.title.rendered}</h1>
																		</div>	
																	</Row>
																: null

		const desktopHeader = mobile ? null
																 : <h1>{response.title.rendered}</h1>

		const desktopSlogan = mobile ? null 
																 : <h3 className="press__slogan-small">{response.acf.slogan3}</h3>

		const pressVideo = `https://player.vimeo.com/video/${response.acf.video}`

		const screenBlock =
            <Grid>
                {mobileHeader}
                <Row>
                    <div className="col-sm-6 col-md-3 pressImg1">
						{response.acf.smallImg2x &&
                        <img src={response.acf.smallImg} srcSet={`${response.acf.smallImg2x} 2x`} alt="Изображение для прессы"/>}
                        {desktopSlogan}
                    </div>
                    <div className="col-sm-6 col-md-5 pressImg2">
                        {response.acf.bigImg &&
                        <img src={response.acf.bigImg} srcSet={`${response.acf.bigImg2x} 2x`} alt="Изображение для прессы"/>}
                    </div>
                    <div className="col-sm-12 col-md-4">
                        {desktopHeader}
                        <div dangerouslySetInnerHTML={{ __html:  response.content.rendered }} />
                        <Link to='/press' className="knowMore">{knowMore}</Link>
                    </div>
                </Row>
            </Grid>;

        const mobileBlock =
            <Grid>
                {mobileHeader}
                <Row className="dropFlex">
                    <div className="col-sm-6 col-md-3 pressImg1">
                        {response.acf.smallImg2x &&
                        <img src={response.acf.smallImg} srcSet={`${response.acf.smallImg2x} 2x`} alt="Изображение для прессы"/>}
                        {desktopSlogan}
                    </div>
                    <div className="col-sm-6 col-md-5 pressImg2">
                        {response.acf.bigImg &&
                        <img src={response.acf.bigImg} srcSet={`${response.acf.bigImg2x} 2x`} alt="Изображение для прессы"/>}
                    </div>
				</Row>
				<Row>
                    <div className="col-sm-12 col-md-4">
                        {desktopHeader}
                        <div dangerouslySetInnerHTML={{ __html:  response.content.rendered }} />
                        <Link to='/press' className="knowMore">{knowMore}</Link>
                    </div>
                </Row>
            </Grid>;

		return (
			<div className="press">
	
				<h2 className="slogan">{response.acf.slogan1}</h2>
				<h2 className="slogan">{response.acf.slogan2}</h2>

				
				<Grid>
					<Row>
						<div className="col-sm-12 embed-responsive embed-responsive-16by9 showVideo">
							<iframe src={pressVideo} frameBorder="0" 
									allowFullScreen className="embed-responsive-item" style={{paddingLeft: "15px", paddingRight: "15px"}}/>
						</div>
					</Row>
				</Grid>
				{mobile ? mobileBlock : screenBlock}

			</div>
		)
	}

  
}

const mapStateToProps = state => {
	return {
		useLang: state.lang.useLang,
		entities: state.press.entities,
		pressList: state.pressList.entities,
		loading: state.press.loading,
		error: state.press.error
	}
}

export default connect(mapStateToProps, {loadPress})(Press);