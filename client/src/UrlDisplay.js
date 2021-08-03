import React from 'react';
import { Result, Tabs, List } from 'antd';
const { TabPane } = Tabs;


const UrlDisplay = ({
    isInvalidUrl,
    urlResHistory
}) => {

    return (
        <div style={{padding: '50px'}}>
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
            {isInvalidUrl && (
              <Result
                status="500"
                title="Wrong URL format"
                subTitle="Please enter a correct URL"
            />  
            )}
        </div>
    )
}

export default UrlDisplay;
