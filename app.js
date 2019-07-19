const express = require('express')
const app = express()
const bodyParser = require('body-parser');
var fs = require("fs");
var tempList = [];

app.set('view engine', 'ejs')
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

function getWord(){
  var array = fs.readFileSync('WordList.txt').toString().split("\n");
  where = Math.floor(Math.random() * array.length);
  console.log(where); 
  var word = array[where].split("->");
  console.log(word);
  tempList.push(word);
  return word;
}


app.get('/', function (req, res) {
  getWord();
  var newWord = tempList[tempList.length - 1];
  res.render("index",{word: newWord, result: null});
  console.log(tempList[tempList.length - 1]);
})

app.post('/', function (req, res) {
  var answer = req.body.cevap;
  answer = answer.replace(/\s/g, '')
  tempList[tempList.length - 1][1] = tempList[tempList.length - 1][1].replace(/\s/g, '')
  console.log(answer,"-",tempList[tempList.length - 1][1]);
  console.log(answer.length,tempList[tempList.length - 1][1].length);
  if(answer === tempList[tempList.length - 1][1]){
    console.log("sdfd");
    res.render("index",{word: tempList[tempList.length - 1][0], result: "1"});
    res.end();
  }else{
    res.render("index",{word: tempList[tempList.length - 1][0], result: "0"});
    res.end();
  }
  // res.render('index',{word: req.body.cevap, error: null});
  console.log(req.body.cevap);
})

app.listen(3000, function () {
  console.log('WordList app listening on port 3000!')
})