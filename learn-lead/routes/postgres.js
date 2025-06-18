const express = require('express');
const app = express();
app.use(express.json());
bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({extended: true}));
const router = express.Router();
// const pgrouter = require('./sequalize.js')
const  Signup  = require('./sequalize.js')


router.post('/signup', async (req, res)=> {
    console.log('hello')
    // console.log(Signup)
    try{
        const {username, email, password} = req.body
        // console.log(username, email, password);
        console.log('=================')
        console.log(req.body)
        const signup = await Signup.create(req.body);
        await signup.save();
        res.send('Data added successfully');
    }
    catch(err){
        console.error(err);
        res.status(500).json({error: 'Internal server error'});
    }
})

router.post('/update', async(req, res)=> {
    try{
        const find = await Signup.findByPk(req.body.email)
        console.log(find);
        console.log("i am here");
        console.log(req.body);
        if(find){
              const update = await Signup.update(req.body, {
                where: {
                    email: req.body.email
                }

              })
            res.send('Data updated successfully');  

        }
            res.send('DATA UPDATED SUCCESSFULLY');
    }
    catch(err){
        console.error(err);
        res.status(500).json({error: 'Internal server error'});
    }
    

})

router.get('/hello', (req, res)=> {
    res.send('This is working properly and yes');
    res.status(200);
})

// router.get('/user/:id', async(req, res)=> {
//     try {
//         console.log(req.params.id);
//         const findid = await Signup.findOne({
//             where: {
//                 id: req.params.id,
//             }
//         })
//         console.log(findid);
//         if(findid){
//             res.json(findid);
//         }
//     }
//     catch(err){
//         console.error(err)
//         res.status(500).json({ error: 'Internal server error'})
//     }
    
// })

router.get("/user/:id", async(req, res)=> {
    console.log(req.params.id);
    console.log(typeof(req.params.id))
    try{
        const userId = await Signup.findOne({
            where: {
                id: req.params.id
            }
        })
        console.log(userId);
        console.log(typeof(userId));
        if (userId) {
            res.json(userId)
        }
        else {
            res.status(404).json({ message: "Signup not found"})
        }

    }

    catch (err){
        console.error(err)
        res.status(500).json({ error: "Internal server error"});
    }
})

module.exports = router;