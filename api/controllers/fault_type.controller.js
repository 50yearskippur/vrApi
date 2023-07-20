const pool = require('../db/db');
const axios = require('axios');

exports.create = async (req, res) => {
    try {
        const { name, description } = req.body;

        if (!name) {
            return res.status(400).json({ error: 'Name is a required fiels' });
        }

        const query = 'INSERT INTO fault_type (name, description) values ($1, $2) RETURNING *'
        const values = [name, description];

        const result = await pool.query(query, values);
        const createdType = result.rows[0];

        res.status(201).json(createdType)
    } catch (error) {
        console.error('Error creating fault type: ', error);
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

exports.get = async (req, res) => {
    try {
        const { id } = req.query;

        if (id) {
            const query = 'SELECT * FROM fault_type WHERE id = $1'
            const result = await pool.query(query, [id]);
            const faultTypes = result.rows[0];
            return res.status(200).json(faultTypes)
        } else {
            const query = 'SELECT * FROM fault_type'
            const result = await pool.query(query);
            const faultTypes = result.rows;

            return res.status(200).json(faultTypes)
        }
    } catch (error) {
        console.error('Error retrieving fault types: ', error);
        return res.status(500).json({ error: 'Tnternal Server Error' });
    }
}

exports.update = async (req, res) => {
    try {
        const { id, name, value } = req.body;

        const query = 'UPDATE fault_type SET ' + name + ' = $2 where id = $1';
        const values = [id, value];

        await pool.query(query, values);

        res.status(200).json({ message: 'Fault value updated successfully' });

    } catch (error) {
        console.error('Error updating fault type: ', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.delete = async (req, res) => {
    try {
        const { id } = req.query;

        await axios.delete(`http://localhost:8080/api/faults/delete?id=${id}&type=type`);

        const query = 'DELETE FROM fault_type WHERE id = $1';

        await pool.query(query, [id]);

        res.status(200).json({ message: 'Fault type deleted successfully' });
    } catch (error) {
        console.error('Error deleting fault type: ', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}