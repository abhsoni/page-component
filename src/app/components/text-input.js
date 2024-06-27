import React from "react";
function TextInput({title,state,setState}){
    return(
    <React.Fragment>
        <span className="title">{title}</span>
        <input
            placeholder="Total Cost of Asset"
            type="number"
            value={state}
            className="inputBox"
            onChange={(e)=>{setState(e.target.value)}}
        />
    </React.Fragment>);
}
export default TextInput;