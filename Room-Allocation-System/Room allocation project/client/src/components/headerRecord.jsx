//semini's header

import React from 'react'
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from '../redux/user/userSlice';

export default function headerRecord() {
    return (
        <div className="bg-black  ">
          <div className="flex flex-col md:flex-row justify-between items-center max-w-6xl mx-auto p-4">
            
            <ul className="flex flex-col md:flex-row gap-2 md:gap-4 mt-2 md:mt-0">
              
              
              
                
             
             
            </ul>
          </div>
        </div>
  )
}
