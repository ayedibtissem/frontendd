import React from "react";
import ts from "../pages/b5.png";
function PHOTO2(props){
    return(
        <div>
                 <img src={ts}alt="imag"width="100%" height={"100%"}/>
            {props.children
           
    }
        </div>
    );

}
export default PHOTO2;