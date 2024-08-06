import CryptoJS from "crypto-js";

const SECRET_PASS = "XkhZG4fW2t2W";




export const encryptData = (data) => {
    try {
        const encryptCode = CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_PASS).toString();

        // console.log(encreptCode)

        return encryptCode

    } catch (error) {
        console.log("some error encreptCode")
        return null
    }
};


export const decryptData = (data) => {
    try {

        console.log(data)
        const bytes = CryptoJS.AES.decrypt(data, SECRET_PASS);
        const decryptData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        return decryptData
    } catch (error) {
        console.log("some error in  decryptData ")
        return null
    }
};
