# AURA-V2 · 研究网站

白底、居中论文标题与分节正文的响应式中文研究项目页，零构建依赖，可直接部署到 GitHub Pages。

页面包括：首屏研究资源、三步咖啡场景示意、三大能力图式、三个独立单项 Demo 空位与六个复合场景 Demo、技术框架占位、分组加权损失示意、V1→V2 对照、数据配比与样本、分组评测与消融规划、引用模板。

## 发布到 Sybilhhh 的 GitHub Pages

建议创建独立仓库 **aurav2**，不会覆盖 `Sybilhhh.github.io` 或其他仓库。

1. 在 https://github.com/new 新建 `Sybilhhh/aurav2`，使用 `main` 分支。
2. 将本目录中的全部文件上传到仓库根目录，包含 `.github/workflows/pages.yml` 和 `.nojekyll`。通过网页上传遗漏隐藏目录时，可在 GitHub 新建文件并输入完整路径 `.github/workflows/pages.yml`，粘贴本地文件内容。
3. 打开仓库 Settings → Pages → Build and deployment，Source 选择 **GitHub Actions**。
4. 打开 Actions → Deploy AURA-V2 to GitHub Pages → Run workflow，或向 `main` 推送新提交。
5. 成功后地址预计为 `https://sybilhhh.github.io/aurav2/`，以 GitHub Actions 返回地址为准。

仓库设为公开最方便使用免费 GitHub Pages；私有仓库 Pages 可用性取决于账户计划。所有站点路径均为相对路径，兼容 `/aurav2/` 子路径。

已安装并登录 GitHub CLI 时，也可在本目录执行：

```bash
git init -b main
git add .
git commit -m "Add AURA-V2 project website"
gh repo create Sybilhhh/aurav2 --public --source=. --remote=origin --push
```

之后完成上面的 Pages 设置。不要在 Git 仓库里放个人访问令牌。

## 查看

打开 `preview.html` 可独立预览（样式、脚本及海报已内嵌）；正式发布使用 `index.html` 与 `assets/`。原 AURA-V1 参考视频仍需联网播放。

## 后续替换内容

1. `assets/content.js` 的 `resources`：填写 Hugging Face、GitHub、Technical Report、Dataset 的 `url`；填写后按钮自动启用。
2. 同文件 `demos`：填写每条 Demo 的 `video` 和可选 `poster`，例如 `assets/demos/coffee.mp4`。详情弹窗自动从脚本切换成视频播放器；也应核对标题、能力标签和描述。
3. 同文件 `data`：替换数据方向、配比和说明；百分比之和应为 100。圆环会同步更新。
4. `index.html`：填写作者、单位、技术图、benchmark、对比模型及 citation。发表前将相应的“示例／待补充”状态改为经过核实的真实说明。
5. `assets/style.css`：统一配色、字号及手机适配。

当前 35% / 25% / 25% / 15% 为示例配比；没有编造实验分数。全部 V2 场景为拍摄脚本，非实录。AURA-V1 实录位于折叠参考区，保留来源标识。技术图为重新绘制的公开通用示意，未使用带受限分发标记的原始图片。

如修改源文件，需重新内嵌 CSS、JS 和图片以更新 `preview.html`；GitHub Pages 直接读取源文件，不依赖预览文件。

## 验证

已验证脚本语法、锚点与本地资源路径；浏览器检查桌面首屏、场景步骤切换、单项筛选与详情弹窗。移动端设置 640px / 900px 断点，未作独立手机浏览器实测。

## 来源

参见 `THIRD_PARTY.md`。AURA-V1 公开 Demo 为原项目素材；

单项能力 Demo 位于核心能力区，暂不预设场景；六个复合场景独立位于场景演示区。`assets/content.js` 的 demos 仅管理这六个复合场景。
