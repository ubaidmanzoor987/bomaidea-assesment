import App from './app';
import IndexRoute from './routes/index.route';
import ProjectRoute from './routes/project.route';
import PermitRoute from './routes/permit.route';

const app = new App([new IndexRoute(), new ProjectRoute(), new PermitRoute()]);

app.listen();