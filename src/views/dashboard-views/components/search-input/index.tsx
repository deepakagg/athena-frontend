import React, { useState, useRef } from 'react';
import { 
	SearchOutlined
} from '@ant-design/icons';
import { AutoComplete, Input } from 'antd';


const SearchInput = (props: { active: any; close: any; isMobile: any; mode: any; }) => {
	const { close, isMobile, mode } = props
	const [value, setValue] = useState('');
	const [options, setOptions] = useState([])
	const inputRef = useRef(null);

	const onSelect = () => {
		setValue('')
		setOptions([])
		if(close) {
			close()
		}
  };

	const onSearch = (searchText: React.SetStateAction<string>) => {
		setValue(searchText)
	};

	return (
		<AutoComplete
			ref={inputRef} 
			className={`nav-search-input ${isMobile? 'is-mobile' : ''} ${mode === 'light' ? 'light' : ''}`}
			dropdownClassName="nav-search-dropdown"
			options={options}
			onSelect={onSelect}
			onSearch={onSearch}
			value={value}
		>
			<Input placeholder="Search..."  prefix={<SearchOutlined className="mr-0" />} />
		</AutoComplete>
	)
}

export default SearchInput
