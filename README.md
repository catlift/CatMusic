# CatMusic

就是一个简单的音乐项目

# 技术栈

vue、vuex、vue-router、axios、node

# 基于 Binaryify 大佬分享的 NeteaseCloudMusicApi

url: https://github.com/Binaryify/NeteaseCloudMusicApi
因为我不知道我这个自带的 NeteaseCloudMusicApi 还能不能用，所以建议去 Binaryify 大佬那里重新下载；
既：删除我项目带的 NeteaseCloudMusicApi，然后所以 git 克隆 Binaryify 大佬的 NeteaseCloudMusicApi；

# 下载后需要注意

因为我们使用的环境可能不相同，所以需要重新安装配置（node_modules）;

# 安装指令(安装 node_modules)

首先进入项目看有没有 node_modules 这个文件，有的话就删除它，然后在控制台（win + R）输入以下命令：

```
npm install
```

如果 安装失败了，就运行：

```
npm cache clear --force
npm install
```

# 项目运行

NeteaseCloudMusicApi：

```
node app.js
```

catMusic：

```
npm run serve
```

