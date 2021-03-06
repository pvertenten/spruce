import gql from "graphql-tag";

export const GET_PROJECTS = gql`
  {
    projects {
      favorites {
        identifier
        repo
        owner
        displayName
      }
      otherProjects {
        name
        projects {
          identifier
          repo
          owner
          displayName
        }
      }
    }
  }
`;

export interface Project {
  displayName: string;
  repo: string;
  owner: string;
  identifier: string;
}

interface GroupedProjects {
  name: string;
  projects: Project[];
}

interface Projects {
  favorites: Project[];
  otherProjects: GroupedProjects[];
}

export interface ProjectsQuery {
  projects: Projects;
}
