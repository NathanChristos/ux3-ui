import { useEffect, useState } from "react";
import { useContext } from "../../context/context";
import { Button } from "../../shared/button";
import { Input } from "../../shared/input";
import avatar from '../../assets/avatar.png';
import { Error } from "../../shared/input/error";

export const UserProfile = ({ tab }) => {
  const { user, updateUser } = useContext();
  
  const [firstName, setFirstName] = useState(user.firstName || '');
  const [lastName, setLastName] = useState(user.lastName || '');
  const [email, setEmail] = useState(user.email || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [bio, setBio] = useState(user.bio || '');  
  const [file, setFile] = useState(user.picture || '');
  const [passwordError, setPasswordError] = useState('');
  
  const handleFileChange = async (fileList) => {
    if (fileList) {
      const reader = new FileReader();
      reader.addEventListener('load', () => setFile(reader.result), false);
      reader.readAsDataURL(fileList[0]);
    }
  };
  
  // load default image if no picture is provided
  useEffect(() => {
    if (!user?.picture) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setFile(reader.result);
      });
  
      fetch(avatar)
        .then(response => response.blob())
        .then(blob => {
          reader.readAsDataURL(blob);
        });
    }
  }, [user] )
      
  const handleSubmit = () => {
    if( (password || confirmPassword) && password !== confirmPassword) {
      setPasswordError('Passwords do not match!');
      return;
    }
    const data = {
      firstName,
      lastName,
      email,
      bio,
      ...( !!password && { password: password.trim() }),
      file,
    };
    
    updateUser(data);
  }
  
  const enabled = firstName && lastName && email;
  
  return (
    <div className='w-full max-w-[1200px] m-auto h-screen py-20 text-center overflow-scroll'>
      <div className="text-5xl text-neutral-50 mb-8">
        {`User profile`}
      </div>
        <div className="flex flex-col my-auto w-full justify-center pb-20">
          <div className="w-full bg-neutral-50/75 shadow-inner shadow-gray-900 rounded-3xl p-8">
            <Input value={firstName} onChange={setFirstName} placeholder={'first name'}/>
            <Input value={lastName} onChange={setLastName} placeholder={'last name'}/>
            <div className="block sm:flex mb-6">
              <textarea value={bio} onChange={({currentTarget}) => setBio(currentTarget.value)} className="h-40 rounded-3xl w-m" placeholder="bio"></textarea>
              <div className="flex mt-6 sm:mt-0 sm:ml-6 grow">
                  <img src={file} alt="event" className="hover:cursor-pointer sm:h-40 sm:max-w-40 sm:w-40 m-auto object-cover rounded-3xl" onClick={() => document.querySelector('input[type="file"]').click()}/>
                  <input type="file" hidden onChange={e => handleFileChange(e.target.files)} />
              </div>
            </div>
            <Input value={email} onChange={setEmail} placeholder={'email'} disabled={true}/>
            { passwordError && <Error >Passwords do not match!</Error> }
            <Input value={password} onClick={() => setPasswordError('')} type="password" onChange={setPassword} placeholder={'password'}/>
            <Input value={confirmPassword} onClick={() => setPasswordError('')} type="password" onChange={setConfirmPassword} placeholder={'confirm password'}/>
            <div className="flex justify-end border-t border-neutral-400 pt-6 mt-6">
              <Button variant={'primary'} onClick={handleSubmit} disabled={!enabled}>{'Update'}</Button>
            </div>
          </div>
        </div>
    </div>
  )
}