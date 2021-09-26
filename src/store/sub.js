import { createHook } from 'react-sweet-state';
import Store from './store';

export const useSweetState = createHook(Store);
