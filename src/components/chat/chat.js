import React, { useEffect, useRef, useState } from 'react'
import classNames from 'classnames/bind'
import styles from "./chat.module.scss"
import LISTMESS from './listMess'
import {FaUserFriends} from "react-icons/fa"
import {AiOutlineSearch} from "react-icons/ai"
import {MdOutlineVideoCall, MdOutlineMedicalInformation} from "react-icons/md"
import {BsFillSendFill} from "react-icons/bs"
import { useSelector } from 'react-redux'
import axios from 'axios'
import io from "socket.io-client"
import ScrollToBottom from 'react-scroll-to-bottom'

const cx = classNames.bind(styles)

const test = [
    1,2,2,31,12,23,324,234,234,235,5,32,523,423,42,34,234,234,32,4324,234,342
]

const { token } = sessionStorage
const socket = io.connect("http://localhost:5043", {
    query: {
        token: `${token}`
    }
})

const CHAT = ({data}) => {

    const [textMess , setTextMess] = useState("")
    const [lsMes , setLsMes] = useState([])

    const textRoom = useSelector((state => state.chat.idSearch))
    const {token, userId} = sessionStorage
    const myref = useRef()

    const infoRoom = useSelector(state => state.chat.infoChatRoom)
    sessionStorage.setItem("iforoom" , infoRoom[0]?.idRoom1)

    useEffect(() => {
        const getListMess = () => {
            console.log(infoRoom)
            axios({
                method : "get",
                url : `http://localhost:5043/v1/mess/${infoRoom[0]?.idRoom1}`
            })
            .then(res => {
                setLsMes(res.data)
            })
        }

        getListMess()
    }, [infoRoom])

    useEffect(() => {
        socket.on("return_mess", (data) => {
            const rs = sessionStorage.getItem("iforoom")
          
            if (data.idRoom !== rs)   {
                return 0
            }else {
                setLsMes(prev => [...prev , data])
            }
        })
    }, [socket])

    // useEffect(() => {
    //     socket.emit("join_room", {idRoom : infoRoom[0]?.idRoom1 })
    // }, [infoRoom])

   
    
  return (
    <>
         <div className={cx("wrapper")}>
            <header className={cx("header")}>
                {infoRoom[0]?.idAdmin !== userId ? <div style={{display: "flex"}}>
                    <img style={{width : 60 , height : 60 , borderRadius : "50%", marginLeft : 20}} src={ infoRoom[0]?.avatarUser1 ||"https://s.yimg.com/fz/api/res/1.2/u2OtonYcd3ubFVM8qGHfVA--~C/YXBwaWQ9c3JjaGRkO2ZpPWZpbGw7aD0xOTI7cHhvZmY9MDtweW9mZj0wO3E9ODA7dz0xOTI-/https://s.yimg.com/zb/imgv1/5b198601-6d33-3a25-82df-cc999ca02a07/s_140x140"} alt='A'/>
                    <div style={{marginLeft : 20}}>
                        <div style={{fontWeight : 700, marginTop : 10}}>{infoRoom[0]?.nameUser1}</div>
                        <div style={{fontWeight : 400}}>number acc</div>
                    </div>
                </div> : 
                <div style={{display: "flex"}}>
                    <img style={{width : 60 , height : 60 , borderRadius : "50%", marginLeft : 20}} src={ infoRoom[0]?.avatarUser2 ||"https://s.yimg.com/fz/api/res/1.2/u2OtonYcd3ubFVM8qGHfVA--~C/YXBwaWQ9c3JjaGRkO2ZpPWZpbGw7aD0xOTI7cHhvZmY9MDtweW9mZj0wO3E9ODA7dz0xOTI-/https://s.yimg.com/zb/imgv1/5b198601-6d33-3a25-82df-cc999ca02a07/s_140x140"} alt='A'/>
                    <div style={{marginLeft : 20}}>
                        <div style={{fontWeight : 700, marginTop : 10}}>{infoRoom[0]?.nameUser2}</div>
                        <div style={{fontWeight : 400}}>number acc</div>
                    </div>
                </div> 
                }
                <div style={{display : "flex", justifyContent : "space-around", fontSize : "1.8rem"}}>
                    <div style={{marginRight : 20, marginTop : 2}}><FaUserFriends /></div>
                    <div style={{marginRight : 20, fontSize : "1.8rem", marginTop : 2}}><AiOutlineSearch /></div>
                    <div style={{marginRight : 20,fontSize : "2rem"}}><MdOutlineVideoCall /></div>
                    <div style={{marginRight : 20,fontSize : "1.8rem"}}><MdOutlineMedicalInformation style={{color : "blanchedalmond"}} /></div>
                </div>
            </header>
            <ScrollToBottom className={cx("scr_bt")}>
                <main className={cx("main_chat")}>
                {lsMes?.map((ms) => {
                    if(ms.idUser === userId) {
                        var id = "YOU"
                    }else {
                        var id = "OTHER"
                    }
                    return <LISTMESS id={id} data={ms} />
                })}
                </main>
            </ScrollToBottom>
            <div className={cx("input_text")}>
            <div className={cx("input_text2")}>
                <input type='file' />
            </div>
                <div className={cx("input_text1")}>
                <input ref={myref} value={textMess} className={cx("input_styles")} onChange={(e) => {
                    setTextMess(e.target .value)
                }} />
                <label style={{position : "absolute", color : "wheat", marginTop : -5}}>bạn đang nghĩ gì ...</label>
                <button style={{position : "absolute", right : 25, width : 40, marginTop : 10, display : "flex", justifyContent : "center"}}
                    onClick={() => {
                        socket.emit("send_mess", {text : textMess, idRoom : infoRoom[0].idRoom1})
                        setTextMess("")
                        myref.current.focus()
                    }}
                    
                ><BsFillSendFill /></button>
                </div>
            </div>
        </div>
    </>
  )
}

export default CHAT