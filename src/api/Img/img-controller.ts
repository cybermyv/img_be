import * as Hapi from "hapi";
import * as Boom from "boom";

import { IServerConfigurations } from './../../configurations/index';
import Store from './../../database';
import Img, { IImg } from './img-model';

export interface IImgList {
    pictures: IImg[];
}

export default class ImgController {

    constructor (private configs: IServerConfigurations) {}

    public async getAllImgs (request: Hapi.Request, h: Hapi.ResponseToolkit) {
        const conn = await Store.createConnection();

        if (conn) {
            try {
                const result: Img[] = await conn.query ('select * from img');

                return h.response(result).code(200);
            } catch (e) {
                throw new Boom(e);
            }

        } else {
            return Boom.badImplementation();
        }
    }

    public async createImage (request: Hapi.Request, h: Hapi.ResponseToolkit) {

        // const newImg: IImg = <IImg>request.payload;

        const {payload} = request;

        console.log(payload);

        return h.response(payload).code(200);

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


