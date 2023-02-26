import './index.css'

const FilteredList = props => {
  const {employmentTypesList} = props
  const {label} = employmentTypesList
  const {changeEmployeeId} = props
  const onClickEmpolyeeItem = () =>
    changeEmployeeId(employmentTypesList.employmentTypeId)

  return (
    <li className="employment-list">
      <label className="employee">
        <input
          type="checkbox"
          onClick={onClickEmpolyeeItem}
          key={employmentTypesList.employmentTypeId}
        />

        {label}
      </label>
    </li>
  )
}

export default FilteredList
