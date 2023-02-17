import { useContext, useState } from 'react';
import { initializeApp } from 'firebase/app';
import firebaseConfig from './firebase.config';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import './login.css';
import { MyContext } from '../../App';

import { useLocation, useNavigate } from 'react-router-dom';

initializeApp(firebaseConfig);

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [loggedInUser, setLoggedInUser] = useContext(MyContext);
  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    success: false,
  });
  const googleSignIN = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const googleUser = result.user;
        const userInfo = { ...user };
        userInfo.name = googleUser.displayName;
        userInfo.email = googleUser.email;
        userInfo.googleSuccess = true;
        setUser(userInfo);
        setLoggedInUser(userInfo);
        navigate(location.state.from);
        console.log('sign in with google successfull');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        const signOutUser = {
          name: '',
          email: '',
          password: '',
          success: false,
        };
        setUser(signOutUser);
        console.log('sign out successfull');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleBlur = (e) => {
    let isFormValid = true;
    if (e.target.name === 'email') {
      const isEmailValid = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(
        e.target.value
      );
      isFormValid = isEmailValid;
    }
    if (isFormValid) {
      const userInfo = { ...user };
      userInfo[e.target.name] = e.target.value;
      setUser(userInfo);
    }
  };

  const handleSubmit = (e) => {
    if (newUser && user.email && user.password) {
      createUserWithEmailAndPassword(auth, user.email, user.password)
        .then((res) => {
          const userInfo = { ...user };
          userInfo.success = true;
          saveProfile(user.name);
          setUser(userInfo);
          setLoggedInUser(userInfo);
          navigate(location.state.from);
        })
        .catch((error) => {
          console.log('User already exist');
        });
    }
    if (!newUser && user.email && user.password) {
      signInWithEmailAndPassword(auth, user.email, user.password)
        .then((res) => {
          const userInfo = { ...user };
          const { displayName, email } = res.user;
          userInfo.success = true;
          userInfo.name = displayName;
          userInfo.email = email;
          setUser(userInfo);
          setLoggedInUser(userInfo);

          navigate(location.state.from);
        })
        .catch((error) => {
          console.log('something went wrong');
        });
    }

    e.preventDefault();
  };

  const saveProfile = (name) => {
    updateProfile(auth.currentUser, {
      displayName: name,
    })
      .then(() => {
        console.log('save profile successfully');
      })
      .catch((error) => {});
  };

  return (
    <form action='' className='authentication'>
      <div className='new-user'>
        <input
          type='checkbox'
          name=''
          id='toggle'
          value='New User'
          onClick={() => setNewUser(!newUser)}
        />
        <label htmlFor='toggle'>New User</label>
      </div>
      <div className='form-data'>
        {newUser && (
          <input
            type='text'
            placeholder='Enter your name'
            name='name'
            required
            onBlur={handleBlur}
          />
        )}
        <input
          type='text'
          name='email'
          placeholder='Enter your email'
          required
          onBlur={handleBlur}
        />

        <input
          type='password'
          name='password'
          id=''
          placeholder='your password'
          required
          onBlur={handleBlur}
        />

        <input
          type='submit'
          value={newUser === true ? 'SIGN UP' : 'SIGN IN'}
          onClick={handleSubmit}
        />
        <button onClick={googleSignIN}>GOOGLE SIGN IN</button>
      </div>
    </form>
  );
}

export default Login;
