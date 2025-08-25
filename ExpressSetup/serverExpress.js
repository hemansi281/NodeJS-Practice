const express = require('express')
const path = require('path')
const app = express();
const router = express.Router()
const PORT = 3000;

app.set('view engine', 'ejs');
// app.set('views',path.join(__dirname,'frontend'))         //to set the path of the folder containing your ejs files 
app.use(express.json())         //parse the incoming JSON data from reque st body
app.use(express.static('public'))     // to serve static files

const data = { name: 'Hemansi' }

// app.get('/homepage', (req, res) => {
//     res.render('homepage', { data })
// })

app.get('/index', (req, res) => {
    res.render('index', { data })
})

app.post('/user',(req,res)=>{
    console.log(req.body,"body")

    // res.send('<h1>Welcome</h1>')         //send the actual HTML
    // res.json('<h1>Welcome</h1>')            //send HTML as string

    // res.send('world')            //content-Type: text/html
    // res.json('world')               //content-Type: application/json

    // res.end('Hello how are')        //does not have contnet-Type

    res.jsonp(data)         //automatically wraps response in a function (if 'callback' is present in query)
})

// Application level middleware
app.use('/user',(req,res,next)=>{
    console.log(`Request to ${req.url}`);
    next();
})
app.get('/user',(req,res)=>{
    res.send('<h1>Welcome the user</h1>')
})

// Router-level middleware
// router.use((req, res, next) => {
//   console.log('Time:', Date.now())
//   next()
// })
router.use('/user/:id', (req, res, next) => {
  console.log('Request URL:', req.originalUrl)  
  next() 
}, (req, res, next) => {
  console.log('Request Type:', req.method)
  next()
})
router.get('/user/:id', (req, res, next) => {
  
  if (req.params.id === '0') res.send('Declined for 0th user')

  else next()
}, (req, res, next) => {
  res.send('Router middleware')
})
app.use('/',router)

// app.param() middleware
app.param('adminId',(req,res,next,id)=>{
  console.log('Admin id :',id)
  next()
})
app.get('/admin/:adminId',(req,res)=>{
  res.send('Helloo')
})

// Error handling middleware - if any error occurs this middleware calls
app.use((err, req, res, next) => {
  console.error(err.message,'msg')
  res.status(500).send('Something went wrong!') 
})

app.listen(PORT, () => {
    console.log("Application is running on :", PORT)
})