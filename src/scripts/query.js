import {fromArray} from 'bm-random';

export const randomItem = state => fromArray(state.sentences);