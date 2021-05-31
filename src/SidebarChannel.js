import React from 'react'
import {useDispatch} from "react-redux";
import {setChannelInfo} from "./features/appSlice";
import "./SidebarChannel.css";
import CloseIcon from '@material-ui/icons/Close';
import db from "./firebase"
import {useSelector} from "react-redux"
import { selectUser} from './features/userSlice';

function SidebarChannel({id,channelName,admin}) {
    const userID = useSelector(selectUser);
    const dispatch = useDispatch();
    const removeChannel= () =>{
        db.collection('channels').doc(id).delete();
    }
    return (
        <div className="sidebarChannel" 
        onClick={() =>
         dispatch(
             setChannelInfo({
                channelId:id,
                channelName: channelName,
            })
         )
    }
    >
            <h4><span className='sidebarChannel__hash'>#</span>{channelName}{(admin===userID.displayName) ?<CloseIcon  onClick={removeChannel} className="hide__btn_c"/>:<></>}</h4>
        </div>
    );
}
export default SidebarChannel
