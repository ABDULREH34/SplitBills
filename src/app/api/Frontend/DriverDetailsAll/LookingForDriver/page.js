"use client";
import React from 'react';
import Image from "next/image";



const LookingForDriver = () => {

    const ride = {
        image: "/car1.jpg",
        name: "Comfortable sedans, top-quality drivers",

        image: "/car2.webp",
        name: "Comfortable SUVs",

        image: "/car3.jpg",
        name: "Affordable compact rides",

        image: "/handicap.png",
        name: "Handicap-friendly rides",

        image: "/economy1.png",
        name: "Ride with your furry friend",

        image: "/more1.png",
        name: "Explore other options"
    };
    return (
        <div>
            <h5 className='p-1 text-center w[93%] absolute top-0' onClick={() => {

                // props.setVehicleFound(false)

            }}><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>

            <h3 className='text-2xl font-bold md-5'>Looking For a Driver</h3>

            <div className='flex gap-2 justify-between flex-col items-center'>
                <Image
                    src={ride.image}
                    alt={ride.name}
                    width={200}
                    height={200}
                    className="object-contain hover:scale-110 transition-transform duration-300"
                />
                <div className='w-full mt-5'>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="ri-map-pin-user-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Swami Vivekanad College of Art Scince and Commerce</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="text-lg ri-map-pin-2-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>562/11-A </h3>
                            <p className='text-sm -mt-1 text-gray-600'>Cheeta camp</p>
                        </div>
                    </div>

                    <div className='flex items-center gap-5 p-3'>
                        <i className="ri-currency-line"></i>
                        <div>
                            <h3 className='text-lg font-medium'>₹200 </h3>
                            <p className='text-sm -mt-1 text-gray-600'>Cash</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LookingForDriver

