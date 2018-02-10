import React, {Component} from 'react';
import {connect} from 'react-redux';
import {loadSocialFooter} from '../../ducks/socialFooter.js';
import Loader from '../Loader';
import ErrorCmp from '../ErrorCmp';
import {PATH} from '../../config';

class SocialFooter extends Component{
	componentDidMount(){
		this.props.loadSocialFooter();
	}

	render(){
		const {social, loading, error} = this.props;

		if (loading) return <Loader />;
		if (error) return (<ErrorCmp error={error} />);			

		console.log("social", social);

		const body = social.map(item => <li key={item.ID} className={item.title}>
																			<a href={item.url} target="blank">
																				<img src={`${PATH}/img/social/footer/${item.title}.svg`} />
																			</a>
																		</li>)

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