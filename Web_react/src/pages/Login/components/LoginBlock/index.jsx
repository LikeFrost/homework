import React, { useState, useEffect } from 'react';
import { Input, Message, Form, Divider, Checkbox, Icon } from '@alifd/next';
import { withRouter, Link } from 'react-router-dom';
import styles from './index.module.scss';
import user from '@/utils/user';
import {createStore} from '@ice/store';
import request from '@/utils/request';
import store from '@/stores/index';
import { createHashHistory } from 'ice';

const history = createHashHistory();

const { Item } = Form;

const DEFAULT_DATA = {
  id: '',
  password: '',
  autoLogin: true,
};

const { useModel } = store;
export default function LoginBlock (
  props = {
    dataSource: DEFAULT_DATA,
  },
) {
  const { dataSource = DEFAULT_DATA } = props;
  const [isLogin, checkLogin] = useState(true);
  const [postData, setValue] = useState(dataSource);
  const [state, dispatchers] = useModel('login');
  const { adminLogin,register } = dispatchers;
  const handleSubmit = (values, errors) =>{
    if(isLogin){
      adminLogin(values);
    }
    else{
      register(values);
    }
  };

  const formChange = values => {
    setValue(values);
  };

  const registerForm = (
    <>
      <Item required requiredMessage="必填">
        <Input name="id" maxLength={20} placeholder="用户名" />
      </Item>
      <Item
        required
        requiredMessage="必填"
        style={{
          marginBottom: 0,
        }}
      >
        <Input.Password name="password" htmlType="password" placeholder="密码" />
      </Item>
    </>
  );
  
  const loginForm = (
    <>
      <Item required requiredMessage="必填">
        <Input name="id" maxLength={20} placeholder="用户名" />
      </Item>
      <Item
        required
        requiredMessage="必填"
        style={{
          marginBottom: 0,
        }}
      >
        <Input.Password name="password" htmlType="password" placeholder="密码" />
      </Item>
    </>
  );

  const byRegister = () => {
    checkLogin(false);
  };

  const byLogin = () => {
    checkLogin(true);
  };

  const text =['登录','注册'];

  return (
    <div className={styles.LoginBlock}>
      <div className={styles.innerBlock}>
        <div className={styles.desc}>
        <span onClick={byLogin} className={isLogin ? styles.active : undefined}>
            登录
          </span>
          <Divider direction="ver" />
          <span onClick={byRegister} className={isLogin ? undefined : styles.active}>
            注册
          </span>
        </div>

        <Form value={postData} onChange={formChange} size="large">
          {isLogin ? loginForm : registerForm}
          <div className={styles.infoLine}>
            <Item
              style={{
                marginBottom: 0,
              }}
            >
              <Checkbox name="autoLogin" className={styles.infoLeft}>
                自动登录
              </Checkbox>
            </Item>
          </div>

          <Item
            style={{
              marginBottom: 10,
            }}
          >
            <Form.Submit
              type="secondary"
              onClick={handleSubmit}
              className={styles.submitBtn}
              validate
            >
              {isLogin? text[0]:text[1]}
            </Form.Submit>
          </Item>
        </Form>
      </div>
    </div>
  );
};
