import React from 'react';
import { ResponsiveGrid } from '@alifd/next';
import PicList from './components/PicList';
import PageHeader from '@/components/PageHeader';

const { Cell } = ResponsiveGrid;

const HistoryList = () => {
  return (
    <ResponsiveGrid gap={20}>
      <Cell colSpan={12}>
      <PageHeader title ='历史记录'/>
        <PicList />
      </Cell>
    </ResponsiveGrid>
  );
};

export default HistoryList;
