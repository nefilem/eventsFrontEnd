import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

function Amend(props) {

    let { index } = useParams();
    let navigate = useNavigate();

    const[state, changeState] = useState({
        id: props.eventsdata[index]._id,
        name: props.eventsdata[index].name,
        location: props.eventsdata[index].location,        
        precis: props.eventsdata[index].precis,
        datetime: props.eventsdata[index].datetime,
        creator: props.eventsdata[index].creator
    });

    const submitHandler = (e) => {
        e.preventDefault();  
        let errorText = [];
        if (state.id === null || state.id === ""|| state.id === undefined) { errorText.push("ID"); }
        if (state.name === null||state.name === ""||state.name === undefined) { errorText.push("Event name"); }
        if (state.location === null||state.location === ""||state.location === undefined) { errorText.push("Location"); }
        if (state.datetime === null||state.datetime === ""||state.datetime === undefined) { errorText.push("Date/Time"); }
        if (state.precis === null||state.precis === ""||state.precis === undefined) { errorText.push("Description"); }
        if (state.creator === null||state.creator === undefined) { errorText.push("Creator");}
        if (errorText.length>0) { 
            toastr.error(errorText.join(" and ") + " is missing", "Error"); 
        } else {        
            props.amendList(state.id, state.name, state.location, state.datetime, state.precis, state.creator);
            // 0 above is creator, needs to change for authorisation functionality
            toastr.success("Your post was added!", "Success");

            // need to navigate back to the view screen now
            navigate("/view");
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

export default Amend;