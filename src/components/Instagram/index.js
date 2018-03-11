import React, {Component} from 'react';
import {connect} from 'react-redux';
import {loadInstagram} from '../../ducks/instagram';
import { Grid, Row, Col } from 'react-bootstrap';
import Iframe from 'react-iframe';
import Loader from '../Loader';

class Instagram extends Component{
	componentDidMount(){
    const useLang = this.props.useLang;
	 	this.props.loadInstagram(useLang);

	 	console.log(this.myInput)
	}

	componentWillReceiveProps(nextProps){
		if(this.props.useLang != nextProps.useLang){
			this.props.loadInstagram(nextProps.useLang);
    }
	}

	iframe = (iframe) => {
    return {
      __html: iframe
    }
  }

  render() {
	  const iframe = '<iframe src="//lightwidget.com/widgets/0a00d569c66159a6bfb19fbb5db09900.html" scrolling="no" allowtransparency="true" class="lightwidget-widget embed-responsive-item" style="width: 100%; border: 0; overflow: hidden; padding: " />'
    	
    const {instagram, loading} = this.props;
    if (loading) return <Loader />;

    return (
    	<div className="weInInstagram">
				<h4>
					{instagram.data.title.rendered}
				</h4>			
				<Grid>
					<div className="row no-gutters">
						<Col sm={12} md={12} className="embed-responsive  embed-responsive-16by9" >
							<iframe src="//lightwidget.com/widgets/0a00d569c66159a6bfb19fbb5db09900.html" scrolling="no" allowTransparency="true" 
											className="lightwidget-widget embed-responsive-item" /> 
						</Col>
					</div>
				</Grid>			
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

// <div className="instagramPaddingRight">
// 					<div dangerouslySetInnerHTML={ this.iframe(iframe) }/>
// 				</div>