import { NextFunction, Request, Response } from "express";
import PermissionService from "../services/permission.service";

const permissionService = new PermissionService();

export default function permit(permittedRoles: string[]) {
  // return a middleware
  return async (req: Request, res: Response, next: NextFunction) => {
    const { userid: userId } = req.headers;
    let projectId = Number(req.params.id);
    if (!userId) {
      res.status(403).json({ message: "userId is required" });
      return;
    }
    if (!projectId) {
      projectId = req.body.projectid;
    }

    if (!projectId) {
      res.status(403).json({ message: "projectId is required" });
      return;
    }
    const permissions = await permissionService.getUserPermissions(
      Number(userId),
      Number(projectId)
    );
    if (permissions.length === 0) {
      res.status(403).json({ message: "not enough permissions" });
      return;
    }
    let permitted: boolean = false;
    permittedRoles.forEach((permit) => {
      if (permissions.includes(permit) === true) {
        permitted = true;
      } else {
        permitted = false;
      }
    });
    if (!permitted) {
      res.status(403).json({ message: "not enough permissions" });
      return;
    }
    next();
  };
}
