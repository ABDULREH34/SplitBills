import React from 'react';
import Image from 'next/image';
import { UserButton } from "@clerk/nextjs"; 

const Header = () => {
    const headerMenu = [
        {
            id: 1,
            name: 'Ride',
            icon: '/Ride.jpeg'
        },
        {
            id: 2,
            name: 'Package',
            icon: '/Box2.png'
        },
        {
            id:3,
            name:'Barging',
            icon:'/Barging.jpeg'
        }
    ];

    return (
        <div className='p-5 pb-3 pl-10 border-b-[4px] border-gray-200'>
            <div className='flex items-center justify-between'>
                <div className='flex gap-24 items-center'>
                    <Image 
                        src='/logo.jpeg' 
                        width={80} 
                        height={80} 
                        alt='Logo' 
                    />
                    <div className='flex gap-6 items-center'>
                        {headerMenu.map((item) => (
                            <div key={item.id} className="flex items-center space-x-2 mb-2">
                                <Image 
                                    src={item.icon} 
                                    width={40} 
                                    height={40} 
                                    alt={item.name}
                                />
                                <h2 className='text-sm font-bold'>{item.name}</h2>
                            </div>
                        ))}
                    </div>
                </div>
                <UserButton /> 
            </div>
        </div>
    );
}

export default Header;
