import {Component} from 'react'
import {AiFillStar} from 'react-icons/ai'
import {GoLocation} from 'react-icons/go'
import Cookies from 'js-cookie'
import Header from '../Header'
import './index.css'

class JobItemDetails extends Component {
  state = {
    jobsData: {},
    jobsSkills: {},
  }

  componentDidMount() {
    this.getJobData()
  }

  formattedData = data => ({
    companyLogoUrl: data.company_logo_url,
    companyWebsiteUrl: data.company_website_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    packagePerAnnum: data.package_per_annum,

    rating: data.rating,
    title: data.title,
    location: data.location,
  })

  formattedSkills = skill => ({
    name: skill.name,
  })

  getJobData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)

    if (response.ok) {
      const fetchData = await response.json()
      console.log(fetchData)
      const updatedData = this.formattedData(fetchData.job_details)
      const updatedSkills = this.formattedSkills(fetchData.job_details.skills)
      this.setState({jobsData: updatedData})
      this.setState({jobsSkills: updatedSkills})
    }
  }

  render() {
    const {jobsData, jobsSkills} = this.state
    console.log(jobsSkills)
    const {name} = jobsSkills
    const {
      employmentType,
      packagePerAnnum,
      rating,
      title,
      location,
      companyLogoUrl,
      jobDescription,
    } = jobsData
    return (
      <>
        <Header />
        <div className="bg-container">
          <div className="specific-container">
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
                <p className="skills">{name}</p>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}
export default JobItemDetails
