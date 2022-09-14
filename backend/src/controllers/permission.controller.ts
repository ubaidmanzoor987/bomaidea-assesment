import { NextFunction, Request, Response } from "express";
import PermissionService from "../services/permission.service";

class PermissionsController {
  public permissionsService = new PermissionService();

  public getPermissionsByUserId = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const {userid: userId} = req.headers;
      const permissions: string[] = await this.permissionsService.getUserPermissions(
        Number(userId)
      );

      res
        .status(200)
        .json({
          data: permissions,
          message: "Successfully retrieved permissions",
        });
    } catch (error) {
      next(error);
    }
  };

}

export default PermissionsController;
