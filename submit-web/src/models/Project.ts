export type Project = {
  id: number;
  name: string;
  proponent_id: number;
  proponent_name: string;
  ea_certificate?: string;
};

export type AccountProject = {
  id: number;
  project_id: number;
  account_id: number;
  project: Project;
};
