import React from "react";
import ts from "../home.png";
import './Photo.css';

function Photo(props) {
  return (
    <div className="Photo">
      <img src={ts} alt="imag" className="photo-img" />
      {props.children}
      <img
        src="https://www.cyberriskaware.com/wp-content/uploads/2019/02/graphic@4x.png"
        alt="React Image"
        className="graphic-img"
      />
    </div>
  );
}

export default Photo;
