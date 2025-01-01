import Image from "next/image";
import LookingForDriver from "@app/api/Frontend/DriverDetailsAll/LookingForDriver/page";

const ConfirmRidePanel = ({ ride, onClose, onConfirm }) => {
  return (
    <div>
      {/* Modal Header */}
      <div
        className="flex justify-center items-center mb-4 cursor-pointer"
        onClick={onClose} // Close the panel on click
      >
        <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
      </div>

      {/* Modal Title */}
      <div className="text-center font-bold text-lg mb-4">Confirm your Ride</div>

      {/* Ride Details */}
      <div className="flex flex-col items-center gap-4">
        <Image
          src={ride.image || "/placeholder.png"}
          alt={ride.name || "Ride"}
          width={150}
          height={80}
          className="object-contain"
        />
        <div className="text-center">
          <p className="font-bold">{ride.name}</p>
          <p className="text-gray-500 text-sm">{ride.description}</p>
        </div>
      </div>

      {/* Confirm Button */}
      <button
        onClick={onConfirm} // Call onConfirm when clicked
        className="w-full bg-black text-white text-lg font-bold py-2 rounded-md mt-6"
      >
        Confirm
      </button>
    </div>
  );
};

export default ConfirmRidePanel;
