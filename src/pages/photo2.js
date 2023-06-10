import React from "react";
import ts from "../cat.png";
function PHOTO(props){
    return(
        <div>
            <img src={ts}alt="imag"width="90px"/>
            {props.children
           
    }
        </div>
    );

}
export default PHOTO;