import React, { useState } from 'react'
import axios from 'axios'
import { createShortUrl } from '../api/shortUrl.api'

const UrlForm = () => {
    const [url, setUrl] = useState('')
    const [shortenedUrl, setShortenedUrl] = useState('')
    const [copied, setCopied] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setError('')
        setShortenedUrl('')
        
        try {
            const data = await createShortUrl(url)
            setShortenedUrl(data)
        } catch (err) {
            setError('Failed to shorten URL. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    const handleCopy = async () => {
        await navigator.clipboard.writeText(shortenedUrl)
        setCopied(true)
        setTimeout(() => setCopied(false), 5000)
    }

    return (
        <div className="w-full max-w-xl mx-auto ">
            <div className=" p-8 transform transition-all duration-300 ">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label
                            className="block text-gray-700 text-sm font-semibold tracking-wide"
                            htmlFor="url"
                        >
                            Enter your long URL
                        </label>
                        <div className="relative">
                            <input
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none text-gray-600 placeholder-gray-400"
                                type="url"
                                id="url"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                placeholder="https://example.com/your-very-long-url"
                                required
                            />
                            {url && (
                                <button
                                    type="button"
                                    onClick={() => setUrl('')}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading || !url}
                        className={`w-full py-3 px-6 rounded-lg text-white font-medium 
                            ${isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'} 
                            transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]
                            disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100`}
                    >
                        {isLoading ? (
                            <span className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Shortening...
                            </span>
                        ) : (
                            'Shorten URL'
                        )}
                    </button>
                </form>

                {error && (
                    <div className="mt-4 p-4 bg-red-50 border border-red-100 rounded-lg">
                        <p className="text-red-600 text-sm">{error}</p>
                    </div>
                )}

                {shortenedUrl && (
                    <div className="mt-6 p-4 bg-green-50 border border-green-100 rounded-lg animate-fade-in">
                        <p className="text-sm font-medium text-gray-700 mb-2">Your shortened URL:</p>
                        <div className="flex items-center space-x-3">
                            <input
                                type="text"
                                readOnly
                                value={shortenedUrl}
                                className="flex-1 p-2 bg-white border border-gray-200 rounded text-sm text-gray-600"
                            />
                            <button
                                onClick={handleCopy}
                                className={`pt-1 pb-1 pr-4 pl-4 rounded ${
                                    copied ? 'bg-green-500 text-white' : 'bg-gray-300 hover:bg-gray-200 text-gray-800'
                                } transition-all duration-200`}
                            >
                                {copied ? '✓ Copied!' : 'Copy'}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default UrlForm