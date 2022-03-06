const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
const hbs = require('hbs');
const Register = require("./models/register"); //models
const bcrypt = require("bcrypt");
require('./db/conn');

const static_path = path.join(__dirname, '../public')
const template_path = path.join(__dirname, '../templates/views')
const partials_path = path.join(__dirname, '../templates/partials')

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(static_path));

app.set("view engine", 'hbs');
app.set('views', template_path);
hbs.registerPartials(partials_path);

//index route
app.get('/', (req, res) => {
    res.render('index');
});

//register route
app.get('/register', (req, res) => {
    res.render('register')
});

app.post('/register', async (req, res) => {
    try {
        const password = req.body.password;
        const cpassword = req.body.confirmpassword;
        if (password === cpassword) {
            const registerEmployee = new Register({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                gender: req.body.gender,
                phone: req.body.phone,
                password: password,
                confirmpassword: cpassword
            })
            //jwt middleware
            const token = await registerEmployee.generateAuthToken()
            console.log(token);

            //password hash middleware
            const filled = await registerEmployee.save();
            res.status(201).render("index");
        } else {
            res.send("password don't match")
        }
    } catch (error) {
        res.status(400).send(error);
    }
});



app.post('/login', async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const userdata = await Register.findOne({ email: email }) //first one from databse:user enters || can simply be writter as ({email}) object destructuring
        const isMatching = await bcrypt.compare(password, userdata.password);
        console.log(isMatching)
        const token = await userdata.generateAuthToken()
        console.log("My token for login " + token)

        if (isMatching) {
            res.status(201).render("index");
            // res.send(userdata)
        } else {
            res.send("Wrong Password")
        }
    } catch (error) {
        res.status(400).send(`Invalid Login Details ERROR: ${error}`);
    }
});

//login route
app.get('/login', (req, res) => {
    res.render('login')
});
//Bcrypt Alogorithm
// const securepassword = async(password) => {
//     const passwordHash = await bcrypt.hash(password, 10);
//     console.log(passwordHash);
//     const passwordmatch = await bcrypt.compare(password, passwordHash);
//     console.log(passwordmatch);
// }
// securepassword("myverysecretpassword")


//jwt
// const jwt = require('jsonwebtoken');

// const createToken = async () => {
//     const token = await jwt.sign({_id:"6223908c4c099cd5fcb7dfe8"}, "4444")
//     console.log(token)

//     const verify = await jwt.verify(token, "4444");
//     console.log(verify)
// }
// createToken();

app.listen(port, () => {
    console.log(`listening to port ${port}`);
});