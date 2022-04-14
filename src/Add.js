import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

function Add(props) {

    const[state, changeState] = useState({
        name: "",
        location: "",        
        precis: "",
        datetime: "",
        creator: props.loggedIn.username
    });

    const submitHandler = (e) => {
        e.preventDefault();  
        let errorText = [];
        if (state.name === null||state.name === "") { errorText.push("Event name"); }
        if (state.location === null||state.location === "") { errorText.push("Location"); }
        if (state.datetime === null||state.datetime === "") { errorText.push("Date/Time"); }
        if (state.precis === null||state.precis === "") { errorText.push("Description"); }
        if (errorText.length>0) { 
            toastr.error(errorText.join(" and ") + " is missing", "Error"); 
        } else {        
            props.updateList(state.name, state.location, state.datetime, state.precis, props.loggedIn.username);
            // 0 above is creator, needs to change for authorisation functionality
            toastr.success("Your post was added!", "Success");
            changeState({
                name: "",
                location: "",
                datetime: "",
                precis: "",
                creator: props.loggedIn.username
            });
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
                newState[event.target.name] = event.target.value;    
                break;
        }
        
        changeState(newState);        
    }
    return(
        <div className="container cardBody">
            <Form onSubmit={(e) => submitHandler(e) }>
                <Form.Group controlId="name">
                    <Form.Label>Event Name</Form.Label>
                     <Form.Control name="name"
                      type="text" 
                      value={state.name} 
                      onChange={(e) => handleChange(e)}
                      onFocus={(e) => e.target.select()}/>
                </Form.Group>
                <Form.Group controlId="location">
                    <Form.Label>Location</Form.Label>
                     <Form.Control name="location"
                      type="text" 
                      value={state.location} 
                      onChange={(e) => handleChange(e)}/>
                </Form.Group>
                <Form.Group controlId="datetime">
                    <Form.Label>Date/Time of Event</Form.Label>
                     <Form.Control name="datetime"
                      type="text"                       
                      value={state.datetime} 
                      onChange={(e) => handleChange(e)}/>
                </Form.Group>
                <Form.Group controlId="precis">
                    <Form.Label>Description</Form.Label>
                     <Form.Control name="precis"
                      type="text"            
                      value={state.precis}                                  
                      onChange={(e) => handleChange(e)}/>
                </Form.Group>

                <Button variant="success" type="submit">Submit</Button>
            </Form>
        </div>
    )
}

export default Add;