const {Router} = require('express');
const router = Router();
const admin = require('firebase-admin');


var serviceAccount = require("../../nodomcu-69762-firebase-adminsdk-8jywn-ed40db2690.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://nodomcu-69762.firebaseio.com',
});

const db = admin.database();

router.get('/',(req,res) =>{
    res.render('home');
});

router.get('/semaforo-calidad',(req,res) =>{
    db.ref('Niveles').once('value', (snapshot) =>{
        const data = snapshot.val();
        //const mydata = JSON.parse(data); 
        //console.log(mydata[0]);
        res.render('tabla1',{datos:data, layout:'layTabla1'});
    })
});

router.get('/comparacion',(req,res) =>{
    db.ref().once('value', (snapshot) =>{
        const data = snapshot.val();
        const rioPrueba = (data.Temperatura_C + data.oxigenoD + data.PH)/3;
        res.render('grafica1',{datos:data.Niveles, rio: rioPrueba, layout:'layGrafica'});
    });
});

router.get('/dashboard',(req,res) =>{
    res.render('dashboard',{layout:'layDashboard'})
});


module.exports = router;