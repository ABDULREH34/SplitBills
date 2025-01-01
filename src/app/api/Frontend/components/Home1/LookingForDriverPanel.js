import LookingForDriver from "@app/api/Frontend/DriverDetailsAll/LookingForDriver/page"; // Ensure this path is correct for your project

const LookingForDriverPanel = ({ ride, onClose, onConfirm }) => {
  return (
    <div className="relative">
      {/* Modal Header */}
      <div
        className="flex justify-center items-center mb-4 cursor-pointer"
        onClick={onClose} 
      >
        <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
      </div>

    


      {/* Render LookingForDriver Component */}
      <LookingForDriver />
    </div>
  );
};

export default LookingForDriverPanel;
