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
        const fileOptions: FileUploaderOption = { dest: `${UPLOAD_PATH}/` };


        if (!fs.existsSync(UPLOAD_PATH)) {
            fs.mkdirSync(UPLOAD_PATH);
        }

        try {

            const data = request.payload;
            const file = data['avatar'];

            // const fileDetails = await uploader(file, fileOptions);

            const conn = await Store.createConnection();

            if (conn) {

                try {
                    let newImg = new Img();

                    newImg.name = file.hapi.filename;
                    newImg.path = 'path1';
                    newImg.pictures = request.payload['avatar']._data;

                    const img = await conn.getRepository(Img).save(newImg);
                    return h.response(img).code(200);

                } catch (e) {
                    throw new Boom(e);
                }
            } else {
                return Boom.badImplementation();
            }
        } catch (e) {
            throw new Boom(e);
        }
    }

}


