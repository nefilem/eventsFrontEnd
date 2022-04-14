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

  const isHidden = (loggedInUser, EventCreator) => {
    // if users match then we don't want to hide the buttons so return 
    // false, else return true to hide buttons.
    return (loggedInUser === EventCreator)?false:true
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
          <Card style={{background: "black", color: "white"}}>
            <Container style={{background: "black", color: "white"}}>
              <Row style={{background: "black", color: "white"}}>
                <Col xs={10} md={10} lg={10} style={{background: "black", color: "white"}}>
                  <Row style={{background: "black", color: "white"}} className="headerRow">
                    {current.name} - {current.location} - {current.datetime}
                  </Row>
                  <Row style={{background: "black", color: "white"}} className="bodyRow">
                    {current.precis}                                
                  </Row>
                </Col>                                  
                <Col xs={2} md={2} lg={2} style={{background: "black", color: "white", textAlign: "right"}}>                
                  <Button hidden={isHidden(props.loggedIn.username, current.creator)} className="iconStyle" onClick={() => {apiClient.deleteEvent(`${current._id}`); props.refreshD();}}><FaTrash/></Button><br/>                  
                  <Button hidden={isHidden(props.loggedIn.username, current.creator)} className="iconStyle"><Link style={{color: "black"}} className="nav-link" to={"/Amend/" + index}><FaEdit/></Link></Button><br/>                  
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
