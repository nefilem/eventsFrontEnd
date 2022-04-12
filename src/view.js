import React,{useReducer, useState} from 'react';
// import Table from 'react-bootstrap/Table';
// import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
// icons import
//import Heart from "react-animated-heart";
// component import
import './App.css';
import './card.css';
import {FaHeart} from "react-icons/fa";
import manimage from './images/man.png';
import womanimage from './images/woman.png';

import ApiClient from './ApiClient.js';

function View(props){

  const [count, setCount] = useState(0);
  const [isClick, setClick] = useState(false);
  
  const handleLikes = (index) => {
    props.updateLikes(index);
  }

  const apiClient = new ApiClient();

  const userImage = (findusername) => {

    if (findusername === null || findusername === "" || findusername === "default") { 
      return manimage; 
    }

    const user = props.userdetails.find((e) => e.username === findusername);
    //console.log("AAA:" + findusername);

    if (findusername === null || findusername === "" || findusername === "default" || user === undefined) { 
      return manimage; 
    }

//console.log(user.image);

    if (user === null|| user === "") {
      console.log("A");
      return manimage;
    } else {
      console.log("B" + user.image);
      switch (user.image)
      {
        case "1":
          console.log("man");
          return manimage;
          break;
        case "2":
          console.log("woman");
          return womanimage;
          break;
        default:
          console.log("default to man");
          return manimage;
          break;
      }
    }  
  }

  const userFullName = (findusername) => {

    const user = props.userdetails.find((e) => e.username === findusername);

    if (findusername === "" || findusername === null || findusername === "default" || user === undefined) {
      return "Anonymous User (" + findusername + ")";
    }
    
    return user.fullname;    

  }

  const buildCards = () => {        

console.log("props.eventsdata", props.eventsdata);

    if (props.eventsdata === undefined) {return ""}

    apiClient.getAllEvents()
    .then((response) => {
      console.log(response);

    });

    return props.eventsdata.map((current, index) => (
      <>
      <br/>
      <div className="container cardMain">        
          <Card>
            <Card.Header className="cardHeader">{current.name} - {current.location} - {current.datetime}</Card.Header>
            <Card.Body className="cardBody">
              <blockquote className="blockquote mb-0">
                <p>
                  {' '}
                  {current.precis}{' '}
                </p>                
                <footer className="cardFooter blockquote-footer">                  
                </footer>                
              </blockquote>
            </Card.Body>
          </Card>    
        </div>
        </>
    ))
    // return props.eventsdata.map((current, index) => (
    //   <>
    //   <br/>
    //   <div className="container cardMain">        
    //       <Card>
    //         <Card.Header className="cardHeader"><img src={userImage(current.username)} alt="avatar image for user"></img>{userFullName(current.username)}</Card.Header>
    //         <Card.Body className="cardBody">
    //           <blockquote className="blockquote mb-0">
    //             <p>
    //               {' '}
    //               {current.description}{' '}
    //             </p>
    //             {/* <Heart isClick={isClick} onClick={() => { setClick(!isClick); setCount(count + 1); } }/> */}
    //             <footer className="cardFooter blockquote-footer">
    //               Post was liked by {current.like} user(s). 
    //               <br/>                   
    //               <button onClick={() => handleLikes(index)}>
    //                 < FaHeart style={{color: 'red'}}/>
    //               </button>                 
    //             </footer>                
    //           </blockquote>
    //         </Card.Body>
    //       </Card>    
    //     </div>
    //     </>
    // ))
  }


    return (
      <>
        {buildCards()}
        {/* <Table striped bordered hover>
          <thead>
            <tr>
              <th>username</th>
              <th>description</th>
              <th>like</th>
            </tr>
          </thead>
          <tbody>
            {buildRows()}
          </tbody>
        </Table> */}
      </>
    );

}
export default View;
