import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import renderHTML from 'react-render-html'

export default function AwardsItem(props){

	const { item, useLang } = props;

	const divStyle = {
		backgroundImage: `-webkit-image-set( url(${item.acf.photo}) 1x, url(${item.acf.photox2}) 2x )`,
		backgroundImage: `-moz-image-set( url(${item.acf.photo}) 1x, url(${item.acf.photox2}) 2x )`,
		backgroundImage: `-o-image-set( url(${item.acf.photo}) 1x, url(${item.acf.photox2}) 2x )`,
		backgroundImage: `-ms-image-set( url(${item.acf.photo}) 1x, url(${item.acf.photox2}) 2x )`,
		backgroundImage: `url(${item.acf.photo})`
	};

	const titleStyle = {
        height: "44px",
        textAlign: "center",
		lineHeight: "44px",
		paddingLeft: "10px",
		paddingRight: "10px"
	}

    const titleSpanStyle = {
        display: "inline-block",
		verticalAlign: "middle",
		lineHeight: "normal"
    }

	const body = <div className="awards__Item">
								 <div className="awards__Item-Background" style={divStyle}/>
								 <div className="awards__Item-content">
									 <div dangerouslySetInnerHTML={{ __html: useLang === 'ru' ? item.content.rendered : item.acf.textEn}}/>

								 </div>
								 <div className="awards__Item-title" style={titleStyle}>
								 	 <span style={titleSpanStyle}>
								 	 	{item.title.rendered}
									 </span>
								 </div>
							 </div>
	
	return (
		<div>
			{body}	
		</div>
	)
}

