import React from 'react';
import Image from 'next/image';


const Header = () => {
    const headerMenu = [
        {
            id: 1,
            name: 'Ride',
            icon: '/Ride.jpeg',
            link:'/api/Frontend/Ride'
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
        },
        {
            id:4,
            name:'About Us',
            icon:'/About.png', 
            link: '/api/Frontend/about'          
        },
        {
            id:5,
            name:'Contact Us',
            icon:'/Contact.png',
            link:'/api/Frontend/components/ContactAll/contact'
            
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
                                  <a 
                                key={item.id} 
                                href={item.link} 
                                className="flex items-center space-x-2 mb-2 cursor-pointer"
                            >
                                <Image 
                                    src={item.icon} 
                                    width={40} 
                                    height={40} 
                                    alt={item.name}
                                />
                                <h2 className='text-sm font-bold'>{item.name}</h2>
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
                
            </div>
        </div>
    );
}

export default Header;
