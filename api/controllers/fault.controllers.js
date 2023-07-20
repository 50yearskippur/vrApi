const pool = require('../db/db');

exports.create = async (req, res) => {
    try {
        const { name, description, solution, type, image } = req.body;

        const query = 'INSERT INTO fault (name, description, solution, type, image) VALUES ($1, $2, $3, $4, $5)';
        const values = [name, description, solution, type, image];

        await pool.query(query, values);

        res.status(201).json({ message: 'fault created succesfuly' })
    } catch (error) {
        console.error('Error creating fault: ', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.get = async (req, res) => {
    try {
        const { name, value } = req.body;

        if (name && value) {
            const query = 'SELECT * FROM fault WHERE ' + name + ' = $1';
            const result = await pool.query(query, [value]);
            const faults = result.rows;

            res.status(201).json(faults)
        } else {
            const query = 'SELECT * FROM fault';
            const result = await pool.query(query);
            const faults = result.rows;

            res.status(201).json(faults)
        }

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

        const query = 'UPDATE fault SET ' + name + ' = $1 WHERE id = $2';
        const values = [value, id];

        await pool.query(query, values);

        res.status(201).json({ message: 'fault updated successfully' });
    } catch (error) {
        console.error('Error updating fault: ', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.delete = async (req, res) => {
    try {
        const { id } = req.query;

        const query = 'DELETE FROM fault WHERE id = $1';

        await pool.query(query, [id]);

        res.status(201).json({ message: 'fault deleted successfully' })
    } catch (error) {
        console.error('Error deleting fault: ', error);
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}