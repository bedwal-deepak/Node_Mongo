const fs = require('fs');

// blocking synchronous way to read a file 
// const textIn = fs.readFileSync('./input.txt', 'utf-8');
// console.log(textIn);

// const textOut = `This is regarding the write file using sync file system: ${textIn}. \n Created on:- ${Date.now()}`;
// fs.writeFileSync('./output.txt', textOut);

// Non-blocking asynchronous way to read a file
fs.readFile('./start.txt', 'utf-8', (err, data1) =>{
    if(err) return console.log('ERROR!!!!')
    fs.readFile(`./${data1}.txt`, 'utf-8', (err, data2) =>{
        console.log(data2);
        fs.readFile('./append.txt', 'utf-8', (err, data3) =>{
            console.log(data3);

            fs.writeFile('./final.txt', `${data2} \n${data3}`, 'utf-8', err => {
                console.log('File is written');
            });
        });
    });
});
console.log('Will read this file!!!');