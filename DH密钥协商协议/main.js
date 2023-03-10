const outputArr = document.querySelectorAll(".output");
let p = undefined;
let g = undefined;
let x, y, X, Y, k1, k2;

//判断是否为素数
function isPrime(n) {
    while (n>=2) {
        for (let i = 2; i <=Math.sqrt(n); i++) {
            if (n % i == 0) {
                return false;
            }
        }
        return true;
    }
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
// 判断是否是生成元
function isPrimeRoot(g, p){
    let modres = new Set();
    for(let i=1;i<p;i++){
        let emd = expMod(BigInt(g), BigInt(i), BigInt(p));
        if(!modres.has(emd)){
            modres.add(emd);
        } else break
    }
    if(modres.size == p-1n)
    return g 
    else 
    return -1
}
// 遍历寻找生成元，随机选取一个
function getPrimeRoot(p){
    let gArray = [];
    for(let i=0n;i<p;i++){
        const g = isPrimeRoot(BigInt(i),BigInt(p));
        if(g != -1)
          gArray.push(g);
    } 
    let len = gArray.length;
    if(len){
        return gArray[Math.floor(Math.random()*len)];
    } else return -1
}

const getPandG = document.querySelector('#getPandG');
// 随机生成范围内的素数
function getPrime(){
let PrimeArray=[];
let count=BigInt(document.getElementById("myCount").value);
    for(let i=2;i<count;i++){
            if(isPrime(i)){
                PrimeArray.push(i);
            }
        }
         p = PrimeArray[Math.floor(Math.random()*PrimeArray.length)];
        console.log(p);
}
getPandG.addEventListener('click', () => {
    reset();
    getPrime();
    if(p){
        g = getPrimeRoot(p);
        console.log(Number(g));
    }
    outputArr[0].innerHTML = p;
    outputArr[1].innerHTML = g;
})


function getX(){
    x = Math.floor(Math.random()*(p-1));
    console.log(x +'--x')
    X = expMod(BigInt(g), BigInt(x), BigInt(p));
    console.log(X + '--X');

    outputArr[2].innerHTML = x;
    outputArr[3].innerHTML = X;

}
function getY(){
    y = Math.floor(Math.random()*(p-1));
    console.log(y +'--y')
    Y = expMod(BigInt(g), BigInt(y), BigInt(p));
    console.log(Y + '--Y');

    outputArr[4].innerHTML = y;
    outputArr[5].innerHTML = Y;
}
function confirmKey(){
    k1 = expMod(BigInt(X), BigInt(y), BigInt(p));
    k2 = expMod(BigInt(Y), BigInt(x), BigInt(p));
    console.log('k3--' + k1);
    console.log('k4--' + k2);

    
    outputArr[6].innerHTML = k1;
    outputArr[7].innerHTML = k2;
}

function reset() {
    const len = outputArr.length;
    for (let i=0; i < len; i++){
        outputArr[i].innerHTML = '000';
    }
} 

