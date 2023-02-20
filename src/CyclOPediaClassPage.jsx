import React from "react";
import Instructor from "./Instructor";
import { getRandomUser } from "./Utility/api";

class CyclOPediaClassPage extends React.Component{
    constructor(props){
        super(props);
        this.state = JSON.parse(localStorage.getItem("cyclopediaList")) || {
            instructor: undefined,
            studentList: [],
            studentCout: 0,
            hideInstructor: false,
            inputName: "",
            inputFeedback: "",
        }
    }

    componentDidMount = async() =>{
        console.log("Component Did Mount");
        if(JSON.parse(localStorage.getItem("cyclopediaList"))){
           this.setState(JSON.parse(localStorage.getItem("cyclopediaList")));
        }else{
            const response = await getRandomUser();
            console.log(response);
            this.setState ((prevState)=>{
                return{
                    instructor : {
                        name : response.data.first_name + " " + response.data.last_name,
                        phone : response.data.phone_number,
                        email : response.data.email
                    },
                };
            });
        }
        ;
    }

    componentDidUpdate = async(prevProps, prevState) => {
        console.log("Component Did Upadte");
        localStorage.setItem('cyclopediaList',JSON.stringify(this.state));
        console.log("New state " + this.state.studentCout);
        console.log("Old state " + prevState.studentCout);

        if(prevState.studentCout < this.state.studentCout){
            const response = await getRandomUser();
            console.log(response);
            this.setState((prevState) =>{
                return{
                    studentList : [
                        ...prevState.studentList,{
                            name : response.data.first_name + " " + response.data.last_name
                        }
                    ]
                }
                
            })
        }else if(prevState.studentCout > this.state.studentCout){
            this.setState((prevState) =>{
                return{
                    studentList : []
                }
                
            })
        }
    }

    handleAddStudent = () =>{
        this.setState((prevState) =>{
            return{
                studentCout : prevState.studentCout + 1
            } 
        }) 
    }

    handleRemoveAllStudent = () =>{
        this.setState(() =>{
            return{
                studentCout : 0
            } 
        })
    }

    handleToggle = () =>{
        console.log("handle");
        this.setState((prevState) =>{
            return{
                hideInstructor : !prevState.hideInstructor,
            } 
        })
    }
    componentWillUnmount(){
        console.log("Component Will UnMount")
    }

    render(){
        console.log("Render Component");
        return(
        <div>
            <div className="p-3">
                <span className="h4 text-success">Instructor</span>
                <i className={`bi ${this.state.hideInstructor ? 
                    "bi-toggle-off" :"bi-toggle-on"} 
                    btn btn-success btn-sm`} 
                    onClick={this.handleToggle}></i>
                {!this.state.hideInstructor && this.state.instructor ? ( 
                    <Instructor instructor={this.state.instructor}></Instructor>)
                    : null}
            </div>
           
            <div className="p-3">
                <span className="h4 text-success">Feedback</span>
                <br/>
                <input type="text" placeholder="Name..."
                       onChange={(e)=>{this.setState({inputName : e.target.value})}}>  
                </input>
                Value : {this.state.inputName} 
                <br/>
                <textarea placeholder="Feedback..." onChange={(e) => {this.setState({inputFeedback : e.target.value})}}></textarea>
                Value : {this.state.inputFeedback}
            </div>
            <div className="p-3">
            <span className="h4 text-success">Students</span><br/>
            <div>
            Studenet Count : {this.state.studentCout}<br/>
            </div> 
            <button className="btn btn-success btn-sm" onClick={this.handleAddStudent}>Add Student</button>
            &nbsp;
            <button className="btn btn-danger btn-sm" onClick={this.handleRemoveAllStudent}>Remove All Students</button>

            {
                this.state.studentList.map((student,index) =>{
                    return(
                        <div className="text-white" key={index}>-{student.name}</div>
                    )
                })
            }
            </div>
        </div>)
            
        
    }
}

export default CyclOPediaClassPage;