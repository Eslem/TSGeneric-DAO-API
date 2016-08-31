# TSGeneric-DAO-API

[![Build Status](https://travis-ci.org/Eslem/TSGeneric-DAO-API.svg?branch=master)](https://travis-ci.org/Eslem/TSGeneric-DAO-API)

Generics Classes for DAO and API with Typescript (Mongoose, Express)

## Classes

- GenericDAO: DAO functions (CRUD).
- GenericDAOImplMongoose: implementation of GenericDAO for Mongoose.

- GenericAPI: Route for DAO functions (CRUD).

- GenericDAOImplExpress: implementation of GenericAPI for Express.

--------------------------------------------------------------------------------

### DAO

```typescript
  interface GenericDAO <T>{
    create(model:T):Promise<T>;
    get(id:number|string): Promise<T|any>;
    getAll():Promise<[T]>;
    update(model:any):Promise<T>;
    delete(id:number|string):Promise<any>;
  }
```
[Example Note](test/common/NoteDB.ts)

### API

```typescript
interface GenericAPI {
  DAO:GenericDAO<any>; // DAO to use
  route:String; //route name
}

abstract class GenericAPIImplExpress implements GenericAPI {
  constructor(protected route: String, public DAO: GenericDAO<any>) { }

  init(router: express.Router) {
    this.baseRoute(router);
    this.idRoute(router);
    this.moreRoutes(router);
  }
```
[Example Note](test/common/NoteApi.ts)

### Implemetation

```typescript

//Interface for model
export interface Note {
    title: String;
    message: String;
}

//Document
export interface NoteDocument extends Note, mongoose.Document {
}

//DAO
export class NoteDAOImplMongoose extends GenericDAOImplMongoose<Note, NoteDocument>{
    constructor() {
        super(
            "Note", //Name of the model
            new mongoose.Schema({
                title: String,
                message: String
            }) //Mongoose Schema
        );
    }
}

//API
export class NoteApi extends GenericAPIImplExpress {
    constructor() {
        super(
          'notes',//url /api/notes
           new NoteDAOImplMongoose());
    }
}
/****** Endpoints
get      /api/notes      get all
get      /api/notes/:id  get note with id
post     /api/notes/     create note
put      /api/notes/:id  update note with id
delete   /api/notes/:id  delete note with id
***/


//// Example :

//Express app and router
let noteApi = new NoteApi();
noteApi.init(router);


let NoteDAO = new NoteDAOImplMongoose();

NoteDAO.create({
    title: 'Nain Note',
    message: 'This is a message'
})
.then(
    note => {
        //Model created
    }
).catch(
    err=>{
      //OnError
    }
);

```
