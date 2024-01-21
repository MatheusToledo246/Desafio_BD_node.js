const express = require("express")

const app = express()

app.get("/message/:id/:user", (request, response) => {
   const { id, user} = request.params;

   response.send(` 
   Mensagem ID: ${request.params.id},
   Para o usuário: ${request.params.user} `)
})

const PORT = 3333;
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`))