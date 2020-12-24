import React from 'react';
import {Tab, Upload} from '@alifd/next';
import styles from './index.module.scss'
import axios from 'axios';
import user from '@/utils/user';
const qs = require('qs');
import {Table} from '@alifd/next';
import {useState ,useEffect} from 'react';
import Base64Downloader from 'react-base64-downloader';

function PicList () {
    const [data,setData] =useState();
    useEffect(()=>{axios.post(`http://127.0.0.1:8000/api/picture/history`,qs.stringify({id:user.getUserRole()})).then(res=>{
        setData(res.data.data)
        })
      }, []);
    const renderOp = value => {
        return(
            <div>
                <Base64Downloader base64 = {value} downloadName="origin" className ={styles.btn}>
                    DownLoad
                </Base64Downloader>
            </div>
        )
    }
    return(
        <div className = {styles.list}>
            <Table dataSource = {data} isZebra = {true} hasBorder = {true} className = 'beauty' align='center'>
                <Table.Column title = '用户' dataIndex = "parent" align='center'/>
                <Table.Column title = '上传时间' dataIndex = 'time' align='center'/>
                <Table.Column title ='文件名称' align='center' dataIndex = 'name'/>
                <Table.Column title = '操作' align='center' dataIndex = 'imgURL' cell = {renderOp}/>
            </Table>
        </div>
    )
}

export default PicList;