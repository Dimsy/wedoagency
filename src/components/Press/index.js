import React, {Component} from 'react';
import {connect} from 'react-redux';
import {loadPress} from '../../ducks/video.js';
import Loader from '../Loader';
import ErrorCmp from '../ErrorCmp';

class Video extends Component{

	componentDidMount(){
		console.log("did mount");
		const useLang = this.props.useLang;
		this.props.loadPress(useLang);
	}

	componentWillReceiveProps(nextProps){
		if(this.props.useLang != nextProps.useLang);
			// this.props.loadVideo(nextProps.useLang);
	}

	render(){

		const {entities, loading, error} = this.props;

		if (loading) return <Loader />;
		if (error) return (<ErrorCmp error={error} />);				
		
		return (
			<div className="video">
				<h2 className="slogan">{entities.data.acf.slogan1}</h2>
				<h2 className="slogan">{entities.data.acf.slogan2}</h2>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		useLang: state.lang.useLang,
		entities: state.video.entities,
		loading: state.video.loading,
		error: state.video.error
	}
}

export default connect(mapStateToProps, {loadPress})(Video);