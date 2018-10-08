import React, {Component} from 'react';
import {connect} from 'react-redux';
import NewsItem from '../NewsList/newsItem';
import { loadNewsList, clearNewsList } from '../../ducks/newsList';
import Loader from '../Loader';
import ErrorCmp from '../ErrorCmp';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import $ from "jquery";

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

        if (loading) return <Loader />;
        if (error) return (<ErrorCmp error={error} />);
        //document.getElementById('veil').style.visibility = "hidden";

        $("#veil").removeClass('fadein').addClass("fadeout");

        return (
            <div className="newsList">
                <ReactCSSTransitionGroup transitionName="anim"
                                         transitionAppear={true}
                                         transitionAppearTimeout={2000}
                                         transitionEnter={false}
                                         transitionLeave={false}>
                    <div className="showMore">
                        {'Test'}
                    </div>
                </ReactCSSTransitionGroup>
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