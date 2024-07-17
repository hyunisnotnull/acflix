// 비밀번호 암호화 정의
export const txtToNum = {
    'b': '1', 't': '2', 'f': '3', 'q': '4', 'u': '5',
    'e': '6', 'c': '7', 'j': '8', 'z': '9', 'n': '0'
}
  
export const numToTxt = {
    '1': 'b', '2': 't', '3': 'f', '4': 'q', '5': 'u',
    '6': 'e', '7': 'c', '8': 'j', '9': 'z', '0': 'n'
}

export const generateRandomData = (length) => {
    const txts = 'ABCDEFGHIJKLMNOPQRSTUVWYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += txts.charAt(Math.floor(Math.random() * txts.length));
    }
    return result;
}

export const encrypt = (value) => {
    let encrypted = '';
    const strValue = value.toString();
    for (let num of strValue) {
        if (numToTxt[num]) {
            encrypted += numToTxt[num] + generateRandomData(3);
        } else {
            encrypted += 'X' + num;
        }
    }
    return encrypted;
}

export const decrypt = (encryptedValue) => {
    let decrypted = '';
    let i = 0;
    while (i < encryptedValue.length) {
        const num = encryptedValue.charAt(i);
        if (txtToNum[num]) {
          decrypted += txtToNum[num];
          i += 4;
        } else if (num === 'X') {
          decrypted += encryptedValue.charAt(i + 1);
          i += 2;
        }
    }
    return decrypted;
}