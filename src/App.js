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
import { FaHome, FaPenNib, FaBell, FaUser, FaDungeon } from "react-icons/fa";
// import components
import Add from './Add';
import AddUser from './AddUser';
import View from './view';
import Amend from './Amend.js';
import LoginUser from './LoginUser.js'

import ApiClient from './ApiClient.js';

function App() {

  // const [userdetails, changeUserDetails] = useState([
  //   { username: "keiron", fullname: "keiron goodwin", image: false},
  //   { username: "amatul", fullname: "amatul qudoos", image: false}
  // ]);

  const [loggedIn, cLoggedIn] = useState({
    username: "", 
    loggedIn: false    
  });

  const updateList = (name, location, datetime, precis, creator) => {    
    const listItem = {name, location, datetime, precis, creator};
    console.log(listItem);
    //localStorage.setItem("list", JSON.stringify([...socmedpost, listItem]));    
    console.log("CreateEvent()", apiClient.createEvent(name, location, datetime, precis, creator));
    //cEventsData((prevState) => [...prevState, listItem]);
    cRefreshData(Math.random()*100);
  }

  const amendList = (id, name, location, datetime, precis, creator) => {    
    const listItem = {id, name, location, datetime, precis, creator};
    console.log(listItem);
    //localStorage.setItem("list", JSON.stringify([...socmedpost, listItem]));    
    console.log("AmendEvent()", apiClient.amendEvent(id, name, location, datetime, precis, creator));
    cRefreshData(Math.random()*100);
    //cEventsData((prevState) => [...prevState, listItem]);
  }

  const updateUser = (username, password) => {
    const userItem = {username, password};
    //localStorage.setItem("users", JSON.stringify([...userdetails, userItem]));
    console.log("AddUser", userItem);
    //changeUserDetails((prevState) => [...prevState, userItem]);
    apiClient.addUser(username, password);
  }

  const loginUser = (username, password) => {
    const userItem = {username, password};
    //localStorage.setItem("users", JSON.stringify([...userdetails, userItem]));
    console.log("LoginUser", userItem);
    //changeUserDetails((prevState) => [...prevState, userItem]);
    //apiClient.addUser(username, );
    //cLoggedIn(apiClient.lo)
  }

  const apiClient = new ApiClient();

  const [eventsData, cEventsData] = useState();
  const [refreshData, cRefreshData] = useState();

  useEffect(() => {
    console.log("eventsData", eventsData);
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
    /*const listContents = localStorage.getItem("list");
    changeSocMedPost(JSON.parse(listContents)||[]);
    const userContents = localStorage.getItem("users");
    changeUserDetails(JSON.parse(userContents)||[]);*/
  }, []);

  return (    
    <div>
        <Navbar bg="success" expand="md">
          <Container>
            <Navbar.Brand href="#home">Event App</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Link className="nav-link" to="/" ><FaHome/></Link>
                <Link className="nav-link" to="/view" ><FaBell/></Link>
                <Link className="nav-link" to="/Add"><FaPenNib/></Link>
                <Link className="nav-link" to="/AddUser"><FaUser/></Link>
                <Link className="nav-link" to="/LoginUser"><FaDungeon/></Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Container>
          <Routes>
            <Route index element={
              <View eventsdata = {eventsData}/>
            }/> 
            <Route path="/Add" element={
              <Add updateList={
                (name, location, datetime, precis, creator) => 
                updateList(name, location, datetime, precis, creator)
                }/>
            }/>
            <Route path="/AddUser" element={
              <AddUser updateUser={(username, password) => updateUser(username, password)}/>
            }/>
            <Route path="/LoginUser" element={
              <LoginUser loginUser={(username, password) => loginUser(username, password)}/>
            }/>
            <Route path="/view" element={
              <View eventsdata = {eventsData}/>
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
  );
}

export default App;
