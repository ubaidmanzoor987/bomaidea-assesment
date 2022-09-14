import { Project } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import ProjectService from "../services/project.service";

class ProjectController {
  public projectService = new ProjectService();

  public getProjects = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { userid: userId } = req.headers;
      const findAllProjects = await this.projectService.findAllProjects(
        req.body,
        Number(userId),
      );

      res
        .status(200)
        .json({
          data: findAllProjects,
          message: "Successfully retrieved projects",
        });
    } catch (error) {
      next(error);
    }
  };

  public getProjectById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const projectId = Number(req.params.id);
      if (!projectId) {
        throw new Error("projectid is required");
      }
      const project = await this.projectService.findProjectById(projectId);

      res
        .status(200)
        .json({ data: project, message: "successfully retrieved project" });
    } catch (error) {
      next(error);
    }
  };

  public createProject = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const projectData = req.body;
      const createProjectData: Project = await this.projectService.createProject(projectData);

      res.status(200).json({ data: createProjectData, message: `Project ${createProjectData.name} successfully created` });
    } catch (error) {
      next(error);
    }
  };

    public updateProject = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const projectId = Number(req.params.id);
        if (!projectId) {
          throw new Error("projectid is required");
        }
        const projectData = req.body;
        const updateProjectData: Project = await this.projectService.updateProject(projectId, projectData);

        res.status(200).json({ data: updateProjectData, message: `Project ${updateProjectData.name} successfully updated` });
      } catch (error) {
        next(error);
      }
    };

  public deleteProject = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const projectId = Number(req.params.id);
      if (!projectId) {
        throw new Error("projectid is required");
      }
      const deleteProjectData: Project = await this.projectService.deleteProject(projectId);

      res.status(200).json({ data: deleteProjectData, message: `Project ${deleteProjectData.name} successfully deleted` });
    } catch (error) {
      next(error);
    }
  };
}

export default ProjectController;
