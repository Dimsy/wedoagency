import React, {Component} from 'react';
import {connect} from 'react-redux';
import { loadNewsList, clearNewsList } from '../../ducks/newsList';
import Loader from '../Loader';
import ErrorCmp from '../ErrorCmp';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import $ from "jquery";
import { Grid, Row, Col } from 'react-bootstrap';

class Kids extends Component{

    componentDidMount(){
        const { useLang, entities } = this.props;

        if ( entities.size == 0){
            this.props.loadNewsList(useLang);
        }

    }

    componentWillReceiveProps(nextProps){
        if(this.props.useLang != nextProps.useLang){
            this.props.clearNewsList();
            this.props.loadNewsList(nextProps.useLang);
        }
    }

    addingNews = () => {
        const { useLang } = this.props;
        this.props.loadNewsList(useLang);
    }
    render(){
        const { useLang, entities, loading, error, count, location, match} = this.props;

        const kidsLogo = "http://static.tildacdn.com/tild3064-6639-4766-a335-646531343835/wedoKids.png";

        const headerImg = "http://wedoagency.ru/wp-content/uploads/All-you-need-is-love_1_m.jpg";
        
        const imgHeader = {
            backgroundImage: `-webkit-image-set( url(${headerImg}) 1x, url(${headerImg}) 2x )`,
            backgroundImage: `-moz-image-set( url(${headerImg}) 1x, url(${headerImg}) 2x )`,
            backgroundImage: `-o-image-set( url(${headerImg}) 1x, url(${headerImg}) 2x )`,
            backgroundImage: `-ms-image-set( url(${headerImg}) 1x, url(${headerImg}) 2x )`,
            backgroundImage: `url(${headerImg})`
        };
        if (loading) return <Loader />;
        if (error) return (<ErrorCmp error={error} />);
        //document.getElementById('veil').style.visibility = "hidden";

        $("#veil").removeClass('fadein').addClass("fadeout");

        const kidImg = {
            width: "167px",
            height: "167px",
            border: "1px solid black",
            display: "inline-block",
            marginRight: "30px",
            marginTop: "30px"
        }

        return (
            <div>
                <div className="newsList">
                    <div className="headerImgBlock" style={imgHeader}/>
                    <Grid>
                        <div style={{width: "100%", textAlign: "center"}}>
                            <div style={{width: "550px", textAlign: "center", display: "inline-block", marginTop: "100px", lineHeight: "2", letterSpacing: "0.9px"}}>
                                <h1>Умные праздники для интересующихся детей!</h1>
                            </div>
                            <div>
                                <p style={{width: "550px", textAlign: "center", display: "inline-block", marginTop: "20px", lineHeight: "2", letterSpacing: "0.9px"}}>
                                    Юлия Дубова и Инна Фалева, создатели агентства WeDoAgency, в рамках своей авторской колонки, обсуждают тонкости и нюансы свадебного рынка с коллегами, являющимися самыми сильными игроками event-индустрии Москвы. В первом выпуске: разговор с ведущими, входящими в проект Top15Moscow, Максимом Маркевичем и Егором Пироговым.
                                </p>
                            </div>
                        </div>
                        <div style={{width: "100%", textAlign: "center"}}>
                            <div style={kidImg}>
                            </div>
                            <div style={kidImg}>
                            </div>
                            <div style={kidImg}>
                            </div>
                            <div style={kidImg}>
                            </div>
                            <br/>
                            <div style={kidImg}>
                            </div>
                            <div style={kidImg}>
                            </div>
                            <div style={kidImg}>
                            </div>
                            <div style={kidImg}>
                            </div>
                        </div>
                    </Grid>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        useLang: state.lang.useLang,
        count:  state.newsList.count,
        entities: state.newsList.entities,
        loading: state.newsList.loading,
        error: state.newsList.error
    }
}

export default connect(mapStateToProps, { loadNewsList, clearNewsList })(Kids);