const express = require('express');
const { signupCotroller, loginController, logout } = require('./controllers/LoginSignupController');
const { authMiddleware } = require('./middlewares/authMiddleware');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const { getUser, updateUser, deleteUser } = require('./controllers/userController');
const { adminController } = require('./controllers/adminController');
const app = express(); 
const port = 3000;


app.set('view engine', 'ejs');
// app.use(express.static('public/JS'))
app.use(express.json())
app.use(cookieParser())
// app.use(morgan('combined'))    //combined - date,time, method, api, status code, protocol
app.use(morgan('tiny'))         //tiny - method, status, res time
// app.use(morgan('short'))        //short - protocol, method, res time, status

app.get('/',(req,res)=>{
  res.render('getUser',{data:{name:'abc'}})
})
app.post('/signup', signupCotroller) //v2/login
app.post('/login', loginController)
app.get('/logout',authMiddleware, logout)

app.get('/user', authMiddleware, getUser);
app.patch('/user/:userId',authMiddleware,updateUser)
app.delete('/user/:userId',authMiddleware,deleteUser)

app.get('/admin',authMiddleware,adminController)
// app.post('/user')
// app.use((err, req, res, next) => {
//   console.error(err.message, 'msg')
//   return res.status(500).send('Something went wrong!')
// })

app.all('{*splat}', (req, res) => {
  res.status(404).json({ message: `Can't find ${req.originalUrl}` });
});


// app.use((req, res, next) => {
//   return res.status(404).json({
//     message: `Route ${req.originalUrl} does not exist`
//   });
// });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});