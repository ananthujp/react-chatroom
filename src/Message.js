import React from 'react'
import {Avatar} from "@material-ui/core"
import './Message.css'
import CloseIcon from '@material-ui/icons/Close';
import db from "./firebase"
import {useSelector} from "react-redux"
import { selectUser} from './features/userSlice';

function Message({key_id,channel_id,timestamp,user,message,img}) {
    const userID = useSelector(selectUser);
    const removeMessage= () =>{
        db.collection('channels').doc(channel_id).collection('messages').doc(key_id).delete();
    }
    return (
        <div className="message">
            
            <Avatar src={user.photo}/>
            <div className="message__info">
                <h4> {user.displayName}
                    <span className='message__timestamp'>{new Date(timestamp?.toDate()).toUTCString()}</span>
                </h4>
                {(img)?<img alt="" src={message}/>:<p>{message}</p>}
            </div>
            {(user.displayName===userID.displayName) ?<CloseIcon  onClick={removeMessage} className="hide__btn"/>:<></>}
        </div>
    )
}

export default Message
