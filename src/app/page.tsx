import { ReactFlowProvider } from "@xyflow/react";
import React from "react";

import { FlowBuilder } from "@/components/flow-builder";

interface Props {}

const HomePage = (_props: Props) => {
  return (
    <div className="h-screen w-full overflow-hidden">
      <ReactFlowProvider>
        <FlowBuilder />
      </ReactFlowProvider>
    </div>
  );
};

export default HomePage;
