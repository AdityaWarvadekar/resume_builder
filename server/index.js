const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectToMongo = require("./db.js")
connectToMongo();

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const UserModel = require('./models/UserModel');
const fetchUser = require('./fetchUser.js');

app.get("/", (req, res) => {
    res.send("SERVER WORKING FINE.");
})

app.post('/signup', async (req, res) => {
    const { username, password, resume } = req.body;
    // console.log(username, password);
    try {
        let user = await UserModel.find({ username: username });
        // console.log(user);
        if (user.length > 0)
            return res.status(400).json({ status: "error", msg: "User already exists!" });
        else {
            const salt = await bcrypt.genSalt(10);
            const secPassword = await bcrypt.hash(password, salt);
            user = await UserModel.create({
                username: username,
                password: secPassword,
                resumes: resume ? { name: resume.name, resume: resume.resume } : []
            })

            const data = {
                user: {
                    id: user._id
                }
            };

            const authToken = jwt.sign(data, JWT_SECRET);
            res.status(200).json({ status: "ok", authToken: authToken });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", msg: "Internal Server Error" });
    }
});

app.post("/login", async (req, res) => {
    const { username, password, resume } = req.body;
    console.log(req.body);
    try {
        let user = await UserModel.find({ username: username });
        if (user.length == 0)
            return res.status(400).json({ status: "error", msg: "User not found!" });
        else {
            console.log("USER IN LOGIN", user);
            const pwd = user[0].password;
            const passwordCompare = bcrypt.compare(password, pwd);
            if (!passwordCompare)
                return res.status(400).json({ success, errors: "Invalid Credentials" });
            if (resume) {
                let resumes = user[0].resumes;
                resumes.push({id: resumes[resumes.length-1].id, name: resume.name, resume: resume.resume });
                const update = await UserModel.findByIdAndUpdate({ id: user[0]._id }, { resumes: resumes });
            }
            const data = {
                user: {
                    id: user[0]._id
                }
            };
            // console.log("DATAA", data);

            const authToken = jwt.sign(data, JWT_SECRET);
            res.json({ status: 'ok', authToken: authToken });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", msg: "Internal Server Error" });
    }
})

app.get("/resumes", fetchUser, async (req, res) => {
    const id = req.user.id;
    // console.log(user);
    try {
        const user = await UserModel.find({ _id: id });
        console.log(user);
        res.status(200).json({ status: 'ok', resumes: user[0].resumes? user[0].resumes: [] });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", msg: "Internal Server Error" });
    }

})

app.post("/addResume", fetchUser, async (req, res) => {
    const id = req.user.id;
    const {name, resume} = req.body;
    try {
        const user = await UserModel.find({_id: id});
        let resumes = user[0].resumes;
        resumes.push({ id: resumes[resumes.length-1].id, name: name, resume: resume});
        const update = await UserModel.findByIdAndUpdate({_id: id}, {resumes: resumes});
        res.status(200).json({status:'ok', msg: 'Resume Added Successfully'});
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", msg: "Internal Server Error" });
    }
});

app.delete("/deleteResume/:id", fetchUser, async(req, res)=>{
    const id = req.params.id;
    // console.log(id);
    try{
        const userId = req.user.id;
        const user = await UserModel.find({_id: userId});
        const resumes = user[0].resumes;
        let index = resumes.findIndex(item=>item.id===id);
        if(index==-1){
            return res.status(404).json({status:"error", msg:"resume not found"});
        }
        else{
            resumes.splice(index,1);
            await UserModel.findByIdAndUpdate({_id: userId}, {resumes: resumes});
            res.status(200),json({status: 'ok', msg:"Resume deleted successfully"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", msg: "Internal Server Error" });
    }
})

app.patch("/saveResume", fetchUser, async(req, res)=>{
    const id = req.user.id;
    const {name, resume} = req.body;
    console.log("RESUME:-------------- ", resume);
    try{
        const user = await UserModel.findByIdAndUpdate({ _id: id }, {resumes: [{id: 1, name: name, resume: resume}]});
        res.status(200).json({status: "ok", msg: "resume saved successfully"});
    }catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", msg: "Internal Server Error" });
    }
})

app.listen(process.env.PORT, () => {
    console.log("server started on port: ", process.env.PORT);
})