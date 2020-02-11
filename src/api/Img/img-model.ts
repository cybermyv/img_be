import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, BeforeInsert } from 'typeorm';

export interface IImg {
    id: number;
    path: string;
    name: string;
    pictures: string;

}

export interface FileUploaderOption {
    dest: string;
    fileFilter?(fileName: string): boolean;
}

export interface FileDetails {
    fieldname: string;
    originalname: string;
    filename: string;
    mimetype: string;
    destination: string;
    path: string;
    size: number;
}

@Entity('img')
export default class Img implements IImg {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    path: string;

    @Column()
    name: string;

    @Column()
    pictures: string;

}
