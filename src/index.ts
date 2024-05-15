import './style.scss';
import App from './app/app';

sessionStorage.clear();

const app = new App();
app.init();
