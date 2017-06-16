// require and instantiate express
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json()); 							// for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); 	// for parsing application/x-www-form-urlencoded

// all home data
const homeInfo = {
	title: "Specification for Front / Middle End Test No A2",
	selected: "A",
	quantity: 3,
	pageno: 0
}

// set the view engine to ejs
app.set('view engine', 'ejs')

// home page
app.get('/', (req, res) => {
	res.render('home', { Info: homeInfo })
})

// set item type A or B, default : A
app.post('/setItemType', (req, res) => {
	var body = req.body;
	homeInfo.selected = body.selectedItem;
	res.render('obj3.ejs', { Info: homeInfo });
})

// set item quantity
app.post('/setQauntity', (req, res) => {
	var body = req.body;
	var originQuantity = homeInfo.quantity;

	homeInfo.quantity = body.quantity;
	homeInfo.pageno = originQuantity < homeInfo.quantity ? homeInfo.pageno : 0;
	res.render('obj3.ejs', { Info: homeInfo });
})

// set page number
app.post('/pagination', (req, res) => {
	var body = req.body;
	var originPageno = homeInfo.pageno;

	homeInfo.pageno = (body.status == 'prev') ? originPageno-1 : originPageno+1;
	res.render('obj3.ejs', { Info: homeInfo });
})

app.use(express.static(__dirname + '/views'));

app.listen(8080)

console.log('listening on port 8080')
