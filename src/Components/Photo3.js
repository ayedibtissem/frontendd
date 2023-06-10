import React from "react";
import ts1 from "../Components/b3.png"
function Phot1(props){
    return(
        <div>
            <img src={ts1}alt="imag"width="100%" height={"100%"}/>
            {props.children}
        </div>
    );

}
export default Phot1;