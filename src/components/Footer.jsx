import logoWhite from "../assets/icons_assets/logo-white.png"

function Footer() {
  return (
    <footer>
      <img src={logoWhite} alt="Little Lemon Logo" />
      <ul>
        <h4>Navigation</h4>
        <li>
          <a href="#">Home</a>
        </li>
        <li>
          <a href="#">About</a>
        </li>
        <li>
          <a href="#">Reservations</a>
        </li>
        <li>
          <a href="#">Menu</a>
        </li>
        <li>
          <a href="#">Order Online</a>
        </li>
        <li>
          <a href="#">Login</a>
        </li>
      </ul>
      <ul>
        <h4>Contact</h4>
        <li>
          <a href="#">Address</a>
        </li>
        <li>
          <a href="#">Phone number</a>
        </li>
        <li>
          <a href="#">Email</a>
        </li>
      </ul>
      <ul>
        <h4>Social Media Links</h4>
        <li>
          <a href="#">Address</a>
        </li>
        <li>
          <a href="#">Phone number</a>
        </li>
        <li>
          <a href="#">Email</a>
        </li>
      </ul>
    </footer>
  )
}
export default Footer
