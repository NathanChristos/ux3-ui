import logo from '../../assets/logo-white.png';
import '../../App.css';
import { Input } from '../../shared/input';
import { Error } from '../../shared/input/error';
import { useState } from 'react';
import { Button } from '../../shared/button';
import { route } from '../../shared/api';

export const Login = ({ onSuccess }) => {
  const [createAccount, setCreateAccount] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState(null);
  
  const handleLogin = async () => {
    route('/auth/signin').post({ body: {
      email,
      password,
    }, onSuccess: (data) => {
      if (data) {
        onSuccess(data.token);
      }
    }});
  }
  
  const handleCreate = async () => {
    setError(null);
    route('/users').post({ body: {
      firstName,
      lastName,
      email,
      password
    },
    onSuccess: (data) => {
      setCreateAccount(false);
    }, 
    onError: (error) => {
      if (error) {
        setError(error);
      } else {
        setError('Failed to create account');
      }
    }});
  }
  
  const enabled = email && password && (createAccount ? firstName && lastName : true);
  
  return (
    <div className='w-full h-screen flex items-center justify-center'>
      <div className='w-96 px-6'>
        {createAccount ? (
        <div>
          <div className='text-primary text-3xl mb-6'>Create account</div>
          <Input value={firstName} placeholder={'first name'} onChange={value => setFirstName(value)}></Input>
          <Input value={lastName} placeholder={'last name'} onChange={value => setLastName(value)}></Input>
          <Input value={email} placeholder={'email'} onChange={value => setEmail(value.trim())}></Input>
          <Error className='mb-4' >{error?.password?.msg}</Error>
          <Input value={password} type='password' placeholder={'password'} onChange={value => setPassword(value.trim())}></Input>
          <div className='flex justify-between'>
            <button onClick={() => setCreateAccount(false)} type={'link'} className='text-primary underline my-auto'>Login</button>
            <Button onClick={handleCreate} disabled={!enabled}>Submit</Button>
          </div>
        </div>
        ) : (
        <>
          <div className="bg-primary mx-auto h-72 w-72 rounded-full flex items-center justify-center mb-6">
            <img src={logo} className="App-logo" alt="logo" />
          </div>
          <div className='max-w-96'>
            <Input value={email} placeholder={'email'} onChange={value => setEmail(value.trim())}></Input>
            <Input value={password} type='password' placeholder={'password'} onChange={value => setPassword(value.trim())}></Input>
            <div className='flex justify-between'>
              <button onClick={() => setCreateAccount(true)} type={'link'} className='text-primary underline my-auto'>Create account</button>
              <Button onClick={handleLogin} type="submit">Login</Button>
            </div>
          </div>
        </>
      )}
      </div>
    </div>
  );
}
