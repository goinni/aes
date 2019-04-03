/*
 * @Author: houzhenyu 
 * @Date: 2019-03-12 17:59:47 
 * @Last Modified by:   jerry 
 * @Last Modified time: 2019-03-12 17:59:47 
 */
const crypto = require('crypto');
const algorithm = 'aes-128-ecb';
const clearEncoding = 'utf8';
/**
 * 加密
 * @param {*} password  要加密的内容
 * @param {*} key       加密算法要求key和iv长度都为16
 * @param {*} iv        可以为空
 * @param {*} cipherEncoding  加密方式 hex 或 base64
 * @returns 密钥字符串;
 */
function genSign(password, key, iv, cipherEncoding) {
        
        //If the next line is uncommented, the final cleartext is wrong.
        var ce = cipherEncoding || 'hex';
        var cipher = crypto.createCipheriv(algorithm, key, iv || "");
        var cipherChunks = [];
        cipherChunks.push(cipher.update(password, clearEncoding, ce));
        cipherChunks.push(cipher.final(ce));
        // 结果如：[ '', 'ee480e62085ffefb47d63e9167ad1934' ]
    return cipherChunks.join('');
}

/**
 * 解密
 * @param {*} cipherChunks  加密后的密钥字符串
 * @param {*} key           指定唯一密钥字符串
 * @param {*} iv            可以为空
 * @param {*} cipherEncoding 加密方式 hex 或 base64
 * @returns 反回解密后的字符串
 */
function deSign(cipherChunks, key, iv, cipherEncoding) {
        var decipher = crypto.createDecipheriv(algorithm, key,iv || "");
        var plainChunks = [];
        var ce = cipherEncoding || 'hex';
        if(typeof cipherChunks === "string"){
            cipherChunks = ['', cipherChunks];
        }
        for (var i = 0;i < cipherChunks.length;i++) {
            plainChunks.push(decipher.update(cipherChunks[i], ce, clearEncoding));
        }
        plainChunks.push(decipher.final(clearEncoding));
    return plainChunks.join('');
}
/**
 describe("单元测试", function () {
    var signresult = "";
    const key = "9vApxLk5G3PAsJrM";
    it("加密", async function () {
        signresult = genSign('houzhenyu', key);
        console.log(signresult);
    });

    it("解密", async function () {
        // 解密
        const src2=deSign(signresult, key);
        console.log(src2); 
    });
}); 
*/
module.exports = { genSign, deSign };
