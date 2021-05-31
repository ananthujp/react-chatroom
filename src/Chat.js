import React, { useState, useEffect } from 'react'
import './Chat.css'
import ChatHeader from './ChatHeader.js'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ImageIcon from '@material-ui/icons/Image';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import GifIcon from '@material-ui/icons/Gif';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import Message from "./Message.js"
import {useSelector} from "react-redux"
import { selectChannelId, selectChannelName } from './features/appSlice';
import { selectUser} from './features/userSlice';
import db from "./firebase"
import firebase from "firebase"
import ReactGiphySearchbox from "react-giphy-searchbox";

function Chat() {
    var messagesEnd = React.createRef()
    const user = useSelector(selectUser);
    const channelId = useSelector(selectChannelId);
    const channelName = useSelector(selectChannelName);
    const [input,setInput]=useState("");
    const [imgtoggle,setImgtoggle]=useState(false);
    const [giftoggle,setgiftoggle]=useState(false);
    const [messages,setMessages]=useState([]);
    useEffect(() => {
        if(channelId){
        db.collection('channels').doc(channelId).collection('messages')
        .orderBy('timestamp','asc').onSnapshot((snapshot) =>
            setMessages(snapshot.docs.map((doc)=>({id:doc.id,data:doc.data()}))));
        }
        scrollToBottom();
    }, [channelId])
    const sendMessage = (e) => {
        e.preventDefault();
        db.collection('channels').doc(channelId).collection('messages').add({
            timestamp:firebase.firestore.FieldValue.serverTimestamp(),
            message:input,
            user:user,
            img:imgtoggle,
        })
        setInput("");
        scrollToBottom();
    }
    const imgHandle=()=>{
        (imgtoggle)?setImgtoggle(false):setImgtoggle(true);
    }
    const handleGif=(e)=>{
        db.collection('channels').doc(channelId).collection('messages').add({
            timestamp:firebase.firestore.FieldValue.serverTimestamp(),
            message:e.images.fixed_height.url,
            user:user,
            img:true,
        })
        setgiftoggle(false);
    }
    const scrollToBottom = () => {
        messagesEnd.scrollIntoView({ behavior: "smooth" });
      }
    return (
        <div className="chat">
            <ChatHeader channelName={channelName}/>
            <div className="chat__messages">
           
                {messages.map((message,i)=>
                 <Message 
                    key={message.id}
                    key_id={message.id}
                    channel_id={channelId}
                    timestamp={message.data.timestamp}
                    message={message.data.message}
                    user={message.data.user}
                    img={message.data.img}
                    lm={(parseInt(messages.length)-1)===i?true:false}
                    messagesEnd={messagesEnd}
                />)}
              <div style={{ float:"left", clear: "both",padding: "40px" }}
             ref={(el) => { messagesEnd = el; }}>
             </div>
            </div>
            {giftoggle? <div className="gify__inp">
                <ReactGiphySearchbox
                    apiKey="9Ixlv3DWC1biJRI57RanyL7RTbfzz0o7"
                    onSelect={(item)=>handleGif(item)}
                    masonryConfig={[
                    { columns: 2, imageWidth: 110, gutter: 5 },
                    { mq: "700px", columns: 3, imageWidth: 120, gutter: 5 }
                    ]}
                />
            </div>:<></>}
            <div className="chat__input">
            {(imgtoggle)?<ImageIcon onClick={imgHandle} className="addIcon" fontSize="large"/>:<AddCircleIcon onClick={imgHandle} fontSize="large" className="addIcon"/>}
                <form>
                    <input value={input} disabled={!channelId} onChange={(e) => setInput(e.target.value)} placeholder={(imgtoggle)? 'Image url '+ channelName :  'Message '+ channelName }/>
                    <button className='chat__inputButton' onClick={sendMessage} type='submit'>Send Message</button>
                </form>

                <div className="chat__inputIcons">
                    <CardGiftcardIcon fontSize="large" />
                    <GifIcon onClick={()=> giftoggle?setgiftoggle(false):setgiftoggle(true)} cursor="pointer" fontSize="large" />
                    <EmojiEmotionsIcon fontSize="large" />
                </div>
            </div>
        </div>
    )
}

export default Chat
