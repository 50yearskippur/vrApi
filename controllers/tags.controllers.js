const pool = require('../db/db');

exports.createTag = async (req, res) => {
    try {
        const { name, description } = req.body;

        // Validate the required fields
        if (!name) {
            return res.status(400).json({ error: 'Name is a required field' });
        }

        // Insert the new tag into the database
        const query = 'INSERT INTO tags (name, description) VALUES ($1, $2) RETURNING *';
        const values = [name, description];

        const result = await client.query(query, values);
        const createdTag = result.rows[0];

        res.status(201).json(createdTag);
    } catch (error) {
        console.error('Error creating tag:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.getTags = async (req, res) => {
    try {
        const { id } = req.body;

        if (id) {
            // Retrieve a specific tag by ID
            const query = 'SELECT * FROM tags WHERE id = $1';
            const result = await pool.query(query, [id]);
            const tag = result.rows[0];

            if (!tag) {
                return res.status(404).json({ error: 'Tag not found' });
            }

            return res.status(200).json(tag);
        } else {
            // Retrieve all tags from the database
            const query = 'SELECT * FROM tags';
            const result = await pool.query(query);
            const tags = result.rows;

            return res.status(200).json(tags);
        }
    } catch (error) {
        console.error('Error retrieving tags:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.updateTag = async (req, res) => {
    try {
        const { id, name, value } = req.body;

        const query = 'UPDATE tags SET ' + name + ' = $2 WHERE id = $1';
        const values = [id, value];


        await pool.query(query, values);

        res.status(200).json({ message: 'Tag updated successfully' });

    } catch (error) {
        console.error('Error updating tag:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.deleteTag = async (req, res) => {
    try {
        const { id } = req.body;
        const query = 'DELETE FROM tags WHERE id = $1'

        await pool.query(query, [id])

        res.status(200).json({ message: 'Tag deleted successfully' });

    } catch (error) {
        console.error('Error deleting tag: ', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}