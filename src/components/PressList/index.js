import React, {Component} from 'react'
import {loadPressList, clearPressList} from '../../ducks/pressList.js';
import {connect} from 'react-redux';
import Loader from '../Loader';
import ErrorCmp from '../ErrorCmp';
import { Grid, Row, Col } from 'react-bootstrap';
import PressItem from './pressItem';

class PressList extends Component{

	componentDidMount(){
		const { useLang, loadPressList } = this.props;

		loadPressList(useLang);
	}

	componentWillReceiveProps(nextProps){
		const {useLang, clearPressList, loadPressList} = this.props
		
		if(useLang != nextProps.useLang){
			clearPressList();
			loadPressList(nextProps.useLang);
		}
	}

	addingPress = () => {
		const { useLang, loadPressList } = this.props;

		loadPressList(useLang);
	}

	sortBody = (a, b) => {

		const aDate = a.props.children.props.item.acf.date
		const bDate = b.props.children.props.item.acf.date

		var aNumberForCompare = aDate.split('/').reverse().join()
        var bNumberForCompare = bDate.split('/').reverse().join()	
        		
    return aNumberForCompare > bNumberForCompare ? -1 : (aNumberForCompare < bNumberForCompare ? 1 : 0);
	 	
	}
	
	render(){
		const { useLang, entities, loading, error, count, match} = this.props;

		if (loading) return <Loader />;
		if (error) return (<ErrorCmp error={error} />);	

		const pressItems = entities.toArray();

		const body = pressItems.map( item => <li key={item.id}><PressItem item={item} match={match}/></li>).sort(this.sortBody)

		const showMore = useLang == "ru" ? "Показать еще" : "Show more";
		const toggleShowMore = body.length != count  ? showMore : null;
					
		return (
			<Grid className='pressList'>
				<Row>
					<Col md={12}>
						<ul>
							{body}
						</ul>
						<div className='clear' />
						<div className='showMore'>
							<span onClick={this.addingPress}>
								{toggleShowMore}
							</span>	
						</div>	
					</Col>
				</Row>		
			</Grid>
		)
	}
}

const mapStateToProps = state => {
	return {
		useLang: state.lang.useLang,
		entities: state.pressList.entities,
		count: state.pressList.count,
		loading: state.pressList.loading,
		error: state.pressList.error
	}
}

export default connect(mapStateToProps, {loadPressList, clearPressList})(PressList);