import React from 'react'
import Image from 'next/image'

const Header = () => {
  return (
    <div className='text-dark-blue px-2 py-8 md:max-w-xl mx-auto'>
        <div className='w-fit'>
            <Image src="/Commentit.png" alt="company logo" width={150} height={60} />
        </div>
    </div>
  )
}

export default Header