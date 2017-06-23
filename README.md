# wechat-sample

## Mock支持

很多情况下，后端的开发进度一般滞后于前端，在后端服务可用之前，前端仅有一份API文档可供参考。
为了不影响开发进度，可使用 **Setaria** 提供的Mock功能根据API文档定义 `**.json` 文件对指定的服务进行Mock。
当后端API开发完成后，无须修改业务逻辑代码即可直接进行联调。

> 具体的json格式写法请参考 [mockjs](http://mockjs.com/examples.html)

1. Mock功能的开启

可通过在 `config/dev.env.js` 设置 `MOCK_MODE` 属性为 `true` 来开启Mock功能。

2. Mock功能的设置

可在 `mock/config.js` 文件中进行相应的功能设置。
``` bash
baseUrl: 服务的根Url,Mock服务执行时会基于此Url进行查找对应的json文件
exclude: 定义不希望Mock的服务
```

3. Mock功能的使用

目录结构与所调用的Service的路径结构一致。
``` bash
譬如如果需要访问 `ume` 和 `one` 两个后端服务:
/ume/api/WS001
/ume/api/WS002
/one/api/WS001

`mock/config.js` 文件内的baseUrl为 `''`
对应服务的Json文件所在目录如下：
/mock/datasource/ume/api/WS001
/mock/datasource/ume/api/WS002
/mock/datasource/one/api/WS001
```

4. Json文件内容的格式

支持标准的Json格式。
同时为了方便生成随机数据，Mock功能内置了 [mockjs](http://mockjs.com/examples.html).
