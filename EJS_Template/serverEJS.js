const http = require('http');
const ejs = require('ejs');
const path = require('path');

const template = `<h1>Hello <%= name %>!</h1>`;
const data = { name: 'Hemansi' };

http.createServer((req, res) => {
    if (req.url === '/') {
        //* render() - render EJS string directly
        // const html = ejs.render(template,data);
        // console.log(html)
        // res.end(html)

        //* renderFile() - render a template file 
        // const filePath = path.join(__dirname, 'views', 'home.ejs');
        // ejs.renderFile(filePath, data, (err, html) => {
        //     if (err) {
        //         res.writeHead(500, { 'Content-Type': 'text/plain' });
        //         res.end('Error rendering template');
        //     } else {
        //         res.writeHead(200, { 'Content-Type': 'text/html' });
        //         res.end(html);
        //     }
        // });

        //* compile() - compile a template string into a reusable function
        // const compiled = ejs.compile(template);
        // res.end(compiled(data))

    } else {
        res.writeHead(404);
        res.end('Not found');
    }
}).listen(3000, () => {
    console.log("Server running at :",3000);
});
