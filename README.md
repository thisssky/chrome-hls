
## 【功能】

### 1.获取页面的视频地址（mp4,flv,m3u8）

### 2.可使用Java版本下载器[https://github.com/1217268470/m3u8/releases](https://github.com/1217268470/m3u8/releases)m3u8格式视频，支持解密合并（需要安装ffmpeg）

### 3.chromemu8.json中"allowed_origins": [ "chrome-extension://cgmndmpboecdelkbgigoobejocnakdan/" ]，可根据自己浏览器中的值替换

## 【windows配置】

计算机\HKEY_CURRENT_USER\Software\Google\Chrome\NativeMessagingHosts\chromem3u8
计算机\HKEY_LOCAL_MACHINE\Software\Google\Chrome\NativeMessagingHosts\chromem3u8

### 1.进入注册表编辑器，在HKEY_CURRENT_USER或者HKEY_LOCAL_MACHINE中新建chromem3u8，数据值为C:\Users\xxx\Desktop\xxx\chromem3u8.json

### 2.chromem3u8.json和m3u8.jar在同一文件夹就不用修改chromem3u8.json文件中path的值，如果不在同一文件夹修改成"path": "d:\xxx\xxx\m3u8.bat"