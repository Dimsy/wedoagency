import React from 'react';
import {Link} from 'react-router-dom';

const MenuItem = ({item}) => {

	return (
		<Link to={item.url}>
			{item.title}
		</Link>
	)
}

export default MenuItem;