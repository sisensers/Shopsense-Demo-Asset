import React from "react";
import { ExecuteQuery, Chart } from "@sisense/sdk-ui";
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
      {(data: Data) => {
        if (children) {
          return children(data);
        }
        return null;
      }}
    </ExecuteQuery>
  );
};

export default ExecuteQueryComponent;
