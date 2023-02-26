import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import Header from '../Header'

import './index.css'

const Home = () => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }

  return (
    <>
      <div className="main-container">
        <Header />
        <div className="heading-container">
          <h1 className="heading">
            Find The Job That <br /> Fits Your Life
          </h1>
          <p className="paragraph">
            Millions of people are searching for jobs,salary information,company
            reviews.
            <br /> Find the job that fits your abilities and potential.
          </p>
          <div>
            <button className="find-jobs-button" type="button">
              Find Jobs
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
