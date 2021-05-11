const express = require('express')
const morgan = require('morgan')
const userRouter = require('./router/user')
const todoRouter = require('./router/todos')
require('./db');

const app = express();
const port = 3000

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded())
 

app.get('/', (req, res, next) =>{
  res.send('wellcome to our World')
})

app.use('/user', userRouter);
app.use('/todo', todoRouter);

///////////// Handle Error ///////////////

app.use((err ,req ,res ,next)=>{
  console.error(err);
  err.statusCode = err.statusCode || 500;
  const handleError = err.statusCode < 500;
  res.status(err.statusCode)
  .send({
    message: handleError ? err.message : 'something went wrong',
    errors: err.errors || {}
  })
})
 

app.listen(port, ()=>{
  console.log(`Server listening on port ${port}`)
})
