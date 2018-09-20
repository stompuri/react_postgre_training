'use strict';
const Koa = require('koa');
const Router = require('koa-router');
const koaBody = require('koa-body');
const cors = require('kcors');
const { Client } = require('pg');
const sqlQueries = require('./SqlQueries.js');

const app = new Koa();
const router = new Router();

app.use(cors());
app.use(koaBody({ multipart: true }));

const PORT = process.env.PORT || 9000;

const addItem = async (body) => {
  const client = new Client();
  await client.connect();
  const response = await client.query(sqlQueries(body).add_item);
  await client.end();
  return response.rows[0].id;
};

const removeItem = async (id) => {
  const client = new Client();
  await client.connect();
  const sql_query = `DELETE FROM portfolio_items WHERE id=${id};`;
  console.log(sql_query);
  const response = await client.query(sql_query);
  await client.end();
  console.log(response);
  return response;
};

const fetchAllItems = async () => {
  const client = new Client();
  await client.connect();
  const sql_query = `SELECT id, title FROM portfolio_items;`;
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

router.post('/api/addItem', async ctx => {
  console.log("api/addItem");
  console.log(ctx.request.body);
  console.log(ctx.request.body.title);
  var response = { "id": null };
  try {
    if (ctx.request.body.title) {
      console.log("DEBUG1");
      response.id = await addItem(ctx.request.body);
      console.log("Added with id:");
      console.log(response);
    } else {
      console.error("Can't add without a title!");
    }
  } catch (error) {
    console.error("Couldn't add item with title " + ctx.request.body.title);
    ctx.throw(500, 'Could not add item');
  }
  ctx.type = 'application/json; charset=utf-8';
  ctx.body = response;
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
      console.log("Removed item with an id " + ctx.request.query.id);
    } else {
      console.error("Can't remove without an id!");
    }
  } catch (error) {
    console.error("Couldn't remove item with an id " + ctx.request.query.id);
    ctx.throw(500, 'Could not delete item');
  }
  ctx.type = 'application/json; charset=utf-8';
  ctx.body = {};
});

app.use(router.routes());
app.use(router.allowedMethods());

const server = app.listen(PORT);
console.log(`App listening on port ${PORT}`);
