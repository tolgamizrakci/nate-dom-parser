/* eslint-disable default-case */
import React from 'react';
import { Input, Space, Spin } from 'antd';
const { Search } = Input;

const UrlForm = ({
    handleUrlChange,
    isLoading
}) => {

    return (
        <Space style={{ height: "120px", width: "500px", marginRight: "50px", marginLeft: "50px", marginTop: "30px" }}>
            <Search
              placeholder="input search text"
              allowClear
              enterButton="Search"
              size="large"
              onSearch={handleUrlChange}
              disabled={false}
            />
            {isLoading && <Spin />}
        </Space>
    )
}

export default UrlForm;