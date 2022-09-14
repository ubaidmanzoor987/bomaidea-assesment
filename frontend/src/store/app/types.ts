
export interface IProject {
  id: string;
  name: string;
  state: string;
  date: string;
}
export interface appState {
  pending: boolean;
  userId: string;
  isBack: boolean;
  error: string | undefined;
  projects: IProject[],
  projectId: string;
}