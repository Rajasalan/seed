import React,{useState} from 'react'

function TodoForm({addTodo}) {
    const [inputValue,setIputValue]=useState("");

    const handleInputChange =(e)=>{
        setIputValue(e.target.value);
    }

    const handleFormSubmit=(e)=>{
        e.preventDefault(); 
        if(inputValue.trim()=== "" ) return;
        const object = {content:{}};
        object.content[`key${inputValue}`] = inputValue;
        addTodo(object);
    }
    return (
       <form className="ui form" onSubmit={handleFormSubmit}>
           <div className="ui grid centered align">
               <div className="row">
                   <div className="column five wide">
                       <input type="text" value={inputValue} onChange={handleInputChange} type="text" placeholder="Enter todo"/>
                   </div>
                   <div className="column one wide">
                    <button type="submit" className="ui button circular icon green"><i className="plus icon"></i></button>
                   </div>
               </div>
           </div>
       </form>
    )
}

export default TodoForm
