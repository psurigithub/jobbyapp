import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import JobItem from '../JobItem'
import FilteredList from '../FilteredList'
import EmployeeSalaryRange from '../EmployeeSalaryRange'
import UserProfile from '../UserProfile'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CategoryList extends Component {
  state = {
    AllJobs: [],
    status: apiStatusConstants.initial,
    searchInput: '',
    activeEmploymentTypeId: '',
    activeSalaryRangeId: '',
  }

  componentDidMount() {
    this.getAllJobs()
  }

  getAllJobs = async () => {
    this.setState({status: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {
      searchInput,
      activeEmploymentTypeId,
      activeSalaryRangeId,
    } = this.state

    const url = `https://apis.ccbp.in/jobs?search=${searchInput}&employment_type=${activeEmploymentTypeId}&minimum_package=${activeSalaryRangeId}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)

    if (response.ok) {
      const fetchedData = await response.json()

      const updatedData = fetchedData.jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      this.setState({AllJobs: updatedData, status: apiStatusConstants.success})
    } else {
      this.setState({status: apiStatusConstants.failure})
    }
  }

  changeEmployeeId = activeEmploymentTypeId => {
    this.setState({activeEmploymentTypeId}, this.AllJobs)
  }

  changeSalaryRangeId = activeSalaryRangeId => {
    this.setState({activeSalaryRangeId}, this.AllJobs)
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  enterOnchangeSearchInput = event => {
    if (event.key === 'Enter') {
      this.getAllJobs()
    }
  }

  renderProductsView = () => {
    const {AllJobs} = this.state

    return (
      <div className="AllJobs-container">
        <ul className="AllJobs-List">
          {AllJobs.map(eachItem => (
            <JobItem jobItemDetails={eachItem} key={eachItem.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt=" no jobs"
        className="no-jobs"
      />
      <h1 className="failure-heading">No Jobs Found</h1>
      <p className="failure-paragraph">
        We could not find any jobs.Try other filters
      </p>
    </div>
  )

  renderLoadingView = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderAllProducts = () => {
    const {status} = this.state

    switch (status) {
      case apiStatusConstants.success:
        return this.renderProductsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {searchInput, activeEmploymentTypeId} = this.state
    return (
      <div className="All-sections">
        <div className="filtered-list">
          <UserProfile />
          <hr className="line" />
          <h1 className="employee-heading">Type of Employment</h1>
          {employmentTypesList.map(eachItem => (
            <FilteredList
              employmentTypesList={eachItem}
              key={eachItem.employmentTypeId}
              activeEmploymentTypeId={activeEmploymentTypeId}
              changeEmployeeId={this.changeEmployeeId}
              onChangeInput={this.enterOnchangeSearchInput}
            />
          ))}
          <hr className="line" />
          <h1 className="salary-heading">Salary Range</h1>
          {salaryRangesList.map(eachSalary => (
            <EmployeeSalaryRange
              employmentSalaryRange={eachSalary}
              key={eachSalary.salaryRangeId}
              changeSalaryRangeId={this.changeSalaryRangeId}
            />
          ))}
        </div>
        <div className="All-products">
          <div className="search-input-container">
            <input
              type="search"
              className="search-input"
              placeholder="Search"
              onChange={this.onChangeSearchInput}
              onKeyDown={this.enterOnchangeSearchInput}
              value={searchInput}
            />
            <BsSearch className="search-icon" />
          </div>
          {this.renderAllProducts()}
        </div>
      </div>
    )
  }
}

export default CategoryList
