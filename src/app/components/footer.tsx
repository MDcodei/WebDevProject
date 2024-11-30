const Footer = () => {
  return (
    <footer className="text-gray-800 py-2 border-t border-gray-300 fixed bottom-0 left-0 w-full" style={{ backgroundColor: "#FFFFE6", borderTop: "1px solid #01490C"}}>
      <div className="container mx-auto flex justify-between ">
        
        <div className="flex items-center">
          <h2 className="text-lg font-bold mr-2">Contact Us:</h2>
          <a href="" className="hover:text-green-400 mr-4">Email</a>
          <a href="" className="hover:text-green-400">Instagram</a>
        </div>

        
        <div className="ml-10"> 
          <p>&copy; {new Date().getFullYear()} BiteMap. All rights reserved.</p>
        </div>
      </div>
    </footer>
    
  );
};

export default Footer;
