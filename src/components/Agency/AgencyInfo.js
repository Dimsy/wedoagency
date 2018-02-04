import React, {Component} from 'react';
import {connect} from 'react-redux';
import {loadAgencyInfo} from '../../ducks/agencyInfo.js';
import Loader from '../Loader';
import ErrorCmp from '../ErrorCmp';
import {Link} from 'react-router-dom';

class AgencyInfo extends Component{

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
		const {entities, loading, error} = this.props;

		if (loading) return <Loader />;
		if (error) return (<ErrorCmp error={error} />);												
	
		return (
			<div>
				<h1>{entities.data.title.rendered}</h1>
				<p>{entities.data.content.rendered}</p>
				<Link to='#agency' className="knowMore">{entities.data.acf.knowMore}</Link>
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
