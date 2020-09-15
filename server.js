//var mysql = require('mysql')
var bodyParser=require('body-parser')
var connection=require('./config')
var express = require('express');
var app = express()
var port = 8000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

console.log("connection successful")

app.set('views', './views')
app.set('view engine', 'pug')

app.get('/home', (req, res) => {
    var studentList = []
    let sql = 'select studentdata.id,name,age,cname from studentdata INNER JOIN citytbl ON citytbl.id=studentdata.cityid'
    connection.query(sql, (err, rows) => {
        if (err) {
            console.log("query error" + err.message)
            res.send(err.message)
        }
        else {
            for (var i = 0; i < rows.length; i++) {
                var student1 = {
                    'id': rows[i].id,
                    'name': rows[i].name,
                    'age': rows[i].age,
                    'cname':rows[i].cname
                }
                studentList.push(student1)
            }
            res.render('index', {
                "studentList": studentList
            })
        }
        // res.end()
    })
    // connection.end()
})


app.get('/edit/:id', (req, res) => {
    //cityname=[]
    connection.query('select studentdata.id,name,age,cname,cityid from studentdata INNER JOIN citytbl ON citytbl.id=studentdata.cityid where studentdata.id=' + req.params.id, (err, rows) => {
        if (err) {
            console.log("query errror" + err.message)
            res.send(err.message)
        }
        else {
            if (rows.length == 1) {
                var student1 = {
                    'id': rows[0].id,
                    'name': rows[0].name,
                    'age': rows[0].age,
                    'cname':rows[0].cname,
                    'cid':rows[0].cityid
                }
                console.log(student1.id)
                console.log(student1.cid)
                res.render('edit', {
                    "student1": student1
                })
            }
            else { console.log("not found") }
        }
        //res.end()
    })
    
})

app.post('/edit/:id',(req,res)=>{
    console.log(req.body.username);
    console.log(req.body.userage);
    console.log(req.body.usercityid)

    var sql = `update studentdata INNER JOIN citytbl ON citytbl.id=studentdata.cityid SET name='${req.body.username}',age=${req.body.userage},cityid=${req.body.usercityid} where studentdata.id=${req.params.id}`
    connection.query(sql, (err, rows) => {
        if (err) {
            console.log("query error" + err.message)
            res.send(err.message)
        }
        else {
            console.log("updated successfullyy")
            res.redirect('/home')
        }
        res.end()
    })
})

app.get('/delete/:id',(req,res)=>{
  connection.query('delete from studentdata where id='+req.params.id,(err,rows)=>{
      if(err){
          console.log("error in delete query"+err.message)
            //res.write(err.message)
      }
      else{
        console.log("deleted succesfully")
        res.redirect('/home')
      }
  })  

})

app.get('/insertdata',(req,res)=>{
    var cityList = []
    let sql = 'select * from citytbl'
    connection.query(sql, (err, rows) => {
        if (err) {
            console.log("query error" + err.message)
            res.send(err.message)
        }
        else {
            for (var i = 0; i < rows.length; i++) {
                var city1 = {
                    'id': rows[i].id,
                    'cname': rows[i].cname,
                    //'age': rows[i].age
                }
                cityList.push(city1)
                
            }
            console.log(cityList)
            res.render('insertstudent', {
                "cityList": cityList
                
            })
        }
        // res.end()
    })
})
app.post('/insertstudent',(req,res)=>{
    console.log("cityid"+req.body.ddcity)
    var data={
        // 'id':req.body.userid,
        'name':req.body.username,
        'age':req.body.userage,
        'cityid':req.body.ddcity      
    }

    connection.query('insert into studentdata SET ?',data,(err,rows)=>{
        if (err) {
            console.log("query error" + err.message)
            res.send(err.message)
        }
        else {
            console.log("inserted successfullyy")
            res.redirect('/home')
        }
    })
})

app.listen(port, (err) => {
    if (err) throw err;
    console.log(`server is running at ${port}`)
})