import { API_SIGNIN } from '@/constants/api';
import { ILoginRequest, ILoginResponse } from '@/store/auth/types';
import { getErrorMessage } from '@/utils/helper';

import { postRequest } from '../utils';

export const loginService = async ({
  accountId,
  channelType = 'email',
}: ILoginRequest): Promise<{
  response: ILoginResponse;
}> => {
  const data = {
    walletID: `${accountId}.near`,
    channelType: channelType,
  };

  try {
    const resp = await postRequest(API_SIGNIN, data);
    return { response: resp.data };
  } catch (err: any) {
    throw new Error(getErrorMessage(err));
  }
};
