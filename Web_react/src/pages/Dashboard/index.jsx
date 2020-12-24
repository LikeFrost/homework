import React from 'react';
import { ResponsiveGrid } from '@alifd/next';
import UpPic from './components/UpPic';
import PageHeader from '@/components/PageHeader';

const { Cell } = ResponsiveGrid;

const Dashboard = () => {
  return (
    <ResponsiveGrid gap={20}>
      <Cell colSpan={12}>
      <PageHeader title = '修复图片'/>
      </Cell>
      <Cell colSpan={12}>
        <UpPic />
      </Cell>
      
    </ResponsiveGrid>
  );
};

export default Dashboard;
