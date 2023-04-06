import React from 'react'
import classNames from 'classnames/bind'
import styles from "./listmess.module.scss"
import { format } from 'timeago.js'

const cx = classNames.bind(styles)

const LISTMESS = ({data, id}) => {
  return (
    <div id={cx(id)} className={cx("wrapper")}>
        <div id={cx(id)} className={cx("mess")}>
            <div id={cx(id)} className={cx("info_user")}>
                <img id={cx(id)} className={cx("info_user1")} src={  data.avatarUser  ||'https://s.yimg.com/fz/api/res/1.2/u2OtonYcd3ubFVM8qGHfVA--~C/YXBwaWQ9c3JjaGRkO2ZpPWZpbGw7aD0xOTI7cHhvZmY9MDtweW9mZj0wO3E9ODA7dz0xOTI-/https://s.yimg.com/zb/imgv1/5b198601-6d33-3a25-82df-cc999ca02a07/s_140x140'} />
                <div id={cx(id)} className={cx("name_user")}>{data.username}</div>
            </div>
            <div id={cx(id)} className={cx("info_mess")}>
                <div id={cx(id)} className={cx("info_mess1")}>
                    <p>{data.text}</p>
                </div>
                <div id={cx(id)} className={cx("time_send")}>{format(data.createdAt)}</div>
            </div>
        </div>
    </div>
  )
}

export default LISTMESS