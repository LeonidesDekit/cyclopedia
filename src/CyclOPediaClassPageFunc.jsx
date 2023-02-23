import React, { useEffect, useId, useRef, useState } from "react";
import InstructorFunc from "./InstructorFunc";
import { getRandomUser } from "./Utility/api";

const CyclOPediaClassPageFunc = () =>{
    const [state,setState] = useState(()=>{
        return{
            instructor: undefined,
            studentList: [],
            studentCout: 0,
            hideInstructor: false,
        }
    });

    const totalRender = useRef(0);
    const prevStudentCount = useRef(0);
    const feedbackRef = useRef(null);
    const Id = useId();

    const [inputName,setInputName] = useState(() =>{return ""});
    const [inputFeedback,setInputFeedback] = useState(() =>{return ""});

    useEffect(() =>{
        console.log("This will be called on EVERY Render")
        totalRender.current = totalRender.current + 1;
    });

    
    useEffect(() =>{
        const getUser = async() =>{
            const response = await getRandomUser();
            setState ((prevState)=>{
                return{
                    ...prevState,
                    instructor : {
                        name : response.data.first_name + " " + response.data.last_name,
                        phone : response.data.phone_number,
                        email : response.data.email
                    },
                };
            });
        }
        if(!state.hideInstructor){
            getUser();
        }
        
    },[state.hideInstructor]);

    useEffect(() =>{
        const getUser = async() =>{
            const response = await getRandomUser();
            setState ((prevState)=>{
               
                    return{
                        ...prevState,
                        studentList :[
                            ...prevState.studentList,{
                                    name : response.data.first_name + " " + response.data.last_name
                            }
                        ],
                    };
            });
        }
        if(prevStudentCount.current < state.studentCout){
            getUser();
        }else if(prevStudentCount.current > state.studentCout){
            setState((prevState) =>{
                return{
                    ...prevState,
                    studentList : []
                }
            })
        }        
    },[state.studentCout]);

    useEffect(() =>{
        prevStudentCount.current = state.studentCout;
    },[state.studentCout]);

    useEffect(() =>{
    },[inputFeedback]);

    
    useEffect(() =>{
        feedbackRef.current.focus();
        return () =>{
            console.log("This will be called on when component will be UNMOUNT")
        }
    },[]);
    
    const handleAddStudent = () =>{
        setState((prevState) =>{
            return{
                ...prevState,
                studentCout : prevState.studentCout + 1
            } 
        }) 
    }

    const handleRemoveAllStudent = () =>{
        setState((prevState) =>{
            return{
                ...prevState,
                studentCout : 0
            } 
        })
    }

    const handleToggle = () =>{
        setState((prevState) =>{
            return{
                ...prevState,
                hideInstructor : !prevState.hideInstructor,
            } 
        })
    }
    
    return(
        <div>
            <div className="p-3">
                <span className="h4 text-success">Instructor</span>
                <i className={`bi ${state.hideInstructor ? 
                    "bi-toggle-off" :"bi-toggle-on"} 
                    btn btn-success btn-sm`} 
                    onClick={ handleToggle}></i>
                {!state.hideInstructor &&  state.instructor ? ( 
                    <InstructorFunc instructor={ state.instructor}></InstructorFunc>)
                    : null}
            </div>
           
            <div className="p-3">
                <span className="h4 text-success">Feedback</span>
                <br/>
                <input type="text" placeholder="Name..."
                        id={`${Id}+ inputName`}
                       onChange={(e)=>{ setInputName(e.target.value)}}>  
                </input>
                <br></br>
                <label htmlFor={`${Id}+ inputName`}>Name Value : { inputName}</label>  
                <br/>
                <textarea   ref={feedbackRef}
                            placeholder="Feedback..." 
                            id={`${Id}+inputFeedback`}
                            onChange={(e) => { setInputFeedback(e.target.value)}}>
                </textarea>
                <br></br>
                <label htmlFor={`${Id}+inputFeedback`}>Feedback Value : {inputFeedback}</label> 
            </div>
            <div className="p-3">
            <span className="h4 text-success">Students</span><br/>
            <span className="h4 text-success">Total Render : {totalRender.current}</span><br/>
            <div>
            Studenet Count : { state.studentCout}<br/>
            </div> 
            <button className="btn btn-success btn-sm" onClick={ handleAddStudent}>Add Student</button>
            &nbsp;
            <button className="btn btn-danger btn-sm" onClick={ handleRemoveAllStudent}>Remove All Students</button>

            {
                 state.studentList.map((student,index) =>{
                    return(
                        <div className="text-white" key={index}>-{student.name}</div>
                    )
                })
            }
            </div>
        </div>)
            
        
    //}
}

export default CyclOPediaClassPageFunc;