const express = require('express');
const app = express();
app.use(express.json());

let courses = [
    { id: 1, language: 'java', duration: '6 months', fees: 39999.95 },
    { id: 2, language: 'python', duration: '4 months', fees: 34999.95 },
    { id: 3, language: 'react', duration: '5 months', fees: 29999.95 },
    { id: 4, language: 'rust', duration: '11 months', fees: 44999.95 },
]

app.get('/', (req, res)=> {
    res.send('We are to default route');
});
app.get('/courses', (req, res)=> {
    res.send(courses);
});
app.get('/courses', (req, res)=> {
    res.send(courses);
});
app.get('/courseById/:id', (req, res)=> {
    let course = courses.find(data => data.id === parseInt(req.params.id));
    res.send(course);
});
app.get('/courseByLanguage/:language', (req, res)=> {
    let course = courses.find(data => data.language == req.params.language );    
    res.send(course);
});
app.get('/courseByDuration/:duration', (req, res)=> {
    let course = courses.filter(data => data.duration.includes(req.params.duration));
    res.send(course);
});

app.post('/newcourse', (req, res)=> {
    const bodyData = req.body;
    const course = {
        id: courses.length+1,
        language: bodyData.language,
        duration: bodyData.duration,
        fees: bodyData.fees
    }
    courses.push(course);
    res.send(course);
})

app.patch('/updateCourse/:language', (req, res)=> {
    const course = courses.find(data=> data.language === req.params.language);
    course.language = req.body.language;
    res.send(course);
})


app.delete('/courseById/:id', (req, res)=> {
    let course = courses.find(data => data.id === parseInt(req.params.id));
    const index = courses.indexOf(course);
    courses.splice(index, 1); 
    res.send(course);
});

const port = 5000;

app.listen(port, ()=> `Server running at port: ${port}`)