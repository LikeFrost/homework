import request from '@/utils/request';
import {createStore} from '@ice/store';
import login from './login.store';

const models = {
    login,
} 

const store = createStore(models);

export default store;