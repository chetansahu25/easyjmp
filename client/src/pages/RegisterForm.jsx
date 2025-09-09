import { useEffect, useState } from 'react'
import Logo from '../components/Logo'
import { EyeOff, Eye, Mail, AlertCircle, User, UserCheck } from 'lucide-react'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../context/authContext'

const RegisterForm = () => {
  const { createUser, user, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    userId: '',
    email: '',
    password: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formError, setFormError] = useState("")

  //Redirect if user already logged in
  useEffect(() => {
    if (isAuthenticated) navigate('/dashboard', { replace: true })
  }, [isAuthenticated, navigate])

  const handleNameChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value.trim()
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setFormError("")

    // Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const userIdRegex = /^[a-zA-Z0-9_]{3,20}$/
    const nameRegex = /^[A-Za-z\s]+$/

    if (!formData.name || formData.name.length < 2) {
      setFormError("Name must be at least 2 characters long")
      setIsLoading(false)
      return
    } else if (!nameRegex.test(formData.name)) {
      setFormError("Name should only contain alphabets")
      setIsLoading(false)
      return
    }

    if (!userIdRegex.test(formData.userId)) {
      setFormError("User ID must be 3-20 characters long and contain only letters, numbers, and underscores")
      setIsLoading(false)
      return
    }

    if (!emailRegex.test(formData.email)) {
      setFormError("Kindly enter a valid email")
      setIsLoading(false)
      return
    }

    if (formData.password.length < 6) {
      setFormError("Password must be at least 6 characters long")
      setIsLoading(false)
      return
    }

    try {
      const userData = await createUser(formData)
      console.log(userData)
      console.log(userData)
    } catch (error) {
      console.error(error)
      const status = error?.response?.status
      if (status === 400 || status === 409 || status === 500) {
        setFormError(error.response.data.error || "Something went wrong")
      } else {
        setFormError("Server error, please try again")
      }
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      {/* Signup Form */}
      <div className="bg-white rounded-2xl shadow-xl p-8 animate-slide-up w-lg">
        <div className="w-full max-w-md">
          {/* Logo/Brand Section */}
          <div className="text-center mb-8 animate-fade-in">
            <div className='mb-3'>
              <Logo />
            </div>
            <p className="text-slate-600">Create your new account</p>
            {formError && (
              <div className='flex items-center justify-center gap-2 mt-5 text-red-400 px-5 py-2 rounded-lg bg-red-100 font-semibold'>
                <AlertCircle size={20} />
                {formError}
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Field */}
            <div className="space-y-1">
              <label htmlFor="name" className="text-sm font-medium text-slate-700 block">
                Full Name
              </label>
              <div className="relative">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleNameChange}
                  className="peer w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-50 focus:bg-white"
                  placeholder="Enter your full name"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 peer-focus:text-black">
                  <User />
                </div>
              </div>
            </div>

            {/* User ID Field */}
            <div className="space-y-1">
              <label htmlFor="userId" className="text-sm font-medium text-slate-700 block">
                User ID
              </label>
              <div className="relative">
                <input
                  id="userId"
                  name="userId"
                  type="text"
                  required
                  value={formData.userId}
                  onChange={handleChange}
                  className="peer w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-50 focus:bg-white"
                  placeholder="Choose a unique user ID"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 peer-focus:text-black">
                  <UserCheck />
                </div>
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-1">
              <label htmlFor="email" className="text-sm font-medium text-slate-700 block">
                Email address
              </label>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="text"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="peer w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-50 focus:bg-white"
                  placeholder="Enter your email"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 peer-focus:text-black">
                  <Mail />
                </div>
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1">
              <label htmlFor="password" className="text-sm font-medium text-slate-700 block">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-50 focus:bg-white pr-12"
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <Eye /> : <EyeOff />}
                </button>
              </div>
            </div>

            {/* Terms & Conditions */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500 focus:ring-2"
                  required
                />
                <span className="ml-2 text-sm text-slate-600">
                  I agree to the{" "}
                  <Link to="#" className="text-blue-600 hover:text-blue-700">
                    Terms & Conditions
                  </Link>
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition disabled:opacity-50"
            >
              {isLoading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          {/* Divider */}
          <div className="mt-6 mb-8 border-b border-slate-200"></div>

          {/* Sign In Link */}
          <div className="text-center">
            <p className="text-sm text-slate-600">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-blue-600 hover:text-blue-700">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterForm
