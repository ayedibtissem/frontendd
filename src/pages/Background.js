import React from "react";
import ts from "../background.png";
function Background(props){
    return(
        <div>
            <img src={ts}alt="imag"width="90px"/>
            {props.children
           
    }
        </div>
    );

}
export default Background;