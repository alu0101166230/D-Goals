const express = require ('express');
const app = express();

const{mongoose} = require('./mongoose');


const bodyParser = require('body-parser');


const {List,Task} = require('./models/index');

app.use(bodyParser.json());

app.get("/lists",(req,res)=>{
  // retornamos las listas de la bbdd 
  List.find({}).then((lists)=>{
    res.send(lists);
  }).catch((e)=>{
    res.send(e);
  });
})

app.post("/lists",(req,res)=>{
  // crear una nuevo lista
  let title = req.body.title;
  let newList = new List({
    title
  });
  newList.save().then((listDoc)=>{
    res.send(listDoc);
  });
});


app.patch("/lists/:id",(req,res)=>{
  List.findOneAndUpdate({_id: req.params.id},{
    $set: req.body
  }).then(()=>{
    res.sendStatus(200);
  });
});

app.delete("/lists/:id",(req,res)=>{
  List.findOneAndRemove({
    _id: req.params.id
  }).then((removeListDoc)=>{
    res.send(removedListDoc)
  });

});

app.get('/lists/:listID/tasks',(req,res)=>{
  Task.find({
    _listId:req.params.listId
  }).then(()=>{
    res.send(tasks);
  })
});

app.get('/list/:listId/tasks/:taskId',(req,res)=>{
  Task.findOne({
    _id:req.params.taskId,
    _listId: req.params.lostId
  }).then((task)=>{
    res.send(task);
  })
});

app.post('/lists/:listId/tasks',(req,res)=>{
  let newTask = new Task({
    title: req.body.title,
    _listId: req.params.listId
  });
  newTask.save().then((newTaskDoc)=>{
    res.send(newTaskDoc);
  })
})

app.patch('/lists/:listId/tasks/:tasId',(req,res)=>{
  Task.findOneAndUpdate({
    _id:req.params.taskId,
    _listId:req.params.listId
  },{
    $set:req.body
  }).then(()=>{
    res.sendStatus(200);
  })
});

app.delete('/lists/:listId/tasks/:taskId',(req,res)=>{
  Task.findOneAndRemove({
    _id:req.params.taskId,
    _listId:req.params.listId
  }).then((removedTaskDoc)=>{
    res.send(removedTaskDoc);
  })
});


app.listen(1000,()=>{
  console.log("El servidor esta corriendo en el puerto 3000");
})

