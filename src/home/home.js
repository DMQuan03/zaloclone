import React, { Fragment, useEffect, useState } from 'react'
import classNames from 'classnames/bind'
import styles from "./home.module.scss"
import {BsMessenger,BsFillCheckSquareFill} from "react-icons/bs"
import {RiContactsBookFill} from "react-icons/ri"
import {AiOutlineCloud, AiFillSetting} from "react-icons/ai"
import {GiDiscGolfBag} from "react-icons/gi"
import SEARCH from '../components/search/search'
import LISTFRIENDS from '../components/listFrined/listFriends'
import CHAT from '../components/chat/chat'
import FRIENDS from '../addfriens/fr'
import RESPONE from '../addfriens/respone'
import { io } from 'socket.io-client'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const arr = [
    1,2,2,3,3,5,4,4,4,5,5,6
]

const { token } = sessionStorage
const socket = io.connect("http://localhost:5043", {
    query: {
        token: `${token}`
    }
})

const cx= classNames.bind(styles)
const HOME = () => {
    const navigate = useNavigate()
    const {avatar, token} = sessionStorage
    const user = useSelector(state => state.auth.currentUser)

    const [check1 , setCheck1] = useState(true)
    const [check2 , setCheck2] = useState(false)
    const [check3 , setCheck3] = useState(false)
    const [listRequest , setListRequest]= useState([])
    
    useEffect(() => {
        socket.on("server_return_a_request", (data) => {
            console.log(data)
            setListRequest(prev => [...prev , data])
        })
    }, [socket])

    useEffect(() => {
        axios({
            method : "get",
            url : "",
            data : {

            }
        })
    }, [])

    useEffect(() => {
        axios({
            method : "get",
            url : "http://localhost:5043/v1/awaitAdd/",
            headers : {
                authorization : `Bearer ${token}`
            }
        })
        .then(res => {
            setListRequest(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    useEffect(() => {
        const { jwtOfClient } = sessionStorage

        if (jwtOfClient !== "asdasdhasgdjgsadashgdhsadghasgdsagdhasdgasdghasdglsjdakjdkaj123ghjgdsadhjqg3439ast79stasd" ) {
            navigate("/")
        }
    }, [])

    

  return (
    <div className={cx("wrapper")}>
        <nav className={cx("HOME_nav")}>
        <div>
            <img style={{width : 50 , height : 50, marginTop : 20, borderRadius : "50%"}} src={avatar || 'https://s.yimg.com/fz/api/res/1.2/sje.bKiGuvtlrGatTmAlAg--~C/YXBwaWQ9c3JjaGRkO2ZpPWZpbGw7aD0xOTI7cHhvZmY9MDtweW9mZj0wO3E9ODA7dz0xOTI-/https://s.yimg.com/zb/imgv1/2b016765-8fd2-3fbd-8e0c-cd0f62929ce0/s_140x140'} />
        </div>
            <div className={cx("HOME_nav2")}>
                <div onClick={() => {
                    setCheck1(true)
                    setCheck2(false)
                    setCheck3(false)
                }}><BsMessenger /></div>
                <div onClick={() => {
                    setCheck1(false)
                    setCheck2(true)
                    setCheck3(false)
                }}><RiContactsBookFill /></div>
                <div style={{fontSize : "1.6rem"}} onClick={() => {
                    setCheck1(false)
                    setCheck2(false)
                    setCheck3(true)
                }}><BsFillCheckSquareFill /></div>
            </div>
            <div className={cx("HOME_nav3")}>
                <div><AiOutlineCloud /></div>
                <div><GiDiscGolfBag /></div>
                <div><AiFillSetting /></div>
            </div>
        </nav>
        <main className={cx("HOME_main")}>
            <div>
                {check1 ? <LISTFRIENDS /> : <Fragment />}
                {check2 ? <FRIENDS /> : <Fragment />}
                {check3 ? 
                listRequest.map((res) => {
                    return <RESPONE data={res} /> 
                })
                
                
                : <Fragment />}
            </div>
        </main>
        <div className={cx("HOME_content")}>
            <CHAT />
        </div>
    </div>
  )
}

export default HOME