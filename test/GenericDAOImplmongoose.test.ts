import { GenericDAOImplMongoose } from './../src/persistence';
import * as mongoose from 'mongoose';
import { setupMongoose }  from './common/db';
import {  expect, assert } from 'chai';

declare var describe, expect, it, afterEach, before, beforeEach;

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

let _onError = (err) => {
    assert.isOk(false, 'Error'+err);
}

let NoteDAO = new NoteDAOImplMongoose();
describe('GenericDAO.Note', () => {
    before(() => {
        setupMongoose(mongoose);
    });

    afterEach((done) => {
        NoteDAO._model.remove({}, () => done());
    })



    describe('Create', () => {
        it('should create a basic note with ID', (done) => {
            NoteDAO.create({
                title: 'Nain Note',
                message: 'This is a message'
            }).then(
                note => {
                    expect(note).to.have.property('title').and.to.equal('Nain Note');
                    expect(note).to.have.property('message').and.to.equal('This is a message');
                    expect(note).to.have.property('_id');
                    done();
                })
                .catch(_onError);
        })

        it('should throw an error on undefined passed', (done) => {
            NoteDAO.create(undefined).then(
                note => {
                    expect(true).to.be.false;
                }
            )
                .catch(err => {
                    expect(err).to.be.defined;
                    done();
                })
        })
    });


    describe('GetID', (done) => {
        let ID;
        beforeEach((done) => {
            NoteDAO.create({ title: 'Title', message: 'Nain' }).then(
                note => {
                    ID = note._id;
                    done();
                }
            ).catch(_onError)
        });


        it('should get an element with ID', (done) => {
            NoteDAO.get(ID).then(
                note => {
                    expect(note).to.be.defined;
                    expect(note).to.have.property('_id').and.to.eql(ID);
                    expect(note).to.have.property('title').and.to.equals('Title');
                    done();
                }
            ).catch(_onError);
        });

        it('should throw an exception if recieve undefined as ID', (done) => {
            NoteDAO.get(undefined).then(
                note => {
                    _onError('');
                }
            ).catch(err => {
                expect(err).to.be.defined;
                done();
            });
        });
    });

    describe('Get with params', (done) => {
        beforeEach((done) => {
            NoteDAO.create({ title: 'Title', message: 'Nain' }).then(
                note => {
                    done();
                }
            ).catch(_onError)
        });


        it('should get an element with title \'Title\'', (done) => {
            NoteDAO.getWithParams({ title: 'Title' }).then(
                notes => {
                    expect(notes).to.be.defined;
                    assert.isArray(notes, 'Is array');
                    expect(notes[0]).to.have.property('title').and.to.equals('Title');
                    done();
                }
            ).catch(_onError);
        });

        it('should not get an element with title \'No Title\'', (done) => {
            NoteDAO.getWithParams({ title: 'No Title' }).then(
                notes => {
                    expect(notes).to.be.defined;
                    assert.isArray(notes, 'Is array');
                    expect(notes).to.have.lengthOf(0);
                    done();
                }
            ).catch(_onError);
        });

        it('should throw an exception if params are undefined', (done) => {
            NoteDAO.getWithParams(undefined).then(
                note => {
                    _onError('');
                }
            ).catch(err => {
                expect(err).to.be.defined;
                done();
            });
        });
    });

    describe('Get All', (done) => {
        beforeEach((done) => {
            NoteDAO.create({ title: 'Title', message: 'Nain' }).then(
                note => {
                    NoteDAO.create({ title: 'Title', message: 'Nain' }).then(
                        note => {
                            done();
                        }
                    ).catch(_onError)
                }
            ).catch(_onError)
        });


        it('Should get all elements (length = 2)', (done) => {
            NoteDAO.getAll().then(
                notes => {
                    expect(notes).to.be.defined;
                    assert.isArray(notes, 'Is array');
                    expect(notes).to.have.lengthOf(2);
                    expect(notes[0]).to.have.property('title').and.to.equals('Title');
                    expect(notes[1]).to.have.property('title').and.to.equals('Title');
                    done();
                }
            ).catch(_onError);
        });

        it('should get an empty array if there are not elements', (done) => {
            NoteDAO._model.remove({}, () => {
                NoteDAO.getAll().then(
                    notes => {
                        expect(notes).to.be.defined;
                        assert.isArray(notes, 'Is array');
                        expect(notes).to.have.lengthOf(0);
                        done();
                    }
                ).catch(_onError);
            });
        });
    });

    describe('Delete by ID', (done) => {
        let ID;
        beforeEach((done) => {
            NoteDAO.create({ title: 'Title', message: 'Nain' }).then(
                note => {
                    ID = note._id;
                    done();
                }
            ).catch(_onError)
        });


        it('should delete the element by ID', (done) => {
            NoteDAO.delete(ID).then(
                note => {
                    assert.isOk(true, 'Promise resolved');
                    NoteDAO.get(ID).then(
                        note => {
                            assert.isNotOk(null, 'Should return null');
                            done();
                        }
                    ).catch(_onError);
                }
            ).catch(_onError);
        });

        it('should throw an exception if recieve undefined as ID', (done) => {
            NoteDAO.delete(undefined).then(
                note => {
                    _onError('');
                }
            ).catch(err => {
                expect(err).to.be.defined;
                done();
            });
        });
    });

    describe('Update by ID', (done) => {
        let _note;
        beforeEach((done) => {
            NoteDAO.create({ title: 'Title', message: 'Nain' }).then(
                note => {
                    _note = note;
                    done();
                }
            ).catch(_onError)
        });


        it('should update the element', (done) => {
            let newNote = _note;
            let title = 'New Title';
            newNote.title = title;
            NoteDAO.update(newNote).then(
                note => {
                    assert.isOk(note, 'Promise resolved');
                    NoteDAO.get(newNote._id).then(
                        note => {
                            expect(note).to.have.property('title').and.to.equals(title);
                            done();
                        }
                    ).catch(_onError);
                }
            ).catch(_onError);
        });

        it('should throw an exception if dont recieve an object', (done) => {
            NoteDAO.update(undefined).then(
                note => {
                    assert.isOk(false, 'Promise resolved');
                }
            ).catch(
                err => {
                    expect(err).to.be.defined;
                    done();
                });
        });

        it('should throw an exception if dont recieve an object with _id', (done) => {
            NoteDAO.update({ title: 'Title', message: 'Nain' }).then(
                note => {
                    assert.isOk(false, 'Promise resolved');
                }
            ).catch(
                err => {
                    expect(err).to.be.defined;
                    done();
                });
        });


    });




});
