const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const Post = require('./models/post')

app.use(express.static('styles'))


app.set('view engine', 'ejs')


const createPath = (page) => {
	return path.resolve(__dirname, 'ejs-pages', `${page}.ejs`)
}
 
const db = 'mongodb+srv://arman:Pass321@cluster0.a7eewrn.mongodb.net/?retryWrites=true&w=majority'
mongoose
.connect(db)
.then(()=>{
	console.log('conected to db');
})
.catch((err)=>{
	console.log('error');
})


app.listen(3000,(err)=>{
	err ? console.log(err): console.log('listening 3000 port');
})


app.use(express.urlencoded({extended: false}))


app.get('/',(req,res)=>{
	const title = 'Home'
	res.render(createPath('index'),{title})
})



app.get('/posts/:id',(req,res)=>{
	const title = 'Post'
	const post = {
					id:1,
					text:"loremLorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus excepturi dolores atque sit praesentium quam nisi dicta numquam libero! Unde rerum libero dicta similique sapiente nesciunt voluptate magni ducimus incidunt?",
					title:'Post Title',
					date: '05.08.2001',
					author:'Arman'
				}
	
	res.render(createPath('post'),{title,post})
})


app.get('/posts',(req,res)=>{
	const title = 'Posts'
	const posts = [
		{
			id:1,
			text:"loremLorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus excepturi dolores atque sit praesentium quam nisi dicta numquam libero! Unde rerum libero dicta similique sapiente nesciunt voluptate magni ducimus incidunt?",
			title:'Post Title',
			date: '05.08.2001',
			author:'Arman'
		}
	]
	res.render(createPath('posts'),{title,posts})
})


app.get('/add-post', (req,res)=>{
	const title = 'New Post'
	res.render(createPath('add-post'),{title})
})

app.post('/add-post',(req,res)=>{
	const {title,author,text} = req.body
	const post = new Post({title,author,text}).save().then((result)=>{
		res.send(result)
	}).catch((err)=>{
		console.log(err);
	})
	

})

app.get('/contacts',(req,res)=>{
	const title = 'Contacts'
	const contacts = [
		{name:'Gmail', link:'https://mail.google.com/mail/u/0/#inbox'},
		{name:'Github', link:'https://github.com/armanmikoyan'},
		{name:'Facebook', link:'https://www.facebook.com'}
	]
	res.render(createPath('contacts'),{contacts,title})
	
})

app.use((req,res)=>{	
	const title = 'Error 404'
	res.status(404).
	render(createPath('error'),{title})
})