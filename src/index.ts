import './style.scss';
import App from './app/app';
import useToken from './services/use-token';

const app = new App();
app.init();

useToken.client.access.set();
