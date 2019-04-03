# aes
aes 加密工具类
##使用方法
```
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
```