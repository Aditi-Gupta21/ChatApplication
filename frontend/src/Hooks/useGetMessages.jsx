import React, { useEffect } from 'react'
import axios from 'axios'
import {useSelector} from 'react-redux'

const useGetMessages = () => {
  const {selectedUser} = useSelector((store)=> store.user);
  
  useEffect(()=>{
    if(!selectedUser) return;

    const fetchMessages = async () =>{
      try {
        axios.defaults.withCredentials = true
        const res = await axios.get(`http://localhost:9000/api/v1/message/${selectedUser?._id}`);

        console.log(res);
        
      } catch (error) {
        console.log(error);
      }
    }

    fetchMessages();
  },[selectedUser])
}

export default useGetMessages
