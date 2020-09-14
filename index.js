const fs = require('fs');
const http = require('http');
const url = require('url'); //used to analyze url

/*---- SERVER ----*/

//top level code, it will executed once when we start the program
//in case when we read the same file data on each request

const replaceTemplate = (temp, product) => {
    let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName); //here g is used to declare global
    output = output.replace(/{%IMAGE%}/g, product.image); //its not good practice to change directly the parameter
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%FROM%}/g, product.from);
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%DISCRIPTION%}/g, product.discription);
    output = output.replace(/{%ID%}/g, product.id);

    if(!product.organic)
    output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
    return output;

}

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8'); 
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8'); 
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8'); 

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8'); 
const dataObj = JSON.parse(data);   

const server = http.createServer((req, res) => {
    const pathName = req.url;

    //OVERVIEW PAGE
    if(pathName === '/' || pathName === '/overview'){
        res.writeHead(200, {'Content-type': 'text/html'}); 

        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join();
        // console.log(cardsHtml);
        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
        res.end(output);
    }

    //PRODUCT PAGE
    else if(pathName === '/product'){
        res.end("This is the PRODUCT");
    }

    //API
    else if(pathName === '/api'){
            res.writeHead(200, {'Content-type': 'application/json'}); 
            res.end(data);
    }

    //NOT FOUND
    else{
        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-header': 'Hello world'
        });
        res.end("<h1>Page not found</h1>");
    }
}); 

server.listen(3000, '127.0.0.1', () => {
    console.log("Server is listening on port 3000");
});