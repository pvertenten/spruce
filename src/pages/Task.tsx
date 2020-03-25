import React from "react";
import { useParams } from "react-router-dom";
import { TestsTable } from "pages/task/TestsTable";
import { FilesTables } from "./task/FilesTables";
import { BreadCrumb } from "components/Breadcrumb";
import { Logs } from "pages/task/Logs";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { H1 } from "components/Typography";
import {
  PageWrapper,
  SiderCard,
  PageHeader,
  PageContent,
  PageLayout,
  PageSider
} from "components/styles";
import { useDefaultPath, useTabs } from "hooks";
import { Tab } from "@leafygreen-ui/tabs";
import { StyledTabs } from "components/styles/StyledTabs";
import { paths } from "contants/routes";
import LogView from "lobster-logview";

enum TaskTab {
  Logs = "logs",
  Tests = "tests",
  Files = "files",
  BuildBaron = "build-baron"
}
const tabToIndexMap = {
  [TaskTab.Logs]: 0,
  [TaskTab.Tests]: 1,
  [TaskTab.Files]: 2,
  [TaskTab.BuildBaron]: 3
};
const DEFAULT_TAB = TaskTab.Logs;

const GET_TASK = gql`
  query GetTask($taskId: String!) {
    task(taskId: $taskId) {
      version
      displayName
      patchNumber
    }
  }
`;

interface TaskQuery {
  task: {
    version: string;
    displayName: string;
    patchNumber: number;
  };
}

export const Task: React.FC = () => {
  useDefaultPath(tabToIndexMap, paths.task, DEFAULT_TAB);
  const [selectedTab, selectTabHandler] = useTabs(
    tabToIndexMap,
    paths.task,
    DEFAULT_TAB
  );

  const { id } = useParams<{ id: string }>();
  const { data, loading, error } = useQuery<TaskQuery>(GET_TASK, {
    variables: { taskId: id }
  });

  if (loading) {
    return <div>"Loading..."</div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }
  const {
    task: { displayName, version, patchNumber }
  } = data;

  return (
    <PageWrapper>
      <BreadCrumb
        taskName={displayName}
        versionId={version}
        patchNumber={patchNumber}
      />
      <PageHeader>
        <H1>Current Task Name</H1>
      </PageHeader>
      <PageLayout>
        <PageSider>
          <SiderCard>Patch Metadata</SiderCard>
          <SiderCard>Build Variants</SiderCard>
        </PageSider>
        <PageLayout>
          <PageContent>
            <StyledTabs selected={selectedTab} setSelected={selectTabHandler}>
              <Tab name="Logs" id="task-logs-tab">
                <Logs />
                <LogView />
              </Tab>
              <Tab name="Tests" id="task-tests-tab">
                <TestsTable />
              </Tab>
              <Tab name="Files" id="task-files-tab">
                <FilesTables />
              </Tab>
            </StyledTabs>
          </PageContent>
        </PageLayout>
      </PageLayout>
    </PageWrapper>
  );
};
