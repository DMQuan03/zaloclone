import useSelection from 'antd/es/table/hooks/useSelection'
import React from 'react'
import io from "socket.io-client"
import {FaUserFriends} from "react-icons/fa"
import {TiUserDelete} from "react-icons/ti"
import {BsPersonFillAdd} from "react-icons/bs"
import {MdOutlineFollowTheSigns} from "react-icons/md"

const { token } = sessionStorage
const socket = io.connect("http://localhost:5043", {
    query: {
        token: `${token}`

    }
})
const ADD = ({data}) => {

  const {userId} = sessionStorage

  return (
    <div style={{display : "flex", justifyContent : "space-between", textAlign : "center", alignItems : "center", backgroundColor : "gray", borderRadius : 50 ,marginTop :10, height : 80, width : 300}}>
        <div style={{display : "flex", justifyContent : "center", marginLeft : 10}}>
            <img style={{width : 60 , height : 60 , borderRadius : "50%"}} src={data.avatarUser || 'https://s.yimg.com/fz/api/res/1.2/E8_U9CTKrCg.i6B3a.8zOA--~C/YXBwaWQ9c3JjaGRkO2ZpPWZpbGw7aD0xOTI7cHhvZmY9MDtweW9mZj0wO3E9ODA7dz0xOTI-/https://s.yimg.com/zb/imgv1/90782739-69ee-3c4f-998c-86992715d1af/s_140x140'} />
            <p style={{marginLeft : 10}}>{data.name}</p>
        </div>
        <div style={{marginRight : 10}}>
            {data?.friends.includes(userId) ?  <>
              <button style={{borderRadius : "50%", cursor: "pointer", outline : "none", border : "none"}} onClick={() => {
            }}><FaUserFriends /></button>
            <button style={{marginLeft : 10 ,borderRadius : "50%", cursor: "pointer", outline : "none", border : "none"}}><TiUserDelete /></button>
            </> :
            <>
             <button style={{borderRadius : "50%", cursor: "pointer", outline : "none", border : "none"}} onClick={() => {
              socket.emit("request_add_to_user", { userId : data._id })
            }}><BsPersonFillAdd /></button>
            <button style={{marginLeft : 10 ,borderRadius : "50%", cursor: "pointer", outline : "none", border : "none"}} ><MdOutlineFollowTheSigns /></button>
            </>
            }
        </div>
    </div>
  )
}

export default ADD