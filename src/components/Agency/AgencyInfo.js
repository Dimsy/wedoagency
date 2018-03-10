import React, {Component} from 'react';
import {connect} from 'react-redux';
import {loadAgencyInfo} from '../../ducks/agencyInfo.js';
import Loader from '../Loader';
import ErrorCmp from '../ErrorCmp';
import {Link} from 'react-router-dom';

class AgencyInfo extends Component{

	// componentDidMount(){
	// 	const useLang = this.props.useLang;
	// 	this.props.loadAgencyInfo(useLang);
	// }
	
	// componentWillReceiveProps(nextProps){
	// 	if(this.props.useLang != nextProps.useLang){
	// 		this.props.loadAgencyInfo(nextProps.useLang);
	// 	}
	// }


	render(){
		 const {useLang, entities, loading, error} = this.props;

		// if (loading) return <Loader />;
		// if (error) return (<ErrorCmp error={error} />);		

		// if( Object.keys(entities.data).length ==0 ){
		// 	return <div>Данные врененно не доступны</div>
		// }

		const knowMore = useLang == "ru" ? "Узнать больше" : "Know more"								
	
		return (
			<div className="AgencyMainPageBlock">
				<h1>{entities.title.rendered}</h1>
				<p>{entities.content.rendered}</p>
				<Link to='/agency' className="knowMore">{knowMore}</Link>
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

export default connect(mapStateToProps, {loadAgencyInfo})(AgencyInfo)
