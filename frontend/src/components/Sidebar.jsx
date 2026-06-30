import React, { useState } from 'react'
import { BiSearchAlt2 } from 'react-icons/bi'
import OtherUsers from './OtherUsers.jsx'
import axios from 'axios'
import {toast} from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setAuthUser } from '../redux/userSlice.js'

const Sidebar = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();

  const logoutHandler = async () => {
    try {
      const res = await axios.get('http://localhost:9000/api/v1/user/logout', {
        withCredentials:true,
      });

      navigate("/login");
      toast.success(res.data.message);
      dispatch(setAuthUser(null));

    } catch (error) {
      console.log(error);
    }
  }
    
  return (
    <div className='border-r border-slate-500 p-4 flex flex-col'>
      <form onSubmit={(e)=>e.preventDefault()} action="" className='flex items-center gap-2'>
        <input 
        value={search} onChange={(e)=>setSearch(e.target.value)}
        className='input input-bordered rounded-md' type="text" placeholder='Search...' />
        <button type='submit' className='btn bg-zinc-500 text-white'>
          <BiSearchAlt2 className='w-6 h-6 outline-none'/>
        </button>
      </form>
      <div className="divider px-3"></div>

      <OtherUsers search={search}/>

      <div className='mt-3'>
        <button onClick={logoutHandler} className='btn btn-sm '>Logout</button>
      </div>
    </div>
  )
}

export default Sidebar
