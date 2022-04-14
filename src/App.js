// import logo from './logo.svg';
import './App.css';
// React
import React, {useEffect, useState} from 'react';
// React-router-dom
import {Routes, Route, Link} from 'react-router-dom';
// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// icons import
import { FaHome, FaPenNib, FaBell, FaUser, FaDungeon, FaWalking } from "react-icons/fa";
// import components
import Add from './Add';
import AddUser from './AddUser';
import View from './view';
import Amend from './Amend.js';
import LoginUser from './LoginUser.js'

import ApiClient from './ApiClient.js';

import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

function App() {

  const [loggedIn, cLoggedIn] = useState({
    username: "", 
    loggedIn: false,
    adminUser: false    
  });

  const updateList = (name, location, datetime, precis, creator) => {    
    //const listItem = {name, location, datetime, precis, creator};
    apiClient.createEvent(name, location, datetime, precis, creator);
    cRefreshData(Math.random()*100);
  }

  const amendList = (id, name, location, datetime, precis, creator) => {    
    //const listItem = {id, name, location, datetime, precis, creator};    
    apiClient.amendEvent(id, name, location, datetime, precis, creator);
    cRefreshData(Math.random()*100);    
  }

  const updateUser = (username, password) => {
  //  const userItem = {username, password};
    apiClient.addUser(username, password);
  }

  const loginUser = (username, password) => {
    //const userItem = {username, password};    

    toastr.options = {
      "closeButton": true,
      "debug": false,
      "newestOnTop": false,
      "progressBar": true,
      "positionClass": "toast-top-right",
      "preventDuplicates": false,
      "onclick": null,
      "showDuration": "2000",
      "hideDuration": "1000",
      "timeOut": "5000",
      "extendedTimeOut": "1000",
      "showEasing": "swing",
      "hideEasing": "linear",
      "showMethod": "fadeIn",
      "hideMethod": "fadeOut"
    }
 
    apiClient.loginUser(username, password)
    .then((response) => {
      if (response.data.loggedIn === true) {
        cLoggedIn({username: username, loggedIn: response.data.loggedIn, adminUser: response.data.adminUser});        
        toastr.success("Login successful, welcome back " + username, "Success");
      } else {
        toastr.error("Username/Password incorrect, please try again.", "Error");
      }
    });    
  }

  const refreshD = () => {
    cRefreshData(Math.random() * 90);
  };

  const apiClient = new ApiClient();

  const [eventsData, cEventsData] = useState();
  const [refreshData, cRefreshData] = useState();

  useEffect(() => {
  }, [loggedIn]);

  useEffect(() => {    
  }, [eventsData]);

  useEffect(() => {
    apiClient.getAllEvents()
    .then((response) => {      
      cEventsData(response.data);      
    });
  }, [refreshData]);

  useEffect(() => {
    apiClient.getAllEvents()
    .then((response) => {      
      cEventsData(response.data);      
    });
    
  }, []);

  // removed
  // <Link className="nav-link" to="/view" ><FaBell/></Link>
  // from below FaHome line
  return (    
    <div className="container-1">
        <Navbar bg="success" expand="md">
          <Container>
            <Navbar.Brand href="#home">Event App</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Link className="nav-link" to="/" ><FaHome/></Link>                
                <Link className="nav-link" hidden={!loggedIn.loggedIn} to="/Add"><FaPenNib/></Link>
                <Link className="nav-link" hidden={loggedIn.loggedIn} to="/AddUser"><FaUser/></Link>
                <Link className="nav-link" to="/LoginUser" hidden={loggedIn.loggedIn}><FaDungeon/></Link>
                <div className="nav-link" hidden={!loggedIn.loggedIn} onClick={() => {cLoggedIn({username: "", loggedIn: false})}}><FaWalking/></div>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <div className="container-2">
        <Container>
          <Routes>
            <Route index element={
              <View eventsdata = {eventsData} loggedIn={loggedIn}/>
            }/> 
            <Route path="/Add" element={
              <Add updateList={                
                (name, location, datetime, precis, creator) => 
                updateList(name, location, datetime, precis, creator)}
                loggedIn={loggedIn}/>
            }/>
            <Route path="/AddUser" element={
              <AddUser updateUser={(username, password) => updateUser(username, password)}/>
            }/>
            <Route path="/LoginUser" element={
              <LoginUser loginUser={(username, password) => loginUser(username, password)}/>
            }/>
            <Route path="/view" element={
              <View eventsdata = {eventsData} loggedIn={loggedIn} refreshD={() => refreshD()}/>
            }/>                      
            <Route path="/Amend/:index" element={
                <Amend eventsdata={eventsData} amendList={
                  (id, name, location, datetime, precis, creator) => 
                  amendList(id, name, location, datetime, precis, creator)
                  }/>
              }/>       
          </Routes>  
        </Container>
        </div>
      </div>
  );
}

export default App;
