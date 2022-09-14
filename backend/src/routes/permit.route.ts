

import { Router } from 'express';
import PermissionController from '../controllers/permission.controller';
import Route from '../interfaces/route.interface';

class PermitRoute implements Route {
  public path = '/permissions';
  public router = Router();
  public permissionController = new PermissionController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.permissionController.getPermissionsByUserId);
  }
}

export default PermitRoute;