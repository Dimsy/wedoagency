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
		const iframe = '<iframe src="//lightwidget.com/widgets/7d52b3d0cd355dfbb19a7240c5f641b6.html" scrolling="no" allowtransparency="true" class="lightwidget-widget" style="width: 976px; Height: 488px; border: 0; overflow: hidden;"></iframe>'; 
    
    const {instagram, loading} = this.props;
    if (loading) return <Loader />;

    return (
    	<div className="weInInstagram">
				<h4>
					{instagram.data.title.rendered}
				</h4>			
      	<Grid>
					<Row>
						<Col md={12}>
        			{<div dangerouslySetInnerHTML={ this.iframe(iframe) } />}
      			</Col>
					</Row>
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