import React, { useState } from 'react';
import axios from 'axios';
import { Layout, Typography } from 'antd';
import './App.css';
import UrlForm  from './UrlForm';
import UrlDisplay  from './UrlDisplay';
import validURL from './utils';

const { Text } = Typography;
const { Header, Footer, Content } = Layout;

function App() {
  const [urlResHistory, setUrlResHistory] = useState([]);
  const [isInvalidUrl, setIsInvalidUrl] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  /*
    Makes request to the server to search word count for URL DOM
  */
  const handleUrlChange = async (urlValue, sortType) => {

    if (!validURL(urlValue)) {
      setIsInvalidUrl(true)
      return;
    }
    setIsLoading(true);

    const queryParams = {};

    if (sortType === 'alphabetic' || sortType === 'frequency') {
      queryParams.sort = sortType;
    }

    try {
      const urlResponse = await axios.post('http://localhost:3001/api', {
        url: urlValue
      }, { params: queryParams })

      setUrlResHistory(prevState => {
        return [{
          url: urlValue,
          wordCount: urlResponse?.data?.urlWordCount
        }, ...prevState]
      });
      setIsLoading(false);
      setIsInvalidUrl(false);

    } catch (error) {
      setIsInvalidUrl(true);
      setIsLoading(false);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <Layout>
          <Header>
            <Text keyboard style={{color: 'white'}}>
              Nate DOM Parser
            </Text>
          </Header>
          <Layout style={{height: '100%'}}>
            <Content>
              <UrlForm 
                handleUrlChange={handleUrlChange}
                isLoading={isLoading}
              />
              <UrlDisplay 
                urlResHistory={urlResHistory}
                isInvalidUrl={isInvalidUrl}
                setIsInvalidUrl={setIsInvalidUrl}
              />
            </Content>
          </Layout>
          <Footer style={{ textAlign: 'center', position: 'fixed', bottom: 0, width: '100%' }}>Nate ©2021 Created by Tolga Mizrakci</Footer>
        </Layout>
      </header>
    </div>
  );
}

export default App;
