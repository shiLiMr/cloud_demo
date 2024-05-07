// 配置跨域  搭建一个服务器
import http from 'http';
const port=7777;
const serve=http.createServer((req,res)=>{
    res.end(
        JSON.stringify(
            [
                {name:'llllll',age:18},
                {name:'ssssss',age:20},
            ]
        )
    );
})
serve.listen(port)