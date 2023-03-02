// External
import { Link } from 'react-router-dom'
import { useState } from 'react'
// Internal
import './guest.min.css';

export const GuestLayout = ({ children } : any) => {
    return (
        <div id="guest-wrapper">
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-full bg-white p-[20px] pt-[40px]">
                    { children }
                </div>
            </div>
        </div>
    )
}