import React, {Component} from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import AgencyInfo from './AgencyInfo';

function Agency(){
	return (
		<Grid className="agency">
 			<Row>
 				<Col md={6} className="agencyImg">
 				</Col>
 				<Col md={1}>
 				</Col>
 				<Col md={5} className="agencyInfo">
 					<AgencyInfo/>
 				</Col>
 			</Row>
 		</Grid>
	)
}
export default Agency