
const outputArr = document.querySelectorAll(".output");
var PrimeArray = [2];     
var p;var q;var e;var n;var n1;var d;var word;var sec;var word1;

//欧几里得算法--求最大公约数
function gcd(a, b) {
    return b == 0 ? a : gcd(b, a % b);
}
//判断是否为素数
function isPri(n) {
    if (n == 0n || n == 1n) {
        return false;
    }
    if (n == 2n) {
        return true;
    }
    // let Math.sqrt(n);
    for (let i = 2; i < Math.sqrt(n)+1n; i++) {
        if (n % i == 0n) {
            return false;
        }
    }
    return true;
}
//扩展欧几里得算法;
function all(e, n) {
    var e, n, j, x, y;
    var arr = [];
    function eGcd(a, b, x, y) {
        if (b == 0n) {
            x = 1n;
            y = 0n;
            arr = [x, y]
            return arr;
        }
        var ret = eGcd(b, a % b, x, y);
        var t = ret[0n]
        x = ret[1n];
        y = t - BigInt(parseInt(a / b)) * x;
        ret = [x, y]
        return ret;
    }
    return eGcd(e, n, x, y);
}
//求a的n次方
function an(a, n) {
    var s = 1n;
    for (var i = 0n; i < n; i++) {
        s *= a
    }
    return s;
}
//快速模指运算  a^n mod b
function expMod(a, n, b) {
    var t
    if (n == 0n) return 1n % b;
    if (n == 1n) return a % b;
    t = expMod(a, n / 2n, b);
    t = t * t % b;
    //如果n是奇数，需要多乘一次a
    if ((n & 1n) == 1n) t = t * a % b;
    return t;
}
//initPrim 生成素数表
function initPrim(){
    let count=BigInt(document.getElementById("myCount").value);
    for(let i=2;i<count;i++){
        let j;let tag=0;
        for(j=0;j<PrimeArray.length&&PrimeArray[j]<Math.sqrt(i)+1;j++){
            if(i%PrimeArray[j]==0){tag=1;break;}
        }
        if(tag==0){PrimeArray.push(i);}
    }
    console.log(PrimeArray)
}
// 随机参数
function randomPrim(){
    p=BigInt(PrimeArray[Math.floor(Math.random()*PrimeArray.length)]);
    do{
        q=BigInt(PrimeArray[Math.floor(Math.random()*PrimeArray.length)]);
    }while(p==q)
    do{
        e=BigInt(PrimeArray[Math.floor(Math.random()*PrimeArray.length)]);
    }while(e==q||e==p)
    n = p * q;
    n1 = (p - 1n) * (q - 1n);
    outputArr[0].innerHTML = p;
    outputArr[1].innerHTML = q;
    outputArr[2].innerHTML = e;
    outputArr[3].innerHTML = n;
    outputArr[4].innerHTML = n1;

}
// 产生密钥
function  primaryKey(){
    var temp = all(e, n1)
    d = BigInt(temp[0])
    if (d < 0) {
        d = d + n1
    }
}
// 加密
function  encrypt(){
    word=BigInt(document.getElementById("lazy").value);
    if(word>=n-1n){alert('输入的明文大于等于n-1，不符合要求！');return;}
    sec = expMod(word, e, n)
    outputArr[5].innerHTML = word;
    outputArr[6].innerHTML = sec;
}
// 解密
function  decrypt(){
    word1 = expMod(sec, d, n)
    if(document.getElementById('de')){
        document.getElementById("result").removeChild(document.getElementById('de'));
    }
    outputArr[7].innerHTML = word1;
}
// 重置
function reset() {
    const len = outputArr.length;
    for (let i=0; i < len; i++){
        outputArr[i].innerHTML = '000';
    }
} 
window.onload = () => {
    document.querySelector('#genePrime').onclick();
}