const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')
const userRouter = require('./router/userRouter')
const wallsRouter = require('./router/wallsRouter')
const finalError = require('./middleware/finalError')

const app = express();
app.use(cors());
app.use('/public',express.static('public'))
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/user',userRouter)
app.use('/walls', wallsRouter)
// 错误中间件:一定放到最后
app.use(finalError)

app.listen(3001, () => {
    console.log('服务器启动了');
})