import { PrismaClient } from "@prisma/client";

class PermissionService {
  public prisma;
  constructor() {
    this.prisma = new PrismaClient();
  }

  async getUserPermissions(userId: any, projectId?: any): Promise<string[]> {
    console.log("userid asdasdas", userId, projectId)
    const accessData = await this.prisma.access.findMany({
      where: {
        user_id: Number(userId),
        ...(projectId && { project_id: Number(projectId) }),
      },
    });
    const permissions = accessData.map((x) => x.permit);

    return permissions;
  }
}

export default PermissionService;
