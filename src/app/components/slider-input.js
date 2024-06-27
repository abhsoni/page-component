import React from "react";
import { numberWithCommas } from "../utils/config";
function SliderInput({title,underlineTitle,min,max,labelMin,labelMax,state, onChange}){
    return (
    <React.Fragment>
        <span className="title">{title}</span>
        {state>0 && (<span className="title" style={{textDecoration:"underline"}}>{underlineTitle}</span>)}
        <div>
            <input
                type="range"
                min={min}
                max={max}
                className="slider"
                value={state}
                onChange={onChange}
            />
            <div className="labels">
                <label>{labelMin ?? numberWithCommas(min)}</label>
                <b>{state}</b>
                <label>{labelMax ?? numberWithCommas(max)}</label>
            </div>
        </div>
    </React.Fragment>
    );
}
export default SliderInput;