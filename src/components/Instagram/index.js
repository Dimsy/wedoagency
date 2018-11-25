import React, {Component} from 'react';
import {connect} from 'react-redux';
import {loadInstagram} from '../../ducks/instagram';
import Loader from '../Loader';
import './instagramCustom.css'

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
	const isMobile = window.innerWidth < 769;
	const isKids = window.location.pathname === "/kids";
  	const iframeMain = <div className="col-sm-12 embed-responsive embed-responsive-9by16 instaFadeIn">
            <iframe src="https://cdn.lightwidget.com/widgets/49c341ec94f65b2ab573231d2cd64eef.html" scrolling="no"
                    allowTransparency="true" className="lightwidget-widget  embed-responsive-item"
                    style={{width:"100%",border:"0",overflow:"hidden"}}/>
			</div>

     const iframeKids = !isMobile
          ?	<div className="embed-responsive embed-responsive-9by16 instaFadeIn" style={{paddingBottom: "500px", overflow: "unset"}}>
			 <iframe src="//lightwidget.com/widgets/fea9dfb64dbf5d52b658d701c1a984ba.html" scrolling="no" allowTransparency="true" className="lightwidget-widget embed-responsive-item"/>
		  </div>
          :	<div className="col-sm-12 embed-responsive embed-responsive-16by9 instaFadeIn" style={{paddingBottom: "500px", overflow: "unset"}}>
			 <iframe src="//lightwidget.com/widgets/e9d9937eb0c954d4b78ea6eb10e2d82a.html" scrolling="no" allowTransparency="true" className="lightwidget-widget embed-responsive-item"/>
		  </div>;

	const instaPcStyle = window.innerWidth < 769 ? {height: "808px"} : {height: '500px'};

    const {instagram, loading} = this.props;
    if (loading) return <Loader />;

    return (
		<div className={!isKids ? "weInInstagram" : null}>
            {!isKids &&
				<h4>
					{instagram.data.title.rendered}
				</h4>
            }
			{isKids
				? iframeKids
				: <div className="container">
					<div className="row no-gutters" style={instaPcStyle}>
						{iframeMain}
					</div>
				</div>}
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