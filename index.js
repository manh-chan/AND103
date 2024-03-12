//tham chieu thu vien
const express=require('express');
const mongoose=require('mongoose');
//const sinhvien=require('./SinhVienModel');
//tao doi tuong server
const app=express();
app.set('view engine','ejs');
//xu ly du lieu----------------
//ket noi voi csdl
mongoose.connect('mongodb+srv://pG29k8AHa0No1Euo:pG29k8AHa0No1Euo@cluster0.gmafrgs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("ket noi voi db thanh cong");
}).catch((err)=>{
    console.error("Loi ket noi: "+err);
});
//doc du lieu
const db1=mongoose.connection.useDb('db1');
const sinhvienSchema=new mongoose.Schema({
    masv:{
        type: String,
        required: true
    },
    tensv:{
        type: String,
        required: true
    }
});
const sinhvien=db1.model('sinhvien1',sinhvienSchema);
app.get('/sinhvien', async (req,res)=>{
    try {
        const sinhviens = await sinhvien.find();//doc toan bo du lieu
    //   res.json(sinhviens);//tra ve json
       res.render('students',{sinhviens: sinhviens});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Doc du lieu loi"});
    }
});
//---------------------------------
//-chay app
const PORT=process.env.PORT||5000;//cong du lieu
app.listen(PORT,()=>{
    console.log("server dang chay o cong 5000");
});