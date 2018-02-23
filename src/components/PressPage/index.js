import React, {Component} from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux'
import { loadPressPage } from '../../ducks/pressPage';
import Loader from '../Loader';
import {Link} from 'react-router-dom';
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
		const i18 = useLang == "ru" ? "ru" : "en-US";

		const allPublics = useLang == "ru" ? "Все публикации" : "all publics";

		
		if (loading) return <Loader />;
		if (error) return (<ErrorCmp error={error} />);	

		const foto = {
			backgroundImage: `-webkit-image-set( url(${entities.acf.foto}) 1x, url(${entities.acf.fotox2}) 2x )`,
			backgroundImage: `-moz-image-set( url(${entities.acf.foto}) 1x, url(${entities.acf.fotox2}) 2x )`,
			backgroundImage: `-o-image-set( url(${entities.acf.foto}) 1x, url(${entities.acf.fotox2}) 2x )`,
			backgroundImage: `-ms-image-set( url(${entities.acf.foto}) 1x, url(${entities.acf.fotox2}) 2x )`,
			backgroundImage: `url(${entities.acf.foto})`,
			marginBottom: '10px'
		};

		const public1 = {
			backgroundImage: `-webkit-image-set( url(${entities.acf.public1}) 1x, url(${entities.acf.public1x2}) 2x )`,
			backgroundImage: `-moz-image-set( url(${entities.acf.public1}) 1x, url(${entities.acf.public1x2}) 2x )`,
			backgroundImage: `-o-image-set( url(${entities.acf.public1}) 1x, url(${entities.acf.public1x2}) 2x )`,
			backgroundImage: `-ms-image-set( url(${entities.acf.public1}) 1x, url(${entities.acf.public1x2}) 2x )`,
			backgroundImage: `url(${entities.acf.public1})`,
			marginTop: '10px',
			marginBottom: '10px'
		};

		const public2 = {
			backgroundImage: `-webkit-image-set( url(${entities.acf.public2}) 1x, url(${entities.acf.public2x2}) 2x )`,
			backgroundImage: `-moz-image-set( url(${entities.acf.public2}) 1x, url(${entities.acf.public2x2}) 2x )`,
			backgroundImage: `-o-image-set( url(${entities.acf.public2}) 1x, url(${entities.acf.public2x2}) 2x )`,
			backgroundImage: `-ms-image-set( url(${entities.acf.public2}) 1x, url(${entities.acf.public2x2}) 2x )`,
			backgroundImage: `url(${entities.acf.public2})`,
			marginTop: '10px',
			marginBottom: '10px'
		};

		const public3 = {
			backgroundImage: `-webkit-image-set( url(${entities.acf.public3}) 1x, url(${entities.acf.public3x2}) 2x )`,
			backgroundImage: `-moz-image-set( url(${entities.acf.public3}) 1x, url(${entities.acf.public3x2}) 2x )`,
			backgroundImage: `-o-image-set( url(${entities.acf.public3}) 1x, url(${entities.acf.public3x2}) 2x )`,
			backgroundImage: `-ms-image-set( url(${entities.acf.public3}) 1x, url(${entities.acf.public3x2}) 2x )`,
			backgroundImage: `url(${entities.acf.public3})`,
			marginTop: '10px',
			marginBottom: '10px'
		};

		const public4 = {
			backgroundImage: `-webkit-image-set( url(${entities.acf.public4}) 1x, url(${entities.acf.public4x2}) 2x )`,
			backgroundImage: `-moz-image-set( url(${entities.acf.public4}) 1x, url(${entities.acf.public4x2}) 2x )`,
			backgroundImage: `-o-image-set( url(${entities.acf.public4}) 1x, url(${entities.acf.public4x2}) 2x )`,
			backgroundImage: `-ms-image-set( url(${entities.acf.public4}) 1x, url(${entities.acf.public4x2}) 2x )`,
			backgroundImage: `url(${entities.acf.public4})`,
			marginTop: '10px',
			marginBottom: '10px'
		};

		const public5 = {
			backgroundImage: `-webkit-image-set( url(${entities.acf.public5}) 1x, url(${entities.acf.public5x2}) 2x )`,
			backgroundImage: `-moz-image-set( url(${entities.acf.public5}) 1x, url(${entities.acf.public5x2}) 2x )`,
			backgroundImage: `-o-image-set( url(${entities.acf.public5}) 1x, url(${entities.acf.public5x2}) 2x )`,
			backgroundImage: `-ms-image-set( url(${entities.acf.public5}) 1x, url(${entities.acf.public5x2}) 2x )`,
			backgroundImage: `url(${entities.acf.public5})`,
			marginTop: '10px',
			marginBottom: '10px'
		};

		const public6 = {
			backgroundImage: `-webkit-image-set( url(${entities.acf.public6}) 1x, url(${entities.acf.public6x2}) 2x )`,
			backgroundImage: `-moz-image-set( url(${entities.acf.public6}) 1x, url(${entities.acf.public6x2}) 2x )`,
			backgroundImage: `-o-image-set( url(${entities.acf.public6}) 1x, url(${entities.acf.public6x2}) 2x )`,
			backgroundImage: `-ms-image-set( url(${entities.acf.public6}) 1x, url(${entities.acf.public6x2}) 2x )`,
			backgroundImage: `url(${entities.acf.public6})`,
			marginTop: '10px',
			marginBottom: '10px'
		};

		const public7 = {
			backgroundImage: `-webkit-image-set( url(${entities.acf.public7}) 1x, url(${entities.acf.public7x2}) 2x )`,
			backgroundImage: `-moz-image-set( url(${entities.acf.public7}) 1x, url(${entities.acf.public7x2}) 2x )`,
			backgroundImage: `-o-image-set( url(${entities.acf.public7}) 1x, url(${entities.acf.public7x2}) 2x )`,
			backgroundImage: `-ms-image-set( url(${entities.acf.public7}) 1x, url(${entities.acf.public7x2}) 2x )`,
			backgroundImage: `url(${entities.acf.public7})`,
			marginTop: '10px',
			marginBottom: '10px'
		};
	
		const public8 = {
			backgroundImage: `-webkit-image-set( url(${entities.acf.public8}) 1x, url(${entities.acf.public8x2}) 2x )`,
			backgroundImage: `-moz-image-set( url(${entities.acf.public8}) 1x, url(${entities.acf.public8x2}) 2x )`,
			backgroundImage: `-o-image-set( url(${entities.acf.public8}) 1x, url(${entities.acf.public8x2}) 2x )`,
			backgroundImage: `-ms-image-set( url(${entities.acf.public8}) 1x, url(${entities.acf.public8x2}) 2x )`,
			backgroundImage: `url(${entities.acf.public8})`,
			marginTop: '10px',
			marginBottom: '10px'
		};

		const date = new Date(entities.acf.date)
		
		const options = {
		  day: 'numeric',
		  month: 'long',
		  year: 'numeric'
		};

		return (
			<div className="pressPage">
				<Grid>
					<Row>
						<Col md={6}>
							<div className="foto" style={foto}/>			
						</Col>
						<Col md={1}>
						</Col>
						<Col md={5} className="info">
							{date.toLocaleString( i18, options)}
							<div className="header">
								{entities.title.rendered}
							</div>
							<div className="content">
								{entities.content.rendered}
							</div>
						</Col>
		 			</Row>
		 			<Row>
		 				<Col md={6}>
		 					{!!entities.acf.public1 && <div className="foto" style={public1}/>}
		 				</Col>
		 				<Col md={6}>
		 					{!!entities.acf.public2 && <div className="foto" style={public2}/>}
		 				</Col>
		 			</Row>	
		 			<Row>
		 				<Col md={6}>
		 					{!!entities.acf.public3 && <div className="foto" style={public3}/>}
		 				</Col>
		 				<Col md={6}>
		 					{!!entities.acf.public4 && <div className="foto" style={public4}/>}
		 				</Col>
		 			</Row>	
		 			<Row>
		 				<Col md={6}>
		 					{!!entities.acf.public5 && <div className="foto" style={public5}/>}
		 				</Col>
		 				<Col md={6}>
		 					{!!entities.acf.public6 && <div className="foto" style={public6}/>}
		 				</Col>
		 			</Row>	
		 			<Row>
		 				<Col md={6}>
		 					{!!entities.acf.public7 && <div className="foto" style={public7}/>}
		 				</Col>
		 				<Col md={6}>
		 					{!!entities.acf.public8 && <div className="foto" style={public8}/>}
		 				</Col>
		 			</Row>
		 			<Row>
		 				<Col md={12}>
		 					<Link to='/press' className="linkToAllNews">
									{ allPublics }
								</Link>
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