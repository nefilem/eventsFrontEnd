import React from 'react';
import Card from 'react-bootstrap/Card';
import {Col, Row, Container, Button} from 'react-bootstrap';
import './App.css'
import './card.css';
import {FaTrash, FaEdit} from "react-icons/fa";
import { Link } from 'react-router-dom';
import ApiClient from './ApiClient.js';

function View(props){

  const apiClient = new ApiClient();

  const isHidden = (loggedInUser, EventCreator, loggedInUserAdmin) => {
    // if users match then we don't want to hide the buttons so return 
    // false, else return true to hide buttons.
    //console.log("admin",loggedInUserAdmin);
    return (loggedInUser === EventCreator)?false:!loggedInUserAdmin
  }

  const buildCards = () => {        

    if (props.eventsdata === undefined) {return ""}

    apiClient.getAllEvents()
    .then((response) => {
    });

    return props.eventsdata.map((current, index) => (
      <>
      <br/>
      <div className="container cardMain">        
          <Card>
            <Container>
              <Row className="view">
                <Col xs={10} md={10} lg={10}>
                  <Row className="headerRow">
                    {current.name} - {current.location} - {current.datetime}
                  </Row>
                  <div className="underline"></div>
                  <Row className="bodyRow">
                    {current.precis}                                
                  </Row>
                </Col>                                  
                <Col xs={2} md={2} lg={2} style={{textAlign: "right"}}>                
                  <Button hidden={isHidden(props.loggedIn.username, current.creator, props.loggedIn.adminUser)} className="iconStyle" onClick={() => {apiClient.deleteEvent(`${current._id}`); props.refreshD();}}><FaTrash/></Button>                  
                  <Button hidden={isHidden(props.loggedIn.username, current.creator, props.loggedIn.adminUser)} className="iconStyle"><Link  to={"/Amend/" + index}><FaEdit/></Link></Button><br/>                  
                </Col>
              </Row>              
            </Container>
          </Card>              
        </div>              
        </>
    ))
  }


    return (
      <>
        {buildCards()}        
      </>
    );

}
export default View;
