const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('../dist/d-goals/ng-blog'));
app.get('/',function(req,res){
    res.sendFile(path.join('../dist/d-goals/ng-blog/index.html'));
});

app.listen(process.env.PORT || 8080);