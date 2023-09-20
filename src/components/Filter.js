import {useState, useEffect} from 'react';
import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'

const Filter = props => {
    const [filterContent, setFilterContent] = useState({});
    const [date, setDate] = useState(new Date());

    const setFilterHandler = (name, value, filterObj) => {
        let filter = {...filterContent};
        if(value === '') {
            delete filter[filterObj.field];
        } else {
            filter[filterObj.field] = {
                searchValue: value,
                searchField: name
            }
        }

        console.log( value );

        if(filterObj.type === 'data'){
            setDate(value);
        }
        
        setFilterContent(filter);
    }

    useEffect(() => {
        props.searchByFilter(filterContent);
    }, [filterContent])


  return (
    <div className="w-[35%] my-4 mx-2">
      <div className="btn-group">
        <button type="button" className="btn btn-secondary">
          Filter by
        </button>
        <button
          type="button"
          className="btn btn-secondary dropdown-toggle dropdown-toggle-split"
          id="dropdownMenuReference"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          data-bs-reference="parent"
        >
          <span className="visually-hidden">Toggle Dropdown</span>
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuReference">
            {props.filterConfigs && props.filterConfigs.map((filter) => {
                if( filter.type === 'dropdown')
                    return(
                        <li className="w-full px-2 py-2" key={filter.name}>
                            <label className="capitalize">{filter.name}</label>
                            <select className="form-select py-2" aria-label="Default select example" onChange={(e) => setFilterHandler(filter.name, e.target.value, filter)}>
                                <option value="">Select</option>
                                {filter.values.map((value) => {
                                    return (
                                        <option value={value} key={value}>{value}</option>
                                    )
                                })}
                            </select>
                        </li>
                    )
                if( filter.type === 'text')
                    return( 
                        <li className="px-2 py-2">
                            <label className="capitalize">{filter.name}</label>
                            <input className="form-control form-control-sm py-2" type="text" onChange={(e) => setFilterHandler(filter.name, e.target.value, filter)}/>
                        </li>
                    )
                if( filter.type === 'date')
                return( 
                    <li className="flex flex-col px-2 py-2">
                        <label className="capitalize">{filter.name}</label>
                        <DatePicker className="form-control form-control-sm py-2" selected={date}  onChange={(date) => setFilterHandler(filter.name, date, filter)} />
                    </li>
                )
            })}
        </ul>
      </div>
    </div>
  );
};

export default Filter;
