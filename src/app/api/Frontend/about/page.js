"use client";
import { useState } from 'react';


const About = () => {
  // Separate state for each section's content visibility
  const [isSustainabilityVisibtyle, setIsSustainabilityVisible] = useState(false);
  const [isRidesAndDeployVisible, setIsRidesAndDeployVisible] = useState(false);
  const [isSafty, setSaftyVisible] = useState(false);
  const handleSustainabilityToggle = () => {
    setIsSustainabilityVisible(!isSustainabilityVisibtyle);
  };

  const handleRidesAndDeployToggle = () => {
    setIsRidesAndDeployVisible(!isRidesAndDeployVisible);
  };

  const handleSaftyToggle = () => {
    setSaftyVisible(!isSafty);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center py-12 px-4">
      {/* Header Section */}
      <div className="bg-black w-full py-6 mt-[-4rem]">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white text-center">
          About <span className="text-blue-600">Split Bills (Common Ride)</span>
        </h1>
        <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto">
          Simplifying shared taxi fares with fairness, transparency, and innovation.
          Designed to improve the ride-sharing experience for both riders and drivers.
        </p>
      </div>

      {/* Features Section */}
      <div className="w-full max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
        {/* Image */}
        <div className="flex justify-center py-4">
          <img
            src="/about.webp"
            alt="Split Bills Illustration"
            className="rounded-lg shadow-lg w-full h-auto object-cover transform translate-x-4"
          />
        </div>

        {/* Content */}
        <div className="text-gray-700 space-y-6">
          <h2 className="text-3xl font-bold">Our Mission</h2>
          <p>
            The ridesharing industry has revolutionized urban transportation, but challenges
            like fare calculations and user disputes remain. Our mission is to solve these
            issues with a user-friendly app that calculates and manages shared taxi fares in real-time.
          </p>
          <h3 className="text-2xl font-bold">Key Features</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>💡 Real-time fare calculation and updates.</li>
            <li>🤝 Bargaining feature for a fair ride-sharing experience.</li>
            <li>🔒 Secure payment options powered by Stripe.</li>
            <li>📱 Intuitive UI for seamless user experience.</li>
          </ul>
        </div>
      </div>

      <div className="w-full max-w-6xl  flex justify-center gap-4 items-center">

        <div className="flex flex-col items-start w-1/2">
          <h2 className={`text-2xl font-bold ${isSustainabilityVisibtyle ? 'text-gray-500' : 'text-slate-700'} mb-4`}>Sustainability</h2>
          <img
            src="/Sustainability.jpeg"
            alt="Sustainability Illustration"
            style={{ width: "400px", height: "300px" }}
            className="rounded-lg shadow-md hover:scale-110 hover:rotate-3 transition-all duration-500 ease-in-out cursor-pointer w-full md:w-2/4 lg:w-1/2"
            onClick={handleSustainabilityToggle}
          />

        </div>


        <div className="flex flex-col items-start w-1/2">
          <h2 className={`text-2xl font-bold ${isRidesAndDeployVisible ? 'text-gray-500' : 'text-slate-700'} mb-4`}>Rides and Deploy</h2>
          <img
            src="/Ride&deploye.jpeg"
            alt="Rides and Deploy Illustration"
            style={{ width: "400px", height: "300px" }}
            className="rounded-lg shadow-md hover:scale-110 hover:rotate-3 transition-all duration-500 ease-in-out cursor-pointer w-full md:w-2/4 lg:w-1/2"
            onClick={handleRidesAndDeployToggle}
          />
        </div>


        <div className="flex flex-col items-start w-1/2">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Your safety drives us</h2>
          <img
            src="/Safty.jpeg"
            alt="Sustainability Illustration"
            style={{ width: "400px", height: "300px" }}
            className="rounded-lg shadow-md hover:scale-110 hover:rotate-3 transition-all duration-500 ease-in-out cursor-pointer w-full md:w-2/4 lg:w-1/2"
            onClick={handleSustainabilityToggle}
          />

        </div>
      </div>






      <div className={`mt-4 p-4 border-rounded-lg transition-all duration-300 ease-in-out ${isSustainabilityVisibtyle ? "block" : "hidden"}`}>
        <p className="mt-4 text-lg text-gray-600">
          Split bills [common-taxi] is committing to becoming a fully electric, zero-emission platform by 2040, with 100% of rides taking place in zero-emission vehicles, on public transit, or with micromobility. It is our responsibility as the largest mobility platform in the world to more aggressively tackle the challenge of climate change. We will do this by offering riders more ways to ride green, helping drivers go electric, making transparency a priority, and partnering with NGOs and the private sector to help expedite a clean and just energy transition.
        </p>
      </div>

      {/* Content (Rides and Beyond info) */}
      <div className={`mt-4 p-4 border-rounded-lg transition-all duration-300 ease-in-out ${isRidesAndDeployVisible ? "block" : "hidden"}`}>
        <p className="mt-4 text-lg text-gray-600">
          In addition to helping riders find a way to go from point A to point B, we're helping people order food quickly and affordably, removing barriers to healthcare, creating new freight-booking solutions, and helping companies provide a seamless employee travel experience. And always helping drivers and couriers earn.
        </p>
      </div>

      {/* Content  Your safety drives us */}
      <div className={`mt-4 p-4 border-rounded-lg transition-all duration-300 ease-in-out ${isSafty ? "block" : "hidden"}`}>
        <p className="mt-4 text-lg text-gray-600">
          Whether you’re in the back seat or behind the wheel, your safety is essential. We are committed to doing our part, and technology is at the heart of our approach. We partner with safety advocates and develop new technologies and systems to help improve safety and help make it easier for everyone to get around.        </p>
      </div>

      {/* Team Section */}
      <div className="w-full max-w-6xl mx-auto mt-16 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Meet the Team
        </h2>
        <p
          className="mt-4 text-lg text-gray-600 transform transition-transform duration-300 ease-in-out hover:scale-110 hover:text-xl cursor-pointer"
        >
          This project is developed by <strong>Alok Nardekar</strong> and <strong>Sayyed Abdul Rehman Bashir Ahmed</strong>,
          under the guidance of <strong>Mrs. Shital Patil</strong>, as part of their Bachelor of Science (Information Technology)
          program at Vivekanand Education Society’s College of Arts, Science, and Commerce, Mumbai.
        </p>
      </div>

    </div>
  );
};

export default About;
