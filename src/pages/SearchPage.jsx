import { Suspense } from 'react';
import { SearchComponent } from "../components/User/SearchComponent/SearchComponent";
import { Card } from "../components/UI/Card";
import { DataListComponent } from "../components/User/DataSummaryComponent/DataListComponent";
import { MetricsComponent } from "../components/User/MetricsComponent/MetricsComponent.jsx";
import { ApiContextProvider } from "../contexts/APIcontext";
import { SummaryMetricComponent } from "../components/User/SummaryMetricComponent/SummaryMetricComponent";

export const SearchPage = () => {
  return (
    <ApiContextProvider>
      <div className="w-full min-h-screen content-center bg-[#F7FAFF]">
        <div className="relative bg-indigo-700 h-56">
          <Card className="absolute mx-auto shadow-lg shadow-indigo-300 min-h-[22vh] w-[90%] top-[20%] left-0 right-0 md:w-[90%] md:top-[40%] lg:w-[50%] lg:top-[60%] lg:min-h-[15vh]">
            <SearchComponent />
          </Card>
        </div>
        <DataListComponent />
        <Suspense fallback={"Loading meteor data..."}>
          <SummaryMetricComponent />
          <MetricsComponent />
        </Suspense>
      </div>
    </ApiContextProvider>
  );
};
