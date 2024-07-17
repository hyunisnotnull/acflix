import React from "react";


const Header = () => {
  
  return(
    <div className="header">
      <a href="/"><img src={process.env.PUBLIC_URL + '/imgs/logo.png'} alt="logo_img" /></a>
     </div>
  );
}

export default Header;