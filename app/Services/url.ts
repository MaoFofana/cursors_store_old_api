import Env from '@ioc:Adonis/Core/Env'

const base = Env.get('HOST');
export const   url = "http://"+base + "/download/";
export const   urlBase = base;