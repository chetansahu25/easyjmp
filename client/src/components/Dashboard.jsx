import { useEffect, useState } from 'react'
import { createShortUrl, RecentUrls} from '../api/shortUrl.api'
import { useAuth } from '../context/authContext'
import { CopyIcon } from 'lucide-react'
import { useNavigate } from 'react-router'


const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [recentUrls, setRecentUrls] = useState([]);


  const getUrls = async () => {
    try {
      const response = await RecentUrls();
      setRecentUrls(response);
    } catch (error) {
      console.log(error);
    }
  }

  const handlecreateUrlForm = async (e) => {
    e.preventDefault()
    const formData = new FormData(document.getElementById('createUrlForm'))
    const url = formData.get('url')
    try {
      const response = createShortUrl(url)
      console.log(response)
      document.getElementById('createUrlForm').reset()
    } catch (error) {
      console.log(error)
    }
    setTimeout(() => {
      getUrls()

    }, 100);
  }

  function handleLogout() {
    logout()
    navigate("/")

  }

  const handleShortUrlClick = (shortUrl) => {
    navigator.clipboard.writeText(`${import.meta.env.VITE_BACKEND_URL}/${shortUrl}`);
  }

  useEffect(() => {
    getUrls();
  }, []);

  return (
    <div className='absolute mt-20  px-10 right-0 w-5/6 '>
      <div className='mx-2 p-3 bg-gray-200 rounded-lg'>

        <h1 className='text-4xl font-serif  font-semibold ml-3 mt-5'>Dashboard</h1>
        {/* <button onClick={handleLogout}>logout</button> */}
        <div className=' mx-5 p-5 flex flex-col'>

          <h1 className='font-semibold text-2xl font-serif'>Create Short URL </h1>
          <form onSubmit={handlecreateUrlForm} id='createUrlForm'>
            <input id='url' name='url' type="text"
              className='outline mt-2 px-5 py-2 focus:outline-2 focus:outline-blue-600 peer w-5/6 placeholder:font-medium'
              placeholder='https://www.example.com/longUrl....'
              required

            />
            <button className='px-3 py-2  bg-blue-500 outline peer-focus:outline-2 outline-blue-500 hover:outline-blue-600 hover:bg-blue-600'
            >Generate</button>
          </form>
        </div>
        <div>
          <h2 className='text-2xl font-serif font-semibold mt-10'>Recently Generated Links</h2>


          { 
          recentUrls?.length == 0 ? 
          (<p className='flex w-full h-40 text-center items-center justify-center font-bold border-2 rounded-lg border-gray-300'>No URLs found. Start generating some!</p> 

          ) : (  
          <table className='text-center w-full mb-20' >
            <thead>
              <tr>
                <th>Original Url</th>
                <th>Short Url</th>
                <th className='pr-10'>Clicks</th>
              </tr>
            </thead>
            <tbody>
              {
                recentUrls?.map((url, index) => {
                  return (
                    <tr key={index} className='text-center border-b hover:bg-gray-300 *:py-2 *:my-2'>
                      <td className=' break-all'>{url.originalUrl.slice(0, 30) + (url.originalUrl.length > 30 ? '...' : '')}</td>
                      <td className=' flex text-blue-500 hover:underline'>
                        <button className='flex gap-3' onClick={() => handleShortUrlClick(url.shortUrl)}>{`${import.meta.env.VITE_BACKEND_URL}/${url.shortUrl}`}<CopyIcon />
                        </button>
                      </td>
                      <td className='pr-10'>{url.clickCount}</td>
                    </tr>


                  )
                })
              }
            </tbody>
          </table>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard