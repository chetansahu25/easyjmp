import { FaFacebook, FaInstagram, FaSquareTwitter,  FaYoutube } from "react-icons/fa6";
import { Link } from 'react-router'

const Footer = () => {
  return (
    <div className='flex flex-col items-center bg-gray-800 text-gray-500 border-t border-gray-700'>
      <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 py-5  w-3/4 gap-5'>
        <div>
          <h3>Links</h3>
          <p>About</p>
          <p>Pricing</p>
          <p>Privacy Policy</p>
          <p>Terms and Conditions</p>
        </div>
        <div>
          <h3>Links</h3>
          <p>About</p>
          <p>Pricing</p>
          <p>Privacy Policy</p>
          <p>Terms and Conditions</p>
        </div>
        <div>
          <h3>Links</h3>
          <p>About</p>
          <p>Pricing</p>
          <p>Privacy Policy</p>
          <p>Terms and Conditions</p>
        </div>
        <div>
          <h3>Contact us</h3>

          <p>About</p>
          <p>Pricing</p>
          <p>Privacy Policy</p>
          <p>Terms and Conditions</p>

          <h3>Follow Us</h3>
          <div className=" flex">
            <Link to={"/login"} >
              <FaInstagram />
            </Link>

            <FaYoutube />
            <FaFacebook />
            <FaSquareTwitter />
          </div>


        </div>
      </div>
      <span className='block w-full text-center py-3 border-t border-gray-600 '>Bottom credits</span>
    </div>
  )
}

export default Footer