# Animal Island — Obsidian 主题

动物森林风格的 Obsidian 主题。

## 安装

1. 把 `manifest.json` 和 `theme.css` 两个文件复制到你的仓库：

   ```
   <你的仓库>/.obsidian/themes/Animal Island/
   ```

   注意最终路径必须是 `.obsidian/themes/Animal Island/theme.css`。

2. 打开 Obsidian → 设置 → 外观 → 主题，选择 **Animal Island**。
3. 深色/浅色模式均可使用：
   - 浅色 = **Island Day**（羊皮纸 + 薄荷绿，原版配色）
   - 深色 = **Island Night**（暖调深棕羊皮纸，同一套色系）

## 设计特征

- **色板**：暖羊皮纸背景（`#f8f8f0` / `rgb(247,243,223)`）、大地棕文字（绝不使用纯黑）、薄荷青主色 `#19c8b9`。
- **控件**：按钮、输入框、搜索框均为 50px 胶囊形；所有可交互元素圆角不低于 12px。
- **3D 游戏按钮**：只有主操作（`.mod-cta`）和危险操作（`.mod-warning`）使用像素堆叠阴影
  `0 5px 0 0 #bdaea0`（悬停 6px、按下 1px + 下沉），普通按钮只有柔和投影。
- **焦点**：统一使用黄色 `#ffcc00` 焦点环，不用冷蓝。
- **字体**：Nunito + Noto Sans SC（正文 500，标题 600–900，中文由 Noto Sans SC 覆盖）。
  字体通过 Google Fonts 加载，离线时自动回退到系统中文字体。
- **动效**：`cubic-bezier(0.4, 0, 0.2, 1)`，0.15–0.35s，悬停轻微上浮、按下下沉；
  弹窗带 zoom-in 入场动画，并尊重系统「减少动态效果」设置。
- **细节**：左侧功能条带波点壁纸纹理；开关为奶油色圆钮 + 内阴影轨道；
  标签、属性、引用块、代码块、表格全部圆角化；元数据区做成羊皮纸卡片。

## 定制

主题顶部 `:root` 中声明了完整的 `--animal-*` 设计 token（颜色、圆角、阴影、动效），
底部 `.theme-light` / `.theme-dark` 的 Obsidian 变量全部引用这些 token。
改色时优先改 token，比如把主色换成青柠：

```css
:root {
  --animal-primary: #d1da49;
  --animal-primary-hover: #dde56e;
  --animal-primary-active: #b9c23a;
}
```

## 许可证

本主题代码以 [The Unlicense](LICENSE)（公有领域贡献）发布：可自由使用、修改、再分发，可用于商业或非商业目的，无需署名。

主题样式仅借鉴 animal-island-ui 的视觉规范（CC BY-NC 4.0，非商业用途），该协议仅约束上游项目，不影响本主题代码。
