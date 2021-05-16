import React,{useEffect} from 'react';
import {useSelector,useDispatch} from "react-redux"
import Sidebar from "./Sidebar.js"
import Chat from './Chat.js'
import Login from "./Login.js"
import './App.css';
import { auth } from './firebase.js';
import {selectUser,login,logout} from "./features/userSlice"
function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    auth.onAuthStateChanged((authUser)=> {
      if(authUser){
          dispatch(
            login({
            uid: authUser.uid,
            photo: authUser.photoURL,
            email: authUser.email,
            displayName:authUser.displayName,
          }));
      }else{
        dispatch(
          logout());
      }
    })
  }, [dispatch])
  return (
    <div className="app">
      {user ? (
        <>
          <Sidebar />
          <Chat />
        </>
      ):(
          <Login />
      )}
      

    </div>
  );
}

export default App;
