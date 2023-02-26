import './index.css'

const EmployeeSalaryRange = props => {
  const {employmentSalaryRange} = props
  const {label} = employmentSalaryRange
  const {changeSalaryRangeId} = props
  const onClickChangeSalary = () =>
    changeSalaryRangeId(employmentSalaryRange.salaryRangeId)

  return (
    <li className="salary-list">
      <label
        className="salary"
        onClick={onClickChangeSalary}
        key={employmentSalaryRange.salaryRangeId}
      >
        <input type="radio" className="checkbox" />

        {label}
      </label>
    </li>
  )
}

export default EmployeeSalaryRange
