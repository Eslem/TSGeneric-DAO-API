# TSGeneric-DAO-API

Generics Classes for DAO and API with Typescript (Mongoose, Express)

## Classes

- GenericDAO: DAO functions (CRUD).
- GenericDAOImplMongoose: implementation of GenericDAO for Mongoose.

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

### Implemetation

```typescript

//POJO
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


//***** Example :
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
