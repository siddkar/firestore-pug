import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import socket from 'socket.io';
import { db } from './config';
import router from './routes';
import { fetchImage } from './controllers';
import { logger, expressLogger } from './utils';

const app = express();

// setup logger
// app.use(expressLogger);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', router);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
/* eslint-disable no-unused-vars  */
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

const server = app.listen(3000, () => {
    logger.info({ message: 'Server listening to http://localhost:3000' });
});


// socket setup
// socket.io to work on the express server (backend setup)
// waiting for some client/browser to make connection and setup a web socket between the 2.
const io = socket(server);

// adding listener to handle connection event, emitted when a websocket is created from client to server.
io.on('connection', (websocket) => {
    logger.info({ message: `Client connected ${websocket.id}` });
    db.collection('CurrentUserDb').onSnapshot((snapshot) => {
        const changes = snapshot.docChanges();
        if (changes.length === 1) {
            changes.forEach((change) => {
                console.log('change type ==>', change.type);
                console.log('doc ==>', change.doc.data());
                if (change.type === 'added' || change.type === 'modified') {
                    fetchImage.getImages().then((data) => {
                        console.log(data);
                        io.sockets.emit('snapshot', { imgUrl: data });
                    });
                }
            });
        }
    });
});

export default app;
