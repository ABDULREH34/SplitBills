import React from 'react'
import Link from 'next/link'

const ConfirmRidePopUp = ({ setconfirmRidePopPanel}) => {
  return (
    <div>
            <h5
                className="p-1 text-center w-[93%] absolute top-0 cursor-pointer"
                onClick={() => setRidePopupPanel(false)}
            >
                <i className="text-3xl text-gray-200 ri-arrow-down-s-line"></i>
            </h5>
            <h3 className="text-2xl font-semibold mb-5">Confirm this ride to Start</h3>
            <div className="flex items-center justify-between p-3 bg-black rounded-lg mt-4">
                <div className="flex items-center gap-3">
                    <img
                        className="h-12 rounded-full object-cover w-12"
                        src="/people.jpg"
                        alt=""
                    />
                    <h2 className="text-lg font-medium text-white">Mustak Ahmed</h2>
                </div>
                <h5 className="text-lg font-semibold text-white">2.2 KM</h5>
            </div>
            <div className="flex gap-2 justify-between flex-col items-center">
                <div className="w-full mt-5">
                    <div className="flex items-center gap-5 p-3 border-b-2">
                        <i className="ri-map-pin-user-fill"></i>
                        <div>
                            <h3 className="text-lg font-medium">562/11-A</h3>
                            <p className="text-sm -mt-1 text-gray-600">Cheeta Camp</p>
                        </div>
                    </div>
                    <div className="flex item-center gap-5 p-3 border-b-2">
                        <i className="text-lg ri-map-pin-2-fill"></i>
                        <div>
                            <h3 className="text-lg font-medium">562/11-A</h3>
                            <p className="text-sm -mt-1 text-gray-600">Vashi</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3'>
                        <i className="ri-currency-line"></i>
                        <div>
                            <h3 className="text-lg font-medium">300</h3>
                            <p className="text-sm -mt-1 text-gray-600">Cash Cash</p>
                        </div>
                    </div>
                    <div className='mt-6 w-full'>
                        <form>
                            <input className='bg-[#eee] px-6 py-4 font-mono text-lg w-full mt-3' placeholder='Enter OTP'/>
                        
                        <Link href='/api/Frontend/DriverDetailsAll/DriverRiding' className='bg-black mt-2 flex justify-center w-full text-white font-semibold p-2 px-10 rounded-lg'>Confirm</Link>

                        <button onClick={() => {
                             setconfirmRidePopPanel(false)
                             
                        }} className='mt-2 w-full bg-red-600 text-white font-semibold p-2 px-10 rounded-lg'>Cancel</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default ConfirmRidePopUp