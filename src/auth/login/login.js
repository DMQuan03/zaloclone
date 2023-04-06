import React, { useState } from 'react'
import classNames from 'classnames/bind'
import styles from "./login.module.scss"
import { Link, useNavigate } from 'react-router-dom'
import { Col } from 'antd'
import { MdPhonelinkLock } from "react-icons/md"
import { AiFillLock,AiFillPicture } from "react-icons/ai"
import {BsPersonFillLock} from "react-icons/bs"
import axios from 'axios'
import { useDispatch } from 'react-redux'
import UserSlice from "../../redux/Slice/sliceUser"
const cx=classNames.bind(styles)

const LOGIN = () => {

  const navigate = useNavigate()

  const dispatch = useDispatch()

  // register user
  const [userRegister , setUserRegister] = useState("")
  const [passwordRegister , setPasswordRegister] = useState("")
  const [phoneRegister , setPhoneRegister] = useState("")
  const [imgRegister , setImgRegister] = useState("")
  
  // login user

  const [userLogin , setUserLogin] = useState("")
  const [passwordLogin , setPasswordLogin] = useState("")
  const SubmitRegisterUser = async() => {
    try {
      await axios({
        method : "post",
        url : "http://localhost:5043/v1/auth/register",
        data : {
          username : userRegister,
          password : passwordRegister,
          phone : Math.floor(phoneRegister),
          name : userRegister,
          avatar : imgRegister
        }
      })
      .then(res => {
        setLogin(true)
        setUserRegister("")
        passwordRegister("")
        phoneRegister("")
      })

    } catch (error) {
      console.log(error)
    }
  }

  
  const loginUser = async() => {
    const user = await {
      username : userLogin,
      password : passwordLogin
    }

    await axios({
      method : "post",
      url : "http://localhost:5043/v1/auth/login",
      data : user
    })
    .then(res => {
      const anynomous = "asdasdhasgdjgsadashgdhsadghasgdsagdhasdgasdghasdglsjdakjdkaj123ghjgdsadhjqg3439ast79stasd"
      sessionStorage.setItem("jwtOfClient", anynomous)
      sessionStorage.setItem("username", res.data.name)
      sessionStorage.setItem("userId", res.data._id)
      sessionStorage.setItem("avatar", res.data.avatarUser)
      sessionStorage.setItem("token", res.data.accessToken)
      dispatch(UserSlice.actions.loginSuccess(res.data))
      navigate("/home")
    })
    .catch(err => {
      console.log(err)
    })


  }



  const [loginWithUser , setLoginWithUser] = useState(true)
  const [login , setLogin ] = useState(true)
  return (
    <div className={cx("wrapper")}>
        <div className={cx("LOGIN_container")}>
          <header className={cx("LOGIN_header")}>
            <h1>Zalo</h1>
          </header>
          <div className={cx("LOGIN_title")}>
            <h6 className={cx("LOGIN_title1")} >Đăng Nhập Bằng Tài Khoản ZALO</h6>
            <h6 className={cx("LOGIN_title2")}>chat.zalo.me</h6>
          </div>
          {login ? <main className={cx("LOGIN_main")}>
            <div  className={cx("LOGIN_main1")}>
              <div className={cx("LOGIN_main1_1")} style={{width : "50%", marginTop : 10}}>
                VỚI SỐ ĐIỆN THOẠI
              </div>
              <label style={{position : "absolute"}} />
              <div className={cx("LOGIN_main1_2")} style={{width : "50%", marginTop : 10}}>
                VỚI MÃ QR
              </div>
              <label />
            </div>
                  {loginWithUser ?
                   <div className={cx("LOGIN_main2")}>
                  <div className={cx("LOGIN_main2_input")}>
                    <span style={{position : "absolute" , marginLeft : -280, marginTop : 5}}><BsPersonFillLock /></span>
                    <input value={userLogin} className={cx("LOGIN_main2_input_one")} onChange={(e) => {
                      setUserLogin(e.target.value)
                    }}/>
                    <label style={{marginLeft : 0}} className={cx("LOGIN_label")}>username</label>
                  </div>
    
                  <div className={cx("LOGIN_main2_input")}>
                    <span style={{position : "absolute" , marginLeft : -280, marginTop : 5}}><AiFillLock /></span>
                    <input value={passwordLogin} className={cx("LOGIN_main2_input_one")} onChange={(e) => {
                      setPasswordLogin(e.target.value)
                    }} />
                    <label className={cx("LOGIN_label")}>password</label>
                  </div>
                </div>
                   
                     : 
                <div className={cx("LOGIN_main2")}>
                  <div className={cx("LOGIN_main2_input")}>
                    <span style={{position : "absolute" , marginLeft : -280, marginTop : 5}}><MdPhonelinkLock /></span>
                    <input className={cx("LOGIN_main2_input_one")} />
                    <label style={{marginLeft : -20}} className={cx("LOGIN_label")}>Phone</label>
                  </div>
    
                  <div className={cx("LOGIN_main2_input")}>
                    <span style={{position : "absolute" , marginLeft : -280, marginTop : 5}}><AiFillLock /></span>
                    <input className={cx("LOGIN_main2_input_one")} />
                    <label className={cx("LOGIN_label")}>password</label>
                  </div>
                </div>}
                {loginWithUser ? 
                  <div  className={cx("LOGIN_main3")}>
                  <button className={cx("LOGIN_main3_btn")} onClick={() => {
                    setLoginWithUser(false)
                  }}>Đăng nhập số điện thoại</button>
                </div>
                
                :<div  className={cx("LOGIN_main3")}>
                  <button className={cx("LOGIN_main3_btn")} onClick={() => {
                    setLoginWithUser(true)
                  }}>Đăng nhập với mật khẩu</button>
                </div>}
                <div  className={cx("LOGIN_main4")}>
                  <button className={cx("LOGIN_main4_btn")} onClick={loginUser} >gửi yêu cầu đăng nhập</button>
                </div>
                <div className={cx("LOGIN_main5")}>
                  <div className={cx("LOGIN_main5_1")}><Link style={{textDecoration : "none", color : "black"}}>quên mật khẩu</Link></div>
                  <div className={cx("LOGIN_main5_2")}><p>đăng nhập bằng facebook</p></div>
                </div>

          </main> : 
          <main style={{height : 400}} className={cx("LOGIN_main")}>
                  <div className={cx("LOGIN_main2")}>
                    <div  className={cx("LOGIN_main2_input")}>
                      <span style={{position : "absolute" , marginLeft : -280, marginTop : 45}}><BsPersonFillLock /></span>
                      <input value={userRegister} style={{marginTop : 40}} className={cx("LOGIN_main2_input_one")} onChange={(e) => {
                        setUserRegister(e.target.value)
                      }}/>
                      <label style={{marginLeft : 0, marginTop : 40}} className={cx("LOGIN_label")}>username</label>
                    </div>
    
                  <div className={cx("LOGIN_main2_input")}>
                    <span style={{position : "absolute" , marginLeft : -280, marginTop : 5}}><AiFillLock /></span>
                    <input value={passwordRegister} className={cx("LOGIN_main2_input_one")} onChange={(e) => {
                      setPasswordRegister(e.target.value)
                    }}/>
                    <label className={cx("LOGIN_label")}>password</label>
                  </div>
                  <div className={cx("LOGIN_main2_input")}>
                    <span style={{position : "absolute" , marginLeft : -280, marginTop : 5}}><MdPhonelinkLock /></span>
                    <input value={phoneRegister} className={cx("LOGIN_main2_input_one")}  onChange={(e) => {
                      setPhoneRegister(e.target.value)
                    }}/>
                    <label style={{marginLeft : -20}} className={cx("LOGIN_label")}>Phone</label>
                  </div>
                  <div className={cx("LOGIN_main2_input")}>
                    <span style={{position : "absolute" , marginLeft : -280, marginTop : 5}}><AiFillPicture /></span>
                    <input value={imgRegister} className={cx("LOGIN_main2_input_one")}  onChange={(e) => {
                      setImgRegister(e.target.value)
                    }}/>
                    <label style={{marginLeft : -20}} className={cx("LOGIN_label")}>avatar</label>
                  </div>
                </div>
                  <div  className={cx("LOGIN_main3")}>
                  <button className={cx("LOGIN_main3_btn")} onClick={SubmitRegisterUser}>Đăng Ký</button>
                </div>

                <div className={cx("LOGIN_main5")}>
                  <div className={cx("LOGIN_main5_1")}><Link style={{textDecoration : "none", color : "black"}}>quên mật khẩu</Link></div>
                  <div className={cx("LOGIN_main5_2")}><p>đăng nhập bằng facebook</p></div>
                </div>

          </main>
           }
          {login ? <footer className={cx("LOGIN_footer")}>Bạn chưa có tài khoản ? <Link style={{textDecoration : "none"}} onClick={() => {
            setLogin(false)
          }} >đăng ký ngay</Link></footer>
          :
          <footer className={cx("LOGIN_footer")}>Bạn đã có tài khoản ? <Link style={{textDecoration : "none"}} onClick={() => {
            setLogin(true)
          }} >đăng nhập tại đây</Link></footer>
          }
        </div>
    </div>
  )
}

export default LOGIN