import logo from '../../assets/logo-round.png';
import avatar from '../../assets/avatar.png';
import { HomeIcon } from '../../assets/icons/home';
import { TicketIcon } from '../../assets/icons/ticket';
import { FindIcon } from '../../assets/icons/find';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { useContext } from '../../context/context';
import React from 'react';

const Tab = ({ text, active, onClick }) => {  
  return (
    <div className={`text-${active ? 'primary' : 'neutral-50'} mt-2 mx-8 text-3xl hover:cursor-pointer hidden md:block`} onClick={onClick}>
      {text}
    </div>
  );
}

const IconButton = ({ Icon, active, onClick }) => {  
  return (
    <div className={`text-${active ? 'primary' : 'neutral-50'} mt-2 mx-2 text-3xl hover:cursor-pointer`} onClick={onClick}>
      {Icon}
    </div>
  );
}

export const Navigation = ({ children }) => {
  const { user, clearToken, page, setPage } = useContext();

  const logout = () => {
    clearToken();
    window.location.reload();
  }
  
  return (
    <>
      <div className="sticky h-14 -mb-14 flex top-0 bg-black/75 shadow-md z-10 justify-between">
        <img src={logo} onClick={() => console.log('logo clicked')} className="h-14 hover:cursor-pointer" alt="logo" />
        <div className='flex w-full justify-end'>
          <Tab active={page === 0} text="Home" onClick={() => setPage(0)}/>
          { user.accessLevel > 0 && <Tab active={page === 1} text="My events" onClick={() => setPage(1)}/> }
          <Tab active={page === 2} text="Find events" onClick={() => setPage(2)}/>
        </div>
        <Popover className="relative">
          <PopoverButton className="h-14 w-14 outline-none"><img src={user.picture || avatar} className="h-14 rounded-full hover:cursor-pointer" alt="logo" /></PopoverButton>
          <PopoverPanel anchor="bottom" className="flex w-52 bg-white/75 text-black flex-col -ml-8 mt-2 p-2 rounded-xl shadow-inner shadow-gray-900">
            <button className='m-2' onClick={() => setPage(3)}>User profile</button>
            <button className='m-2' onClick={logout}>Logout</button>
          </PopoverPanel>
        </Popover>
      </div>
      {children[page]}
      <div className="absolute h-14 flex w-full bottom-0 px-10 bg-black/75 shadow-md z-10 justify-center md:hidden">
        <div className='flex w-full justify-between'>
          <IconButton active={page === 0} Icon={<HomeIcon />} onClick={() => setPage(0)}/>
          <IconButton active={page === 1} Icon={<TicketIcon />} onClick={() => setPage(1)}/>
          <IconButton active={page === 2} Icon={<FindIcon />} onClick={() => setPage(2)}/>
        </div>
      </div>
    </>
  );
}