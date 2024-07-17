import React from "react";
import './css/index.css';

const NG = () => {
    return(
        <div className="error">
            <img src={process.env.PUBLIC_URL +"/imgs/404_error.jpg"} alt=""/>
        </div>
    );
}

export default NG;