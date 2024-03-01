import { useState } from "react";

import { ButtonGroup } from "../../../components/ButtonGroup";
import { LineChart, ExecuteQuery, QueryState } from "@sisense/sdk-ui";
import * as DM from "../../Schemas/old-ecommerce";
import CodeHighlight from "../../../components/CodeHighlight";
import CodeBlock from "../../../components/CodeBlock";
import SubTitle from "../../../components/SubTitle";
import Paragraph from "../../../components/Paragraph";
import { Data, Filter, measureFactory } from "@sisense/sdk-data";

import {
  ResponsiveBump,
  BumpSerie,
  BumpDatum,
  BumpDataProps,
  BumpSerieExtraProps,
} from "@nivo/bump";

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
            dimensions={[DM.Commerce.Date.Years, DM.Commerce.AgeRange]}
            measures={[measureFactory.sum(DM.Commerce.Revenue, "Total Revenue")]}
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
              console.log("Nivo Bump Sisense Data Before Transformation");
              console.log(data);

              const nivoData = TranslateSisenseDataToD3(data);

              return (
                <div style={{ height: 600 }}>
                  <ResponsiveBump
                    data={nivoData}
                    colors={{ scheme: "paired" }}
                    lineWidth={3}
                    activeLineWidth={6}
                    inactiveLineWidth={3}
                    inactiveOpacity={0.15}
                    pointSize={10}
                    activePointSize={16}
                    inactivePointSize={0}
                    pointColor={{ theme: "background" }}
                    pointBorderWidth={3}
                    activePointBorderWidth={3}
                    pointBorderColor={{ from: "serie.color" }}
                    axisTop={{
                      tickSize: 5,
                      tickPadding: 5,
                      tickRotation: 0,
                      legend: "",
                      legendPosition: "middle",
                      legendOffset: -36,
                    }}
                    axisBottom={{
                      tickSize: 5,
                      tickPadding: 5,
                      tickRotation: 0,
                      legend: "",
                      legendPosition: "middle",
                      legendOffset: 32,
                    }}
                    axisLeft={{
                      tickSize: 5,
                      tickPadding: 5,
                      tickRotation: 0,
                      legend: "ranking",
                      legendPosition: "middle",
                      legendOffset: -40,
                    }}
                    margin={{ top: 40, right: 100, bottom: 40, left: 60 }}
                    axisRight={null}
                  />
                </div>
              );
            }}
          </ExecuteQuery>
        )}

        {view === "React" && (
          <CodeBlock language="tsx">
            {`import { useState } from "react";

import { ButtonGroup } from "../../../components/ButtonGroup";
import { ExecuteQuery } from "@sisense/sdk-ui";
import * as DM from "../../Schemas/old-ecommerce";
import CodeHighlight from "../../../components/CodeHighlight";
import CodeBlock from "../../../components/CodeBlock";
import { Data, Filter, measures } from "@sisense/sdk-data";

import {
  ResponsiveBump,
  BumpSerie,
  BumpDatum,
  BumpDataProps,
  BumpSerieExtraProps,
} from "@nivo/bump";

type Props = {
  filters: Filter;
};

export default function ExecuteQueryChart(props: Props) {
  const [view, setView] = useState("Preview");

  return (
        <header className="flex items-baseline">
          <ButtonGroup selected={view} onChange={setView} labels={["Preview", "React"]} />
        </header>

        {view === "Preview" && (
          <ExecuteQuery
            dataSource={DM.DataSource}
            dimensions={[DM.Commerce.Date.Years, DM.Commerce.AgeRange]}
            measures={[measures.sum(DM.Commerce.Revenue, "Total Revenue")]}
            filters={[props.filters]}
          >
            {(data: Data) => {
              console.log("Nivo Bump Sisense Data Before Transformation");
              console.log(data);
              const nivoData = TranslateSisenseDataToD3(data);

              return (
                <div style={{ height: 600 }}>
                  <ResponsiveBump
                    data={nivoData}
                    colors={{ scheme: "paired" }}
                    lineWidth={3}
                    activeLineWidth={6}
                    inactiveLineWidth={3}
                    inactiveOpacity={0.15}
                    pointSize={10}
                    activePointSize={16}
                    inactivePointSize={0}
                    pointColor={{ theme: "background" }}
                    pointBorderWidth={3}
                    activePointBorderWidth={3}
                    pointBorderColor={{ from: "serie.color" }}
                    axisTop={{
                      tickSize: 5,
                      tickPadding: 5,
                      tickRotation: 0,
                      legend: "",
                      legendPosition: "middle",
                      legendOffset: -36,
                    }}
                    axisBottom={{
                      tickSize: 5,
                      tickPadding: 5,
                      tickRotation: 0,
                      legend: "",
                      legendPosition: "middle",
                      legendOffset: 32,
                    }}
                    axisLeft={{
                      tickSize: 5,
                      tickPadding: 5,
                      tickRotation: 0,
                      legend: "ranking",
                      legendPosition: "middle",
                      legendOffset: -40,
                    }}
                    margin={{ top: 40, right: 100, bottom: 40, left: 60 }}
                    axisRight={null}
                  />
                </div>
              ); 
            }}
          </ExecuteQuery>
        )};

function TranslateSisenseDataToD3(data: Data) {
  interface Row {
    [key: string]: any;
  }
  const d3Data: BumpSerie<BumpDatum, BumpSerieExtraProps>[] = [];
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
            y: row[2].data,
          },
        ],
      };
      d3Data.push(d3DataId);
    } else {
      //if id for breakby already exists then add to that list
      const pos = ids.indexOf(row[1].data);
      d3Data[pos].data.push({ x: row[0].text, y: row[2].data });
    }
  });
  console.log("Nivo Bump Sisense Transformation");
  console.log(d3Data);

  //modify y value to be ranking
  var datePos = 0;

  //loop through date dimension
  while (datePos < d3Data[0].data.length) {
    //initialize counters for positions
    var holdingYValues: Array<number> = [];
    var dimPos = 0;
    //loop through all Y values for same x value
    while (dimPos < d3Data.length) {
      const y = d3Data[dimPos].data[datePos].y;
      holdingYValues.push(y);
      dimPos++;
    }
    var sorted = holdingYValues.slice().sort(function (a, b) {
      return a - b;
    });
    var ranks = holdingYValues.map(function (v) {
      return sorted.indexOf(v) + 1;
    });
    //loop through again and replace with ranking
    var dimPosSec = 0;
    while (dimPosSec < d3Data.length) {
      d3Data[dimPosSec].data[datePos].y = ranks[dimPosSec];
      dimPosSec++;
    }
    console.log("Nivo Bump After Ranking");
    console.log(d3Data);
    datePos++;
  }

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
  const d3Data: BumpSerie<BumpDatum, BumpSerieExtraProps>[] = [];
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
            y: row[2].data,
          },
        ],
      };
      d3Data.push(d3DataId);
    } else {
      //if id for breakby already exists then add to that list
      const pos = ids.indexOf(row[1].data);
      d3Data[pos].data.push({ x: row[0].text, y: row[2].data });
    }
  });
  console.log("Nivo Bump Sisense Transformation");
  console.log(d3Data);

  //modify y value to be ranking
  var datePos = 0;

  //loop through date dimension
  while (datePos < d3Data[0].data.length) {
    //initialize counters for positions
    var holdingYValues: Array<number> = [];
    var dimPos = 0;
    //loop through all Y values for same x value
    while (dimPos < d3Data.length) {
      const y = d3Data[dimPos].data[datePos].y;
      holdingYValues.push(y);
      dimPos++;
    }
    var sorted = holdingYValues.slice().sort(function (a, b) {
      return a - b;
    });
    var ranks = holdingYValues.map(function (v) {
      return sorted.indexOf(v) + 1;
    });
    //loop through again and replace with ranking
    var dimPosSec = 0;
    while (dimPosSec < d3Data.length) {
      d3Data[dimPosSec].data[datePos].y = ranks[dimPosSec];
      dimPosSec++;
    }
    console.log("Nivo Bump After Ranking");
    console.log(d3Data);
    datePos++;
  }

  return d3Data;
}
