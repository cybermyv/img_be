import * as Hapi from "hapi";
import * as Boom from "boom";
import * as fs from "fs";


import { IServerConfigurations } from './../../configurations/index';
import Store from './../../database';
import Img, { IImg, FileUploaderOption, FileDetails } from './img-model';

import {
    // imageFilter, loadCollection, cleanFolder,
    uploader
} from './utils';

export interface IImgList {
    pictures: IImg[];
}

export default class ImgController {

    constructor(private configs: IServerConfigurations) { }

    public async getAllImgs(request: Hapi.Request, h: Hapi.ResponseToolkit) {

        const conn = await Store.createConnection();

        if (conn) {
            try {
                const result: Img[] = await conn.query('select * from images');

                return h.response(result).code(200);
            } catch (e) {
                throw new Boom(e);
            }

        } else {
            return Boom.badImplementation();
        }
    }



    public async createImage(request: Hapi.Request, h: Hapi.ResponseToolkit) {
        const UPLOAD_PATH = './uploads';
        // const fileOptions = { dest: `${UPLOAD_PATH}/` };
        const fileOptions: FileUploaderOption = { dest: `${UPLOAD_PATH}/`};


        if (!fs.existsSync(UPLOAD_PATH)) {
            fs.mkdirSync (UPLOAD_PATH);
        }



        try {

            const data = request.payload;
            const file = data['avatar'];
            const fileDetails = await uploader(file, fileOptions);

            return h.response(data).code(200);

        } catch (e) {
            throw new Boom(e);
        }


        // const newImg: IImg = <IImg>request.payload;
        // const { payload } = request;
        // console.log(payload);
        // return h.response(payload).code(200);
        // const conn = await Store.createConnection();
        // if (conn) {
        //     try {
        //     } catch (e) {
        //         throw new Boom(e);
        //     }
        // }  else {
        //     return Boom.badImplementation();
        // }
    }

}


