import React, {Component} from 'react';
import {connect} from 'react-redux';
import {loadPress} from '../../ducks/press.js';
import { Grid, Row, Col } from 'react-bootstrap';
import Loader from '../Loader';
import ErrorCmp from '../ErrorCmp';
import {Link} from 'react-router-dom';

class Press extends Component{

	componentDidMount(){
		const useLang = this.props.useLang;
		this.props.loadPress(useLang);
	}

	componentWillReceiveProps(nextProps){
		if(this.props.useLang != nextProps.useLang){
			 this.props.loadPress(nextProps.useLang);
		}
	}

	render(){

		const {entities, loading, pressList, error, useLang} = this.props;

		if (loading) return <Loader />;
		if (error) return (<ErrorCmp error={error} />);	

		if (pressList === undefined) {
			return <div>Данные пока не доступны</div>
		}

		const knowMore = useLang == "ru" ? "Узнать больше" : "Know more"	

		// const pressItem = press.toArray()[0]

		console.log('--', pressList.toJS())
		// width="960" height="540" 
		
		return (
			<div className="press">

				<h2 className="slogan">{entities.data.acf.slogan1}</h2>
				<h2 className="slogan">{entities.data.acf.slogan2}</h2>

				<iframe src="https://player.vimeo.com/video/210199384" frameBorder="0" allowFullScreen className="showVideo"  />

				<Grid>
					<Row> 
						<Col md={3} sm={3}  className="pressImg1">
							<img src={entities.data.acf.smallImg} srcSet={`${entities.data.acf.smallImg2x} 2x`} alt="Изображение для прессы"/>
						 	<h3 className="press__slogan-small">{entities.data.acf.slogan3}</h3>
							
						</Col>
						<Col md={5} sm={5} className="pressImg2">
							<img src={entities.data.acf.bigImg} srcSet={`${entities.data.acf.bigImg2x} 2x`} alt="Изображение для прессы"/>
						</Col>
						<Col md={4} sm={4}>
							<h1>{entities.data.title.rendered}</h1>
							<p>{entities.data.content.rendered}</p>
							<Link to='./press' className="knowMore">{knowMore}</Link>
						</Col>
					</Row>
				</Grid>

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