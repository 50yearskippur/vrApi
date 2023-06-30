const { ErrorSharp } = require('@material-ui/icons');
const e = require('express');
const pool = require('../db/db');

exports.create = async (req, res) => {
    try {
        const { name, description, imageId, estimated_time, visible } = req.body;
        
        const query = 'INSERT INTO games (name, description, imageId, estimated_time, visible) VALUES ($1, $2, $3, $4, $5) RETURNING *';
        const values = [name, description, imageId, estimated_time, visible];
        
        const result = await pool.query(query, values);
        const createdGame = result.rows[0];
        
        res.status(201).json(createdGame);
    } catch (error) {
        console.error('Error creating game: ', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.get = async (req, res) => {
    try {
        const { name, value } = req.body;
        
        const query = 'SELECT * FROM games WHERE' + name + ' = $1';
        const result = await pool.query(query, [value]);
        const games = result.rows;
        
        res.status(201).json(games)
    } catch (error) {
        console.error('Error retrieving games: ', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.update = async (req, res) => {
    try{
        const { id, name, value } = req.body;

        if (!id) {
            return res.status(400).json({ error: 'id is a required' });
        }

        const query = 'UPDATE games SET' + name + ' = $1 WHERE id = $2';
        const values = [value, id];
        
        await pool.query(query, values);
        
        res.status(201).json({message: 'Game updated successfully'});
    } catch (error) {
        console.error('Error updating game: ', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.delete = async (req, res) => {
    try {

        const { id } = req.query;
        
        const query = 'DELETE FROM games WHERE id = $1';
        
        await pool.query(query, [id]);
        
        res.status(201).json({message: 'Game deleted successfully'})
    } catch (error) {
        console.error('Error deleting game: ', error);
        return res.status(500).json({message: 'Internal Server Error'})
    }
 }