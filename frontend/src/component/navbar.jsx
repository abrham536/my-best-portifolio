
function Navbar() {
  return (
    <header className="site-header">
      <nav className="navbar" aria-label="Main navigation">
        <a href="#home" className="logo" aria-label="Abrham Mesfin, home">
          Abrham<span>.</span>
        </a>

        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#contact" className="nav-contact">
            Contact
          </a>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
