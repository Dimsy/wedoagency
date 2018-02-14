import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';


class NewsItem extends Component{
	render(){
		const { item, useLang } = this.props;
		console.log("NewsItem", this.props);


		const i18 = useLang == "ru" ? "ru" : "en-US";

		let date =  new Date(item.date);

		var options = {
		  day: 'numeric',
		  month: 'long',
		  year: 'numeric'
		};



	



		return (
			<Grid>
				<Row>
					<Col md={2}>
					</Col>
					<Col md={8}>
						<img src={item.acf.imgNews} srcSet={`${item.acf.imgNewsx2} 2x`}/> <br />
						<div className="dateNews">
							{date.toLocaleString( i18, options)}
						</div>
						<div className="headerNews">
							{item.title.rendered}
						</div>
						<div className="fullNews">
							{item.content.rendered}
						</div>
						<a href="#" className="linkToNews">{item.acf.knowMore}</a>
					</Col>
				</Row>
				<Row>
					<Col md={12}>
						<hr className="borderNews"/>
					</Col>
				</Row>
			</Grid>		
		)
	}
}


const mapStateToProps = state => {
	return {
		useLang: state.lang.useLang
	}
}

export default connect(mapStateToProps)(NewsItem);