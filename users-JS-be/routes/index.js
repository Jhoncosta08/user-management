
module.exports = (app) => {
    app.get('/', (req, res) =>{

        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end('<h1>Ola, deu tudo certo!</h1>');
        console.log('URL: ', req.url);
        console.log('METHOD: ', req.method);
    });
};
