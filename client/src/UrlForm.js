/* eslint-disable default-case */
import React, { useState } from 'react';
import { Input, Space, Spin, Radio } from 'antd';
const { Search } = Input;

const UrlForm = ({
    handleUrlChange,
    isLoading
}) => {
    const [sort, setSort] = useState('unsorted')

    const options = [
        { label: 'Unsorted', value: 'unsorted' },
        { label: 'Alphabetic', value: 'alphabetic' },
        { label: 'Frequency', value: 'frequency' },
    ];

    const handleSort = (e) => {
        setSort(e.target.value);
    }

    const searchUrl = (url) => {
        handleUrlChange(url, sort)
    }

    return (
        <Space direction="vertical" style={{ height: "120px", width: "500px", marginRight: "50px", marginLeft: "50px", marginTop: "30px" }}>
            <Search
              placeholder="Search URL"
              allowClear
              enterButton="Search"
              size="large"
              onSearch={searchUrl}
              disabled={false}
            />
            <Radio.Group
                options={options}
                onChange={handleSort}
                value={sort}
                optionType="button"
                buttonStyle="solid"
            />
            {isLoading && <Spin />}
        </Space>
    )
}

export default UrlForm;