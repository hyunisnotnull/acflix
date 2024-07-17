// 아이디 확인
let loginedSessionID = '';

export const getLoginedSessionID = () => {
    console.log('getLoginedSessionID()');

    return loginedSessionID;

}

export const setLoginedSessionID = (id = '') => {
    console.log('setLoginedSessionID()');

    loginedSessionID = id;

}
// 아이디 확인 종료