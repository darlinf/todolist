import React, {useReducer} from 'react';
//import axios from 'axios';

import HeaderMenuContext from './HeaderMenuContext';
import HeaderMenuReducer from './HeaderMenuReducer';

import {
  HOME_PAGE,
  CREATE_NOTE_PAGE,
  EDIT_NOTE_PAGE,
  FILTER_BY_TYPE,
} from '../types';

const HeaderMenuState = props => {
  const initialState = {
    HeaderMenuShow: null,
    taskType: null,
  };

  const [state, dispatch] = useReducer(HeaderMenuReducer, initialState);

  const filterTaskByType = params => {
    dispatch({type: FILTER_BY_TYPE, payload: params});
  };

  const homePage = () => {
    let element = 'home';
    dispatch({type: HOME_PAGE, payload: element});
  };

  const createNotePage = () => {
    let element = 'create note';
    dispatch({type: CREATE_NOTE_PAGE, payload: element});
  };

  const editNotePage = () => {
    let element = 'edit note';
    dispatch({type: EDIT_NOTE_PAGE, payload: element});
  };

  return (
    <HeaderMenuContext.Provider
      value={{
        HeaderMenuShow: state.HeaderMenuShow,
        taskType: state.taskType,
        homePage,
        createNotePage,
        editNotePage,
        filterTaskByType,
      }}>
      {props.children}
    </HeaderMenuContext.Provider>
  );
};

export default HeaderMenuState;
