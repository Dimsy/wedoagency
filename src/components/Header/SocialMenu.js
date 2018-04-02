import React, {Component} from 'react';
import {connect} from 'react-redux';
import Loader from '../Loader';
import ErrorCmp from '../ErrorCmp';
import {PATH} from '../../config';
import SocialMenuItem from '../SocialMenuItem'

class SocialMenu extends Component{

	render(){
		const {social, loading, error} = this.props;

		if (loading) return <Loader />;
		if (error) return (<ErrorCmp error={error} />);			


		const body = social.map(item => <SocialMenuItem item={item} key={item.ID}/>)
		

		// const body = social.map(item => <li key={item.ID} className={item.title}>
		// 																	<a href={item.url} target="blank">
		// 																		<img src={`${PATH}/img/social/footer/${item.title}.svg`} />
		// 																	</a>
		// 																</li>)
		
		return (
			<ul className="headerSocialMenu">
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

export default connect(mapStateToProps)(SocialMenu);