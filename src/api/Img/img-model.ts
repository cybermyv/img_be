import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, BeforeInsert } from 'typeorm';

export interface IImg {
    id: number;
    path: string;
    name: string;
    pictures: string;

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
