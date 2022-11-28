const path = require("path");
const express = require("express");
const {sequelize, Task, Category} = require("./models");

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'static')));


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'index.html'));
});


app.get("/categories", async (req,res) => {
    try{
        const kategorije = await Category.findAll();
        return res.json(kategorije);
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});


app.get("/tasks", async (req,res) => {
    try{
        const taskovi = await Task.findAll();
        return res.json(taskovi);
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

app.get("/tasks/:q", async (req,res) => {
    try{
        //select * from tasks where naziv like '%:q%'
        const { Op } = require("sequelize");
        const taskovi = await Task.findAll({
            where:{
                naziv: {
                    [Op.substring]: req.params.q
                }
            }
        });
        return res.json(taskovi);
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

app.get("/task/:id",  async (req,res) => {
    try{
        const task = await Task.findByPk(req.params.id);
        return res.json(task);
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

app.put("/task/zavrsi/:id",  async (req,res) => {
    try{
        const task = await Task.findByPk(req.params.id);
        task.zavrseno = true;
        task.save();
        return res.json(task);
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});


app.delete("/task/obrisi/:id",  async (req,res) => {
    try{
        const task = await Task.findByPk(req.params.id);
        task.destroy();
        return res.json( task.id );
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

/*
u request body mora da ima json objekat oblika:
      {
        "naziv": "Novi task",
        "opis": "Opis novog taska",
        "datum": "2022-12-31",
        "categoryID": 2,
        "zavrseno": false
      }
*/
app.post("/task/dodaj",  async (req,res) => {
    try{
        const novitask = await Task.create(req.body);
        return res.json(novitask);
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});



app.listen({port:8000}, () => {
    console.log("Started on port 8000");
});
