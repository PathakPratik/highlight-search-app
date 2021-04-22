import React from "react";
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SearchBar, { SearchBarProps } from '../index';
import '@testing-library/jest-dom';
import dataRaw from "../../CardDataset.json";

const {
  sections: [{ assets: data }],
} = dataRaw;

const defaultProps: SearchBarProps = {
    setMusicData: jest.fn(),
    placeholder: 'start typing',
    data,
    option: ["title", "description", "keywords"]
};

describe('Search Banner Functionality', () => {
    beforeEach(() => {
      render(<SearchBar {...defaultProps} />);
    });
  
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    test('should display Search Bar with correct placeholder', () => {
      expect(screen.queryByPlaceholderText(/start typing/i)).toBeInTheDocument();
    });
  
    test('should set search result on change event', async () => {
      const input = screen.getByRole('textbox');
      fireEvent.change(input, { target: { value: 'holy' } })
  
      await waitFor(() => {
          expect(defaultProps.setMusicData).toHaveBeenCalledTimes(1);
      });
    });
  });
  