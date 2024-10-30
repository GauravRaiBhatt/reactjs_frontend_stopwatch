// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faLocationDot, faWhatsapp } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  // logic to navigate to whatsapp
  const phoneNumber = "+919621421976";
  const message = "Hi Gaurav Rai Bhatt";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <header className="flex justify-between items-center py-1 px-4 bg-slate-400 text-white w-full border-solid border-2 border-b-black fixed">
      {/* Left side: Logo and Title */}
    {/* <img src="/src/assets/logo1.jpeg" alt="Logo" className="h-8 mr-2" /> */}
    <img src="./assets/logo2.webp" alt="Logo" className="h-8 mr-2 myBorderClass" />
      {/* <div className="flex items-center">
        <img src="/src/assets/react.svg" alt="Logo" className="h-8 mr-2" />
        <h1 className="text-xl font-bold text-black sm:hidden">The GRB's</h1>
        <h1 className="text-xl font-bold text-black hidden sm:block">The Great Reliable Buddies</h1>
      </div> */}
        <h1 className="text-xl font-bold text-white">The Great Reliable Buddies</h1>

      {/* Right side: Icons */}
      <div className="flex items-center space-x-4">
        <a href={whatsappUrl}>
          <button className="text-white hover:text-green-500">
            {/* <FontAwesomeIcon icon={faWhatsapp} size="lg" /> */}
            <img
              src="./assets/whatsapp-brands-solid.svg"
              alt="Logo"
              className="h-8 mr-2"
            />
          </button>
        </a>
        {/* <button className="text-white hover:text-blue-500">
          <FontAwesomeIcon icon={faLocationDot} size="lg" /> 
          <img
            src="/src/assets/location-dot-solid.svg"
            alt="Logo"
            className="h-8 mr-2"
          />
        </button> */}
      </div>
    </header>
  );
};

export default Header;
