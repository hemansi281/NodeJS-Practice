const fs = require('fs');
const readFile = require('../utils/readFile');
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.getUser = (req, res) => {
    console.log("hell")
    console.log(req.user)

    // const userData = fs.readFileSync('./user.json')
    const data = readFile('./user.json');

    const resData =data.find(u => u.userId === req.user.id);
    
    if (resData) {
        console.log("true")
        
        // console.log(data.find(u => u.userId === req.user.id))
        res.render('getUser',{data: resData})
        // return res.status(200).json(resData)
    }
    else {
        return res.status(400).json("Login is required")
    }
}

exports.updateUser = async (req, res) => {
    console.log(req.body)

    // const userData = fs.readFileSync('./user.json')
    // const data = JSON.parse(userData)
    const data = readFile('./user.json');

    const userId = parseInt(req.params.userId);
    const replaceIndex = data.findIndex(u => u.userId === userId);

    console.log(replaceIndex)

    const { password } = req.body;

    if(password){
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        // console.log(hashedPassword, "jj")
        req.body.password = hashedPassword
    }

    if (replaceIndex != -1) {
        if (req.body.userId || req.body.email || req.body.contactNo) {
            return res.status(400).json('You are not allowed to update email or contact number')
        }
        data[replaceIndex] = { ...data[replaceIndex], ...req.body };
        console.log(data)

        fs.writeFileSync('./user.json', JSON.stringify(data))

        // res.writeHead(200, { 'Content-Type': 'application/json' });
        // res.end(JSON.stringify(data[replaceIndex]));
        return res.status(200).json(data[replaceIndex])
    }
    else {
        return res.status(400).json('User is not found')
    }
}

exports.deleteUser = (req, res) => {
    const userId = parseInt(req.params.userId);
    // const userData = fs.readFileSync('./user.json')
    // const data = JSON.parse(userData)
    const data = readFile('./user.json');


    const deleteIndex = data.findIndex((user) => user.userId === userId)
    console.log(data[deleteIndex])

    if (deleteIndex != -1) {
        const finalArr = data.filter((d) => d.userId != userId)
        console.log(finalArr)

        fs.writeFileSync('./user.json', JSON.stringify(finalArr))

        return res.status(200).json('User Deleted Successfully !!')
    }
    else {
        return res.status(400).json('User is not found')
    }
}