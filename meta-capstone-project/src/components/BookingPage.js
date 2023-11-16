import React, { useReducer, useEffect } from 'react';
import BookingForm from './BookingForm';
import { Link } from 'react-router-dom';

const fetchData = async (date) => {
  // Replace this with your actual API call
  return ['17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];
};

export function reducer(state, action) {
  switch (action.type) {
    case 'UPDATE_TIMES':
      return { ...state, availableTimes: action.availableTimes };
    default:
      return state;
  }
}

export async function updateTimes(selectedDate, dispatch) {
  try {
    const availableTimes = await fetchData(selectedDate);
    dispatch({ type: 'UPDATE_TIMES', availableTimes });
  } catch (error) {
    console.error('Error fetching available times:', error);
  }
}

export async function initializeTimes(dispatch) {
  try {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    await updateTimes(formattedDate, dispatch);
  } catch (error) {
    console.error('Error initializing available times:', error);
  }
}

export const initialState = {
  availableTimes: [],
};

export default function BookingPage() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    initializeTimes(dispatch);
  }, []);

  return (
    <div>
      <h1>Booking Page</h1>
      <Link to="/">Return</Link>
      <BookingForm
        availableTimes={state.availableTimes}
        setAvailableTimes={(selectedDate) =>
          updateTimes(selectedDate, dispatch)
        }
      />
    </div>
  );
}
