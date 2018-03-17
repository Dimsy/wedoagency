import React, {Component} from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux'
import { loadAgencyPage } from '../../ducks/agencyPage';
import Loader from '../Loader';
import ErrorCmp from '../ErrorCmp';
import renderHTML from 'react-render-html'


class AgencyPage extends Component {
	
	componentDidMount(){
		const { useLang, loadAgencyPage } = this.props
		loadAgencyPage(useLang)
	}

	componentWillReceiveProps(nextProps){
		if(this.props.useLang != nextProps.useLang){
			this.props.loadAgencyPage(nextProps.useLang);
		}
	}

	render(){
		const {match, entities, useLang, loading, error} = this.props
		
		if (loading) return <Loader />;
		if (error) return (<ErrorCmp error={error} />);	

		const header = {
			backgroundImage: `-webkit-image-set( url(${entities.acf.foto}) 1x, url(${entities.acf.Fotox2}) 2x )`,
			backgroundImage: `-moz-image-set( url(${entities.acf.foto}) 1x, url(${entities.acf.Fotox2}) 2x )`,
			backgroundImage: `-o-image-set( url(${entities.acf.foto}) 1x, url(${entities.acf.Fotox2}) 2x )`,
			backgroundImage: `-ms-image-set( url(${entities.acf.foto}) 1x, url(${entities.acf.Fotox2}) 2x )`,
			backgroundImage: `url(${entities.acf.foto})`,
			marginBottom: '100px'
		};

		
		return (
			<div className="articlePage">
				<div className="articleImgNews" style={header} />
				<Grid>
	 				<Row>
	 					<Col md={6} className="agencyPage__collage">
	 						<img src={`${entities.acf.collage}`} />
	 					</Col>
	 					
	 					<Col md={5} className="agencyInfo">
	 						<h1>
	 							{entities.title.rendered}
	 						</h1>
	 						{ renderHTML(entities.content.rendered)}
	 						<div className="sign">
	 							{entities.acf.sign}
	 						</div>
	 					</Col>
	 				</Row>
	 			</Grid>
 			</div>
		)
	}	
}

const mapStateToProps = state => {
	return{
		useLang: state.lang.useLang,
		entities: state.AgencyPage.entities,
		loading: state.AgencyPage.loading,
		error: state.AgencyPage.error
	}
}
	
export default connect(mapStateToProps, { loadAgencyPage })(AgencyPage)