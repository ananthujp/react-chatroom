import React,{useState,useEffect} from 'react'
import "./Sidebar.css"
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import SidebarChannel from "./SidebarChannel.js"
import SignalCellularAltIcon from '@material-ui/icons/SignalCellularAlt';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import CallIcon from '@material-ui/icons/Call';
import {Avatar } from '@material-ui/core';
import MicIcon from '@material-ui/icons/Mic';
import HeadsetIcon from '@material-ui/icons/Headset';
import SettingsIcon from '@material-ui/icons/Settings';
import {useSelector} from "react-redux"
import {selectUser} from "./features/userSlice";
import db,{ auth } from './firebase';
import ArrowBackIosIcon from '@material-ui/icons/KeyboardArrowRight';


function Sidebar() {
    const user=useSelector(selectUser)
    const [channels,setChannels] = useState([]);
    const [toggle,setToggle] = useState(false);

    const toggleChannelsList=()=>{
        if(!toggle){
            document.getElementsByClassName("sidebar__channelsList")[0].style.visibility="hidden";
            setToggle(true);
            }else{
            document.getElementsByClassName("sidebar__channelsList")[0].style.visibility="visible";
            setToggle(false);}
    }
    useEffect(() =>{
        db.collection('channels')
        .onSnapshot(snapshot => (setChannels(snapshot.docs.map(doc=>(
        {
            id:doc.id,
            channel:doc.data(),
        }
        )))))
    })
    const handleAddChannel=()=>{
        const channelName = prompt("Enter a new channel name");
        if(channelName) {
            db.collection("channels").add({
                channelName: channelName,
                userAdmin: user.displayName,
            })
        }
    }
    return (
        <div className="sidebar">
            <div className="sidebar__top">
                <h3>Chat Room</h3>
                <ExpandMoreIcon />
            </div>

        <div className="sidebar__channels">
            <div className="sidebar__channelsHeader">
                <div className="sidebar__header" onClick={toggleChannelsList}>
                    {!toggle?<ExpandMoreIcon/>: <ArrowBackIosIcon/> }
                    <h4>Text Channels</h4>
                    <AddIcon onClick={handleAddChannel} className="sidebar__addChannel" />
                </div>
            </div>
                <div className="sidebar__channelsList">
                    {channels.map(({id,channel}) =>
                    <SidebarChannel key={id} id={id} channelName={channel.channelName} admin={channel.userAdmin}/>
                    )}
                </div>
            </div>
            <div className="sidebar__voice">
                <SignalCellularAltIcon 
                    className='sidebar__voiceIcon'
                    fontSize="large"/>
            <div className="sidebar__voiceInfo">
                <h3>Voice Connected</h3>
                <p>Stream</p>
            </div>

            <div className="sidebar__voiceIcons">
                <InfoOutlinedIcon />
                <CallIcon />
            </div>
            
            </div>
            <div className="sidebar__profile">
                <Avatar src={user.photo} onClick={()=>auth.signOut()}/>
                <div className="sidebar__profileInfo">
                    <h3>@{user.displayName}</h3>
                    <p>#{user.uid.substring(0,5)}</p>
                </div>
                <div className="sidebar__profileIcons">
                    <MicIcon />
                    <HeadsetIcon />
                    <SettingsIcon />
                </div>
            </div>
        </div>
    );
}

export default Sidebar
