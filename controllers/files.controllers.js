const pool = require('../db/db');

exports.create = async (req, res) => {
    try {
        const { originalname, mimetype, buffer } = req.file;

        const contentQuery = 'INSERT INTO files_content (content) VALUES ($1) RETURNING id';
        const contentValues = [Buffer.from(buffer)];

        const contentResult = await pool.query(contentQuery, contentValues);
        const contentId = contentResult.rows[0].id;

        const query = 'INSERT INTO files (name, mime_type, content) VALUES ($1, $2, $3) RETURNING *';
        const values = [originalname, mimetype, contentId];

        const result = await pool.query(query, values);
        const createdFile = result.rows[0];

        res.status(201).json(createdFile);
    } catch (error) {
        console.error('Error creating file: ', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.get = async (req, res) => {
    try {
        const { id } = req.query;

        if (id !== undefined) {

            const query = `       
                SELECT f.*, fc.content
                FROM files f
                JOIN files_content fc ON f.content = fc.id
                WHERE f.id = $1
            `;
            const result = await pool.query(query, [id]);
            const file = result.rows[0];

            let content;
            if (file.mime_type === 'text/plain') {
                content = file.content.toString('utf-8');
            } else if (file.mime_type === 'image/jpeg' || file.mime_type === 'image/png') {
                content = file.content.toString('base64');
            } else {
                content = 'Unsupported MIME type';
            }

            res.status(200).json({ id: file.id, name: file.name, content: content })
        } else {
            const query = `       
                SELECT f.*, fc.content
                FROM files f
                JOIN files_content fc ON f.content = fc.id
            `;
            const result = await pool.query(query, [id]);
            const files = result.rows;

            res.status(200).json(files)
        }

    } catch (error) {
        console.error('Error retrieving files:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.update = async (req, res) => {
    try {
        const { id } = req.query;
        const { originalname, mimetype, buffer } = req.file;

        if (!id) {
            return res.status(400).json({ error: 'id is a required' });
        }

        const query = 'SELECT * FROM files WHERE id = $1';
        const result = await pool.query(query, [id]);
        const contentId = result.rows[0].content;

        const contentQuery = 'UPDATE files_content SET content = $2 WHERE id = $1';
        const contentValues = [contentId, buffer];
        await pool.query(contentQuery, contentValues);

        const fileQuery = 'UPDATE files SET name = $1, mime_type = $2 WHERE id = $3';
        const fileValues = [originalname, mimetype, id];
        await pool.query(fileQuery, fileValues);

        return res.status(200).json({ success: true });
    } catch (error) {
        console.error('Error updating files:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.delete = async (req, res) => {
    try {
        const { id } = req.query;

        const query = 'SELECT * FROM files WHERE id = $1';
        const result = await pool.query(query, [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'File not found' });
        }

        const contentId = result.rows[0].content;

        const fileQuery = 'DELETE FROM files WHERE id = $1';
        await pool.query(fileQuery, [id]);

        const contentQuery = 'DELETE FROM files_content WHERE id = $1'; // Corrected the table name to "files_content"
        await pool.query(contentQuery, [contentId]);
    } catch (error) {
        console.error('Error deleting file:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}