import React from 'react';
import HeaderImgBlock from '../HeaderImgBlock';
import Agency from '../Agency';
import Portfolio from '../Portfolio';
import Press from '../Press';
import News from '../News';

export default function MainPage(props){
	const { match } = props

	return (
		<div>
			{/*<HeaderImgBlock/>
			<Agency />
			<Portfolio match={match}/>
			<Press />*/}
			<News />
		</div>
	)
}