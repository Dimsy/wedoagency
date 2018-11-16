import React from 'react';
import HeaderImgBlock from '../HeaderImgBlock';
import Agency from '../Agency';
import Portfolio from '../Portfolio';
import Press from '../Press';
import News from '../News';
import {Helmet} from "react-helmet";

export default function MainPage(props){
	const { match } = props

	return (
		<div>
            <Helmet>
                <title>WeDoAgency</title>
			</Helmet>
			<HeaderImgBlock/>
			<Agency />
			<Portfolio match={match}/>
			<Press />
			<News />
		</div>
	)
}