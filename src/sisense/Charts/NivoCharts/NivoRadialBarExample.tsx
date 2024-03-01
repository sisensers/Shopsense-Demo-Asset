import { useState } from "react";

import { ButtonGroup } from "../../../components/ButtonGroup";
import { ExecuteQuery, QueryState } from "@sisense/sdk-ui";
import * as DM from "../../Schemas/old-ecommerce";
import CodeHighlight from "../../../components/CodeHighlight";
import CodeBlock from "../../../components/CodeBlock";
import SubTitle from "../../../components/SubTitle";
import Paragraph from "../../../components/Paragraph";
import { Data, Filter, measureFactory } from "@sisense/sdk-data";

import { ResponsiveRadialBar } from "@nivo/radial-bar";

type Props = {
  filters: Filter;
};

export default function ExecuteQueryChart(props: Props) {
  const [view, setView] = useState("Preview");

  return (
    <CodeHighlight uniqueKey={view}>
      <article className="my-8">
        <header className="flex items-baseline">
          <ButtonGroup selected={view} onChange={setView} labels={["Preview", "React"]} />
        </header>

        {view === "Preview" && (
          <ExecuteQuery
            dataSource={DM.DataSource}
            dimensions={[DM.Commerce.Date.Years, DM.Commerce.Gender]}
            measures={[
              measureFactory.sum(DM.Commerce.Revenue, "Total Revenue"),
              measureFactory.sum(DM.Commerce.Cost, "Total Cost"),
            ]}
            filters={[props.filters]}
          >
            {(queryState: QueryState) => {
              if (queryState.isLoading) {
                return <div>Loading...</div>;
              }

              if (queryState.error) {
                return <div>Error: {queryState.error.message}</div>;
              }

              const data: Data = queryState.data;

              console.log("Nivo Radial Bar Sisense Data");
              console.log(data);

              const nivoData = TranslateSisenseDataToD3(data);

              return (
                <div style={{ height: 600 }}>
                  <ResponsiveRadialBar
                    data={nivoData}
                    valueFormat=">-.2f"
                    padding={0.4}
                    cornerRadius={2}
                    margin={{ top: 40, right: 120, bottom: 40, left: 40 }}
                    radialAxisStart={{ tickSize: 5, tickPadding: 5, tickRotation: 0 }}
                    circularAxisOuter={{ tickSize: 5, tickPadding: 12, tickRotation: 0 }}
                    legends={[
                      {
                        anchor: "right",
                        direction: "column",
                        justify: false,
                        translateX: 80,
                        translateY: 0,
                        itemsSpacing: 6,
                        itemDirection: "left-to-right",
                        itemWidth: 100,
                        itemHeight: 18,
                        itemTextColor: "#999",
                        symbolSize: 18,
                        symbolShape: "square",
                        effects: [
                          {
                            on: "hover",
                            style: {
                              itemTextColor: "#000",
                            },
                          },
                        ],
                      },
                    ]}
                  />
                </div>
              );
            }}
          </ExecuteQuery>
        )}

        {view === "React" && (
          <CodeBlock language="tsx">
            {`import { useState } from "react";
import { ExecuteQuery } from "@sisense/sdk-ui";
import * as DM from "../../Schemas/old-ecommerce";
import { Data, Filter, measures } from "@sisense/sdk-data";

import { ResponsiveRadialBar } from "@nivo/radial-bar";

type Props = {
  filters: Filter;
};

export default function ExecuteQueryChart(props: Props) {
  const [view, setView] = useState("Preview");

  return (
      <article className="my-8">
        <header className="flex items-baseline">
          <ButtonGroup selected={view} onChange={setView} labels={["Preview", "React"]} />
        </header>

        {view === "Preview" && (
          <ExecuteQuery
            dataSource={DM.DataSource}
            dimensions={[DM.Commerce.Date.Years, DM.Commerce.Gender]}
            measures={[
              measures.sum(DM.Commerce.Revenue, "Total Revenue"),
              measures.sum(DM.Commerce.Cost, "Total Cost"),
            ]}
            filters={[props.filters]}
          >
            {(data: Data) => {
              console.log("Nivo Radial Bar Sisense Data");
              console.log(data);
              const nivoData = TranslateSisenseDataToD3(data);

              return (
                <div style={{ height: 600 }}>
                  <ResponsiveRadialBar
                    data={nivoData}
                    valueFormat=">-.2f"
                    padding={0.4}
                    cornerRadius={2}
                    margin={{ top: 40, right: 120, bottom: 40, left: 40 }}
                    radialAxisStart={{ tickSize: 5, tickPadding: 5, tickRotation: 0 }}
                    circularAxisOuter={{ tickSize: 5, tickPadding: 12, tickRotation: 0 }}
                    legends={[
                      {
                        anchor: "right",
                        direction: "column",
                        justify: false,
                        translateX: 80,
                        translateY: 0,
                        itemsSpacing: 6,
                        itemDirection: "left-to-right",
                        itemWidth: 100,
                        itemHeight: 18,
                        itemTextColor: "#999",
                        symbolSize: 18,
                        symbolShape: "square",
                        effects: [
                          {
                            on: "hover",
                            style: {
                              itemTextColor: "#000",
                            },
                          },
                        ],
                      },
                    ]}
                  />{" "}
                </div>
              );
            }}
          </ExecuteQuery>
        )}
function TranslateSisenseDataToD3(data: Data) {
  interface Row {
    [key: string]: any;
  }
  interface D3DataId {
    id: string;
    color?: string;
    data: XY[];
  }
  type D3Data = Array<D3DataId>;
  interface XY {
    x: string;
    y: number;
  }

  const d3Data: D3Data = [];
  const ids: Array<string> = [];
  data.rows.forEach((row: Row) => {
    //If empty add first element with Id
    if (d3Data.length === 0 || !ids.includes(row[1].data)) {
      ids.push(row[1].data);
      const d3DataId = {
        id: row[1].data,
        data: [
          {
            x: row[0].text,
            y: row[3].data,
          },
        ],
      };
      d3Data.push(d3DataId);
    } else {
      //if id for breakby already exists then add to that list
      const pos = ids.indexOf(row[1].data);
      d3Data[pos].data.push({ x: row[0].text, y: row[3].data });
    }
  });
  console.log("Nivo Radial Bar After Transformation");
  console.log(d3Data);
  return d3Data;
}
`}
          </CodeBlock>
        )}
      </article>
    </CodeHighlight>
  );
}

function TranslateSisenseDataToD3(data: Data) {
  interface Row {
    [key: string]: any;
  }
  interface D3DataId {
    id: string;
    color?: string;
    data: XY[];
  }
  type D3Data = Array<D3DataId>;
  interface XY {
    x: string;
    y: number;
  }

  const d3Data: D3Data = [];
  const ids: Array<string> = [];
  data.rows.forEach((row: Row) => {
    //If empty add first element with Id
    if (d3Data.length === 0 || !ids.includes(row[1].data)) {
      ids.push(row[1].data);
      const d3DataId = {
        id: row[1].data,
        data: [
          {
            x: row[0].text,
            y: row[3].data,
          },
        ],
      };
      d3Data.push(d3DataId);
    } else {
      //if id for breakby already exists then add to that list
      const pos = ids.indexOf(row[1].data);
      d3Data[pos].data.push({ x: row[0].text, y: row[3].data });
    }
  });
  console.log("Nivo Radial Bar After Transformation");
  console.log(d3Data);
  return d3Data;
}
