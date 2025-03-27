# nju4sclub
SE2 group project.

# 4sGitHub使用文档
## 1 分支策略（Branch Strategy）

- **主分支**：
  - `main`/`master`：保护分支，仅用于发布稳定版本（禁止直接推送）。
- **开发分支**：
  - `dev`：集成开发分支，所有功能合并到此分支后再向 `main` 合并。
- **功能分支**：
  - `feature/xxx`：前端/后端开发新功能时创建（如 `feature/login`）。
- **修复分支**：
  - `hotfix/xxx`：紧急修复Bug时使用。

操作示例：

```bash
# 克隆仓库
git clone https://github.com/yourname/tomato-mall.git
cd tomato-mall

# 创建并切换到dev分支
git checkout -b dev
git push origin dev

# 开发新功能时（前端示例）
git checkout -b feature/login
```

## 2 团队协作规则

- **代码提交规范**：
  - 提交信息清晰（如 `feat: 用户登录功能` / `fix: 修复支付接口bug`）。
  - 使用 `Commitizen` 工具规范提交信息（可选）。
- **Pull Request（PR）流程**：
  1. 开发完成后，将 `feature/xxx` 推送到远程仓库。
  2. 在GitHub上发起PR，请求合并到 `dev` 分支。
  3. 指定团队成员 **Code Review**，通过后合并。
- **每日同步**：
  - 每天开始工作前：`git pull origin dev` 拉取最新代码。
  - 冲突解决：本地处理冲突后再提交。

## 3 **项目管理工具集成**

- **GitHub Projects**：
  1. 在仓库中点击 `Projects` → `New project`，选择 `Kanban` 看板。
  2. 创建任务卡片（如“用户登录页面开发”），分配负责人，关联到对应分支。
- **Issues**：
  - 用 `Issues` 跟踪Bug和任务，打标签（如 `bug`、`enhancement`）。
  - 关联提交：在Commit信息中引用Issue（如 `Fix #123`）。

## 4 **开发环境配置**

- **前端（2人）**：

  - 使用 `WebStorm`，克隆仓库后：

  ```bash
  npm install  # 安装依赖
  npm run dev # 启动开发服务器
  ```

  - 配置ESLint + Prettier统一代码风格。

- **后端（2人）**：
  - 使用 `IDEA`，导入Maven/Gradle项目。
  - 配置统一的代码格式化模板（如Google Java Style）。

## 5 持续集成（CI）建议（可选）

- 使用 **GitHub Actions** 自动化测试和部署：

  - 创建 `.github/workflows/ci.yml`，配置代码推送时自动运行单元测试。
  - 示例配置（Java + Node）：

  ```yaml
  name: CI
  on: [push]
  jobs:
    build:
      runs-on: windows-latest
      steps:
        - uses: actions/checkout@v2
        - name: Set up JDK
          uses: actions/setup-java@v1
          with:
            java-version: '11'
        - name: Build with Maven
          run: mvn test
  ```

## 6 **文档与知识共享**

- **Wiki**：
  - 在仓库中启用 `Wiki`，记录项目架构、API文档、部署流程。
- **README.md**：
  - 更新项目说明、开发环境配置步骤、分支规则。

## 7 **权限管理**

- 作为负责人，在 `Settings` → `Manage access` 中：
  - 限制 `main`/`dev` 分支的推送权限（仅管理员可合并）。
  - 允许成员创建分支和提交PR。
