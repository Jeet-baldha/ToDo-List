import express  from "express";
import bodyParser from "body-parser"

const app = express();
const port = 3000;
const todayWorkList = [];
const WorkList = [];
app.set('view engine', 'ejs')


var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = dd + '/' + mm + '/' + yyyy;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));


app.get('/',(req,res) =>{
    res.render("today",{
        date:today,
        item :todayWorkList,
    });
});

app.post('/', (req, res) => {

    todayWorkList.push(req.body["inp"]);

    res.render("today",{
        date:today,
        item:todayWorkList
    });

});


app.post('/work', (req, res) => {

    
    
    WorkList.push(req.body["inpW"]);

    res.render("work",{
        date:"Work",
        item:WorkList
    });

});

app.get('/work',function(req,res){

    res.render("work",{
        date:"Work",
        item:WorkList
    });    

});

app.listen(port, () => {
    console.log(`server is runnig in port ${port}.`);
})