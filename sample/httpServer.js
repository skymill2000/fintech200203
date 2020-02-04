var http = require("http");

http.createServer(function (req, res) {
    console.log("요청이 발생했습니다.");
	var body = "hello Server";
	res.setHeader('Content-Type', 'text/html; charset=utf-8');
	res.end("<html><body><h1>안녕하세요</h1></body></html>")
}).listen(3000);
