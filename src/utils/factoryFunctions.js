/* eslint-disable arrow-parens */
export const findByIndex = (array, Index) => array.find((_, idx) => idx === Index);

export const findByEl = (array, El) => array.find(el => el === El);

export const mapArray = array => array.map(el => el);
