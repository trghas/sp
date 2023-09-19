const express = require('express')

const regionRouter = require('./routes/region.routes')
const fibonacciRouter = require('./routes/fibonacci.routes')

const app = express()
app.use(express.json());

const PORT = 5500

app.get('/', (req, res) => {    // Главная страница
    res.send('url/number/.............url/equation?.............url/date?.............url/region/.............url/fibonacci/')
})

app.get('/number/:num', (req, res) => {  // Число
    let num = req.params.num
    let regexp = /^(((-)[1-9]+[0-9]*(\.)?[0-9]*)|([1-9]+[0-9]*(\.)?[0-9]*)|(0))$/

    if(regexp.test(num)) {                           
        res.send('Введено число: ' + num)
    }
    else {
        res.send('Введено не число')
    }
})

app.get('/equation?:equation', (req, res) => {  
    let equation = req.params.equation

    let a = req.query.a
    let b = req.query.b
    let c = req.query.c

    let regexp = /^(((-)[1-9]+[0-9]*(\.)?[0-9]*)|([1-9]+[0-9]*(\.)?[0-9]*)|(0))$/

    if(a == undefined || b == undefined || c == undefined) {
        res.send('Вводите запрос через переменные a, b и c')
    }
    else if (regexp.test(a) && regexp.test(a) && regexp.test(a)) {
        let d = b * b - 4 * a * b * c
        if(d < 0 || a == 0) {
            res.send('Действительных корней нет')
        }
        else if (d > 0) {
            res.send('x1 = ' + ((-b + Math.sqrt(d)) / (2 * a)) + ', x2 = ' + ((-b - Math.sqrt(d)) / (2 * a)))
        }
        else {
            res.send('x = ' + (-b / (2 * a)))
        }
    }
    else {
        res.send('Вводите целые числа')
    }
})

app.get('/date?:date', (req, res) => {  
    let date = new Date(req.query.date)
    let days = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];

    res.send(days[date.getDay()])
})

app.use('/fibonacci', fibonacciRouter)  

app.use('/region', regionRouter)       

app.listen(PORT, () => {
    console.log('Server started on port ' + PORT)
})