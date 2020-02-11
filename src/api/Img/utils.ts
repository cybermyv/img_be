import * as fs from 'fs';
import * as uuid from 'uuid';


import { FileUploaderOption, FileDetails } from './img-model';



const uploader = function (file: any, options: FileUploaderOption) {
    if (!file) {throw new Error('no file(s)'); }

    return _fileHandler(file, options);
 };

const _fileHandler = function (file: any, options: FileUploaderOption) {
    if (!file) {throw new Error('no file'); }

    const orignalname = file.hapi.filename;
    const filename = uuid.v1();
    const path = `${options.dest}${filename}`;
    const fileStream = fs.createWriteStream(path);

    return new Promise((resolve, reject) => {
        file.on('error', function (err) {
            reject(err);
        });

        file.pipe(fileStream);

        file.on('end', function (err) {
            const fileDetails: FileDetails = {
                fieldname: file.hapi.name,
                originalname: file.hapi.filename,
                filename,
                mimetype: file.hapi.headers['content-type'],
                destination: `${options.dest}`,
                path,
                size: fs.statSync(path).size,
            };

            resolve(fileDetails);
        });
    });
};



export { uploader };