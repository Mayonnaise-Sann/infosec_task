// 密文
var ciphertext = undefined;
// 添加待加密【或解密】文件
let plaintextFile = document.querySelector("#plaintextFile");
let plaintext = document.querySelector("#plaintext");
// 下载待加密【或解密】文件按钮
let downloadFile = document.querySelector("#downloadFile");
let trigger = document.querySelector("#trigger");
// 密钥
let secretkey = undefined;
let keyInput = document.querySelector("#secretkey");

// 正则检验空白输入
let reg_space = /^\s*$/g;
function regSpace(s) {
    if (reg_space.test(s)) {
        alert("输入不能空白");
        return -1;
    }
    return 1;
}

keyInput.addEventListener('change', (e) => {
    if (regSpace(e.target.value) == -1) {
        secretkey = undefined; return;
    } else {
        secretkey = e.target.value;
   }
})



// 1. 载入文件
function handleFile(evt) {
    let file = evt.target.files[0];
    let reader = new FileReader();
    //将文件以文本形式读入页面
    reader.readAsText(file);
    reader.onload = (e) => {
        let strP = e.target.result;
        // let strP = e.target.result.replace(/\s*/g,"");
        plaintext.value = strP;
    }
}
plaintextFile.addEventListener("change", handleFile);


// 2.1 加密或者解密
function handleText(strP) {
    let result = new Array;
    let len = strP.length;
    for (let i = 0; i < len; i++) {
        //  result += String.fromCharCode(strP[i].charCodeAt() ^ (secretkey[i % secretkey.length].charCodeAt()));
        
        // 加密算法：按字符串的二进制位取数，与密钥进行异或运算
        // 密钥和文本不等长时，循环取密钥位
        let c = strP[i].charCodeAt();
        let k = (secretkey[i % secretkey.length].charCodeAt());
        // 先存入数组，避免字符串拼接，提高性能
        result.push(String.fromCharCode( c^k ));
    }
    // 转为字符串
    ciphertext = result.join("");
}


// 2.2 点击加密或解密
trigger.addEventListener("click", () => { 
    if (!secretkey) {
        alert("请输入密钥！");
    } else {
        if (regSpace(plaintext.value)) {
            handleText(plaintext.value);
            let cText = document.querySelector("#cText");
             cText.innerHTML = ciphertext;
        }
        
    }
 });



// 3.1 下载加密密文或者解密后的明文
function downloadHandledFile(val) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(val));
    element.setAttribute('download', 'ciphertext');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

downloadFile.addEventListener("click", ()=>{downloadHandledFile(ciphertext)});