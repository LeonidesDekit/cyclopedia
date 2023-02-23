import React from "react";

class Instructor extends React.Component{
    constructor(props){
        super(props)
    }

    componentDidUpdate(){
    //      console.log("Update - Instructor");
    }
    componentDidMount(){
      //  console.log("Mounted - Instructor");
    }
    componentWillUnmount(){
        //console.log("Unmount - Instructor");
    }
    render(){
        //console.log("Render - Instructor");
        return(
            <div>
               
                Name : {this.props.instructor.name}
                <br></br>
                Email : {this.props.instructor.email}
                <br></br>
                Phone : {this.props.instructor.phone}
                <br/>
            </div>
        )
    }
}

export default Instructor;