import * as Hapi from 'hapi';
import * as Joi from 'joi';
import * as Boom from 'boom';

import { IServerConfigurations } from "../../configurations";
import ImgController from './img-controller';
import * as ImgValidator from './img-validator';

export default function (
    server: Hapi.Server,
    configs: IServerConfigurations,

) {
    const imgController = new ImgController(configs);

    server.bind(imgController);

    server.route({
        method: "GET",
        path: "/api/v1/img",
        options: {
            handler: imgController.getAllImgs,
            auth: false,
            tags: ["api", "img"],
            description: "Show all images.",
            validate: {
                //  headers: ImgValidator.createImgModel
            },
            plugins: {
                "hapi-swagger": {
                    order: 2,
                    responses: {
                        "200": {
                            description: "All images responses"
                        },
                        "404": {
                            description: "Images can not be obtained"
                        }
                    }
                }
            }
        }

    });
}