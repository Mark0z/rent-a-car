import { act, renderHook, waitFor } from '@testing-library/react';
import { useAxios } from './useAxios';
import axios from 'axios';

jest.mock('axios');

describe('useAxios', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return data successfully', async () => {
    const mockedResponse = {
      data: [
        {
          message: 'successfully',
          code: 1234
        }
      ]
    };
    axios.get.mockResolvedValueOnce(mockedResponse);

    const { result } = renderHook(() => useAxios('test-url'));

    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBe(false);
    expect(result.current.data).toEqual([]);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual(mockedResponse.data);
    expect(axios.get).toHaveBeenCalledWith('test-url');
  });

  it('should handle error', async () => {
    const mockError = new Error('Network error');
    axios.get.mockRejectedValueOnce(mockError);

    const { result } = renderHook(() => useAxios('test-url'));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toEqual(mockError);
    expect(result.current.data).toEqual([]);
  });

  it('should handle refetch data', async () => {
    const initialResponse = {
      data: [{ id: 1 }]
    };

    const updatedResponse = {
      data: [{ id: 2 }]
    };

    axios.get.mockResolvedValueOnce(initialResponse).mockResolvedValueOnce(updatedResponse);

    const { result, rerender } = renderHook(() => useAxios('test-url'));

    await waitFor(() => {
      expect(result.current.data).toEqual(initialResponse.data);
    });

    await act(async () => {
      result.current.setRefresh(Date.now());
      rerender();
    });

    await waitFor(() => {
      expect(result.current.data).toEqual(updatedResponse.data);
    });

    expect(axios.get).toHaveBeenCalledTimes(2);
  });
});
