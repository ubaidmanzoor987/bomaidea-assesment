export enum ProjectEnumType {
  Propose = "Propose",
  Open = "Open",
  Closed = "Closed",
}

export interface Project {
  id: number;
  name: string;
  state: ProjectEnumType;
  date: Date
}
