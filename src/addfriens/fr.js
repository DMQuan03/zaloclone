import React, { useEffect, useState } from 'react'
import classNames from 'classnames/bind'
import styles from "./addfr.module.scss"
import ADD from './add'
import axios from 'axios'

const cx = classNames.bind(styles)
const ADDFRIEND = () => {

  const [searchText ,setSearchText] = useState("")
  const [listUser , setListUser] =useState([])

  const handleSearchtext = () => {
    axios({
      method: "get",
      url : 'http://localhost:5043/v1/auth/search?q=' +searchText
    })
    .then(res => {
      setListUser(res.data)
      setSearchText("")
    })
  }

  useEffect(() => {
    console.log(listUser)
  }, [searchText])
  return (
    <div style={{color : "black", marginTop : 60}}>
        <div className={cx("input_search")}>
            <input value={searchText} className={cx("input_text")} onChange={(e) => {
              setSearchText(e.target.value)
            }} />
            <label style={{position : "absolute", marginLeft : -130, marginTop : 5}}>tìm kiếm ...</label>
            <button onClick={handleSearchtext} >search</button>
        </div>
        <div>
            {listUser?.map((us) => {
              return <ADD key={us._id} data={us}/>
            })}
        </div>
    </div>
  )
}

export default ADDFRIEND