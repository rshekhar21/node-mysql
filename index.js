require('dotenv').config();

const log=console.log;
const port=process.env.port||5210;
const mysql=require('mysql2');
const express=require('express');
const app=express();

const cs={
  host: 'localhost',
  user: 'ebs_admin',
  password: '',
  database: 'testdb',
  connectionLimit: 10,
  queueLimit: 0
}

const pool=mysql.createPool(cs); //log(pool);

function runsql(sql, values=[]) {
  return new Promise(function (resolve, reject) {  
    pool.query(sql, values, (err, rows, fields) => {
      if (err) return reject(err.message);
      return resolve(rows, fields);
    })
  })
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
  try {
    let sql='select * from stock;'
    let rs=await runsql(sql); //log(rs)
    res.json(rs);
  } catch (error) {
    return error;
  }
})


app.listen(port, () => log(`server running at http://localhost:${port}`));