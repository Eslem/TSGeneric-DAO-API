import { GenericDAO } from './../persistence';


export interface IGenericAPI {
    route: String;
}



export interface GenericAPI {
    DAO;
    route;
}
