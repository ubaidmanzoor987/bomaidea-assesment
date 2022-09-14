

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
    this.router.get(`${this.path}/:id(\\d+)`, permit(["Read"]), this.projectController.getProjectById);
    this.router.post(`${this.path}`, permit(["Create"]), this.projectController.createProject);
    this.router.put(`${this.path}/:id(\\d+)`, permit(["Update"]), this.projectController.updateProject);
    this.router.delete(`${this.path}/:id(\\d+)`, permit(["Delete"]), this.projectController.deleteProject);
  }
}

export default ProjectRoute;