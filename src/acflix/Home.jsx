import React from "react";
import { useNavigate } from "react-router-dom";


const Home = () => {

  const navigate = useNavigate();

  const startClickHandler = () => {
    navigate('/login');
  }

  return(
    <div id="homepage">
      <h2>회원님, 반갑습니다.</h2>
      <br />
      <h1>영화, 시리즈 등을 무제한으로</h1>
      <br />
      <h2>어디서나 자유롭게 시청하세요. 해지는 언제든 가능합니다.</h2>
      <button className="btn_basic" type="text" onClick={startClickHandler}>가입하고 시작하기 &nbsp; &nbsp;{'>'}</button>
    </div>
  );
}

export default Home;