const express = require('express')
const app = express()
const port = 3000
const bcrypt = require('bcrypt');

let dbUsers = [
    {
        username: "Wong",
        password: "pxsh1345",
        name: "Wong Xu Huan",
        email: "B022110214@student.utem.edu.my"
    },
    {
        username: "Chua",
        password: "010uehs",
        name: "CHua CF",
        email: "Chua233@gmail.com"
    }
  ]

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!')
  })

app.post('/', (req, res) => {
    res.send(req.body)
  });

app.post('/signup',async (req,res) => {
    const {username, password, name, email} = req.body
    const hash = await bcrypt.hash(password,13)
    let checked = dbUsers.find(element => 
      element.username == username 
      )

    if(checked){
      res.send("This username has been registered.")
      return
    }
    
    dbUsers.push({
        username,
        password : hash,
        name,
        email
    })

    console.log(dbUsers)
    res.send('Signup successful.')
})

app.post('/login2', async(req,res)=> {
    const {username,password} = req.body
    for (let i = 0; i < 2 ; i++){
      const hash = await bcrypt.hash(dbUsers[i].password,13)
      dbUsers[i].password = hash 
    }
    console.log(dbUsers)
    const user = dbUsers.find(u => u.username === username)
    if(!user) {
        res.send('No user!')
        return
    }
    const comparePassword = await bcrypt.compare(password,user.password)
    if(!comparePassword) {
        res.send('Password is not matched!')
        return
    }
    else {
        res.send('Password and username is matched!')
        console.log(user)
    }
})

app.listen(port, () => {
    console.log(`Server listening at port http://localhost:${port}`);
  })

