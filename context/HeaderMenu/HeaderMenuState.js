import React, {useReducer} from 'react';
//import axios from 'axios';

import HeaderMenuContext from './HeaderMenuContext';
import HeaderMenuReducer from './HeaderMenuReducer';

import {HOME_PAGE, CREATE_NOTE_PAGE} from '../types';

const HeaderMenuState = props => {
  const initialState = {
    HeaderMenuShow: null,
  };

  const [state, dispatch] = useReducer(HeaderMenuReducer, initialState);

  const homePage = () => {
    let element = 'home';
    dispatch({type: HOME_PAGE, payload: element});
  };

  const createNotePage = () => {
    let element = 'create note';
    dispatch({type: CREATE_NOTE_PAGE, payload: element});
  };

  return (
    <HeaderMenuContext.Provider
      value={{
        HeaderMenuShow: state.HeaderMenuShow,
        homePage,
        createNotePage,
      }}>
      {props.children}
    </HeaderMenuContext.Provider>
  );
};

export default HeaderMenuState;
