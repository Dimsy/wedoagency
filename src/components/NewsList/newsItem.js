import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Row } from 'react-bootstrap';
import {Link} from 'react-router-dom';


class NewsItem extends Component{
    state = {
        show: false,
        showVeil: false
    }

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.redirectToLink = this.redirectToLink.bind(this);
    }

    redirectToLink() {
        const { item, match } = this.props;
        const link = `${match.path}/${item.id}`;
        window.location.href = link
    }

    handleClick (e) {
        if (e.defaultPrevented) {
            return;
        }
        e.preventDefault();
        this.setState({showVeil: true});
        setTimeout(this.redirectToLink, 2000);
    }

    componentWillUpdate(nextProps, nextState) {
        if (nextState.showVeil === true) {
            document.getElementById('veil').className = "veil vFadeIn";
        } else {
            document.getElementById('veil').className = "veil";
        }
    }

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

		const video = `https://player.vimeo.com/video/${item.acf.videoNews}`

		const videoBlock =<div className="embed-responsive embed-responsive-16by9">
												<iframe src={video} 
																frameBorder="0" 
																allowFullScreen 
																className="embed-responsive-item" 
												/>
											</div>
												
		const photoBlock =<Link to={`${match.path}/${item.id}`}>
												<img src={item.acf.imgNews} srcSet={`${item.acf.imgNewsx2} 2x`}/> <br />
											</Link>	

		const media = item.acf.videoNews ? videoBlock : photoBlock						

		return (
			<div className="container">
				<Row className="no-gutters">
					<div className="col-md-8 offset-md-2">
						{ media }
						<div className="dateNews">
							<Link to={`${match.path}/${item.id}`}>
								{date.toLocaleString( i18, options)}
							</Link>
						</div>
						<div>
							<Link to={`${match.path}/${item.id}`} className="headerNews">
								{item.title.rendered}
							</Link>
						</div>
						<div className="fullNews">
						<div dangerouslySetInnerHTML={{ __html:  item.content.rendered }} />
							{/*item.content.rendered*/}
						</div>
						<Link to={`${match.path}/${item.id}`} className="linkToNews" onClick={this.handleClick}>{showMore}</Link>
					</div>
				</Row>
				<Row className="no-gutters">
					<div className="col-md-12 no-gutters">
						<hr className="borderNews"/>
					</div>
				</Row>
			</div>		
		)
	}
}


const mapStateToProps = state => {
	return {
		useLang: state.lang.useLang
	}
}

export default connect(mapStateToProps)(NewsItem);