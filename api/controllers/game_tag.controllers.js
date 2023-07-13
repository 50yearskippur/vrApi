const pool = require('../db/db');

exports.create = async (req, res) => {
    try {
        const { gameId, tagId } = req.body;

        const query = 'INSERT INTO game_tag (game_id, tag_id) VALUES ($1, $2)';
        const values = [gameId, tagId];

        await pool.query(query, values);

    } catch (error) {
        console.error('Error creating game tag: ', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.get = async (req, res) => {
    try {
        const { name, value } = req.query;

        const query = 'SELECT * FROM game_tag WHERE ' + name + ' =$1';
        const result = await pool.query(query, [value]);

    } catch (error) {
        console.error('Error retrieving game tag: ', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.update = async (req, res) => {
    try {
        const { id, name, value } = req.body;

        if (!id) {
            return res.status(400).json({ error: 'id is a required' });
        }

        const query = 'UPDATE games_tag SET ' + name + ' = $1 WHERE id = $2';
        const values = [value, id];

        await pool.query(query, values);

        res.status(201).json({ message: 'game tag updated successfully' });
    } catch (error) {
        console.error('Error updating game tag: ', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.delete = async (req, res) => {
    try {
        const { game_id } = req.query;

        const query = 'DELETE FROM game_tag WHERE game_id = $1';
        await pool.query(query, [game_id]);

        res.status(201).json({ message: 'game tag deleted successfully' })
    } catch (error) {
        console.error('Error deleting game tag: ', error);
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}