import React, {Component} from 'react';
import {connect} from 'react-redux';
import { loadNewsList, clearNewsList } from '../../ducks/newsList';
import Loader from '../Loader';
import ErrorCmp from '../ErrorCmp';
import Form from '../SendMessage/form';
import $ from "jquery";
import {loadContacts} from '../../ducks/contacts.js';
import {loadKidsInfo} from '../../ducks/kids.js'
import {sendCustomForm} from '../../ducks/form';
import { Grid, Row, Col } from 'react-bootstrap';
import {PATH} from '../../config'

class Kids extends Component{

    componentWillMount(){
        const { useLang } = this.props;
        this.props.loadContacts(useLang);
        console.log('before loadkids')
        this.props.loadKidsInfo(useLang);

    }

    render(){
        const { useLang, contacts, loading, error, kidsInfo, kidsLoading} = this.props;

        const kidsLogo = "http://static.tildacdn.com/tild3064-6639-4766-a335-646531343835/wedoKids.png";

        if (loading || kidsLoading) return <Loader />;
        if (error) return (<ErrorCmp error={error} />);
        //document.getElementById('veil').style.visibility = "hidden";

        $("#veil").removeClass('fadein').addClass("fadeout");

        const headerImg = kidsInfo.acf.photoTitle;

        const imgHeader = {
            backgroundImage: `-webkit-image-set( url(${headerImg}) 1x, url(${headerImg}) 2x )`,
            backgroundImage: `-moz-image-set( url(${headerImg}) 1x, url(${headerImg}) 2x )`,
            backgroundImage: `-o-image-set( url(${headerImg}) 1x, url(${headerImg}) 2x )`,
            backgroundImage: `-ms-image-set( url(${headerImg}) 1x, url(${headerImg}) 2x )`,
            backgroundImage: `url(${headerImg})`
        };

        const kidImg = {
            width: "167px",
            height: "167px",
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
                                <h1>{kidsInfo.acf.title}</h1>
                            </div>
                            <div>
                                <p style={{width: "550px", textAlign: "center", display: "inline-block", marginTop: "20px", lineHeight: "2", letterSpacing: "0.9px"}}>
                                    {kidsInfo.acf.mainText}
                                </p>
                            </div>
                        </div>
                        <div style={{width: "100%", textAlign: "center", marginBottom: "20px"}}>
                            <div className="kidsImg" style={{background: `url(${kidsInfo.acf.photo1}) 50% 50% no-repeat`}}>
                            </div>
                            <div className="kidsImg" style={{background: `url(${kidsInfo.acf.photo2}) 50% 50% no-repeat`}}>
                            </div>
                            <div className="kidsImg" style={{background: `url(${kidsInfo.acf.photo3}) 50% 50% no-repeat`}}>
                            </div>
                            <div className="kidsImg" style={{background: `url(${kidsInfo.acf.photo4}) 50% 50% no-repeat`}}>
                            </div>
                            <br/>
                            <div className="kidsImg" style={{background: `url(${kidsInfo.acf.photo5}) 50% 50% no-repeat`}}>
                            </div>
                            <div className="kidsImg" style={{background: `url(${kidsInfo.acf.photo6}) 50% 50% no-repeat`}}>
                            </div>
                            <div className="kidsImg" style={{background: `url(${kidsInfo.acf.photo7}) 50% 50% no-repeat`}}>
                            </div>
                            <div className="kidsImg" style={{background: `url(${kidsInfo.acf.photo8}) 50% 50% no-repeat`}}>
                            </div>
                        </div>
                        <div style={{width: "100%", display: "inline-flex", marginBottom: "50px"}}>
                            <div style={{width: "50%", display: "inline-block", paddingRight: "42px"}}>
                                <div style={{float: "right", height: "414px"}}>
                                    <img src={kidsInfo.acf.leftPhoto} style={{width: "353px", height: "414px"}}/>
                                </div>
                            </div>
                            <div style={{width: "50%", display: "inline-block"}}>
                                <div style={{float: "left", backgroundColor: "#f7f7f7", width: "365px", height: "414px"}}>
                                    <div className="sendMessageKids" style={{paddingTop: "50px", paddingLeft: "50px", paddingRight: "50px"}}>
                                        <p className="kidsSendTitle" style={{width: "210px"}}>{kidsInfo.acf.sendMessageTitle}</p>
                                        <Form	onSubmit={this.submit}
                                                 useLang={useLang}
                                                 contacts={contacts}
                                                 yourNamePlaceholder={contacts.acf.yourNamePlaceholder}
                                                 youMessagePlaceholder={contacts.acf.youMessagePlaceholder}
                                                 emailPlaceholder={contacts.acf.emailPlaceholder}
                                                 sendButtonText={contacts.acf.sendButtonText}/>
                                    </div>
                                </div>
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
        contacts: state.contacts.entities,
        kidsInfo: state.kids.entities,
        kidsLoading: state.kids.loading,
        error: state.contacts.error,
        loading: state.contacts.loading
    }
}

export default connect(mapStateToProps, { sendCustomForm, loadContacts, loadKidsInfo })(Kids);