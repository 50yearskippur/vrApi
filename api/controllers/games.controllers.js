const pool = require('../db/db');
const axios = require('axios');

exports.create = async (req, res) => {
    try {
        const { name, description, image, estimated_time, visible, tagsId } = req.body;

        const query = 'INSERT INTO games (name, description, image, estimated_time, visible) VALUES ($1, $2, $3, $4, $5) RETURNING *';
        const values = [name, description, image, estimated_time, true];

        const result = await pool.query(query, values);
        const createdGame = result.rows[0];

        // for (const tag of tagsId) {
        await axios.post(`http://localhost:8080/api/gameTags/create`, {
            gameId: createdGame.id,
            tagId: tagsId
        });
        // }

        res.status(201).json(createdGame);
    } catch (error) {
        console.error('Error creating game: ', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.get = async (req, res) => {
    try {
        const { name, value } = JSON.parse(req.query.data);

        const query = 'SELECT * FROM games WHERE ' + name + ' = $1';
        const result = await pool.query(query, [value]);
        const games = result.rows;
        res.status(201).json(games)
    } catch (error) {
        console.error('Error retrieving games: ', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.update = async (req, res) => {
    try {
        const { id, name, value } = req.body;

        if (!id) {
            return res.status(400).json({ error: 'id is a required' });
        }

        const query = 'UPDATE games SET ' + name + ' = $1 WHERE id = $2';
        const values = [value, id];

        await pool.query(query, values);

        res.status(201).json({ message: 'Game updated successfully' });
    } catch (error) {
        console.error('Error updating game: ', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.delete = async (req, res) => {
    try {
        const { id } = req.query;

        await axios.delete(`http://localhost:8080/api/gameTags/delete?id=${id}&type=game_id`);

        const query = 'DELETE FROM games WHERE id = $1';

        await pool.query(query, [id]);

        res.status(201).json({ message: 'Game deleted successfully' })
    } catch (error) {
        console.error('Error deleting game: ', error);
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}