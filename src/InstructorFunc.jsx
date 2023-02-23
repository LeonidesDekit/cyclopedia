import React from "react";
import { useEffect } from "react";

const InstructorFunc = (props) =>{

    useEffect(() =>{
        return () =>{
            console.log("This will be called on when component will be UNMOUNT")
        }
    },[]);
    
    return(
        <div>
            Name : {props.instructor.name}
            <br></br>
            Email : {props.instructor.email}
            <br></br>
            Phone : {props.instructor.phone}
            <br/>
            </div>
        )
}

export default InstructorFunc;