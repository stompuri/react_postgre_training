module.exports = function(body) {
  console.log("SQL QUERIES");

  var query_parts = [];

  // create dynamic query using array to define what data is not undefined
  query_parts.push("INSERT INTO portfolio_items (");
  if(body.year) query_parts.push("year,");
  query_parts.push("title,");
  if(body.lang) query_parts.push("lang,");
  if(body.desc) query_parts.push("description,");
  if(body.platform) query_parts.push("platform,");
  if(body.loc) query_parts.push("loc,");
  if(body.imgUrl) query_parts.push("imgUrl,");
  if(body.link) query_parts.push("link");
  query_parts.push(") VALUES ('");
  if(body.year) query_parts.push(body.year + "','");
  query_parts.push(body.title + "','");
  if(body.lang) query_parts.push(body.lang + "','");
  if(body.desc) query_parts.push(body.desc + "','");
  if(body.platform) query_parts.push(body.platform + "','");
  if(body.loc) query_parts.push(body.loc + "','");
  if(body.imgUrl) query_parts.push(body.imgUrl + "','");
  if(body.link) query_parts.push(body.link);
  query_parts.push("') RETURNING id;");
  var add_item_query = query_parts.join('').replace(/''/g, '')
    .replace(/,,/g, '')
    .replace(/,\)/g, ')')
    .replace(/\(,/g, '(');
  console.log(add_item_query);

  return {
    "add_item": add_item_query
  };
};
