var express=require('express')
var app=express()
var connection=require('./config')
var port=8000

// app.get('/edit/:id',(req,res)=>{
//     connection.query('select *from studentdata where id='+req.params.id,(err,rows)=>{
//         if(err){
//             console.log("query errror"+err.message)
//             res.send(err.message)
//         }
//         else{
//             if(rows.length==1){
//                 var student1={
//                     'id':rows[0].id,
//                     'name':rows[0].name,
//                     'age':rows[0].age
//                 }
//                 res.render('edit',{
//                     "student1":student1
//                 })
//             }
//             else{console.log("not found")}
//         }
//     })
// })

app.listen(port,(err)=>{
    if(err) throw err;
    console.log(`server is running at ${port}`)
})