const express = require('express')
const app = express()
var request = require('request')
var mysql      = require('mysql');
var jwt = require('jsonwebtoken');
var auth = require('./lib/auth');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'q1w2e3r4',
  database : 'fintech',
  port : "3306"
});
var tokenKey = "fintech202020!#abcd"
connection.connect();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get('/signup', function(req, res){
  res.render('signup');
})

app.get('/login', function(req, res){
  res.render('login');
})

app.get('/authResult', function(req, res){
  var authCode = req.query.code;
  console.log(authCode);
  var option = {
    method : "POST",
    url : "https://testapi.openbanking.or.kr/oauth/2.0/token",
    headers : {
      'Content-Type' : "application/x-www-form-urlencoded; charset=UTF-8"
    },
    form : {
        code : authCode,
        client_id : 'q7kH44ThJwjpvNRg0BbJvE1yxvx5X53DKz1rNgPF',
        client_secret : 'yVT6irMr2h4ZTHzZY7sDpbvhm1nlOzr4nP7DYRVy',
        redirect_uri : 'http://localhost:3000/authResult',
        grant_type : 'authorization_code'
    }
  }
  request(option, function (error, response, body) {
    var parseData = JSON.parse(body);
    res.render('resultChild',{data : parseData})
  });
})

app.post('/signup', function(req, res){
  var userName = req.body.userName
  var userEmail = req.body.userEmail
  var userPassword = req.body.userPassword
  var userAccessToken = req.body.userAccessToken
  var userRefreshToken = req.body.userRefreshToken
  var userSeqNo = req.body.userSeqNo
  var sql = "INSERT INTO user (email, password, name, accesstoken, refreshtoken, userseqno) VALUES (?,?,?,?,?,?)"
  connection.query(sql,[userEmail, userPassword, userName, userAccessToken, userRefreshToken, userSeqNo], function (err, results, fields) {
    if(err){
      console.error(err);
      throw err;
    }
    else {
      res.json(1);
    }
  });
})

app.post('/login', function(req, res){
  var userEmail = req.body.userEmail;
  var userPassword =req.body.userPassword;
  var sql = "SELECT * FROM user WHERE email = ?"
  connection.query(sql,[userEmail], function(err, results){
    if(err){
      console.error(err);
      throw err;
    }
    else {
      if(results.length == 0){
        res.json("미등록 회원")
      }
      else {
        if(userPassword == results[0].password){
          jwt.sign(
            {
                userName : results[0].name,
                userId : results[0].id,
                userEmail : results[0].email
            },
            tokenKey,
            {
                expiresIn : '10d',
                issuer : 'fintech.admin',
                subject : 'user.login.info'
            },
            function(err, token){
                console.log('로그인 성공', token)
                res.json(token)
            }
          )
        }
        else {
          res.json("비밀번호 불일치")
        }
      }
    }
  })
})

app.get('/authTest',auth, function(req, res){
  res.json("메인 컨텐츠")
})

app.post('/list', function(req, res){
  var option = {
    method : "GET",
    url : "https://testapi.openbanking.or.kr/v2.0/user/me",
    headers : {
      'Authorization' : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiIxMTAwMDM0NzM2Iiwic2NvcGUiOlsiaW5xdWlyeSIsImxvZ2luIiwidHJhbnNmZXIiXSwiaXNzIjoiaHR0cHM6Ly93d3cub3BlbmJhbmtpbmcub3Iua3IiLCJleHAiOjE1ODIwMDI4MzYsImp0aSI6IjI5NmNkNjVmLTE2YjAtNDEyZS1hZDFkLWFmYmRhNTVlYTMyNiJ9.SXTfhB2a9_cKsMmSasN6kpaki-I4Sewy8wS-KUH8nL4"
    },
    qs : {
      user_seq_no : '1100034736'
    }
  }
  request(option, function (error, response, body) {
    var parseData = JSON.parse(body);
    console.log(parseData);
  });
})

app.listen(3000)