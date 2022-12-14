import { connect } from 'mongoose';
import db from './config/database.config';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '../config.env') });

// process.on('uncaughtException', (err) => {
//   console.log('UNCAUGHTEXCEPTION');
//   process.exit(1);
// });

import app from './app';

//----------CONNECT TO DATABASE-------------//

const launchSquelize = async () => {
  try {
    await db.sync();
    console.log(`CONNECTED TO DB SUCCESSFULLY`);
  } catch (err) {
    console.log(`FAILED TO CONNECT TO DB!`);
  }
};
launchSquelize();

//----------START SERVER-------------//
const port = process.env.PORT;
const server = app.listen(port, () => {
  console.log(`EXPRESS SERVER RUNNING AT ${port}`);
});

process.on('unhandledRejection', (err: { name: string; message: string }) => {
  console.log('UNHANDLEDREJECTION');
  console.log(err.name, err.message);
  server.close(() => process.exit(1));
});

process.on('SIGTERM', (err) => {
  console.log('SIGTERM RECIEVED, SHUTTING DOWN NOW.');
  server.close(() => console.log('PROCESS TERMINATED!'));
});
