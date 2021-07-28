
let NeDB = require('nedb');
let db = new NeDB({
    filename: 'users.db',
    autoload: true
});



module.exports = (app) => {



    let route = app.route('/users');
    let routeId = app.route('/users/:id');



    //listar todos os usuários
    route.get((req, res) => {
        db.find({}).sort({ name: -1 }).exec((err, users) => {
            if (err) {
                app.utils.error.send(err, req, res);
            } else {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json({
                    users
                });
            }
        });
    });



    //cadastrar um usuário
    route.post((req, res) => {

        if (!app.utils.validator.user(app, req, res)) return false;

        db.insert(req.body, (err, user) => {
            if (err) {
                app.utils.error.send(err, req, res);
            } else {
                res.status(200).json(user);
            }
        });

    });



    //encontrar um usuário pelo id
    routeId.get((req, res) => {
       db.findOne({ _id: req.params.id }).exec((err, user) => {
           if (err) {
               app.utils.error.send(err, req, res);
           } else {
               res.status(200).json(user);
           }
       });
    });



    //editando um usuário pelo id
    routeId.put((req, res) => {

        if (!app.utils.validator.user(app, req, res)) return false;

        db.update({ _id: req.params.id }, req.body, err => {
            if (err) {
                app.utils.error.send(err, req, res);
            } else {
                res.status(200).json(Object.assign(req.params, req.body));
            }
        });
    });



    //excluindo um usuário pelo id
    routeId.delete((req, res) => {
        db.remove({ _id: req.params.id }, {}, err =>{
            if (err) {
                app.utils.error.send(err, req, res);
            } else {
                res.status(200).json(req.params);
            }
        });
    });



};
