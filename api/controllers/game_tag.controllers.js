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

        if (name == 'game_id') {
            const gameQuery = 'SELECT * FROM tags WHERE id = $1'
            const resQuery = await pool.query(gameQuery, [result.rows[0].tag_id])

            return res.status(200).json(resQuery)
        } else {
            const tagQuery = 'SELECT * FROM games WHERE id = $1'
            const resQuery = await pool.query(tagQuery, [result.rows[0].game_id])

            return res.status(200).json(resQuery)
        }

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

        const query = 'UPDATE game_tag SET ' + name + ' = $1 WHERE game_id = $2';
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
        const { type, id } = req.query;

        const query = 'DELETE FROM game_tag WHERE ' + type + ' = $1';
        await pool.query(query, [id]);

        res.status(201).json({ message: 'game tag deleted successfully' })
    } catch (error) {
        console.error('Error deleting game tag: ', error);
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}