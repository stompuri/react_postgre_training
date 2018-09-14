'use strict';
const Koa = require('koa');
const Router = require('koa-router');
const cors = require('kcors');
const { Client } = require('pg');

const app = new Koa();
const router = new Router();

app.use(cors());

const PORT = process.env.PORT || 9000;

const fetchWeather = async (city) => {
  if (!city) {
    city = process.env.TARGET_CITY || 'Helsinki,fi';
  }
  const response = await fetch(`${MAP_URI}/weather?q=${city}&appid=${APP_ID}&`);
  return response ? response.json() : {};
};

const addItem = async (name) => {
  const client = new Client();
  await client.connect();
  const sql_query = `INSERT INTO sample_list (name) VALUES ('${name}') RETURNING id;`;
  console.log(sql_query);
  const response = await client.query(sql_query);
  await client.end();

  return response.rows[0].id;
};

const removeItem = async (id) => {
  const client = new Client();
  await client.connect();
  const sql_query = `DELETE FROM sample_list WHERE id=${id};`;
  console.log(sql_query);
  const response = await client.query(sql_query);
  await client.end();
  console.log(response);
  return response;
};

const fetchAllItems = async () => {
  const client = new Client();
  await client.connect();
  const sql_query = `SELECT id, name FROM sample_list;`;
  const response = await client.query(sql_query);
  await client.end();
  return response.rows;
};


router.get('/api/getAll', async ctx => {
  console.log("api/getAll");
  const res = await fetchAllItems();
  console.log(res);
  ctx.type = 'application/json; charset=utf-8';
  ctx.body = res;
});

router.get('/api/addItem', async ctx => {
  console.log("api/addItem");
  var id = { "id": null };
  try {
    if (ctx.request.query.name) {
      id.id = await addItem(ctx.request.query.name);
      console.log("Added with id:");
      console.log(id);
    } else {
      console.error("Can't add without a name!");
    }
  } catch (error) {
    console.error("Couldn't add item with name " + ctx.request.query.name);
    ctx.throw(500, 'Could not add item');
  }
  ctx.type = 'application/json; charset=utf-8';
  ctx.body = id;
});

router.get('/api/removeItem', async ctx => {
  console.log("api/removeItem");
  try {
    if (ctx.request.query.id) {
      const res = await removeItem(ctx.request.query.id);
      console.log("DEBUG");
      console.log(res.rowCount);
      if(res.rowCount == 0) {
        ctx.throw(500, "Couldn't find an item with id " + ctx.request.query.id);
      }
      console.log("Removed item with an id " + ctx.request.query.name);
    } else {
      console.error("Can't remove without an id!");
    }
  } catch (error) {
    console.error("Couldn't remove item with an id " + ctx.request.query.name);
    ctx.throw(500, 'Could not delete item');
  }
  ctx.type = 'application/json; charset=utf-8';
  ctx.body = {};
});

app.use(router.routes());
app.use(router.allowedMethods());

const server = app.listen(PORT);
console.log(`App listening on port ${PORT}`);
