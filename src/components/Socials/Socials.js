import React, {Component} from 'react';
import {connect} from 'react-redux';
import {loadSocialFooter} from '../../ducks/socialFooter.js';
import Loader from '../Loader';
import ErrorCmp from '../ErrorCmp';
import SocialMenuItem from '../SocialMenuItem'

class Socials extends Component{

	sortById = (a,b) => {
        if (a.ID > b.ID) {
            return 1;
        }
        if (a.ID < b.ID) {
            return -1;
        }
	};

	render(){
		const {social, loading, error, placementClass} = this.props;

		if (loading) return <Loader />;
		if (error) return (<ErrorCmp error={error} />);
		const body = social.sort(this.sortByTitle).map(item => <SocialMenuItem item={item} key={item.ID}/>);
        console.log(social);
		//placementClass
		return (
			<ul className={placementClass}>
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
};

export default connect(mapStateToProps, {loadSocialFooter})(Socials);