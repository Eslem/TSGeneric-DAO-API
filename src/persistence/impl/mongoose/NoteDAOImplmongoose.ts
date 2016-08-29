import{GenericDAOImplMongoose} from './GenericDAOImplMongoose';
import * as mongoose from 'mongoose';
import { Note } from '../../../dommain/Note';

export interface NoteDocument extends Note, mongoose.Document{

}

export class NoteDAOImplMongoose extends GenericDAOImplMongoose<Note, NoteDocument>{
  modelName="Note";
  modelSchema= new mongoose.Schema({
    title:String,
    message:String
  })
}