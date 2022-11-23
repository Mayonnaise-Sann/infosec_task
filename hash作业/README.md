# hash作业报告

## 一、实验要求

+ 利用软件提供的Hash函数实现查找本地硬盘重复文件。



## 二、实验目的

+ 进一步熟悉理解单向散列算法`SHA256`、`MD5`等，借助编程语言获取文件的hash值，探究文件内容与hash值的关系。
+ 通过实践编程实现查找磁盘重复文件demo，比较hash值。

## 三、实验方法

1. 首先计算硬盘文件的Hash，并记录文件路径与Hash值的对应关系 
2. 利用具有相同Hash值的文件，内容就极其可能相同的特性，查找具有相同Hash值的文件。 
3. 可以简单比较一下具有相同Hash值的文件是否长度，部分随机内容相同，如果相同则直接输出，否则说明发生了碰撞。 
4.  注意保护个人隐私。



## 四、实现

+ 使用`Java`语言实现，首先获取文件的byte信息，再通过`JAVA`自带的`MessageDigest`类进行MD5加密，通过`BigInteger`类提供的方法进行16进制的转换为MD5值。

  ```java
  // getFileMD5函数
      public static String getFileMD5(File file){      //获取MD5
          BigInteger bigInt = null;
          try {
              FileInputStream fis = new FileInputStream(file);
              MessageDigest md = MessageDigest.getInstance("MD5");
              byte[] buffer = new byte[1024];
              int length = -1;
              while ((length = fis.read(buffer, 0, 1024)) != -1) {
                  md.update(buffer, 0, length);
              }
              bigInt = new BigInteger(1, md.digest());
          } catch (FileNotFoundException e) {
              e.printStackTrace();
          } catch (NoSuchAlgorithmException e) {
              e.printStackTrace();
          } catch (IOException e) {
              e.printStackTrace();
          }
          return bigInt.toString(16);
      }
  
  }
  ```

+ 比较MD5值并输出结果

  ```java
  public class getDuplicated {
      public static void main(String ager[]){
          File file1 = new File("C:\\Users\\mayonnaise\\Desktop\\2022信安\\hash作业");  //查找的目录
          HashMap<String,String> hashMap = new HashMap();     //创建一个hashMap存放文件路径和它的MD5值
  
          getfiles(file1, hashMap);
          Set<Map.Entry<String, String>> set= hashMap.entrySet();
  
          ArrayList<String> array = new ArrayList<>();  //存放MD5
          for (Map.Entry<String, String> map : set){
              array.add(map.getValue());
          }
          array.sort(new hashComparator());   //按MD5排序
  
          List<String> keyList = new ArrayList<>();   //存放文件路径
          int count = 1;
          System.out.println("-----相同文件为-------");
          for (int i = 1; i < array.size(); i++){
              if (array.get(i).equals(array.get(i - 1))){
                  count++;
              }else if (count > 1){
                  for (Map.Entry<String,String> entry : set){
                      if (array.get(i - 1).equals(entry.getValue())){
                          keyList.add(entry.getKey());
                      }
                  }
                  System.out.println(keyList);
                  System.out.println("--------------------");
                  keyList.clear();
                  count = 1;     //reset the count
              }
          }
  
      }
  ```



## 五、实验结果截图

+ 文件目录
  ![dir](.\images\dir.jpg)

+ 文件长度及内容

  + 测试文件：

    | 文件名          | 内容                  |
    | --------------- | --------------------- |
    | hashtest.txt    | testhash.             |
    | hashtest-.txt   | testhash.             |
    | hashtest- -.txt | testhash?????         |
    | hashtest-no.txt | not duplicated files. |

    

    ![dir](.\images\info.jpg)

  

  

  ![dir](.\images\length.jpg)

+ 文件MD5 hash信息
  ![dir](.\images\hash.jpg)

+ 代码执行情况
  ![dir](.\images\res01.jpg)



## 六、总结

​	本实验通过获取文件的hash值，比较文件的内容。简单认为两个hash相同的文件即内容相同。实际上，只要不是由攻击者或其他恶意实体制作的文件，相同的加密哈希就意味着文件相同。任何精心设计的密码散列函数发生*随机*碰撞的几率很小，因此在实践中和在没有主动攻击者的情况下，可以忽略不计。但是，总的来说，我们不能说两个具有相同哈希值的任意文件*绝对*意味着它们是相同的。

​	密码散列函数的设计使得在计算上很难组合提供特定输出的输入，或组合两个提供相同输出的输入。这就是所谓的原根攻击性或碰撞攻击性。找到这些碰撞并非不可能只是非常困难，在理论上概率极低。

​	另外，文件可能具有完全不同的数据表示形式并且仍然显示完全相同的数据。因此，他们可能看起来是一样，即使他们的密码散列不匹配，但是如果哈希匹配，那么他们极有可能出现相同的。