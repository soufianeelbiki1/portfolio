import { renderToString } from 'react-dom/server';
import { Portfolio } from './portfolio';

export const render = () => renderToString(<Portfolio />);
