import React from 'react'
import classNames from 'classnames/bind'
import styles from "./search.module.scss"
import {AiOutlineUserAdd, AiOutlineUsergroupAdd} from "react-icons/ai"
import {HiUserGroup} from "react-icons/hi"

const cx = classNames.bind(styles)

const SEARCH = () => {
  return (
    <div className={cx("wrapper")}>
        <div className={cx("SEARCH_input")}>
            <span></span>
            <input className={cx("SEARCH_input2")} />
            <label style={{position : "absolute", marginTop : 15, marginLeft : -140, color : "wheat"}}>tìm kiếm</label>
        </div>
        <div style={{fontSize : "1.4rem", marginTop : 15, color : "wheat"}}>
            <AiOutlineUserAdd />
        </div>
        <div style={{fontSize : "1.4rem", marginTop : 15, color : "wheat"}}>
            <HiUserGroup />
        </div>
    </div>
  )
}

export default SEARCH