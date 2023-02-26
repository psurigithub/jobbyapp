import {Component} from 'react'
import Cookies from 'js-cookie'

import './index.css'

class UserProfile extends Component {
  state = {
    profileDetails: [],
  }

  componentDidMount() {
    this.getProfile()
  }

  getFromattedData = data => ({
    name: data.name,
    profileImageUrl: data.profile_image_url,
    shortBio: data.short_bio,
  })

  getProfile = async () => {
    const jwtToken = Cookies.get('jwt_token')

    const url = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)

    if (response.ok) {
      const fetchedData = await response.json()

      const updatedData = this.getFromattedData(fetchedData.profile_details)
      this.setState({profileDetails: updatedData})
    }
  }

  render() {
    const {profileDetails} = this.state

    const {name, profileImageUrl, shortBio} = profileDetails
    return (
      <div className="All-Jobs-container">
        <img src={profileImageUrl} className="profile" alt="profile" />
        <h1 className="profile-name">{name}</h1>
        <p className="paragraph">{shortBio}</p>
      </div>
    )
  }
}

export default UserProfile
