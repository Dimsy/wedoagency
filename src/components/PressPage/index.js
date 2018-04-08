import React, {Component} from 'react';
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
		const i18Date = useLang == "ru" ? "ru-RU" : "en-GB";

		if (loading) return <Loader />;
		if (error) return (<ErrorCmp error={error} />);	

		const date = new Date(entities.acf.date);

		var options = {
		  day: 'numeric',
		  month:  'long',
		  year: 'numeric'
		};
		
		const foto = {
			backgroundImage: `-webkit-image-set( url(${entities.acf.foto}) 1x, url(${entities.acf.fotox2}) 2x )`,
			backgroundImage: `-moz-image-set( url(${entities.acf.foto}) 1x, url(${entities.acf.fotox2}) 2x )`,
			backgroundImage: `-o-image-set( url(${entities.acf.foto}) 1x, url(${entities.acf.fotox2}) 2x )`,
			backgroundImage: `-ms-image-set( url(${entities.acf.foto}) 1x, url(${entities.acf.fotox2}) 2x )`,
			backgroundImage: `url(${entities.acf.foto})`
		};

		const public1 = {
			backgroundImage: `-webkit-image-set( url(${entities.acf.public1}) 1x, url(${entities.acf.public1x2}) 2x )`,
			backgroundImage: `-moz-image-set( url(${entities.acf.public1}) 1x, url(${entities.acf.public1x2}) 2x )`,
			backgroundImage: `-o-image-set( url(${entities.acf.public1}) 1x, url(${entities.acf.public1x2}) 2x )`,
			backgroundImage: `-ms-image-set( url(${entities.acf.public1}) 1x, url(${entities.acf.public1x2}) 2x )`,
			backgroundImage: `url(${entities.acf.public1})`,
			marginTop: '10px',
			marginleft: '10px'
		};

		const public2 = {
			backgroundImage: `-webkit-image-set( url(${entities.acf.public2}) 1x, url(${entities.acf.public2x2}) 2x )`,
			backgroundImage: `-moz-image-set( url(${entities.acf.public2}) 1x, url(${entities.acf.public2x2}) 2x )`,
			backgroundImage: `-o-image-set( url(${entities.acf.public2}) 1x, url(${entities.acf.public2x2}) 2x )`,
			backgroundImage: `-ms-image-set( url(${entities.acf.public2}) 1x, url(${entities.acf.public2x2}) 2x )`,
			backgroundImage: `url(${entities.acf.public2})`,
			marginTop: '10px'
		};

		const public3 = {
			backgroundImage: `-webkit-image-set( url(${entities.acf.public3}) 1x, url(${entities.acf.public3x2}) 2x )`,
			backgroundImage: `-moz-image-set( url(${entities.acf.public3}) 1x, url(${entities.acf.public3x2}) 2x )`,
			backgroundImage: `-o-image-set( url(${entities.acf.public3}) 1x, url(${entities.acf.public3x2}) 2x )`,
			backgroundImage: `-ms-image-set( url(${entities.acf.public3}) 1x, url(${entities.acf.public3x2}) 2x )`,
			backgroundImage: `url(${entities.acf.public3})`,
			marginTop: '10px'
		};

		const public4 = {
			backgroundImage: `-webkit-image-set( url(${entities.acf.public4}) 1x, url(${entities.acf.public4x2}) 2x )`,
			backgroundImage: `-moz-image-set( url(${entities.acf.public4}) 1x, url(${entities.acf.public4x2}) 2x )`,
			backgroundImage: `-o-image-set( url(${entities.acf.public4}) 1x, url(${entities.acf.public4x2}) 2x )`,
			backgroundImage: `-ms-image-set( url(${entities.acf.public4}) 1x, url(${entities.acf.public4x2}) 2x )`,
			backgroundImage: `url(${entities.acf.public4})`,
			marginTop: '10px'
		};

		const public5 = {
			backgroundImage: `-webkit-image-set( url(${entities.acf.public5}) 1x, url(${entities.acf.public5x2}) 2x )`,
			backgroundImage: `-moz-image-set( url(${entities.acf.public5}) 1x, url(${entities.acf.public5x2}) 2x )`,
			backgroundImage: `-o-image-set( url(${entities.acf.public5}) 1x, url(${entities.acf.public5x2}) 2x )`,
			backgroundImage: `-ms-image-set( url(${entities.acf.public5}) 1x, url(${entities.acf.public5x2}) 2x )`,
			backgroundImage: `url(${entities.acf.public5})`,
			marginTop: '10px'
		};

		const public6 = {
			backgroundImage: `-webkit-image-set( url(${entities.acf.public6}) 1x, url(${entities.acf.public6x2}) 2x )`,
			backgroundImage: `-moz-image-set( url(${entities.acf.public6}) 1x, url(${entities.acf.public6x2}) 2x )`,
			backgroundImage: `-o-image-set( url(${entities.acf.public6}) 1x, url(${entities.acf.public6x2}) 2x )`,
			backgroundImage: `-ms-image-set( url(${entities.acf.public6}) 1x, url(${entities.acf.public6x2}) 2x )`,
			backgroundImage: `url(${entities.acf.public6})`,
			marginTop: '10px'
		};

		const public7 = {
			backgroundImage: `-webkit-image-set( url(${entities.acf.public7}) 1x, url(${entities.acf.public7x2}) 2x )`,
			backgroundImage: `-moz-image-set( url(${entities.acf.public7}) 1x, url(${entities.acf.public7x2}) 2x )`,
			backgroundImage: `-o-image-set( url(${entities.acf.public7}) 1x, url(${entities.acf.public7x2}) 2x )`,
			backgroundImage: `-ms-image-set( url(${entities.acf.public7}) 1x, url(${entities.acf.public7x2}) 2x )`,
			backgroundImage: `url(${entities.acf.public7})`,
			marginTop: '10px'
		};
	
		const public8 = {
			backgroundImage: `-webkit-image-set( url(${entities.acf.public8}) 1x, url(${entities.acf.public8x2}) 2x )`,
			backgroundImage: `-moz-image-set( url(${entities.acf.public8}) 1x, url(${entities.acf.public8x2}) 2x )`,
			backgroundImage: `-o-image-set( url(${entities.acf.public8}) 1x, url(${entities.acf.public8x2}) 2x )`,
			backgroundImage: `-ms-image-set( url(${entities.acf.public8}) 1x, url(${entities.acf.public8x2}) 2x )`,
			backgroundImage: `url(${entities.acf.public8})`,
			marginTop: '10px'
		};


		return (
			<div className="pressPage">
				<div className="container">
					<div className="row no-gutters">
						<div className='col-md-12'>
							<div>
								<div className="foto foto_title" style={foto}/>	
							</div>
							<div className="DateFormat">
								{ date.toLocaleString( i18Date, options)}
							</div>
							<div className="headerTitle">
								{renderHTML(entities.title.rendered)}
							</div>
							<div className="content">
								<div dangerouslySetInnerHTML={{ __html:  entities.content.rendered }} />
							</div>
							<div className="clear" />
						</div>	
				 			</div>
		 			<div className="row no-gutters">
		 				<div className="col-md-6">
		 					{!!entities.acf.public1 && <div className="foto" style={public1}/>}
		 				</div>
		 				<div className="col-md-6">
		 					{!!entities.acf.public2 && <div className="foto foto_right" style={public2}/>}
		 				</div>
		 				<div className='clear' />
		 			</div>	
		 			<div className="row no-gutters">
		 				<div className="col-md-6">
		 					{!!entities.acf.public3 && <div className="foto" style={public3}/>}
		 				</div>
		 				<div className="col-md-6">
		 					{!!entities.acf.public4 && <div className="foto foto_right" style={public4}/>}
		 				</div>
		 				<div className='clear' />
		 			</div>	
		 			<div className="row no-gutters">
		 				<div className="col-md-6">
		 					{!!entities.acf.public5 && <div className="foto" style={public5}/>}
		 				</div>
		 				<div className="col-md-6">
		 					{!!entities.acf.public6 && <div className="foto foto_right" style={public6}/>}
		 				</div>
		 				<div className='clear' />
		 			</div>	
		 			<div className="row no-gutters">
		 				<div className="col-md-6">
		 					{!!entities.acf.public7 && <div className="foto" style={public7}/>}
		 				</div>
		 				<div className="col-md-6">
		 					{!!entities.acf.public8 && <div className="foto foto_right" style={public8}/>}
		 				</div>
		 				<div className='clear' />
		 			</div>
		 			<div className="row no-gutters">
		 				<div className="col-md-12">
		 					<Link to='/press' className="linkToAllNews">
									{ allPublics }
								</Link>
		 				</div>
		 			</div>	
 				</div>
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