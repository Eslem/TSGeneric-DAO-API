import{ GenericAPIImplExpress } from './GenericAPIImplExpress';
import { NoteDAOImplMongoose } from './../../persistence';

export class NoteApi extends GenericAPIImplExpress{
  constructor(){
    super('notes', new NoteDAOImplMongoose());
  }
}
