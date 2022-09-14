import { Project, PrismaClient, Task } from "@prisma/client";
import { ProjectEnumType } from "../interfaces/project.interface";
import PermissionService from "./permission.service";

type IProjectRequest = {
  filterBy?: string;
  filterValue: ProjectEnumType;
  orderBy?: string;
  orderType?: "desc" | "asc";
};

class ProjectService {
  public prisma;
  public permission;
  constructor() {
    this.prisma = new PrismaClient();
    this.permission = new PermissionService();
  }

  async findAllProjects(
    { filterBy, orderBy, filterValue, orderType }: IProjectRequest,
    userId: any
  ): Promise<Project[]> {
    if (!userId) {
      throw new Error("userId is required");
    }
    const userProjects = await this.prisma.access.findMany({
      where: {
        permit: "Read",
        user_id: userId,
      },
    });
    if (!userProjects.length) {
      throw new Error("user has no projects or invalid user id");
    }
    const projectIds = userProjects.map((pro) => pro.project_id);
    const projects = await this.prisma.project.findMany({
      where: {
        ...(filterBy && { state: filterValue }),
        id: {
          in: projectIds,
        },
      },
      orderBy: orderBy
        ? {
            [orderBy]: orderType,
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
    const findProject = await this.findProjectById(projectId);
    if (!findProject) throw new Error("invalid projectId");

    await this.prisma.project.delete({
      where: {
        id: projectId,
      },
    });

    return findProject;
  }

  public async updateProject(
    projectId: number | any,
    projectData: {
      name?: any;
      state?: any;
      date?: any;
    }
  ): Promise<Project> {
    const { name, state, date } = projectData;

    const findProject = await this.findProjectById(projectId);
    if (!findProject) throw new Error("invalid projectId");

    const project = await this.prisma.project.update({
      data: {
        ...(name && { name }),
        ...(state && { state }),
        ...(date && { date }),
      },
      where: {
        id: projectId,
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
    projectId?: any;
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
