import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {GoLocation} from 'react-icons/go'
import './index.css'

const JobItem = props => {
  const {jobItemDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    packagePerAnnum,
    rating,
    title,
    location,
    id,
  } = jobItemDetails

  return (
    <li className="eachJob-list">
      <Link to={`/jobs/${id}`} className="link-item">
        <div className="company-details">
          <div className="top">
            <img src={companyLogoUrl} alt={title} className="logo" />
            <div className="heading-container">
              <h1 className="heading">{title}</h1>
              <div className="rating-container">
                <AiFillStar className="rating-image" />
                <p className="rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="details">
            <div className="location-container">
              <GoLocation className="location-logo" />
              <p className="location">{location}</p>
            </div>
            <p className="type">{employmentType}</p>
            <p className="salary">{packagePerAnnum}</p>
          </div>
          <div className="description-container">
            <h1 className="description">Description</h1>
            <p className="des-details">{jobDescription}</p>
          </div>
        </div>
      </Link>
    </li>
  )
}
export default JobItem
