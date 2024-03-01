import React from "react";
import { ExecuteQuery, Chart, QueryState } from "@sisense/sdk-ui";
import { Data, measureFactory } from "@sisense/sdk-data";
import * as DM from "sisense/Schemas/ecommerce-master";

interface ExecuteQueryComponentProps {
  dimension: string;
  measure: string;
  children?: (data: Data) => React.ReactNode;
}

const ExecuteQueryComponent: React.FC<ExecuteQueryComponentProps> = ({
  dimension,
  measure,
  children,
}) => {
  return (
    <ExecuteQuery
      dataSource={DM.DataSource}
      dimensions={[DM.Commerce[dimension]]}
      measures={[measureFactory.sum(DM.Commerce[measure], measure)]}
      filters={[]}
    >
      {(queryState: QueryState) => {
        if (queryState.isLoading) {
          return <div>Loading...</div>;
        }

        if (queryState.error) {
          return <div>Error: {queryState.error.message}</div>;
        }

        // Access queryState.data for Data
        const data: Data = queryState.data;

        if (children) {
          return children(data);
        }

        return null;
      }}
    </ExecuteQuery>
  );
};

export default ExecuteQueryComponent;
