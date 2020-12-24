import React from 'react';
import styles from './index.module.scss';

export default function Footer() {
  return (
    <p className={styles.footer}>
      <span className={styles.logo}>Designed by ZhaoLihua</span>
      <br />
      <span className={styles.copyright}>© 2020-现在 数据结构与数据库课程设计</span>
    </p>
  );
}
