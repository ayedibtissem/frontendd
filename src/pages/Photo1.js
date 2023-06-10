import React from "react";
import ts from "../logo.png";
function Logo(props){
    return(
        <div>
            <img src={ts}alt="imag"width="90px"/>
            {props.children}  
  
        </div>
    );

}
export default Logo;