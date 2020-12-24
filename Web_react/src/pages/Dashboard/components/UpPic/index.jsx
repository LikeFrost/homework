import { Upload, Button } from '@alifd/next';
import React from 'react';
import styles from './index.module.scss'
import {useState, useEffect} from 'react';
import user from '@/utils/user';
import {Loading} from '@alifd/next';
import { ResponsiveGrid } from '@alifd/next';
import axios from 'axios';
import Img from '@icedesign/img';
import Base64Downloader from 'react-base64-downloader';

const { Cell } = ResponsiveGrid;

const DEFAULT_DATA=[
    {
        name:'',
    }
]

const getDate = ()=>{
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
     }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    console.log(currentdate)
    return currentdate;
}

const props = {
    listType:"text",
    action:"http://127.0.0.1:8000/api/picture",
    accept:"image/png, image/jpg, image/jpeg, image/gif, image/bmp",
    data:{
        parent: user.getUserRole(),
        state:'done',
        date:getDate(),
    },
    method:'post'
}

function UpPic  () {
    //const [lvis, setVisL] = useState(false);
    const [pvis, setVisP] = useState('none');
    const [lvis, setVisL] = useState('block');
    const [base_64, setBase64] = useState('qwdw');
    const [loading, setLoading] = useState(true);
    return(
        <div>
            <ResponsiveGrid gap={20}>
            <Cell colSpan = {5} className={styles.div_upload} >
            <Upload.Dragger
            className={styles.upload}
            onDragOver={onDragOver}
            onDrop={onDrop}
            {...props}
            withCredentials={false}
            onChange = {onChange}
           />
            </Cell>
            <Cell colSpan={7} className = {styles.pic}>
            <Loading style={{display: lvis}} visible = {loading}>
                <div className={styles.demo}></div>
            </Loading>
            <div style={{display: pvis}}>
                <div className={styles.img}>
                    <img className={styles.img} src= {base_64} alt = 'pic'/>
                </div>
                <Base64Downloader base64 = {base_64} downloadName="repair" className ={styles.btn}>
                    DownLoad
                </Base64Downloader>
            </div>
        </Cell>
        </ResponsiveGrid>
        </div>
    )
    function onChange(){
        setTimeout(()=>{
            setVisP('block');
            setVisL('none');
            setLoading(false);
            axios.get(`http://127.0.0.1:8000/api/picture`,).then(res=>{
                setBase64('data:image/jpg;base64,'+res.data);
            })
        },1000);
       
        console.log(111)
    }
}

function onDragOver() {
    console.log('dragover callback');
}

function onDrop(fileList) {
    console.log('drop callback : ', fileList);
}

export default UpPic;