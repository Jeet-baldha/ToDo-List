import express  from "express";
import bodyParser from "body-parser"
import mongoose from "mongoose";

const app = express();
const port = process.env.PORT || 3030;
mongoose.connect("mongodb+srv://jeetbaldha26:Jeet1626@filmyhub.i9irue5.mongodb.net/ToDoListDB");
const todayWorkList = [];
const WorkList = [];
app.set('view engine', 'ejs')

const itemSchema = {
    name:String,
    reviews:Array
}
const Item = mongoose.model("Item",itemSchema)





var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = dd + '/' + mm + '/' + yyyy;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true})); 

 app.get('/',async (req,res) =>{

    const items = await Item.find({});
    res.render("today",{
        date:today,
        item:items
    });
});

app.post('/', async (req, res) => {

    const item = new Item({
        name:req.body['inp']
    });
    item.save();     
    res.redirect('/');

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