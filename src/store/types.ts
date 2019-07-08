import { ITemplatesState } from '../models/template-model/redux/reducers';

export type Dispatch<T> = (action: T) => void;
export type getState = () => IStore;

export interface IStore {
    readonly templates: ITemplatesState,
}
