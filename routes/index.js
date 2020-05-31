var express = require('express');
var router = express.Router();
const { Pool } = require('pg');


const pool = new Pool({
    connectionString: process.env.DATABASE_URL || 'postgresql://postgres:badPassWord@localhost:5432/bzstudentinfo',
    ssl: process.env.DATABASE_URL ? true : false
})



router.get('/', async (req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT district, round(avg(pse)) as avg FROM pse GROUP BY district ORDER BY AVG(pse) DESC');
      const results = { 'results': (result) ? result.rows : null};
      res.render('index', results );
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })

router.get('/funding', async (req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT funding, round(AVG(pse)) as avg FROM PSE GROUP BY funding ORDER BY AVG(pse) DESC');
      const results = { 'results': (result) ? result.rows : null};
      res.render('funding', results );
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })
router.get('/municipality', async (req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT municipality, round(AVG(pse)) as avg FROM PSE GROUP BY municipality ORDER BY AVG(pse) DESC');
      const results = { 'results': (result) ? result.rows : null};
      res.render('municipality', results );
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })
  router.get('/ur', async (req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT urbanrural, round(AVG(pse)) as avg FROM PSE GROUP BY urbanrural ORDER BY AVG(pse) DESC');
      const results = { 'results': (result) ? result.rows : null};
      res.render('ur', results );
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })
  router.get('/management', async (req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT management, round(AVG(pse)) as avg FROM PSE GROUP BY management ORDER BY AVG(pse) DESC');
      const results = { 'results': (result) ? result.rows : null};
      res.render('management', results );
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })
  router.get('/school', async (req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT pseschoolname, round(AVG(pse)) as avg FROM PSE GROUP BY pseschoolname ORDER BY AVG(pse) DESC');
      const results = { 'results': (result) ? result.rows : null};
      res.render('school', results );
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })
module.exports = router;
