
const express = require('express')
const app = express()
const port = 5136

app.use(express.urlencoded());
app.use(express.static(__dirname));

app.get('/', (req, res) => {
	  res.sendFile('index.html', {root: __dirname })
})

app.post('/success', (req, res) => {
	console.log("НОВЫЙ ЗАКАЗ")
	console.log(req.body)
	res.redirect('/')
})

app.listen(port, () => {
	  console.log(`Example app listening on port ${port}`)
})


