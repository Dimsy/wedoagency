import React, {Component} from 'react';
import {connect} from 'react-redux';
import {loadSocialFooter} from '../../ducks/socialFooter.js';
import Loader from '../Loader';
import ErrorCmp from '../ErrorCmp';
import {PATH} from '../../config';
import SocialMenuItem from '../SocialMenuItem'

class SocialFooter extends Component{
	
	render(){
		const {social, loading, error} = this.props;

		if (loading) return <Loader />;
		if (error) return (<ErrorCmp error={error} />);		

		const body = social.map(item => <SocialMenuItem item={item} key={item.ID}/>)

		return (
			<ul className="socialFooter">
				{body}
			</ul>
		)
	}
}

const mapStateToProps = state => {
	return {
		social: state.socialFooter.entities,
		loading: state.socialFooter.loading,
		error: state.socialFooter.error
	}
}

export default connect(mapStateToProps, {loadSocialFooter})(SocialFooter);