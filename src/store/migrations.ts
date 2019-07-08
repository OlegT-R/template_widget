import { IStore } from './types';

export const migrations: any = {
  2: (store: IStore): IStore => ({
    ...store,
    templates: {},
  }),
};
