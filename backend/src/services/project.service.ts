import { Project, PrismaClient } from "@prisma/client";
import { ProjectEnumType } from "../interfaces/project.interface";

type IProjectRequest = {
  filterBy?: string;
  filterValue: ProjectEnumType;
  orderBy?: string;
  orderType?: "desc" | "asc";
};

class ProjectService {
  public prisma;
  constructor() {
    this.prisma = new PrismaClient();
  }

  async findAllProjects({
    filterBy,
    orderBy,
    filterValue,
    orderType,
  }: IProjectRequest, userId: any): Promise<Project[]> {
    if (!userId) {
      throw new Error("userId is required");
    }
    const userProjects = await this.prisma.access.findMany({
      where: {
        permit: "Read",
        user_id: userId
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

  async findProjectById(projectId: any): Promise<Project> {
    const project = await this.prisma.project.findFirst({
      where: {
        id: projectId,
      },
    });
    if (!project) throw new Error("invalid projectId");

    return project;
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
}

export default ProjectService;
