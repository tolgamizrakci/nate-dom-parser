import React from 'react';
import { Result, Tabs, List, Button } from 'antd';
const { TabPane } = Tabs;

/*
  Tabs to display the result of the URL search response
*/
const UrlDisplay = ({
    isInvalidUrl,
    urlResHistory,
    setIsInvalidUrl
}) => {

    return (
        <div style={{padding: '50px', paddingBottom: '100px', paddingTop: '10px'}}>
            {isInvalidUrl && (
                <Result
                    status="500"
                    title="Wrong URL format"
                    subTitle="Please enter a correct URL"
                    extra={<Button type="primary" onClick={() => setIsInvalidUrl(false)}>Close</Button>}
            />  
            )}
            <Tabs defaultActiveKey="1">
                {urlResHistory.map((urlRes, i) => {
                    return (
                        <TabPane tab={urlRes.url} key={urlRes.url + i}>
                            <List
                                header={<div>Words</div>}
                                bordered={true}
                                dataSource={Object.keys(urlRes.wordCount).map(key => (
                                    `${key}: ${urlRes.wordCount[key]}`
                                ))}
                                renderItem={item => (
                                    <List.Item data-testid="word-row">
                                        {item}
                                    </List.Item>
                                )}
                            />
                        </TabPane>
                    )
                })}
            </Tabs>
        </div>
    )
}

export default UrlDisplay;
