import React from "react";
import ts1 from "../pages/b2.png"
function Phot(props){
    return(
        <div>
            <img src={ts1}alt="imag"width="100%" height={"100%"}/>
            {props.children}
        </div>
    );

}
export default Phot;