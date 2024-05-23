import './style.scss';
import App from './app/app';
import useToken from './services/use-token';

sessionStorage.clear();

const app = new App();
app.init();

useToken.anonymous.access.set();
