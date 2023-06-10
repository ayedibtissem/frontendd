
import React from "react";
import ts1 from "../pages/b1.png"
function Pho(props){
    return(
        <div>
            <img src={ts1}alt="imag"width="100%" height={"100%"}/>
            {props.children}
        </div>
    );

}
export default Pho;