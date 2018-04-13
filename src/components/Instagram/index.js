import React, {Component} from 'react';
import {connect} from 'react-redux';
import {loadInstagram} from '../../ducks/instagram';
import Loader from '../Loader';

class Instagram extends Component{
	componentDidMount(){
    const useLang = this.props.useLang;
	 	this.props.loadInstagram(useLang);
	}

	componentWillReceiveProps(nextProps){
		if(this.props.useLang != nextProps.useLang){
			this.props.loadInstagram(nextProps.useLang);
    }
	}

  render() {
  	const iframe = window.innerWidth < 769 ? <div className="col-sm-12 embed-responsive embed-responsive-9by16" >
  																						 <iframe src="//lightwidget.com/widgets/3fda9fb9b63957ac81d94af0e5aef36f.html" scrolling="no" allowTransparency="true" className="lightwidget-widget embed-responsive-item" />
																					 	 </div>
																					 : <div className="col-sm-12 embed-responsive embed-responsive-16by9" >
																					 		 <iframe src="//lightwidget.com/widgets/0a00d569c66159a6bfb19fbb5db09900.html" scrolling="no" allowTransparency="true" className="lightwidget-widget embed-responsive-item" />
																					 	 </div>
  	
    const {instagram, loading} = this.props;
    if (loading) return <Loader />;

    return (
    	<div className="weInInstagram">
				<h4>
					{instagram.data.title.rendered}
				</h4>			
				<div className="container">
					<div className="row no-gutters">
						{iframe}				
					</div>
				</div>			
			</div>
    )
  }
}

const mapStateToProps = state => {
	return {
		useLang: state.lang.useLang,
		instagram: state.instagram.entities,
		loading: state.instagram.loading
	}
}
export default connect(mapStateToProps, {loadInstagram})(Instagram)