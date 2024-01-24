const { Router } = require("express");
const UsersController = require("../controllers/usersController")
const usersRoutes = Router();

function myMiddleware(request, response, next){
    console.log("Você passou pelo Middleware");

    if ( !request.body.isAdmin){
        return response.json({ message: "user unauthorized"});
    }

    next();
}

const usersController = new UsersController();
usersRoutes.use(myMiddleware)
usersRoutes.post("/", usersController.create);

module.exports = usersRoutes;