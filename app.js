const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const utf8 = require('utf8');
var fs = require("fs");
var tempList = [];
var newWord;
app.set('view engine', 'ejs')
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

function getWord(){
  var array = fs.readFileSync('WordList.txt', 'utf8').toString().split("\n");
  where = Math.floor(Math.random() * array.length);
  var word = array[where].split("-");
  console.log(word);
  tempList.push(word);
  return word;
}

app.get('/', function (req, res) {
  getWord();
  newWord = tempList[tempList.length - 1];
  res.render("index",{word: newWord[0], result: null});
  console.log(tempList[tempList.length - 1]);
})

app.post('/', function (req, res) {
  if(req.body.pass){
    console.log("asdgfh");
    getWord();
    res.redirect('back');
  }else if(req.body.answer){
    res.render("index",{word: newWord[0], result: newWord[1]});
    res.end();
  }
  var answer = req.body.cevap;
  tempList[tempList.length - 1][1] = tempList[tempList.length - 1][1].replace(/\s/g, '')
  console.log(answer,"-",tempList[tempList.length - 1][1]);
  console.log(answer.length,tempList[tempList.length - 1][1].length);
  if(answer === tempList[tempList.length - 1][1]){
    console.log("correct answer");
    res.render("index",{word: getWord()[0], result: "1"});
  }else{
    res.render("index",{word: tempList[tempList.length - 1][0], result: "0"});
  }
  // res.render('index',{word: req.body.cevap, error: null});
  console.log(req.body.cevap);
})

app.listen(3000, function () {
  console.log('WordList app listening on port 3000!')
})