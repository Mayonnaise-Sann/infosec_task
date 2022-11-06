# DH密钥协商协议

>  DH密钥协商算法在1976年在Whitfield Diffie和Martin Hellman两人合著的论文***New Directions in Cryptography***（Section Ⅲ PUBLIC KEY CRYPTOGRAPHY）中被作为一种公开秘钥分发系统(*public key distribution system*)被提出来。

+ 论文讨论两个话题：
  + 在公网通道上如何进行安全的秘钥分派。
  + 认证（可以细分为消息认证和用户认证）。

+ 为了解决第一个问题，原文提出两种方法：
  公钥加密系统(*public key cryptosystem*)和秘钥分发系统(*public key distribution system*)。对于公钥加密系统，原文只是勾画了一种比较抽象的公钥加密系统的概念模型，重点是加解密采用不同的秘钥，并总结了该系统应该满足的一些特性，相当于是一种思想实验，并没有给出具体的算法实现途径，但这在当时应该来说已经足够吸引人。后来RSA三人组（Ron Rivest、Adi Shamir 和 Leonard Adleman）受此启发，经过许多轮失败的尝试后，于第二年在论文***A Method for Obtaining Digital Signatures and Public-Key Cryptosystems\***中提出了切实可行且很具体的公钥加密算法--RSA公钥加密算法。而对于秘钥分发系统，就是本文的DH秘钥协商算法。

+ 为了解决第二个问题，原文通过单向函数（one-way function）来解决，这就是单向认证的问题。
  另外作者还讨论了这些密码学问题之间的关联性以及如何相互转化。比如一个安全的密码系统（可以防御明文攻击）可以用来生成一个的单向函数、公钥加密系统可以用来作为单向认证、陷门密码系统可以用来生成一个公钥加密系统。数学难题的计算复杂度被当成一种保障密码学安全问题的有效工具被利用起来，这一重要思想贯穿现代密码学的许多加密算法。

+ [reference] [Diffie-Hellman密钥协商算法 - Qcer - 博客园 (cnblogs.com)](https://www.cnblogs.com/qcblog/p/9016704.html)



## 一、实验要求

编程实现 DH 密钥协商协议 
共同参数。素数P，P的一个生成元g 

1. A 随机选择一个 [1,p-1] 范围内的数`x`，计算 `X` = g^x 
2. B 随机选择一个 [1,p-1] 范围内的数`y`，计算 `Y` = g^y mod p, 并将结果发送给A。



## 二、算法设计

1. 判断`n`是否为素数

   ```js
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
   ```

   

2. 计算 a^n mod b

   ```js
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
   ```

   

3. 枚举判断g是否是p的生成元

   ```js
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
   ```

   

4. 随机选择生成元

   ```js
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
   ```

   

## 三、运行环境

1. 推荐使用EDGE、Firefox、chrome浏览器运行程序。
2. 直接在DH密钥协商协议目录下双加打开`index.html`文件。



## 四、运行结果截图

1. 输入素数 `401`
   ![01](/images/01.jpg)

2. 输入素数 `257`
   ![02](/images/02.jpg)

3. 输入素数 `1061`

   ![03](/images/03.jpg)





## 五、总结

+ Diffie-Hellman密钥协商算法主要解决秘钥配送问题，本身并非用来加密用的；该算法其背后有对应数学理论做支撑，简单来讲就是构造一个复杂的计算难题，使得对该问题的求解在现实的时间内无法快速有效的求解（*computationally infeasible* ）。

