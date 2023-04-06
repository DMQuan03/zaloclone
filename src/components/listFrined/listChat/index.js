import React, { useEffect, useState } from 'react'
import classNames from 'classnames/bind'
import styles from "./listchat.module.scss"
import { useDispatch, useSelector } from 'react-redux'
import chatslice from '../../../redux/Slice/chatslice'
import axios from 'axios'
import { io } from 'socket.io-client'
const cx = classNames.bind(styles)

const { token } = sessionStorage
const socket = io.connect("http://localhost:5043", {
    query: {
        token: `${token}`
    }
})

const LISTCHAT = ({data}) => {

    const dispatch = useDispatch()
    const {token} = sessionStorage
    const listROOM = useSelector(state => state.chat.infoChatRoom)

    const [check12 , setCheck12 ] = useState(false)

    const [idRooms , setIdRoom] = useState("")
    const { avatar, username, iforoom } = sessionStorage

    useEffect(() => {
        axios({
            method : "GET",
            url : `http://localhost:5043/v1/room/getdataRoom/${idRooms}`,
            headers : {
                authorization : `Bearer ${token}`
            }
        })
        .then(res => {
                dispatch(chatslice.actions.getRoomSucees(res.data))
        })
    } , [idRooms, check12])

    useEffect(() => {
        console.log(listROOM)
    }, [])

  return (
        <div className={cx("chat_info")} style={{display : "flex", justifyContent : "space-between", textAlign: "center", alignItems : "center"}}  >
            <div>
                {data.avatarUser1 !== avatar ? 
                <div onClick={ () => {
                     socket.emit("join_room", { idRoom : iforoom })
                        setIdRoom(data._id)
                        setCheck12(!check12)
                    }}>
                <img style={{width : 50 , height : 50, borderRadius : "50%", marginLeft : 20}} src={data?.avatarUser1 ||'https://s.yimg.com/fz/api/res/1.2/pZJMXHCpZ20d6ZupV_6qZQ--~C/YXBwaWQ9c3JjaGRkO2ZpPWZpbGw7aD0xOTI7cHhvZmY9MDtweW9mZj0wO3E9ODA7dz0xOTI-/https://s.yimg.com/zb/imgv1/8aa6904a-6852-33ea-bc36-ddd8c57fb8db/s_140x140'} alt='a' 
                    
                 /> 
                 </div> 
                 : 
                  <div
                  onClick={ () => {

                         socket.emit("join_room", { idRoom : iforoom})
                        setIdRoom(data._id)
                        setCheck12(!check12)

                    }}
                    ><img style={{width : 50 , height : 50, borderRadius : "50%", marginLeft : 20}} src={data?.avatarUser2 ||'https://s.yimg.com/fz/api/res/1.2/pZJMXHCpZ20d6ZupV_6qZQ--~C/YXBwaWQ9c3JjaGRkO2ZpPWZpbGw7aD0xOTI7cHhvZmY9MDtweW9mZj0wO3E9ODA7dz0xOTI-/https://s.yimg.com/zb/imgv1/8aa6904a-6852-33ea-bc36-ddd8c57fb8db/s_140x140'} alt='a' 
                 /></div>
                 }
            </div>
            <div>
                {data.nameUser1 !== username ? <div  style={{marginLeft : -380, marginTop : 20}} ><h3>{data?.nameUser1}</h3></div>
                :
                <div  style={{marginLeft : -380, marginTop : 20}} ><h3>{data?.nameUser2}</h3></div>
                }
                <div  style={{marginLeft : -380, marginTop : -20}} ><p> dang lam gi the</p></div>
            </div>
        </div>
  )
}

export default LISTCHAT