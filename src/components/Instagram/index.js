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
		// const iframe = '<iframe src="//lightwidget.com/widgets/440bebdcb20159179ba522219c06efb2.html" scrolling="no" allowtransparency="true" class="lightwidget-widget" style="width: 100%; border: 0; overflow: hidden;"></iframe>';
    const iframe = '<iframe src="//lightwidget.com/widgets/0a00d569c66159a6bfb19fbb5db09900.html" scrolling="no" allowtransparency="true" class="lightwidget-widget" style="width: 100%; border: 0; overflow: hidden; padding: " />'
    	
    const {instagram, loading} = this.props;
    if (loading) return <Loader />;

    return (
    	<div className="weInInstagram">
				<h4>
					{instagram.data.title.rendered}
				</h4>			
      {/*	<Grid>
					<Row>
						<Col sm={12} className="instagramPaddingRight" dangerouslySetInnerHTML={ this.iframe(iframe) }>
      
      			</Col>
					</Row>
				</Grid>*/}
				<div className="instagramPaddingRight">
					<div dangerouslySetInnerHTML={ this.iframe(iframe) }/>
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

//  			{/*<div dangerouslySetInnerHTML={ this.iframe(iframe) }/>}