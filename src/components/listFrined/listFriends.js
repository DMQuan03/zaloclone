import { Select } from 'antd'
import React, { useEffect, useState } from 'react'
import classNames from 'classnames/bind'
import styles from "./fr.module.scss"
import {BsThreeDots} from "react-icons/bs"
import LISTCHAT from './listChat'
import SEARCH from '../search/search'
import axios from 'axios'

const arrtest = [
    1,2,3,4,5,6,7,8,9,10,11,12,13,14,14,15
]


const cx = classNames.bind(styles)
const LISTFRIENDS = () => {

    const {token} = sessionStorage

    const [listFr , setListFr] = useState([])

    useEffect(() => {
        axios({
            method: "get",
            url : "http://localhost:5043/v1/room/getRoom",
            headers : {
                Authorization : `Bearer ${token}`
            }
        })
        .then(res => {
            console.log(res.data)
            console.log(1)
            setListFr(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])
  return (
    <>
        <SEARCH />
        <div className={cx("wrapper")}>
            <div style={{width : 309, marginTop : 50, position : "fixed", backgroundColor : "white", display : "flex", justifyContent : "space-between", textAlign : "center", alignItems : "center"}}>
                <div className={cx("header")}>
                    <div className={cx("header_one")} style={{display : "flex", justifyContent : "space-around", color : "wheat"}}>
                        <div style={{marginLeft : 10}}>Tất cả</div>
                        <div style={{marginLeft : 20}}>Chưa đọc</div>
                    </div>
                <div>
                </div>
                        <div style={{marginLeft : 80, border : "1px solid #333", borderRadius : 8,}}>
                            <Select >
                                <div value="1">1</div>
                                <div value="2">2</div>
                            </Select>
                        </div>
                        <button style={{border : "none", borderRadius : "50%", width : 20 , height : 20, fontSize : "1.2rem"}}><BsThreeDots style={{marginLeft : -5}}/></button>
                </div>
            </div>
            <div style={{width : "100%", height : 85, zIndex : 10}}></div>
            <div className={cx("content")}>
            {listFr?.map((data) => {
                return  <LISTCHAT data={data} />
            })}
            </div>
        </div>
    </>
  )
}

export default LISTFRIENDS