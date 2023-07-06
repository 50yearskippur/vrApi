module.exports = {
    development: {
        DB: {
            USER: 'postgres',
            HOST: 'localhost',
            DATABASE: 'vr',
            PASSWORD: 'root',
            PORT: 5432
        },
        PORT: 8080
    },
    production: {
        DB: {
            USER: process.env.USER,
            HOST: process.env.HOST,
            DATABASE: process.env.DATABASE,
            PASSWORD: process.env.PASSWORD,
            PORT: process.env.PORT
        },
        PORT: 8080 || process.env.PORT
    }
}