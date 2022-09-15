

import { Router } from 'express';
import ProjcectController from '../controllers/project.controller';
import Route from '../interfaces/route.interface';
import permit from '../middlewares/permissions.middleware';

class ProjectRoute implements Route {
  public path = '/project';
  public router = Router();
  public projectController = new ProjcectController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.projectController.getProjects);
    this.router.post(`${this.path}`, this.projectController.createProject);
    this.router.get(`${this.path}/:id(\\d+)`, permit(["Read"]), this.projectController.getProjectById);
    this.router.put(`${this.path}`, permit(["Update"]), this.projectController.updateProject);
    this.router.delete(`${this.path}/:id(\\d+)`, permit(["Delete"]), this.projectController.deleteProject);
    this.router.post(`${this.path}/task`, permit(["Create"]), this.projectController.createTask);
  }
}

export default ProjectRoute;