# Git基本学习报告

## 一、命令行基本操作

1. 在官网 [https://git-scm.com] 安装git.

2. git设置用户名和邮箱的命令
   
   ```
   git config --global user.name "username"
   git config --global user.email useremail@163.com 
   ```
   
3. 建立一个版本库
    
    ```
    1. 在想要建库的位置打开git bash，
    mkdir 可建立目录（文件夹）。
    2. 输入指令
    git init  //将当前目录初始化为版本库
    ```
    
    添加文件到暂存区
    
    ```
    //添加文件到暂存区，可以添加多个文件再提交。
    git add 文件名 
    ```

4. 提交到本地库

   ```
   git commit -m"本次提交的注释"  //将暂存区所有文件提交到本地库。
   ```

5. 使用`git diff`查看修改内容
   
   ```
   git log
   // 可以显示所有提交过的版本信息，不包括已经被删除的 commit 记录和 reset 的操作
   ```
   
6. 回到某一个版本
     
     ```
     //上一个版本 
     git reset --hard HEAD^
     
     //上上个 或 往上100个版本
     `HEAD^^` 或 `HEAD~100` 
     `--hard` 版本号(前几位)
     
     可以通过 `git reflog` 查看各个版本号
     ```

7. 查看工作区和版本库里面最新版本的区别

```
git diff HEAD -- 文件名
```

8. 撤销工作区里的修改。

   + ```
     git checkout -- 文件名
     ```

   + 已经`commit`的内容不会修改，即只会退到最近一次`commit`或`add`的状态
   + 该操作可以恢复误删的文件，前提是改文件已经在最新的版本库里，**操作的本质就是用版本库的内容覆盖工作区，所以只是在commit的文件不可恢复。**

9. 建立分支
   
   + 利用指针`HEAD`在各个分支切换
   
   + 创建`dev`分支并切换到该分支。(-b)表示并切换
   
     ```
     $ git checkout -b dev
     或者 (新版本)
     git switch -c dev
     
     git branch查看当前分支，  `*`为当前分支
     
     
     ```
   
   + 在`dev`上做出的修改，对`master`不会有影响
   
10. 查看分支
   
   ```
   // 查看远程的分支名
   git branch -r 
   //查看本地库分支
   git branch
   ```
   
11. 删除分支
   
   + 首先切换到其他分支再进行操作,删除`dev`分支
   
   + 除本地分支
   
     ```
     git branch -d release
     ```
   
   + 删除远程分支
   
     ```
     git push origin --delete dev
     ```
   
12. 合并分支
   
   + 首先切换回`master`
   
   + ```
     $ git switch master 
     或者 （新版本）
     git checkout master
     ```
   
   +  快速合并
   
     ```
     $ git merge dev
     ```
   
     这种方法相当于直接把master分支移动到test分支所在的地方，并移动HEAD指针。但这种模式下，删除分支后，会丢掉分支信息
   
      + “快速合并”加 `--no-ff`
   
         ```
         $ git merge --no-ff dev
         ```
   
         这种合并方法会在master分支上新建一个提交节点，从而完成合并。Git就会在merge时生成一个新的commit，这样，从分支历史上就可以看出分支信息。





## 二、图形化GUI基本操作

1. 扫描本地仓库修改的文件
    
    ```
    rescan 按钮
    快捷键： F5
    ```
    
    
    
2. 添加文件到暂存区
    
    ```
    点击Stage Change，会将所有的修改文件都加入提交缓存区。也可以分别双击需要加入缓存区的文件。
    快捷键：选中ctrl+T
    撤回：选中ctrl+U
    ```
    
    
    
3. 将暂存区文件提交
    
    ```
    点击Commit 按钮提交
    快捷键：ctrl + enter点击Commit 按钮提交
    快捷键：ctrl + enter
    ```
    
    
    
4. 查看日志
    
    ```
    Repository -> Visualize master's History
    ```
    
    