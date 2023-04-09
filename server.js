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


function login(username, password) {
    console.log("Someone try to login with", username, password)
    let matched = dbUsers.find(element => 
        element.username == username
    )
    if (matched){
        if(matched.password == password) {
            return matched
        } else{
            return "Password not matched"
        }
    } else{
        return "Username not found"
    }
  }
  
function register(newusername, newpassword, newname, newemail){
    //TODO: Check username if exist
    let checking = dbUsers.find(element=>
        element.username == newusername
        )
    if(checking){
        return ("This username has been registered")
    }
    else{
    dbUsers.push({
        username: newusername,
        password: newpassword,
        name: newname,
        email: newemail
    })
    return ("Register successful")
  }
  }



app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!')
  })

app.post('/', (req, res) => {
    res.send(req.body)
  });

// create a post for user to login
app.post('/login',(req,res)=> {
    // get the username and password from the request body
    const {username,password} = req.body;
  
    //find the user in the database
    const user = dbUsers.find(user => user.username === username && user.password === password);
  
    //if user is found, return the user object
    if(user){
      res.send(user);
    } else {
      //if user is not found, return an error message
      res.send({error : "User not found"})
    }
  
  })

app.post('/register',(req,res) => {
    let data = req.body
    res.send(
      register(
        data.newusername,
        data.newpassword,
        data.newname,
        data.newemail
      )
    );
  });

app.post('/signup',async (req,res) => {
    const {username, password} = req.body
    const hash = await bcrypt.hash(password,13)

    dbUsers.push({
        username,
        password : hash
    })

    console.log(dbUsers)
    res.send('Signup successful.')
})

app.post('/login2', async(req,res)=> {
    const {username,password} = req.body
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

console.log(login("Wong", "password"))
