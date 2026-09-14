import { hydrateRoot } from 'react-dom/client';
import { Portfolio } from './portfolio';

const root = document.getElementById('portfolio-root');
if (root) hydrateRoot(root, <Portfolio />);
