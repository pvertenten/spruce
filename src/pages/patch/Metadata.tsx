import React from "react";
import { P2 } from "components/Typography";
import { StyledLink } from "components/styles";
import { Patch } from "gql/queries/patch";
import { getUiUrl } from "utils/getEnvironmentVariables";
import { ApolloError } from "apollo-client";
import { MetadataCard } from "components/MetadataCard";

interface Props {
  loading: boolean;
  error: ApolloError;
  patch: Patch;
}

export const Metadata: React.FC<Props> = ({ loading, patch, error }) => {
  const { author, githash, version, time, duration } = patch || {};
  const { submittedAt, started, finished } = time || {};
  const { makespan, timeTaken } = duration || {};

  return (
    <MetadataCard loading={loading} error={error} title="Patch Metadata">
      <P2>Makespan: {makespan && makespan}</P2>
      <P2>Time taken: {timeTaken && timeTaken}</P2>
      <P2>Submitted at: {submittedAt}</P2>
      <P2>Started: {started && started}</P2>
      <P2>Finished: {finished && finished}</P2>
      <P2>{`Submitted by: ${author}`}</P2>
      <P2>
        <StyledLink
          id="patch-base-commit"
          href={`${getUiUrl()}/version/${version}`}
        >
          Base commit: {githash ? githash.slice(0, 10) : ""}
        </StyledLink>
      </P2>
    </MetadataCard>
  );
};
