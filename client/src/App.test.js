import React from "react";
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from "axios";
import App from './App';
const responseMock = require('./response.json');

delete window.matchMedia
window.matchMedia = (query) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: jest.fn(),
  removeListener: jest.fn(),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn(),
})

afterEach(() => {
  axios.post.mockClear();
});

function mockCall() {
  axios.post.mockResolvedValueOnce({
    data: responseMock
  });
}

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Nate DOM Parser/i);
  expect(linkElement).toBeInTheDocument();
});

/*
  Tests base case scenario for changing input, clicking search and displaying results
*/
test("render word count from url", async () => {
  const { getAllByTestId, getByPlaceholderText, getByText } = render(<App />);

  mockCall();

  const searchInput = getByPlaceholderText('Search URL');

  fireEvent.change(searchInput, { target: { value: 'http://www.paulgraham.com/index.html' } })

  const searchButton = getByText('Search');

  fireEvent.click(searchButton);
  
  await waitFor(() => expect(getAllByTestId('word-row')).toHaveLength(Object.keys(responseMock.urlWordCount).length));

  expect(axios.post).toHaveBeenCalledTimes(1);
});