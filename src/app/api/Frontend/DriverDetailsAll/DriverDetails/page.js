"use client";
import React from 'react'

const DriverDetails = () => {
  return (
    <div>
        <div className='flex items-center justify-between'>
                    <div className='flex items-center justify-start gap-3'>
                        <img className='h-10 w-10 rounded-full object-cover' src="people.jpg" alt='' />
                        <h4 className='text-lg font-medium'>Irbaz Soni</h4>
                    </div>
                    <div>
                        <h4 className='text-lg font-semibold'>₹295.20</h4>
                        <p className='text-sm text-gray-600'>Earned</p>
                    </div>
                </div>
                 {/* Stats Row */}
                 <div className="flex justify-between items-center bg-white shadow-md rounded-xl p-4">
                    {/* Stat 1 */}
                    <div className="text-center">
                        <div className="text-2xl text-gray-600 mb-2">
                            <i className="ri-time-line"></i>
                        </div>
                        <p className="text-lg font-medium">10.2</p>
                        <p className="text-sm text-gray-600">Hours Online</p>
                    </div>

                    {/* Stat 2 */}
                    <div className="text-center">
                        <div className="text-2xl text-gray-600 mb-2">
                            <i className="ri-dashboard-line"></i>
                        </div>
                        <p className="text-lg font-medium">10.2</p>
                        <p className="text-sm text-gray-600">Trips Completed</p>
                    </div>

                    {/* Stat 3 */}
                    <div className="text-center">
                        <div className="text-2xl text-gray-600 mb-2">
                            <i className="ri-book-line"></i>
                        </div>
                        <p className="text-lg font-medium">10.2</p>
                        <p className="text-sm text-gray-600">Rides Scheduled</p>
                    </div>
                </div>
    </div>
  )
}

export default DriverDetails