Street Platform Server (示例)

本示例为演示版本，数据保存在内存，生产请接 MongoDB 或 MySQL。

本地运行：
1. cd server
2. npm install
3. node index.js

Docker:
1. docker build -t street-api .
2. docker run -d -p 4000:4000 street-api
