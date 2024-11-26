const http = require('http'); 
var mysql      = require('mysql');

const server = http.createServer((req, res) => { 
adatb( (text) => {
res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
res.write(text);
res.end();
});
}).listen(8012);

function adatb(callback) {
var con = mysql.createConnection({
   host     : 'localhost',
   user     : 'studb012',
   password : 'PaSsWoRd13',
   database : 'db012'
});
con.connect(function(err){
if (err) throw err;
con.query("SELECT * FROM film;", function (err, result, fields) {
if (err) throw err;
var text = "";
for(i=0; i<result.length; i++) {
for(var j in result [i])  
         		text += result[i][j]+" ";
          text += "<br>";
 }
callback(text);
});
});
}
