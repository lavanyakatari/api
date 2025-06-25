const NavBar = () => {
  return(
    <nav className="bg-blue-600 flex justify-between px-5 py-4 text-white">
      <div className="text-xl font-bold">MyWebSite</div>
      <div className="hidden md:flex space-x-4">
        <a href="/Home" className="hover:text-gray-300  text-md">Home</a>
        <a href="/About" className="hover:text-gray-300 text-md">About</a>
        <a href="/Contact" className="hover:text-gray-300  text-md">Contact</a>
        <a href="/Service" className="hover:text-gray-300 text-md">Service</a>
      </div>
    </nav>
  )
}

export default NavBar