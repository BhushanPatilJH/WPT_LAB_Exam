const mysql = require('mysql2');

let dbparams={
	host: 'localhost',
    user: 'bhushan',
    password: 'cdac',
    database: 'bhushan',
	port:3306
}

const conn=mysql.createConnection(dbparams);


const express = require('express');
const app = express();


app.use(express.static('abc'));




app.get('/blurevent',(req, res)=>{
    let input=req.query.bookid;

	let output={status:false,bookDetail:{bookid:0,name:'',price:0}}
	conn.query('select bookid,bookname,price from book where bookid=?',[input],(err,rows)=>{
		if(err){
			console.log("error occured "+err);
		}else{
			if(rows.length > 0){
				output.status=true;
				output.bookDetail=rows[0];

			}
		}


		res.send(output);
	})
		

		

});


app.get("/showcontent",(req,res)=>{
	conn.query('select * from book',[],(err,rows)=>{
		if(err){
			console.log("error occured "+err);
		}

		res.send(rows);
	})
	
})


app.get("/updatecontent",(req,res)=>{
	let input={bookid:req.query.bookid, price:req.query.price};

	let output={status:false};

	conn.query('update book set price=? where bookid=?',[input.price,input.bookid],(err,row)=>{
		if(err){
			console.log("error occured "+err);
		}else{
			if(row.affectedRows>0){
				output.status=true;
			}
		}

		res.send(output);
	})
	
})








app.listen(8081, function () {
    console.log("server listening at port 8081...");
});