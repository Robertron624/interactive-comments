import { FcGoogle } from 'react-icons/fc'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import {auth} from '@/utils/firebase'

const GoogleLogin = () => {

    const handleLogin = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)

    }


  return (
    <div className='text-dark-blue max-w-[22rem] md:max-w-xl mx-auto p-4 bg-white rounded-sm'>
        <h4 className='mb-2 text-sm'>
            Please login with your Google account to write a comment
        </h4>
        <button onClick={handleLogin} className='flex gap-2 bg-light-grayish-blue p-2 rounded-md items-center'>
            <FcGoogle />
            Login with Google
        </button>
    </div>
  )
}

export default GoogleLogin