import React from 'react';
import { ResponsiveGrid } from '@alifd/next';
import LoginBlock from './components/LoginBlock';
import store from '@/stores/index';

const { Cell } = ResponsiveGrid;
const {Provider} = store;

function Login () {
  return(
    <Provider>
      <ResponsiveGrid gap={20}>
        <Cell colSpan={12}>
          <LoginBlock />
        </Cell>
    </ResponsiveGrid>
    </Provider>
  )
};
export default Login;
