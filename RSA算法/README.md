# RSA算法

> [RSA算法](https://baike.baidu.com/item/RSA算法/263310?fr=aladdin)是一种非对称性[加密算法](https://so.csdn.net/so/search?q=加密算法&spm=1001.2101.3001.7020)，现在算是最具有影响力的算法，简单来说RSA算法运用了"**一个大整数进行因式分解具备一定的难度**"这个数学知识来进行[加密](https://so.csdn.net/so/search?q=加密&spm=1001.2101.3001.7020)，对一个极大整数做因式分解越难，那么想要破解加密过后的密码就越难。



## 一、实验要求

1. 编程实现RSA基本算法 



## 二、算法原理与设计

### 原理

+ RSA算法的本质就是数学，公钥和私钥是数学上关联的，无须直接传递。
+ 算法过程包括：密钥生成、密钥加解密。

#### 相关概念

**欧拉函数**的定义：

> **欧拉函数** *φ(n)*是小于或等于*n*的正整数中与*n*互质的数的数目。

**互质**的定义：

> 如果两个或两个以上的整数的最大公约数是 1，则称它们为**互质**

**推导欧拉函数:**

1. 如果*n = 1*, *φ(1) = 1*；(小于等于1的正整数中唯一和1互质的数就是1本身)；
2. 如果*n*为质数，*φ(n) = n - 1*；因为质数和每一个比它小的数字都互质。比如5，比它小的正整数1,2,3,4都和他互质；
3. 如果*n*是*a*的*k*次幂，则 *φ(n) = φ(a^k) = a^k - a^(k-1) = (a-1)a^(k-1)*；
4. 若*m*,*n*互质，则*φ(mn) = φ(m)φ(n)*

**欧拉定理：**

> 如果两个正整数*a*和*n*互质，则*n*的欧拉函数 *φ(n)* 可以让下面的等式成立：
> *a^φ(n) = 1(mod n)*
> 由此可得：*a*的*φ(n - 1)*次方肯定是*a*关于*n*的模反元素。

欧拉定理就可以用来证明模反元素必然存在。

由模反元素的定义和欧拉定理我们知道，*a*的*φ(n)*次方减去1，可以被n整除。比如，3和5互质，而*5*的欧拉函数*φ(5)*等于4，所以*3*的*4*次方*(81)*减去1，可以被*5*整除（*80/5=16*）。

**模反元素：**

> 如果两个正整数a和n互质，那么一定可以找到整数*b*，使得 ab-1 被n整除，或者说ab被n除的余数是1。

比如*3*和*5*互质，*3*关于*5*的模反元素就可能是2，因为*3\*2-1=5*可以被5整除。所以很明显模反元素不止一个，2加减5的整数倍都是3关于5的模反元素*{...-3, 2,7,12…}* 放在公式里就是*3\*2 = 1 (mod 5)*

**费马小定理：**

> 假设正整数a与质数p互质，因为质数p的*φ(p)*等于*p-1*，则欧拉定理可以写成
> *a^(p-1) = 1 (mod p)*
> 这其实是欧拉定理的一个特例。



#### 算法流程

+ 1- 随机选择两个质数p和q

  > 在实际中密钥长度在1024位以上才安全，本实验只做演示。

+ 2- 求N的欧拉函数值M
  当n是质数时会出现一些特殊的情况：

  + 如果k是质数，则φ(k) = k-1;
  + 如果 n = P * Q，P 与 Q 均为质数，则 φ(n) = φ(P * Q)= φ(P)φ(Q) = (P - 1)(Q - 1) 。

+ 找一个与M互素的整数E

+ 找一个整数D，满足如下关系：(E*D) mod M = 1。

  ```
  等价于求E*D - K*M = 1，求解这个方程找到一组满足关系的D和K即可
  ```

+ 把这些数字分为两组：(E,N)和(D,N)分别为公钥组和私钥组，E是公钥、D是私钥。

+ 加密过程满足：

  ```
  X^E mod N = Y
  其中X为明文，E为公钥，N为大整数，Y为密文，mod取余运算。
  ```

+ 解密，过程满足：

  ```
  Y^D mod N = X
  其中Y为密文，D为私钥，N为大整数，X为明文，mod取余运算。
  ```

+ ![01](/images/01.jpg)





### 设计

1. 求最大公约数

   ```js
   function gcd(a, b) {
       return b == 0 ? a : gcd(b, a % b);
   }
   ```

   

2. 判断`n`是否为素数

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

   

3. 扩展欧几里得算法

   ```js
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
   ```

   

4. 计算 a^n mod b

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

   

5. 生成素数表

   ```js
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
   ```

   

## 三、运行环境

1. 推荐使用EDGE、Firefox、chrome浏览器运行程序。
2. 直接在RSA算法目录下双加打开`index.html`文件。



## 四、运行结果截图

1. 选取p= `337`，q=`79`
   ![02](/images/02.jpg)

2. 选取p= `499`，q=`647`
   ![03](/images/03.jpg)

3. 选取p= `153487`，q=`48781`

   ![04](/images/04.jpg)





## 五、总结

+ RSA算法的安全性取决于大数质因数分解的难度，目前而言1024位二进制长度的密钥人类都没有破解，为了安全性考虑可使用2048位长度的RSA密钥进行加密。
+ RSA算法密钥越长越难破解，根据相关文献，目前被破解的最长RSA密钥是768个二进制位。一般认为，1024位的RSA密钥基本安全，2048位的密钥极其安全，RSA算法目前支持4096位长度。



## 六、参考

+ [图解|什么是RSA算法_](https://blog.51cto.com/csnd/5749133)
+ [RSA算法详解 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/33580225)