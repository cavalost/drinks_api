const app = require('./src/app');

const { PORT = '3000' } = process.env;

const server = app.listen(PORT, () => {
    const { port } = server.address();
    console.log(`Server listening at PORT ${port}`);
});

server.on('error', (error) => {
    if (error.syscall !== 'listen') {
        throw error;
    }

    switch (error.code) {
    case 'EACCES':
        console.error(`Port ${PORT} requires elevated privileges`);
        process.exit(1);
        break;
    case 'EADDRINUSE':
        console.error(`Port ${PORT} is already in use`);
        process.exit(1);
        break;
    default:
        throw error;
    }
});
