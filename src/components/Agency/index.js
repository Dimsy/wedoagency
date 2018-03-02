import React, {Component} from 'react';
import { Grid, Row, Col, Clearfix } from 'react-bootstrap';
import AgencyInfo from './AgencyInfo';

export default function Agency(){
	return (
		<Grid className="agency">
 			<Row>
 				<Col md={6} mdOffset={1} sm={6} className="agencyImg">
 				</Col>
 				<Col md={5} sm={6} className="agencyInfo">
 					<AgencyInfo/>
 				</Col>
 				<div className="clear" />
 			</Row>
 		</Grid>
	)
}
