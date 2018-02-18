import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';
import {Link} from 'react-router-dom';


class NewsItem extends Component{
	render(){
		const { item, useLang, location, match } = this.props;
		
		const i18 = useLang == "ru" ? "ru" : "en-US";
		const showMore = useLang == "ru" ? "Читать далее" : "continue read";
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
						<Link to={`${match.path}/${item.id}`} className="linkToNews">{showMore}</Link>
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