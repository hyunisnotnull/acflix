import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAcMemDB, setAcMemDB, getAcFavDB, setAcFavDB } from "../js/db";
import { encrypt } from "../js/encrypt.js";

const profilePic = process.env.PUBLIC_URL + '/imgs/none.png'

const SignIn = () => {

    // Hook
    const [uId, setUId] = useState('');
    const [uPw, setUPw] = useState('');
    const [uNick, setUNick] = useState('');
    const [uGender, setUGender] = useState(0);
    const [uAge, setUAge] = useState(0);
    const [uPhone, setUPhone] = useState('');
    const [uPicture, setUPicture] = useState(profilePic);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    // 유효성 검사
    const validateInputs = () => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;    // @가 있어야 하고 앞, 뒤로 문자가 있어야 함
        const pwRegex = /^.{6,}$/;                          // 6자리 이상
        const nickRegex = /^[가-힣a-zA-Z0-9]{2,6}$/;        // 한글, 영어 대소문자, 숫자가 2 이상 6 이하
        const phoneRegex = /^\d{3}-\d{4}-\d{4}$/;           // {}안에 숫자가 지정한 개수 만큼 있어야 함

        if (!emailRegex.test(uId)) {
            newErrors.uId = "올바른 이메일 주소를 입력하세요.";
        }

        if (!pwRegex.test(uPw)) {
            newErrors.uPw = "비밀번호는 6자 이상이어야 합니다.";
        }

        if (!nickRegex.test(uNick)) {
            newErrors.uNick = "닉네임은 2자 이상 6자 이하의 한글, 영어 또는 숫자여야 합니다.";
        }

        if (!phoneRegex.test(uPhone)) {
            newErrors.uPhone = "전화번호는 '000-0000-0000' 형식이어야 합니다.";
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const uIdChangeHandler = (e) => {
        setUId(e.target.value);
    }

    const uPwChangeHandler = (e) => {
        setUPw(e.target.value);
    }

    const uNickChangeHandler = (e) => {
        setUNick(e.target.value);
    }

    const uGenderChangeHandler = (e) => {
        setUGender(e.target.value);
    }

    const uAgeChangeHandler = (e) => {
        setUAge(e.target.value);
    }

    // 하이픈 자동 입력
    const hypenPhoneNumber = (value) => {
        const cleaned = value.replace(/\D/g, ''); 
        const match = cleaned.match(/^(\d{3})(\d{3,4})(\d{4})$/);
        if (match) {
            return `${match[1]}-${match[2]}-${match[3]}`;
        }
        return cleaned;
    }

    const uPhoneChangeHandler = (e) => {
        const changePhoneNumber = hypenPhoneNumber(e.target.value);
        setUPhone(changePhoneNumber);
    }

    const closeClickHandler = () => {
        navigate('/login');
    }

    const signUpBtnClickHandler = () => {
        // 아이디 DB와 대조
        let acMemDB = getAcMemDB();
        if (acMemDB !== null) {
            let aldAcMem = JSON.parse(acMemDB);
            if (aldAcMem[uId]) {
                alert("이미 가입된 회원입니다.");
                navigate('/login');
                return; // 중복 회원이면 가입 절차 중단
            }
        }

        // 유효성 검사
        if (!validateInputs()) {
            return;
        }

        // 비밀번호 암호화
        const encryptedPw = encrypt(uPw);

        if (acMemDB === null) {
            let newMemObj = {
                [uId]: {
                    'uId': uId,
                    'uPw': encryptedPw,
                    'uNick': uNick,
                    'uGender': uGender,
                    'uAge': uAge,
                    'uPhone': uPhone,
                    'uPicture': uPicture,
                }
            }
            setAcMemDB(newMemObj);

        } else {
            let aldAcMem = JSON.parse(acMemDB);
            aldAcMem[uId] = {
                'uId': uId,
                'uPw': encryptedPw,
                'uNick': uNick,
                'uGender': uGender,
                'uAge': uAge,
                'uPhone': uPhone,
                'uPicture': uPicture,
            }
            setAcMemDB(aldAcMem);
        }

        // 찜 목록 생성
        let acFavDB = getAcFavDB();
        if (acFavDB === null) {
            let newFavs = {
                [uId]: {}
            }
            setAcFavDB(newFavs);

        } else {
            let aldAcFavDB = JSON.parse(acFavDB);
            aldAcFavDB[uId] = {};
            setAcFavDB(aldAcFavDB);
        }
        alert('회원가입이 완료되었습니다.');
        
        // 입력 정보 초기화
        setUId('');
        setUPw('');
        setUNick('');
        setUGender(0);
        setUAge(0);
        setUPhone('');
        setUPicture(profilePic);
        navigate('/login');
    }

    return (
        <div id="sign_up_modal">
            <div className="sign_up_modal_content">
                <div className="close" onClick={closeClickHandler}>
                    X
                </div>
                <h2>회원 가입</h2>
                <input className="txt_basic" type="email" value={uId} onChange={uIdChangeHandler} placeholder="이메일 주소" />
                {errors.uId && <p>{errors.uId}</p>}
                <br />
                <input className="txt_basic" type="password" value={uPw} onChange={uPwChangeHandler} placeholder="비밀번호를 추가하세요" />
                {errors.uPw && <p>{errors.uPw}</p>}
                <br />
                <input className="txt_basic" type="text" value={uNick} onChange={uNickChangeHandler} placeholder="닉네임" />
                {errors.uNick && <p>{errors.uNick}</p>}
                <br />
                <select className="gen" name="gender" id="gen" value={uGender} onChange={uGenderChangeHandler}>
                    <option value="0">성별</option>
                    <option value="M">남성</option>
                    <option value="W">여성</option>
                </select>
                <select name="u_age" id="age" value={uAge} onChange={uAgeChangeHandler}>
                    <option value="0">나이</option>
                    <option value="10">10대</option>
                    <option value="20">20대</option>
                    <option value="30">30대</option>
                    <option value="40">40대</option>
                    <option value="50">50대</option>
                    <option value="60">60대 이상</option>
                </select>
                <br />
                <input className="txt_basic" type="text" value={uPhone} onChange={uPhoneChangeHandler} placeholder="휴대전화번호" />
                {errors.uPhone && <p>{errors.uPhone}</p>}
                <br />
                <button className="btn_basic" onClick={signUpBtnClickHandler}>회원 가입</button>
            </div>
        </div>
    );
}

export default SignIn;