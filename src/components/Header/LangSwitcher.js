import React, {Component} from 'react';
import {connect} from 'react-redux';
import {changeLangRu, changeLangEn} from '../../ducks/lang';

class LangSwitcher extends Component{
	constructor(){
		super();
		this.setLangEn = this.setLangEn.bind(this);
        this.setLangRu = this.setLangRu.bind(this);
	}

	componentDidMount() {
		console.log('localStorage.getItem(\'userLang\')',localStorage.getItem('userLang'));

		if (localStorage.getItem('userLang')) {

            if (localStorage.getItem('userLang') == 'en') {
                this.props.changeLangEn();
			} else {
                this.props.changeLangRu();
			}
		} else {
            localStorage.setItem('userLang', this.props.useLang);
		}
	}

	setLangRu = () => {
        localStorage.setItem('userLang', 'ru');
        this.props.changeLangRu();
	}

    setLangEn = () => {
        localStorage.setItem('userLang', 'en');
        this.props.changeLangEn();
    }


	render(){

		return (
			<ul className="headerLangSwitcher">
				<li onClick={this.setLangRu}>
					ru
				</li>
				<li>|</li>
				<li onClick={this.setLangEn}>
					en
				</li>
			</ul>
		)
	}
}

const mapStateToProps = state => {
    return {
        useLang: state.lang.useLang
    }
}

export default connect(mapStateToProps, {changeLangRu, changeLangEn})(LangSwitcher);