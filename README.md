# 网页小工具

这里收录了一组可以直接在浏览器中使用的中文静态网页工具。目前包括“易经八卦”和“今天吃什么”两个工具，无需安装软件，也不需要注册账号。

## 在线使用

| 工具 | 用途 | 打开网页 | 中文说明 |
| --- | --- | --- | --- |
| 易经八卦 | 铜钱起卦、抽牌起卦、六十四卦查询与《周易》入门资料 | [立即打开](https://libing3854.github.io/web-tools/) | [查看说明](易经八卦工具说明.md) |
| 今天吃什么 | 随机抽取美食卡牌，查看美食奖池并收集到临时钱包 | [立即打开](https://libing3854.github.io/web-tools/food-picker-rich.html) | [查看说明](美食抽卡工具说明.md) |

## 工具特点

- 全部为静态网页，可通过 GitHub Pages 直接访问。
- 支持电脑和手机浏览器，不需要后端服务器。
- 美食钱包只保留当前页面的抽卡结果，刷新后自动清空。
- 易经八卦内容用于传统文化学习与个人思考，不替代医疗、法律或投资等专业意见。

## 项目文件

- `index.html`：仓库首页入口，自动进入易经八卦工具。
- `code.html`：易经八卦工具主页面。
- `food-picker-rich.html`：今天吃什么美食抽卡工具。
- `assets/`：美食图片、品牌简笔画和彩蛋插图。
- `data/`：六十四卦和现代解读数据。
- `vendor/`：项目使用的第三方浏览器脚本与授权文件。

## 本地打开

下载仓库后，可以直接双击 `index.html` 或 `food-picker-rich.html`。也可以在项目目录运行：

```bash
python3 -m http.server 8000
```

然后访问 `http://localhost:8000/`。

## 开源组件

易经八卦首页的黄历功能使用 [6tail/lunar-javascript](https://github.com/6tail/lunar-javascript) 1.7.7，采用 MIT License。项目内固定保存浏览器版本 `vendor/lunar.js`，完整授权文本见 `vendor/lunar-javascript.LICENSE.txt`。
