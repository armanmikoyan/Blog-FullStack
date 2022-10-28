const express = require('express')
const app = express()
const path = require('path')

app.use(express.static('styles'))


const createPath = (page) => {
	return path.resolve(__dirname, 'pages', `${page}.html`)
}



app.listen(3000,(err)=>{
	err ? console.log(err): console.log('listening 3000 port');
})



app.get('/',(req,res)=>{
	res.sendFile(createPath('index'))
})



app.get('/posts/:id',(req,res)=>{
	res.sendFile(createPath('post'))
})


app.get('/posts',(req,res)=>{
	res.sendFile(createPath('posts'))
})


app.get('/add-post',(req,res)=>{
	res.sendFile(createPath('add-post'))
})

app.get('/contacts',(req,res)=>{
	res.sendFile(createPath('contacts'))
	
})




app.use((req,res)=>{
	
	res.status(404).
	sendFile(createPath('error'))
})