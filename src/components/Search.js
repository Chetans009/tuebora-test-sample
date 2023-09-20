import {useState} from 'react';

import {BiSearch} from 'react-icons/bi'

const Search = props => {
    const [search, setSearch] = useState('');

    const onChangeSearchHandler = (e) => {
        setSearch(e.target.value);
        props.onSearch(e.target.value);
    }
    
    return (
        <div className="w-[70%] my-4 mx-2">
            <div className="form-group has-search">
                <span className="form-control-feedback pt-2.5 ml-3 font-bold text-black"><BiSearch /></span>
                <input type="text" className="form-control border-black" placeholder="Search" value={search} onChange={onChangeSearchHandler}/>
            </div>
        </div>
    )
}

export default Search;