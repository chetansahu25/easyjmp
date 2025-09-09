import { Bell, EllipsisVertical } from 'lucide-react'
import { useAuth } from '../context/authContext'

const TopNav = () => {
  const { user } = useAuth()
  const name = user?.name ? user.name : "user"

  return (
    <div className=' absolute right-0 w-5/6 flex gap-5 items-center justify-between px-10 z-10 border-b h-15  '>
      <div >
        <span className='font-semibold'>
        Welcome {name} !
        </span>
      </div>
      <div className='flex gap-5'>

      <span className=' rounded-full border-2 p-1'>
        <Bell size={18} />
      </span>
      <EllipsisVertical size={28} />
      </div>
    </div>
  )
}

export default TopNav