import { GenericDAO } from './../persistence';


export interface IGenericAPI {
    route: String;
}

export interface GenericAPI {
    DAO:GenericDAO<any>;
    route:String;
}
