import React, {Component} from 'react'
import {connect} from 'react-redux'
import {IMG_MENU} from '../../config'
import ImgMenuItem from './ImgMenuItem'
import Loader from '../Loader'
import ErrorCmp from '../ErrorCmp'

class ImgMenu extends Component{
	render(){
		const {imgmenu, error} = this.props

		if(error) return (<section className="info"><ErrorCmp error={error} /></section>)
		
		if (imgmenu != null && imgmenu.title == IMG_MENU){
			const ImgMenu =  imgmenu.children.map(item => <li key={item.id} className="imgMenuItem"><ImgMenuItem item={item} /></li>)

			return(
				<section className="info">
					<h1 className="dark">Применение ароматизаторов</h1>
					<ul>
						{ImgMenu}
					</ul>
				</section>
			)

		}

		return(
			<section className="info">
				<Loader />
			</section>
		)
	}
}

const mapStateToProps = (state) => {
	const submenu = state.menu.entities.valueSeq().toArray()

	const assortiment = submenu.length > 0 ? submenu[1] : null
	return {
		error: state.menu.error,
		imgmenu: assortiment
	}
}

export default connect(mapStateToProps)(ImgMenu)