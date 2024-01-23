const express = require("express")

const app = express()
app.use(express.json());

app.get("/message/:id/:user", (request, response) => {
   const { id, user} = request.params;

   response.send(` 
   Mensagem ID: ${request.params.id},
   Para o usuário: ${request.params.user} 
   `);
});

app.get("/users", (request, response) => {
    const {page, limit} = request.query;

    response.send(
        `Página: ${page}. Mostrar: ${limit}`
    );
});

const PORT = 3333;
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));