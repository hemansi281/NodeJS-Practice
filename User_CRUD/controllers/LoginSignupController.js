const fs = require('fs');
const jwt = require('jsonwebtoken');
const secretKey = 'hemansi123';
const bcrypt = require('bcrypt');
const saltRounds = 10;
const readFile = require('../utils/readFile');

const signupCotroller = async (req, res) => {
    console.log(req.body)
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const regexNumber = /^[0-9]{10}$/;
    const regexName = /^[A-Za-z]+(?: [A-Za-z]+)*$/;

    if (req.body) {
        const { name, contactNo, email, password } = req.body;

        if (email?.match(regexEmail) && regexNumber?.test(contactNo) && regexName.test(name)) {
            console.log("Match")

            // const userData = fs.readFileSync('./user.json')
            // const data = JSON.parse(userData)
            const data = readFile('./user.json');

            console.log(data, "data")

            for (const ele of data) {
                if (ele.email === email || ele.contactNo === contactNo) {
                    return res.status(400).json('User already exists !!');
                }
            }

            // const { password } = req.body;

            const hashedPassword = await bcrypt.hash(password, saltRounds);
            console.log(hashedPassword, "jj")
            const passwordObj = { 'password': hashedPassword }

            let lastUserId = data.findLast((ele) => ele.userId)?.userId || 0
            lastUserId++;
            console.log(lastUserId, "last");

            let userIdObj = { "userId": lastUserId }
            let roleObj = {"role": "user"}
            let inpObj = Object.assign(userIdObj, req.body, passwordObj, roleObj)
            console.log(inpObj, "inputobj")

            data.push(inpObj);

            fs.writeFile('./user.json', JSON.stringify(data), (err) => {
                if (err) {
                    return res.status(400).json('Error writing into file');
                }
                else {
                    return res.status(200).json('User created successfully');
                }
            })
        }
        else {
            return res.status(400).send('Enter valid inputs')
        }
    }
    else {
        return res.status(400).send('Please enter the body')
    }

}

const loginController = async (req, res) => {
    if (req.body) {
        const { email, password } = req.body;
        // const userData = fs.readFileSync('./user.json')
        // const data = JSON.parse(userData)
        const data = readFile('./user.json');

        // console.log(data,"logindata")

        const user = data.find(u => u.email === email)
        console.log(user, 'oo')

        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            console.log("Match")
            // console.log(data)
            const idIndex = data.findIndex(u => u.email === email)
            console.log(data[idIndex].userId)
            req.userId = data[idIndex].userId

            const token = jwt.sign({
                id: req.userId,
                username: email,
                role:data[idIndex].role
            }, secretKey, { expiresIn: '1h' });
            console.log(token)

            // res.cookie('user_token', token, {
            //     maxAge: 3600000 // expire in 1 hour (miliseconds)
            // });
            res.set('authorization', `Bearer ${token}`);

            return res.status(200).json({ message: 'Login successful !!' })
        }
        else {
            return res.status(400).send('Invalid credentials !!')
        }
    }
    else {
        return res.status(400).send('Email and password is required !!')
    }

}

const logout = (req, res) => {
    // console.log(req.cookies)
    const { user_token } = req.cookies;

    if (user_token) {
        res.clearCookie('user_token');

        return res.status(200).json('User logout successfullyy !!')
    }
    else {
        return res.status(400).json('Login is required')

    }
}

module.exports = { signupCotroller, loginController, logout }