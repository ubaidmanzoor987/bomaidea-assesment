import { PROJECTS, PERMISSIONS } from '@/constants/api';
import { getErrorMessage } from '@/utils/helper';

import { postRequest, getRequest, putRequest, deleteRequest } from '../utils';

export const getAllProjects = async (userId: string) => {
  try {
    const resp = await getRequest(PROJECTS , {
      headers: {
        userId
      }
    });
    return { response: resp.data };
  } catch (err: any) {
    throw new Error(getErrorMessage(err));
  }
};

export const getProjectById = async (userId: string,projectId: string) => {
  try {
    const resp = await getRequest(`${PROJECTS}/${projectId}` , {
      headers: {
        userId
      }
    });
    return { response: resp.data };
  } catch (err: any) {
    throw new Error(getErrorMessage(err));
  }
};
