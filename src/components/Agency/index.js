import React, {Component} from 'react';
import { Grid, Row, Col, Clearfix } from 'react-bootstrap';
import Loader from '../Loader';
import ErrorCmp from '../ErrorCmp';
import {connect} from 'react-redux'
import {loadAgencyInfo} from '../../ducks/agencyInfo.js'
import {Link} from 'react-router-dom';

class Agency extends Component{
	componentDidMount(){
		const useLang = this.props.useLang;
		this.props.loadAgencyInfo(useLang);
	}
	
	componentWillReceiveProps(nextProps){
		if(this.props.useLang != nextProps.useLang){
			this.props.loadAgencyInfo(nextProps.useLang);
		}
	}

	render(){

		const {useLang, entities, loading, error} = this.props;

		if (loading) return <Loader />;
		if (error) return (<ErrorCmp error={error} />);		

		if( Object.keys(entities).length ==0 ){
			return <div>Данные врененно не доступны</div>
		}
	
		const knowMore = useLang == "ru" ? "Узнать больше" : "Know more"

		return (
			<div className="agency">
			  <div className="agency__title">
			  	<h1>{entities.title.rendered}</h1>
				</div>
				<div className="agency__foto">
					<img src={entities.acf.agencyPhoto} srcSet={entities.acf.agencyPhotox2} />
			 	</div>
			 	<div className="agency__content">
			 		<p>{entities.content.rendered}</p>
					<Link to='/agency' className="knowMore">{knowMore}</Link>
				</div>
				<div className="clear" />
			</div>
	
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
