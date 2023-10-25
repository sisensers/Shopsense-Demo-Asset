import React from "react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import typescript from "react-syntax-highlighter/dist/esm/languages/hljs/typescript";
import Prism from "prismjs";

import "react-syntax-highlighter/dist/esm/styles/hljs/docco"; // Add this line for docco style

SyntaxHighlighter.registerLanguage("typescript", typescript);

const CodeReference = () => {
  const codeString = `
<ExecuteQuery
  dataSource={DM.DataSource}
  dimensions={[DM.Commerce.DayOfWeek]}
  measures={[measures.sum(DM.Commerce.Revenue, "Revenue")]}
  filters={[filters.equals(DM.Brand.BrandName, "Versace")]}
>
  {(data: Data) => {
    console.log(data);
    const transformedData = TranslateSisenseDataToChartJS(data);
    return (
      <ReportsBarChart
        color="info"
        title="website views"
        description="Last Campaign Performance"
        date="campaign sent 2 days ago"
        chart={transformedData}
      />
    );
  }}
</ExecuteQuery>
  `;

  return (
    <div
      style={{ backgroundColor: "white", borderRadius: "8px", padding: "16px", overflow: "auto" }}
    >
      <SyntaxHighlighter language="typescript" style={docco}>
        {codeString.trim()}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeReference;
