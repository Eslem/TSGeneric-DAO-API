import * as mongoose from 'mongoose';
import { assert } from 'chai';
import { GenericDAOImplMongoose } from './../../src/persistence';

export interface Note {
    title: String;
    message: String;
}

export interface NoteDocument extends Note, mongoose.Document {
}


export class NoteDAOImplMongoose extends GenericDAOImplMongoose<Note, NoteDocument>{
    constructor() {
        super(
            "Note",
            new mongoose.Schema({
                title: String,
                message: String
            })
        );
    }
}
export interface Note2 {
    title: String;
    message: String;
}

export interface NoteDocument2 extends Note2, mongoose.Document {
}


export class NoteDAOImplMongoose2 extends GenericDAOImplMongoose<Note, NoteDocument>{
    constructor() {
        super(
            "Note2",
            new mongoose.Schema({
                title: String,
                message: String
            })
        );
    }
}

export let _onError = (err) => {
    assert.isOk(false, 'Error' + err);
}
export let NoteDAO = new NoteDAOImplMongoose();


export let createDefault = (done, ID?) => {
    NoteDAO.create({ title: 'Title', message: 'Nain' }).then(
        note => {
            if (ID)
                ID._id = note._id;
            done();
        }
    ).catch(_onError)
}


export let createMultiple = (done) => {
    NoteDAO.create({ title: 'Title', message: 'Nain' }).then(
        note => {
            NoteDAO.create({ title: 'Title', message: 'Nain' }).then(
                note => {
                    done();
                }
            ).catch(_onError)
        }
    ).catch(_onError)
}
