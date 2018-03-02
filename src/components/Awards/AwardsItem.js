import React, {Component} from 'react'
import {Link} from 'react-router-dom'

export default function AwardsItem(props){

	const { item } = props;

	const divStyle = {
		backgroundImage: `-webkit-image-set( url(${item.acf.photo}) 1x, url(${item.acf.photox2}) 2x )`,
		backgroundImage: `-moz-image-set( url(${item.acf.photo}) 1x, url(${item.acf.photox2}) 2x )`,
		backgroundImage: `-o-image-set( url(${item.acf.photo}) 1x, url(${item.acf.photox2}) 2x )`,
		backgroundImage: `-ms-image-set( url(${item.acf.photo}) 1x, url(${item.acf.photox2}) 2x )`,
		backgroundImage: `url(${item.acf.photo})`
	};

	const body = <div className="awards__Item">
								 <div className="awards__Item-Background" style={divStyle}/>
								 <div className="awards__Item-content">
								 	 {item.content.rendered}
								 </div>
								 <div className="awards__Item-title">
								 	 {item.title.rendered}
								 </div>
							 </div>
	
	return (
		<div>
			{body}	
		</div>
	)
}

