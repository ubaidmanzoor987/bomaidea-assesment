import { Project, PrismaClient, Task } from "@prisma/client";
import { ProjectEnumType } from "../interfaces/project.interface";
import PermissionService from "./permission.service";

type IProjectRequest = {
  filterby?: string;
  filtervalue: ProjectEnumType;
  sortby?: string;
  sortorder?: "desc" | "asc";
  userid: any;
};

class ProjectService {
  public prisma;
  public permission;
  constructor() {
    this.prisma = new PrismaClient();
    this.permission = new PermissionService();
  }

  async findAllProjects({
    filterBy,
    sortby,
    filterValue,
    sortorder,
    userid: userId,
  }: IProjectRequest | any): Promise<Project[]> {
    if (!userId) {
      throw new Error("userId is required");
    }
    const userProjects = await this.prisma.access.findMany({
      where: {
        permit: "Read",
        user_id: Number(userId),
      },
    });
    if (!userProjects.length) {
      throw new Error("user has no projects or invalid user id");
    }
    console.log({sortby})
    const projectIds = userProjects.map((pro) => pro.project_id);
    const projects = await this.prisma.project.findMany({
      where: {
        ...(filterBy && { state: filterValue }),
        id: {
          in: projectIds,
        },
      },
      orderBy: sortby
        ? {
            [sortby]: sortorder,
          }
        : {
            id: "asc",
          },
    });

    return projects;
  }

  async findProjectById(
    projectId: any,
    userId?: any
  ): Promise<
    Project & {
      permissions: string[];
    }
  > {
    const permissions = await this.permission.getUserPermissions(
      Number(userId),
      Number(projectId)
    );
    const project = await this.prisma.project.findFirst({
      where: {
        id: projectId,
      },
    });
    if (!project) throw new Error("invalid projectId");

    return {
      ...project,
      permissions,
    };
  }

  public async deleteProject(projectId: number): Promise<Project> {
    const findProject = await this.prisma.project.findFirst({
      where: {
        id: projectId,
      },
    });
    if (!findProject) throw new Error("invalid projectId");

    await this.prisma.project.delete({
      where: {
        id: projectId,
      },
    });

    return findProject;
  }

  public async updateProject(projectData: {
    name?: any;
    state?: any;
    date?: any;
    projectid: number | any;
  }): Promise<Project> {
    const { name, state, date, projectid: projectId } = projectData;

    const projectFind = await this.prisma.project.findFirst({
      where: {
        id: Number(projectId),
      },
    });
    if (!projectFind) throw new Error("invalid projectId");

    const project = await this.prisma.project.update({
      data: {
        ...(name && { name }),
        ...(state && { state }),
        ...(date && { date }),
      },
      where: {
        id: Number(projectId),
      },
    });

    return project;
  }

  public async createProject(projectData: {
    name?: any;
    state?: any;
    date?: any;
  }): Promise<Project> {
    if (!projectData) throw new Error("invalid data in body");
    const { name, state, date } = projectData;

    const project = await this.prisma.project.create({
      data: {
        ...(name && { name }),
        ...(state && { state }),
        ...(date && { date: new Date(date) }),
      },
    });

    return project;
  }

  public async createTask(taskData: {
    name?: any;
    projectid?: any;
  }): Promise<Task> {
    const { name, projectid: projectId } = taskData;
    if (!projectId) {
      throw new Error("projectId is required");
    }

    if (!name) {
      throw new Error("name is required");
    }

    const task = await this.prisma.task.create({
      data: {
        name: name,
        project_id: projectId,
      },
    });

    return task;
  }
}

export default ProjectService;
