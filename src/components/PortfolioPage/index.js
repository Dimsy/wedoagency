import React, {Component} from 'react';
import {connect} from 'react-redux';
import Loader from '../Loader';
import ErrorCmp from '../ErrorCmp';
import { Grid, Row, Col } from 'react-bootstrap';
import renderHTML from 'react-render-html'

class PortfolioPage extends Component{
	render(){
		const { useLang, entities, loading, error, match, portfolioList} = this.props;

		if (loading) return <Loader />;
		if (error) return (<ErrorCmp error={error} />);	

		const portfolioSet = entities.toArray();

		if ( portfolioSet.length == 0){
			return <div>Данные пока не доступны!</div>
		}

		const portfolioItem = portfolioSet.filter(item => item.id == match.params.id)
		

		if ( portfolioItem.length == 0){
			return null
		}

		const project = portfolioItem[0].toJS()

		const header = {
			backgroundImage: `-webkit-image-set( url(${project.acf.headerPhoto}) 1x, url(${project.acf.headerPhotox2}) 2x )`,
			backgroundImage: `-moz-image-set( url(${project.acf.headerPhoto}) 1x, url(${project.acf.headerPhotox2}) 2x )`,
			backgroundImage: `-o-image-set( url(${project.acf.headerPhoto}) 1x, url(${project.acf.headerPhotox2}) 2x )`,
			backgroundImage: `-ms-image-set( url(${project.acf.headerPhoto}) 1x, url(${project.acf.headerPhotox2}) 2x )`,
			backgroundImage: `url(${project.acf.headerPhoto})`,
			marginBottom: '100px'
		};
		console.log('---', project)

		const content = project.content.rendered.length != 0 ?  <div className="content">
																															<h1>
																																{project.title.rendered}
																															</h1>	
																															{renderHTML(project.content.rendered)}
																													  </div> 
																												 : null

		const photo1 = project.acf.photo1 != false ? <img src={`${project.acf.photo1}`}  srcSet={`${project.acf.photo1x2} 2x`} alt="Изображение для прессы"/>
																							 : null
																										 
		const photo2 = project.acf.photo2 != false ? <img src={`${project.acf.photo2}`}  srcSet={`${project.acf.photo2x2} 2x`} alt="Изображение для прессы"/>
																							 : null

		const photo3 = project.acf.photo3 != false ? <img src={`${project.acf.photo3}`}  srcSet={`${project.acf.photo3x2} 2x`} alt="Изображение для прессы"/>
																							 : null			

		const photo4 = project.acf.photo4 != false ? <img src={`${project.acf.photo4}`}  srcSet={`${project.acf.photo4x2} 2x`} alt="Изображение для прессы"/>
																							 : null			
																							 
		const photo5 = project.acf.photo5 != false ? <img src={`${project.acf.photo5}`}  srcSet={`${project.acf.photo5x2} 2x`} alt="Изображение для прессы"/>
																							 : null			
		
		const photo6 = project.acf.photo6 != false ? <img src={`${project.acf.photo6}`}  srcSet={`${project.acf.photo6x2} 2x`} alt="Изображение для прессы"/>
																							 : null			
	  
	  const photo7 = project.acf.photo7 != false ? <img src={`${project.acf.photo7}`}  srcSet={`${project.acf.photo7x2} 2x`} alt="Изображение для прессы"/>
																							 : null			
	  
	  const photo8 = project.acf.photo8 != false ? <img src={`${project.acf.photo8}`}  srcSet={`${project.acf.photo8x2} 2x`} alt="Изображение для прессы"/>
																							 : null			
	  
	  const photo9 = project.acf.photo9 != false ? <img src={`${project.acf.photo9}`}  srcSet={`${project.acf.photo9x2} 2x`} alt="Изображение для прессы"/>
																							 : null			
	  
	  const photo10 = project.acf.photo10 != false ? <img src={`${project.acf.photo10}`}  srcSet={`${project.acf.photo10x2} 2x`} alt="Изображение для прессы"/>
																							 : null			
	  
	  const photo11 = project.acf.photo11 != false ? <img src={`${project.acf.photo11}`}  srcSet={`${project.acf.photo11x2} 2x`} alt="Изображение для прессы"/>
																							 : null			
	  
	  const photo12 = project.acf.photo12 != false ? <img src={`${project.acf.photo12}`}  srcSet={`${project.acf.photo12x2} 2x`} alt="Изображение для прессы"/>
																							 : null		

		const photo13 = project.acf.photo13 != false ? <img src={`${project.acf.photo13}`}  srcSet={`${project.acf.photo13x2} 2x`} alt="Изображение для прессы"/>
																							 : null									
			
		const photo14 = project.acf.photo14 != false ? <img src={`${project.acf.photo14}`}  srcSet={`${project.acf.photo14x2} 2x`} alt="Изображение для прессы"/>
																							 : null	
																							 
		const photo15 = project.acf.photo15 != false ? <img src={`${project.acf.photo15}`}  srcSet={`${project.acf.photo15x2} 2x`} alt="Изображение для прессы"/>
																							 : null																						 																						 														 
		
		const photo16 = project.acf.photo16 != false ? <img src={`${project.acf.photo16}`}  srcSet={`${project.acf.photo16x2} 2x`} alt="Изображение для прессы"/>
																							 : null																						 

		const photo17 = project.acf.photo17 != false ? <img src={`${project.acf.photo17}`}  srcSet={`${project.acf.photo17x2} 2x`} alt="Изображение для прессы"/>
																							 : null	

		const photo18 = project.acf.photo18 != false ? <img src={`${project.acf.photo18}`}  srcSet={`${project.acf.photo18x2} 2x`} alt="Изображение для прессы"/>
																							 : null																						 

		return(
			<div className="portfolioPage__project">
				<div className="articleImgNews" style={header} />
				<Grid>
					<Row>
						<Col md={12}>
							{content}
							{photo1}
							<div className="clear" />
						</Col>
					</Row>
					<Row>
						<Col md={12} className="photoBlock">
							{photo2}
							{photo3}
							{photo4}
							{photo5}
							{photo6}
							{photo7}
							{photo8}
							{photo9}
							{photo10}
							{photo11}
							{photo12}
							{photo13}
							{photo14}
							{photo15}
							{photo16}
							{photo17}
							{photo18}	
						</Col>
					</Row>
				</Grid>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		useLang: state.lang.useLang,
		entities: state.portfolio.entities,
		portfolioList: state.portfolio.portfolioList,
		loading: state.portfolio.loading,
		error: state.portfolio.error
	}
}

export default connect(mapStateToProps)(PortfolioPage)