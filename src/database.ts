import 'reflect-metadata';
import { createConnection, ConnectionOptions, Connection, Repository } from 'typeorm';
import * as path from 'path';

import Img from './api/Img/img-model';


export default class Store {
    private static _conn: Connection;

    public static connectionOptions: ConnectionOptions = {
        type: 'sqlite',
        database: './dbase/imgdb.db',
        entities: [ Img ],
        synchronize: true
    };

    public static async createConnection() {
        if (!this._conn) {
            this._conn = await createConnection(this.connectionOptions);
        }
        return this._conn;
    }
}