import React, {Component} from 'react';
import Loader from '../Loader';
import ErrorCmp from '../ErrorCmp';
import {connect} from 'react-redux'
import {loadAgencyInfo} from '../../ducks/agencyInfo.js'
import {Link} from 'react-router-dom';
import renderHTML from 'react-render-html';

class Agency extends Component{
	constructor() {
   super();
    this.state = {
      width: 'auto',
      height: 'auto'
    }
  }

	componentDidMount(){
		const useLang = this.props.useLang;
		this.props.loadAgencyInfo(useLang);
		window.addEventListener("resize", this.updateDimensions.bind(this));
	}
	
	componentWillReceiveProps(nextProps){
		if(this.props.useLang != nextProps.useLang){
			this.props.loadAgencyInfo(nextProps.useLang);
		}
	}

	componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
    this.updateDimensions = false
  }

  updateDimensions() {
    this.setState({
    	width: window.innerWidth, 
    	height: window.innerHeight
    });
  }

	render(){
		const {useLang, entities, loading, error} = this.props;

		if (loading) return <Loader />;
		if (error) return (<ErrorCmp error={error} />);		

		if( Object.keys(entities).length ==0 ){
			return <div>Данные врененно не доступны</div>
		}
	
		const mobile = window.innerWidth < 768 ? true : false
 		const knowMore = useLang == "ru" ? "Узнать больше" : "Know more"


		const headerMobile = mobile ? <div className="row">
																		<div className="col-sm-12">
																			<h1>{entities.title.rendered}</h1>
																		</div>
																	</div>
																: null
	
		const headerDesktop = !mobile ?	<h1>{entities.title.rendered}</h1> : null																

		return (
			
		<div className="container agency">
			{headerMobile}
 			<div className="row">
 				<div className="col-sm-12 col-md-6 agencyImg">
 						<img src={entities.acf.agencyPhoto} srcSet={`${entities.acf.agencyPhotox2} 2x`} alt="Изображение для прессы"/>
 				</div>
 				<div className="col-sm-12 col-md-5 offset-md-1">
 					{headerDesktop}
					{renderHTML(entities.content.rendered)}
					<Link to='/agency' className="knowMore">{knowMore}</Link>
 				</div>
 				<div className="clear" />
 			</div>
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

export default connect(mapStateToProps, {loadAgencyInfo})(Agency)
