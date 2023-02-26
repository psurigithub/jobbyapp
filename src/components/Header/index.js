import Cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="nav-header">
      <Link to="/">
        <img
          className="website-logo"
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
        />
      </Link>
      <ul className="nav-menu">
        <li className="nav-menu-item">
          <Link to="/" className="nav-links">
            Home
          </Link>
        </li>

        <li className="nav-menu-item">
          <Link to="/Jobs" className="nav-links">
            Jobs
          </Link>
        </li>
      </ul>
      <div>
        <button
          type="button"
          className="logout-desktop-btn"
          onClick={onClickLogout}
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default withRouter(Header)
