import React, { useState } from 'react'
import io from "socket.io-client"
import {MdPersonAddAlt1} from "react-icons/md"
import {AiFillCheckCircle} from "react-icons/ai"
import classNames from 'classnames/bind'
import styles from "./res.module.scss"

const cx = classNames.bind(styles)


const { token } = sessionStorage

const socket = io.connect("http://localhost:5043", {
    query: {
        token: `${token}`
    }
})

const RESPONE = ({data}) => {

  const [addSuccess , setAddSucess] = useState(false)
  return (
    <div style={{display : "flex", justifyContent : "space-between", textAlign : "center", alignItems : "center", backgroundColor : "gray", borderRadius : 50 ,marginTop :10, height : 80, marginTop : 20, width : 300}}>
        <div style={{display : "flex", justifyContent : "center", marginLeft : 10}}>
            <img style={{width : 60 , height : 60 , borderRadius : "50%"}} src={ data?.avatarUser || 'https://s.yimg.com/fz/api/res/1.2/E8_U9CTKrCg.i6B3a.8zOA--~C/YXBwaWQ9c3JjaGRkO2ZpPWZpbGw7aD0xOTI7cHhvZmY9MDtweW9mZj0wO3E9ODA7dz0xOTI-/https://s.yimg.com/zb/imgv1/90782739-69ee-3c4f-998c-86992715d1af/s_140x140'} />
            <p style={{marginLeft : 10}}>{data?.username}</p>
        </div>
        <div style={{marginRight : 10,borderRadius : "50%"}}>
            <button style={{marginRight : 10,borderRadius : "50%", border : 'none', outline : "none", width : 20 , height : 20, display : 'flex', justifyContent : "center", alignItems : "center"}} onClick={() => {
              socket.emit("add_fr", { userId : data?.idUser , id : data?._id, avatarUser2 : data?.avatarUser, username : data?.username})
              setAddSucess(true)
            }}>{addSuccess ? <p className={cx("anmsforIcons")} style={{fontSize : "1rem", marginTop : 20}}><AiFillCheckCircle /></p> : <span ><MdPersonAddAlt1 /></span>}</button>
        </div>
    </div>
  )
}

export default RESPONE