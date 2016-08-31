import {  expect, assert } from 'chai';
import { NoteDAO, _onError, createDefault, createMultiple} from './common/NoteDB';
import * as request from 'supertest';


declare var describe, it, afterEach, before, beforeEach;

require('./server/app');
let url = 'http://localhost:3334';

describe('GenericAPI', () => {

    afterEach((done) => {
        NoteDAO.model.remove({}, () => done());
    })

    describe('Server init', () => {
        it('should assert ok', (done) => {
            assert.isOk(true, 'Server inited');
            done();
        });
        it('should make a request', (done) => {
            request(url)
                .get('/')
                .expect(200)
                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }
                    let body = res.body;
                    expect(body).to.have.property('title').and.to.equals('Nain');
                    done();
                });
        });
    });

    describe('Get note', () => {
        var ID = { _id: '' };
        beforeEach((done) => {
            createDefault(done, ID)
        });

        it('should get all elements', (done) => {
            request(url)
                .get('/api/notes')
                .expect(200)
                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }
                    let body = res.body;
                    expect(body).to.be.defined;
                    assert.isArray(body, 'Is array');
                    expect(body).to.have.lengthOf(1);
                    done();
                });
        });

        it('should get one element', (done) => {
            request(url)
                .get('/api/notes/' + ID._id)
                .expect(200)
                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }
                    let body = res.body;
                    expect(body).to.be.defined;
                    assert.isNotArray(body, 'Is array');
                    expect(body).to.have.property('title').and.to.equals('Title');
                    done();
                });
        });

        it('should get all elements (empty)', (done) => {
            NoteDAO.model.remove({}, () => {
                request(url)
                    .get('/api/notes')
                    .expect(200)
                    .end(function(err, res) {
                        if (err) {
                            throw err;
                        }
                        let body = res.body;
                        expect(body).to.be.defined;
                        assert.isArray(body, 'Is array');
                        expect(body).to.have.lengthOf(0);
                        done();
                    });
            });
        });

        it('should get one element (empty 404)', (done) => {
            NoteDAO.model.remove({}, () => {
                request(url)
                    .get('/api/notes/' + ID._id)
                    .expect(404)
                    .end(function(err, res) {
                        if (err) {
                            throw err;
                        }
                        done();
                    });
            });
        });
    });

    describe('Create note', () => {
        var ID = { _id: '' };

        it('should create an element', (done) => {
            request(url)
                .post('/api/notes/')
                .send({
                    title: 'Created title',
                    message: 'Created message'
                })
                .expect(201)
                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }
                    let body = res.body;
                    NoteDAO.get(body._id).then(
                        note => {
                            assert.isOk(note, 'Should exits item');
                            assert.isOk(note._id, 'Should have id');
                            expect(note).to.have.property('title').and.to.equals('Created title');
                            expect(note).to.have.property('message').and.to.equals('Created message');

                            done();
                        }
                    ).catch(_onError);
                });
        });

        it('should show an error on not object passed', (done) => {
            request(url)
                .post('/api/notes/')
                .expect(400)
                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }
                    let body = res.body;
                    expect(body).to.have.property('name').and.to.equals('ValidationError');
                    expect(body).to.have.property('message').and.to.equals('Note validation failed');
                    done();
                })
        });
    });

    describe('Delete note', () => {
        var ID = { _id: '' };
        beforeEach((done) => {
            createDefault(done, ID)
        });

        it('should delete an element', (done) => {
            request(url)
                .delete('/api/notes/' + ID._id)
                .expect(200)
                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }
                    let body = res.body;
                    NoteDAO.get(ID._id).then(
                        note => {
                            assert.isNotOk(null, 'Should return null');
                            done();
                        }
                    ).catch(_onError);
                });
        });

        it('should show error on delete with not existing id', (done) => {
            NoteDAO.model.remove({}, () => {
                request(url)
                    .delete('/api/notes/' + ID._id)
                    .expect(404)
                    .end(function(err, res) {
                        if (err) {
                            throw err;
                        }
                        done();
                    });
            });
        });
    });
    describe('Update note', () => {
        var ID = { _id: '' };
        beforeEach((done) => {
            createDefault(done, ID)
        });

        it('should update an element', (done) => {
            request(url)
                .post('/api/notes/' + ID._id)
                .send({ title: 'New title' })
                .expect(200)
                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }
                    let body = res.body;
                    NoteDAO.get(ID._id).then(
                        note => {
                            expect(note).to.have.property('title').and.to.equals('New title');

                            done();
                        }
                    ).catch(_onError);
                });
        });

        it('should show error on updating with not existing id', (done) => {
            NoteDAO.model.remove({}, () => {
                request(url)
                    .post('/api/notes/' + ID._id)
                    .send({})
                    .expect(404)
                    .end(function(err, res) {
                        if (err) {
                            throw err;
                        }
                        done();
                    });
            });
        });
    });


});
