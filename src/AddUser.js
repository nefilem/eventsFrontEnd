import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
//import InputGroup from 'react-bootstrap/InputGroup';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import manimage from './images/manbig.png';
import womanimage from './images/womanbig.png';
//import saveAs from 'file-saver';

function AddUser(props) {

    const [selectedImage, setSelectedImage] = useState(null);    

    const[state, changeState] = useState({
        username: "",
        fullname: "",
        image: 0
    });

    const submitHandler = (e) => {
        e.preventDefault();              
        let errorArray = [];
        if (state.username === null||state.username === "") { errorArray.push("Username"); }
        if (state.fullname === null||state.fullname === "") { errorArray.push("Fullname"); }
        if (errorArray.length > 0) {
            toastr.error(errorArray.join(" and ") + " input(s) are missing information.", "Error");
        } else {
            //console.log(state.image);
            props.updateUser(state.username, state.fullname, state.image);
            toastr.success("Your user was added!", "Success");
            changeState({
                username: "",
                fullname: "",
                image: 0
            });    
        }
        console.log(state);
    }    

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

    const handleChange = (event) => {        

        const newState = {...state};        
                        
        switch (event.target.type)
        {
            case "checkbox":
                newState[event.target.name] = Boolean(event.target.checked);        
                break;
            case "number":
                newState[event.target.name] = Number(event.target.value);
                break;            
            default:
                if (event.target.type != "text") {
                    newState["image"] = event.target.attributes[1].nodeValue;                
                    console.log("jjj");
                } else {
                    newState[event.target.name] = event.target.value;    
                }
                break;
        }
    
        changeState(newState);        
    }
    return(
    <>
        <div className="container cardBody">
            <Form onSubmit={(e) => submitHandler(e) }>
                <Form.Group controlId="username">
                    <Form.Label>UserName</Form.Label>
                     <Form.Control name="username"
                      type="text" 
                      value={state.username} 
                      onChange={(e) => handleChange(e)}
                      onFocus={(e) => e.target.select()}/>
                </Form.Group>
                <Form.Group controlId="fullname">
                    <Form.Label>Full Name</Form.Label>
                     <Form.Control name="fullname"
                      type="text" 
                      value={state.fullname} 
                      onChange={(e) => handleChange(e)}/>
                </Form.Group>          
                <ButtonGroup name="image" id="image" controlId="image" onClick={(e) => handleChange(e)}>
                    <Button variant="primary" value="1"><img src={manimage} ariaDescription="1"></img></Button>
                    <Button variant="danger" value="2"><img src={womanimage} ariaDescription="2"></img></Button>                    
                </ButtonGroup>
                <br></br>
                <Button variant="success" type="submit">Submit</Button>
            </Form>
        </div>
    </>
    )
}

export default AddUser;