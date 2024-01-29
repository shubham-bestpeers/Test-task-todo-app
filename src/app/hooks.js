// Import necessary hooks from React and Redux
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

// Custom hook: Get the dispatch function from Redux
export const useAppDispatch = () => useDispatch();

// Custom hook: Get selected state from the Redux store
export const useAppSelector = useSelector;

// Custom hook: Manage local component state
export const useCustomState = (initialValue) => useState(initialValue);

// Custom hook: Handle side effects in components
export const useCustomEffect = (effect, dependencies) => useEffect(effect, dependencies);
