import React from 'react'
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import { LuLanguages } from "react-icons/lu";

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className='bg-black text-white py-12 px-4 md:px-12 lg:px-[15%]'>
            {/* Contact Section */}
            <div className='mb-8'>
                <p className='text-gray-400'>Questions? Call <a href='tel:000-800-919-1694' className='text-white cursor-pointer hover:underline'>000-800-919-1694</a></p>
            </div>

            {/* Social Links */}
            <div className='flex items-center gap-6 mb-8'>
                <a href="#" className='text-gray-400 hover:text-white transition-colors' aria-label="Facebook">
                    <FaFacebook size={20} />
                </a>
                <a href="#" className='text-gray-400 hover:text-white transition-colors' aria-label="Instagram">
                    <FaInstagram size={20} />
                </a>
                <a href="#" className='text-gray-400 hover:text-white transition-colors' aria-label="Twitter">
                    <FaTwitter size={20} />
                </a>
                <a href="#" className='text-gray-400 hover:text-white transition-colors' aria-label="YouTube">
                    <FaYoutube size={20} />
                </a>
            </div>

            {/* Links Grid */}
            <div className='grid grid-cols-2 md:grid-cols-4 gap-8 mb-8'>
                <div>
                    <ul className='text-gray-400 text-sm space-y-2'>
                        <li className='cursor-pointer hover:text-white transition-colors underline'><a href="#">FAQ</a></li>
                        <li className='cursor-pointer hover:text-white transition-colors underline'><a href="#">Help Centre</a></li>
                        <li className='cursor-pointer hover:text-white transition-colors underline'><a href="#">Account</a></li>
                        <li className='cursor-pointer hover:text-white transition-colors underline'><a href="#">Media Centre</a></li>
                    </ul>
                </div>
                <div>
                    <ul className='text-gray-400 text-sm space-y-2'>
                        <li className='cursor-pointer hover:text-white transition-colors underline'><a href="#">Investor Relations</a></li>
                        <li className='cursor-pointer hover:text-white transition-colors underline'><a href="#">Jobs</a></li>
                        <li className='cursor-pointer hover:text-white transition-colors underline'><a href="#">Ways to Watch</a></li>
                        <li className='cursor-pointer hover:text-white transition-colors underline'><a href="#">Terms of Use</a></li>
                    </ul>
                </div>
                <div>
                    <ul className='text-gray-400 text-sm space-y-2'>
                        <li className='cursor-pointer hover:text-white transition-colors underline'><a href="#">Privacy</a></li>
                        <li className='cursor-pointer hover:text-white transition-colors underline'><a href="#">Cookie Preferences</a></li>
                        <li className='cursor-pointer hover:text-white transition-colors underline'><a href="#">Corporate Information</a></li>
                        <li className='cursor-pointer hover:text-white transition-colors underline'><a href="#">Contact Us</a></li>
                    </ul>
                </div>
                <div>
                    <ul className='text-gray-400 text-sm space-y-2'>
                        <li className='cursor-pointer hover:text-white transition-colors underline'><a href="#">Speed Test</a></li>
                        <li className='cursor-pointer hover:text-white transition-colors underline'><a href="#">Legal Notices</a></li>
                        <li className='cursor-pointer hover:text-white transition-colors underline'><a href="#">Only on Netflix</a></li>
                        <li className='cursor-pointer hover:text-white transition-colors underline'><a href="#">Audio Description</a></li>
                    </ul>
                </div>
            </div>

            {/* Language Selector */}
            <div className='mb-8'>
                <div className='flex items-center border border-gray-600 rounded-md py-2 px-4 w-fit hover:border-gray-400 transition-colors'>
                    <LuLanguages className='mr-2 text-gray-400' size={18} />
                    <select className='text-white bg-transparent outline-none cursor-pointer' name="language" id="lang">
                        <option value="English">English</option>
                        <option value="hindi">हिंदी</option>
                        <option value="spanish">Español</option>
                        <option value="french">Français</option>
                    </select>
                </div>
            </div>

            {/* Bottom Section */}
            <div className='border-t border-gray-700 pt-6'>
                <p className='text-gray-500 text-xs mb-2'>Netflix India</p>
                <p className='text-gray-500 text-xs'>© {currentYear} Netflix Clone. This is a fan-made project for educational purposes. Netflix is a registered trademark of Netflix, Inc.</p>
            </div>
        </footer>
    )
}

export default Footer
