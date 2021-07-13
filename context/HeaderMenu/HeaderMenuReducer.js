import {
  HOME_PAGE,
  CREATE_NOTE_PAGE,
  EDIT_NOTE_PAGE,
  FILTER_BY_TYPE,
} from '../types';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
  const {payload, type} = action;

  switch (type) {
    case HOME_PAGE:
      return {
        ...state,
        HeaderMenuShow: payload,
      };
    case CREATE_NOTE_PAGE:
      return {
        ...state,
        HeaderMenuShow: payload,
      };
    case EDIT_NOTE_PAGE:
      return {
        ...state,
        HeaderMenuShow: payload,
      };
    case FILTER_BY_TYPE:
      return {
        ...state,
        taskType: payload,
      };
    default:
      return state;
  }
};
