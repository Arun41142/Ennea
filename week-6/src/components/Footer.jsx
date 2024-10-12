import React from "react";
const date=new Date();
const yr=date.getFullYear();
const Footer=()=>{
    return (
        <h3 className="footer">Copyright <i className="fa-regular fa-copyright"></i> {yr}</h3>
    );
}
export default Footer;