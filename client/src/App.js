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

  const handleUrlChange = async(value) => {
    if (!validURL(value)) {
      setIsInvalidUrl(true)
      return;
    }

    setIsLoading(true);

    console.log('url', value)

    try {
      const urlResponse = await axios.post('http://localhost:3001/api', {
        url: value
      })      

      setUrlResHistory(prevState => {
        return [{
          url: value,
          wordCount: urlResponse.data.urlWordCount
        }, ...prevState]
      });
      setIsLoading(false);

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
          <Layout>
            <Content>
              <UrlForm 
                handleUrlChange={handleUrlChange}
                isLoading={isLoading}
              />
              <UrlDisplay 
                urlResHistory={urlResHistory}
                isInvalidUrl={isInvalidUrl}
              />
            </Content>
          </Layout>
          <Footer style={{ textAlign: 'center' }}>Nate ©2021 Created by Tolga Mizrakci</Footer>
        </Layout>
      </header>
    </div>
  );
}

export default App;
