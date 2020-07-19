- git init creates a new Git repository
- git status inspects the contents of the working directory and staging area
- git add adds files from the working directory to the staging area
- git diff shows the difference between the working directory and the staging area
- git commit permanently stores file changes from the staging area in the repository
- git log shows a list of all previous commits

- git show HEAD :The output of this command will display everything the git log command displays for the HEAD commit, plus all the file changes that were committed.

- git checkout HEAD filename: will restore the file in your working directory to look exactly as it did when you last made a commit.(返回)(git checkout -- oven-bird.txt)

- git reset HEAD （下架）filename: This command resets the file in the staging area to be the same as the HEAD commit. It does not discard file changes from the working directory, it just removes them from the staging area.

- git reset commit_SHA:（回到某一 commit）This command works by using the first 7 characters of the SHA of a previous commit. For example, if the SHA of the previous commit is 5d692065cf51a2f50ea8e7b19b5a7ae512f633ba, use:git reset 5d69206

- To better understand git reset commit_SHA, notice the diagram on the right. Each circle represents a commit.

Before reset:

HEAD is at the most recent commit
After resetting:

HEAD goes to a previously made commit of your choice
The gray commits are no longer part of your project
You have in essence rewound the project’s history

- (常见问题：就算返回了某一个 commit，文件内容还是没有改变，需要 checkout 命令运行)
There’s a problem: you reset HEAD to a previous commit, but the changes you want to get rid of are still in the working directory.

What Git backtracking command that you already know can discard changes to the working directory, restoring the files to the way they look in the HEAD commit?

- 第一个场景，想返回之前的 commit，且同时实现内容返回。

- git branch

- The circles are commits, and together form the Git project’s commit history.
- New Branch is a different version of the Git project. It contains commits from Master but also has commits that Master does not have.

- Here new_branch would be the name of the new branch you create, like photos or blurb. Be sure to name your branch something that describes the purpose of the branch. Also, branch names can’t contain whitespaces: new-branch and new_branch are valid branch names, but new branch is not.

- git checkout branch_name(转换 branch)

- Your goal is to update master with changes you made to fencing.
- fencing is the giver branch, since it provides the changes.
- master is the receiver branch, since it accepts those changes.

- For example, if I wanted to merge the skills branch to master, I would enter

- git merge skills

- The merge is a “fast forward” because Git recognizes that fencing contains the most recent commit. Git fast forwards master to be up to date with fencing.

- merge conflict I

- 事件：master 被修改，branch merge 之前 master 已经被修改。也就是要合并的两个 branch 都是被修改了。

- What would happen if you made a commit on master before you merged the two branches? Furthermore, what if the commit you made on master altered the same exact text you worked on in fencing? When you switch back to master and ask Git to merge the two branches, Git doesn’t know which changes you want to keep. This is called a merge conflict.

- 要注意的是修改了文件之后，就在原 branch 下直接 git add + git commit

- git branch -d branch_name

- will delete the specified branch from your Git project.

- git branch: Lists all a Git project’s branches.

- git branch branch_name: Creates a new branch.

- git checkout branch_name: Used to switch from one branch to another.

- git merge branch_name: Used to join file changes from one branch to another.

- git branch -d branch_name: Deletes the branch specified.






- git clone remote_location clone_name

- git remote -v
You can see a list of a Git project’s remotes with the command:

- After you cloned science-quizzes, you had to run off to teach a class. Now that you’re back at your computer, there’s a problem: what if, while you were teaching, Sally changed the science-quizzes Git project in some way. If so, your clone will no longer be up-to-date.

An easy way to see if changes have been made to the remote and bring the changes down to your local copy is with:

- git fetch

- This command will not merge changes from the remote into your local repository. It brings those changes onto what’s called a remote branch. Learn more about how this works below.

- Even though Sally’s new commits have been fetched to your local copy of the Git project, those commits are on the origin/master branch. Your local master branch has not been updated yet, so you can’t view or make changes to any of the work she has added.

In Lesson III, Git Branching we learned how to merge branches. Now we’ll use the git merge command to integrate origin/master into your local master branch. 

- git merge origin/master

- 下载之后已经在 origin/master 上，仍然需要 merge 到本地 master

- Git workflow
Now that you’ve merged origin/master into your local master branch, you’re ready to contribute some work of your own. The workflow for Git collaborations typically follows this order:

1. Fetch and merge changes from the remote
2. Create a branch to work on a new project feature
3. Develop the feature on your branch and commit your work
4. Fetch and merge from the remote again (in case new commits were made while you were working)
5. Push your branch up to the remote for review
Steps 1 and 4 are a safeguard against merge conflicts, which occur when two branches contain file changes that cannot be merged with the git merge command. Step 5 involves git push, a command you will learn in the next exercise.

Now it’s time to share our work with Sally.

The command:

- git push origin your_branch_name

will push your branch up to the remote, origin. From there, Sally can review your branch and merge your work into the master branch, making it part of the definitive project version.

We also learned the following commands

git clone: Creates a local copy of a remote.
git remote -v: Lists a Git project’s remotes.
git fetch: Fetches work from the remote into the local copy.
git merge origin/master: Merges origin/master into your local branch.

git push origin <branch_name>

: Pushes a local branch to the origin remote. 在原始 origin 增加一个branch

Git projects are usually managed on Github, a website that hosts Git projects for millions of users. With Github you can access your projects from anywhere in the world by using the basic workflow you learned here.

A  和 B一起工作在一个 project，
A 是 master， B 是 local。

1. A 开了个branch：

2. A 在branch 上修改，然后上架，最后 commit

3. A 在 master 上 merge branch（或者在 github 上 merge）

4. B 打算在 A 完成的进度上进行工作，先获得目前的 A的进度，并与本地合并。

5. B 开了个 branch

6. B 在branch 上修改，然后上架，最后 commit

7. B 向 A上传了 branch


function withConstructor(num){
  return new Promise((resolve, reject) => {
    if (num === 0){
      resolve('zero');
    } else {
      resolve('not zero');
    }
  })
}

withConstructor(0)
  .then((resolveValue) => {
  console.log(` withConstructor(0) returned a promise which resolved to: ${resolveValue}.`);
})

// Write your code below:
async function withAsync(num){
  if(num === 0) return 'zero';
  else return 'not zero';
}

// Leave this commented out until step 3:

withAsync(100)
  .then((resolveValue) => {
  console.log(` withAsync(100) returned a promise which resolved to: ${resolveValue}.`);
})