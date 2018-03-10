import React, {Component} from 'react';
import { Grid, Row, Col, Clearfix } from 'react-bootstrap';
import Loader from '../Loader';
import ErrorCmp from '../ErrorCmp';
import {connect} from 'react-redux'
import {loadAgencyInfo} from '../../ducks/agencyInfo.js'
import {Link} from 'react-router-dom';
import AgencyInfo from './AgencyInfo';

class Agency extends Component{
	constructor() {
   super();
    this.state = {
      width: 'auto',
      height: 'auto'
    }
  }

	componentDidMount(){
		const useLang = this.props.useLang;
		this.props.loadAgencyInfo(useLang);
		window.addEventListener("resize", this.updateDimensions.bind(this));
	}
	
	componentWillReceiveProps(nextProps){
		if(this.props.useLang != nextProps.useLang){
			this.props.loadAgencyInfo(nextProps.useLang);
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

		const {useLang, entities, loading, error} = this.props;

		if (loading) return <Loader />;
		if (error) return (<ErrorCmp error={error} />);		

		if( Object.keys(entities).length ==0 ){
			return <div>Данные врененно не доступны</div>
		}
	
		const mobile = window.innerWidth < 768 ? true : false
 		const knowMore = useLang == "ru" ? "Узнать больше" : "Know more"


		const headerMobile = mobile ? <Row>
																		<Col sm={12}>
																			<h1>{entities.title.rendered}</h1>
																		</Col>
																	</Row>
																: null
	
		const headerDesktop = !mobile ?	<h1>{entities.title.rendered}</h1> : null																

		return (
			
			<Grid className="agency">
			{headerMobile}
 			<Row>
 				<Col sm={12} md={5} lg={5} lgOffset={1} className="agencyImg">
 						<img src={entities.acf.agencyPhoto} srcSet={`${entities.acf.agencyPhotox2} 2x`} alt="Изображение для прессы"/>
 				</Col>
 				<Col sm={12} md={6} lg={5} className="offset-lg-1">
 					{headerDesktop}
					<p>{entities.content.rendered}</p>
					<Link to='/agency' className="knowMore">{knowMore}</Link>
 				</Col>
 				<div className="clear" />
 			</Row>
 		</Grid>
	
		)
	}
}
const mapStateToProps = state => {
	return {
		useLang: state.lang.useLang,
		entities: state.agencyInfo.entities,
		loading: state.agencyInfo.loading,
		error: state.agencyInfo.error
	}
}

export default connect(mapStateToProps, {loadAgencyInfo})(Agency)
// <div className="agency">
// 			  <div className="agency__title">
// 			  	<h1>{entities.title.rendered}</h1>
// 				</div>
// 				<div className="agency__foto">
// 					<img src={entities.acf.agencyPhoto} srcSet={entities.acf.agencyPhotox2} />
// 			 	</div>
// 			 	<div className="agency__content">
// 			 		<p>{entities.content.rendered}</p>
// 					<Link to='/agency' className="knowMore">{knowMore}</Link>
// 				</div>
// 				<div className="clear" />
// 			</div>