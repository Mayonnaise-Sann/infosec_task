import java.io.File;
        import java.io.FileInputStream;
        import java.io.FileNotFoundException;
        import java.io.IOException;
        import java.math.BigInteger;
        import java.security.MessageDigest;
        import java.security.NoSuchAlgorithmException;
        import java.util.*;

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

    public static void getfiles(File file, HashMap hashMap){    //保存文件路径及MD5
        if (file.isFile()){

            String fileName = file.getAbsolutePath();
            String hashCode = getFileMD5(file);
            hashMap.put(fileName, hashCode);
            return;
        }
        File[] files = file.listFiles();
        for (File file1 : files){
            getfiles(file1, hashMap);
        }
    }


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

class hashComparator implements Comparator<String>{   //比较器
    @Override
    public int compare(String o1, String o2) {
        return o1.compareTo(o2);
    }
}
