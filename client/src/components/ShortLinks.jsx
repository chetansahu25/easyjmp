import { Copy, Search, SquareArrowOutUpRight } from 'lucide-react';
import Footer from './Footer'
import { useEffect, useState } from 'react'
import { getAllUrls } from '../api/shortUrl.api';

const ShortLinks = () => {

    const [links, setLinks] = useState([])
    const [search, setSearch] = useState("")
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(5)
    const [totalPages, setTotalPages] = useState(1)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)



    const handleGetAllUrls = async (page, limit, search) => {
        if (limit == 0) return
        if (totalPages < page) {
            setLoading(false)
            setLimit(0)

            return 0;

        }
        setLoading(true)
        setError(null)

        try {
            const data = await getAllUrls(page, limit, search)
            console.log(data)
            console.log(data.urls[data.urls.length - 1]._id != links[links.length - 1]?._id)
            if (data.urls[data.urls.length - 1]._id != links[links.length - 1]?._id) {
                setLinks((prev) => [...prev, ...data.urls])
                setTotalPages(Number(data.totalPages))
            }
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    const handleInfinityScroll = () => {
        setError(null)
        if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
            console.log("handleinfinity scroll triggered");
            setPage((prev) => prev + 1)
        }
    }

    const handleSearch = (e) =>{
        e.preventDefault()
        const formData = new FormData(e.target)
        const searchInput = formData.get("searchInput")
        setPage(1);
        setTotalPages(1)
        setLimit(5)
        setLinks([])
        setSearch(searchInput)

        
    }
    const handleDelete = (linkId) => {
        console.log(linkId)
        setLinks((prev) => prev.filter(item => item._id !== linkId))

    }

    useEffect(() => {
        window.addEventListener("scroll", handleInfinityScroll);
        return () => window.removeEventListener("scroll", handleInfinityScroll);
    }, []);
    useEffect(() => {
        handleGetAllUrls(page, limit, search)
    }, [page, limit, search])

    return (
        <div className='absolute mt-20  px-10 right-0 w-5/6 '>
            <div className='mx-2 p-3 bg-amber-200 rounded-lg'>
                <div className='flex justify-between items-center'>
                    <h1 className='text-4xl font-serif  font-semibold'>Manage Links</h1>
                    <form className='flex items-center' onSubmit={handleSearch}>
                        <input
                            className=''
                            id='searchInput'
                            name='searchInput'
                            type="text"
                            placeholder='Search...'
                        />
                        <button type='submit'><Search /></button>
                    </form>

                </div>

                <table className="min-w-full h-screen mt-6 bg-amber-200 rounded-lg py-10 my-10 shadow-[0px_-4px_6px_-1px_rgba(0,0,0,0.1)]">
                    <thead>
                        <tr>
                            <th className='py-2 px-4 border-b'>SNo</th>
                            <th className="py-2 px-4 border-b">Original URL</th>
                            <th className="py-2 px-4 border-b">Short URL</th>
                            <th className="py-2 px-4 border-b">Clicks</th>
                            <th className="py-2 px-4 border-b">Edit</th>
                            <th className="py-2 px-4 border-b">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Example: Replace with dynamic data from backend */}
                        {links.map((link, idx) => (
                            <tr key={idx} id={link._id} className='hover:bg-amber-300 border-b last:border-none '>
                                <td className='py-2 px-4'>{idx + 1}</td>
                                <td className="py-2 px-4  text-sm break-all">
                                    {link.originalUrl.slice(0, 30) + (link.originalUrl.length > 30 ? '...' : '')}
                                    <button
                                        className="ml-2 bg-gray-300 text-gray-800 px-2 py-3 rounded hover:bg-blue-400"
                                        onClick={() => navigator.clipboard.writeText(link.shortUrl)}
                                    >
                                        <SquareArrowOutUpRight size={16} onClick={() => window.open(link.originalUrl)} />
                                    </button>
                                </td>
                                <td className="py-2 px-4 h-full text-sm flex justify-around  items-center">
                                    {link.shortUrl}
                                    <button
                                        className="ml-2 bg-gray-300 text-gray-800 px-2 py-3 rounded"
                                        onClick={() => navigator.clipboard.writeText(`${import.meta.env.VITE_BACKEND_URL}/${link.shortUrl}`)}
                                    >
                                        <Copy size={16} />
                                    </button>
                                </td>
                                <td className="py-2 px-4  text-center">{link.clicks}</td>
                                <td className="py-2 px-4">
                                    <button
                                        className="bg-yellow-400 text-white px-2 py-1 rounded"
                                        onClick={() => handleEdit(link._id)}
                                    >
                                        Edit
                                    </button>
                                </td>
                                <td className="py-2 px-4">
                                    <button
                                        className="bg-red-500 text-white px-2 py-1 rounded"
                                        onClick={() => handleDelete(link._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>

                        ))

                        }
                        {(!loading) ? "" : (
                            <tr><td>
                                <div className="flex w-full items-center justify-center">
                                    <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
                                </div>

                            </td></tr>
                        )
                        }
                    </tbody>
                </table>
                <div className='flex'>
                    {/* {!limit && "data ended"} */}
                    <p className='text-center'>{page > totalPages ? totalPages : page} / {totalPages}</p>
                </div>
            </div>
            <Footer />

        </div>
    )
}

export default ShortLinks