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
                <meta property="og:title" content="WeDoAgency"/>
                <meta property="og:description" content="WeDoAgency — event-агентство с многолетним опытом работы в организации грандиозных мероприятий: от закрытых вечеринок во Французских Альпах до светских церемоний глянцевых журналов в капризной Москве."/>
                <meta property="og:image" content="http://wedoagency.ru/wp-content/themes/wp_theme/img/logo/wedo.png">
			</Helmet>
			<HeaderImgBlock/>
			<Agency />
			<Portfolio match={match}/>
			<Press />
			<News />
		</div>
	)
}