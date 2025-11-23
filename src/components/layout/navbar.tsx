import NavbarMobile from "../navbarMobile";
import NavbarDesktop from "../navbarDesktop";

const Navbar = () => {
  return (
    <header className="bg-primary/50 backdrop-blur-xl rounded-b-xl shadow-md fixed w-full z-50 top-0 left-0">
      <nav className="Container py-4">
        {/* Small Screen */}
        <NavbarMobile />

        {/* Large Screen */}
        <NavbarDesktop />
      </nav>
    </header>
  );
};

export default Navbar;
