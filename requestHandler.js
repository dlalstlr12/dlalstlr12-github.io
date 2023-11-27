const fs = require('fs');
const main_view = fs.readFileSync('./index.html','utf-8');
const orderlist_view = fs.readFileSync('./orderlist.html');

const mariadb = require('./database/connect/mariadb');

function main(response){
    console.log('main');

    mariadb.query("SELECT * FROM product", function(err,rows){
        console.log(rows);
    })

    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write(main_view);
    response.end();
}

function movie(response){
    fs.readFile('./img/movie.png',function(err,data){
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write(data);
        response.end();
    })
}

function clothes(response){
    fs.readFile('./img/clothes.png',function(err,data){
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write(data);
        response.end();
    })
}

function library(response){
    fs.readFile('./img/library.png',function(err,data){
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write(data);
        response.end();
    })
}

function order(response, productId) {
    response.writeHead(200, {'Content-Type' : 'text/html'});
  
    mariadb.query("INSERT INTO orderlist VALUES (" + productId + ", '" + new Date().toLocaleDateString() + "');",  function(err, rows) {
      console.log(rows)
    })
  
    response.write('order page')
    response.end();
    
}

function orderlist(response) {
    console.log('orderlist')
    response.writeHead(200, {'Content-Type' : 'text/html'});
  
    mariadb.query("SELECT * FROM orderlist",  function(err, rows) {
      response.write(orderlist_view);
  
      rows.forEach(element => {
        response.write(
          "<tr>"
          +"<td>"+element.product_id+"</td>"
          +"<td>"+element.order_date+"</td>"
          +"</tr>")
      })
      response.write("/<table>")
      response.end();
    })
  }

let handle = {}; //key: value
handle['/'] = main;
handle['/order'] =order;
handle['/orderlist'] = orderlist;

/* image directory */
handle['/img/movie.png'] = movie;
handle['/img/clothes.png'] = clothes;
handle['/img/library.png'] = library;

exports.handle = handle;