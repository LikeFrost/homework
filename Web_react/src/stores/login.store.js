import request from '@/utils/request';
import {createStore} from '@ice/store';
import Url from '@/utils/appConfig';
import axios from 'axios';
import user from '@/utils/user';
const qs = require('qs');
import { createHashHistory } from 'ice';
import { Message } from '@alifd/next';

const history = createHashHistory();

const login = {
    state:0,
    dataSource:[],
    effects:() => ({
        async adminLogin(props){
            try{
                await axios.post(`http://127.0.0.1:8000/api/user/login`,qs.stringify({
                   id:props.id,
                   password:props.password
                })).then(res=>{
                    if(res.data.code == 200){
                        user.saveUserRoleToCookie(props.id);
                        Message.success('登录成功');
                        history.push('/home');
                    }
                    if(res.data.code == 201){
                        Message.error('密码错误，请重新输入');
                    }
                    if(res.data.code == 202){
                        Message.error('用户不存在，请核对');
                    }
                })
            }catch(e){
                console.log(e);
                console.log('adminLogin error');
            }
        },
        async register(props){
            try{
                await axios.post(`http://127.0.0.1:8000/api/user/register`,qs.stringify({
                   id:props.id,
                   password:props.password
                })).then(res=>{
                    if(res.data.code == 200){
                        Message.success('注册成功，已自动登录');
                        history.push('/home');
                    }
                    if(res.data.code == 202){
                        Message.error('该用户名存在')
                    }
                })
            }catch(e){
                console.log('Register error');
            }
        },
    })
}

export default login;