import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import { useNavigate } from 'react-router-dom';

function AddUser(props) {

    let navigate = useNavigate();

    const[state, changeState] = useState({
        username: "",
        password: ""        
    });

    const submitHandler = (e) => {
        e.preventDefault();              
        let errorArray = [];
        if (state.username === null||state.username === "") { errorArray.push("Username"); }
        if (state.password === null||state.password === "") { errorArray.push("Password"); }
        if (errorArray.length > 0) {
            toastr.error(errorArray.join(" and ") + " input(s) are missing information.", "Error");
        } else {
            props.updateUser(state.username, state.password);
            toastr.success("Your user was added!", "Success");
            changeState({
                username: "",
                password: "",
            });    
            navigate('/LoginUser');
        }            
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
                if (event.target.type !== "text") {
                    newState["image"] = event.target.attributes[1].nodeValue;                                
                } else {
                    newState[event.target.name] = event.target.value;    
                }
                break;
        }
    
        changeState(newState);        
    }
    return(
    <>
        Create User
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
                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                     <Form.Control name="password"
                      type="text" 
                      value={state.password} 
                      onChange={(e) => handleChange(e)}/>
                </Form.Group>                          
                <Button variant="success" type="submit">Create User</Button>
            </Form>
        </div>
    </>
    )
}

export default AddUser;