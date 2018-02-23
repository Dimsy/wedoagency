import React, {Component} from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux'
import { loadPressPage } from '../../ducks/pressPage';
import Loader from '../Loader';
import ErrorCmp from '../ErrorCmp';
import renderHTML from 'react-render-html'

class AgencyPage extends Component {
	
	componentDidMount(){
		const { match, loadPressPage } = this.props
		
		loadPressPage(match.params.id)
	}

	componentWillReceiveProps(nextProps){
		const { match, loadPressPage } = this.props

		if(match.params.id != nextProps.match.params.id){
			loadPressPage(nextProps.match.params.id);
		}
	}

	render(){
		const {match, entities, useLang, loading, error} = this.props
		
		if (loading) return <Loader />;
		if (error) return (<ErrorCmp error={error} />);	

		console.log('-----', entities.acf.foto);

		const foto = {
			backgroundImage: `-webkit-image-set( url(${entities.acf.foto}) 1x, url(${entities.acf.fotox2}) 2x )`,
			backgroundImage: `-moz-image-set( url(${entities.acf.foto}) 1x, url(${entities.acf.fotox2}) 2x )`,
			backgroundImage: `-o-image-set( url(${entities.acf.foto}) 1x, url(${entities.acf.fotox2}) 2x )`,
			backgroundImage: `-ms-image-set( url(${entities.acf.foto}) 1x, url(${entities.acf.fotox2}) 2x )`,
			backgroundImage: `url(${entities.acf.foto})`,
			marginBottom: '100px'
		};


		return (
			<div className="pressPage">
				<Grid>
					<Row>
						<Col md={6}>
							<div className="foto" style={foto}/>			
						</Col>
						<Col md={1}>
							dmweionflwef
						</Col>
						<Col md={5}>
							dmweionflwef
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
		entities: state.pressPage.entities,
		loading: state.pressPage.loading,
		error: state.pressPage.error
	}
}
	
export default connect(mapStateToProps, {loadPressPage})(AgencyPage)