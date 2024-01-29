const { request, response } = require("express");
const knex = require("../database/knex");

class NotesController{
    async create(request, response){
        const {title, description, noteMovie, tags} = request.body;
        const { user_id } = request.params;
    
    const [note_id] = await knex("notes").insert({
        title,
        description,
        user_id
    });

    const tagsInsert = tags.map(name => {
        return {
            note_id,
            name,
            user_id
        }
    });

await knex("tags").insert(tagsInsert);


    response.json();
 }

    async show(request, response) {
        const { id } = request.params;

        const note = await knex("notes").where({ id }).first();
        const tags = await knex("tags").where({ note_id: id }).orderBy("name");
    
        return response.json({
            ...note,
            tags
        });
 }

    async delete(request, response) {
        const { id } = request.params;

        await knex("notes").where({ id }).delete();

        return response.json();
    }

    async index(request, response) {
        const { title, user_id, tags } = request.query;

        let notes;

        if(tags){
            const filterTags = tags.split(',').map(tag => tag.trim());
            
            notes = await knex("tags")
            .whereIn("name", filterTags)
        }else{

        notes = await knex("notes")
        .where({ user_id })
        .whereLike("title", `%${title}%`)
        .orderBy("title");
        
        }
        
        return response.json({ notes });
        
    }

}

module.exports = NotesController;

