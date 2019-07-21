const host = "127.0.0.1";
const port = "3000";
const express = require('express')
const app = express()
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')
app.use(express.static('public'));

var fs = require("fs");
var array = [];
var tempList = [];
var newWord;
var trueCount = 0;
var falseCount = 0;

function getWord(){
    array = fs.readFileSync('WordList.txt').toString().split("\n");
    where = Math.floor(Math.random() * array.length);
    newWord = array[where].split("-");
    // console.log(newWord);
    tempList.push(newWord);
  }

function answerVerify(reply,answer){
    var a = answer.trim().split("");
    var b = reply.trim().split("");
    let intersection = a.filter(x => b.includes(x));
    // console.log(intersection,a);
    if(intersection.length/a.length >= 0.8){
        return 1;
    }else{
        return 0;
    }
}

function postController(req,res){
    if(req.body.send){
        if(answerVerify(req.body.cevap,newWord[1])){
            trueCount += 1;
            res.redirect('/');
            res.end();
        }
        else{
            falseCount += 1;
            console.log('True:',trueCount,'False:',falseCount);
            res.render("index",{word: newWord[0], result: "Wrong Answer!",trues: trueCount, falses: falseCount});
            res.end();
        }

    }
    else if(req.body.pass){
        res.redirect('/');
        res.end();
      }else if(req.body.answer){
        res.render("index",{word: newWord[0], result: newWord[1],trues: trueCount, falses: falseCount});
        res.end();
      }
}

app.get('/', function (req, res) {
    getWord();
    res.render("index",{word: newWord[0], result: null,trues: trueCount, falses: falseCount});
    console.log('True:',trueCount,'False:',falseCount);
    res.end();
})

app.post('/', function (req, res) {
    postController(req,res);
})



app.listen(3000, function () {
    console.log('WordListApp: '+host+':'+port);
})