import { Card } from "../../UI/Card";
import { useState, useMemo } from "react";
import { MeteoriteLine } from "./MeteoriteLine";
import { MeteoriteLineLoading } from "./MeteoriteLineLoading";
import { Pagination } from "../../UI/Pagination/Pagination";
import { ToggleButton } from "../../UI/ToggleButton";
import { useApiContext } from "../../../contexts/APIcontext";

export const DataListComponent = () => {
  const { filteredSearchInput, loading } = useApiContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState({ column: "", order: "asc" }); // Added sorting state

  const PageSize = 9;

  const currentTableData = useMemo(() => {
    const sortedData = [...filteredSearchInput];
    if (sortBy.column) {
      sortedData.sort((a, b) => {
        const valA = a[sortBy.column];
        const valB = b[sortBy.column];

        // Handle numeric sorting (mass)
        if (sortBy.column === "mass") {
          return sortBy.order === "asc" ? valA - valB : valB - valA;
        }

        // Handle date sorting (year)
        if (sortBy.column === "year") {
          const dateA = new Date(valA);
          const dateB = new Date(valB);
          return sortBy.order === "asc" ? dateA - dateB : dateB - dateA;
        }

        // Default sorting for other columns (string sorting)
        if (valA < valB) {
          return sortBy.order === "asc" ? -1 : 1;
        }
        if (valA > valB) {
          return sortBy.order === "asc" ? 1 : -1;
        }
        return 0;
      });
    }

    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return sortedData.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, filteredSearchInput, sortBy]);

  const handleToggleClick = (columnName) => {
    if (sortBy.column === columnName) {
      setSortBy({
        column: columnName,
        order: sortBy.order === "asc" ? "desc" : "asc",
      });
    } else {
      setSortBy({ column: columnName, order: "asc" });
    }
  };

  return (
    <div className="flex justify-between my-[120px] px-[20px]">
      <Card className="shadow-md shadow-indigo-200 w-full">
        <>
          <div className="block md:flex md:space-y-3 justify-between items-center pb-5 p-3">
            <h3 className="font-semibold text-black text-2xl">
              #{filteredSearchInput.length} Meteorites strikes
            </h3>
            <div className="flex">
              <ToggleButton
                name={"Name"}
                onClick={() => handleToggleClick("name")}
              />
              <ToggleButton
                name={"Recclass"}
                onClick={() => handleToggleClick("recclass")}
              />
              <ToggleButton
                name={"Mass"}
                onClick={() => handleToggleClick("mass")}
              />
              <ToggleButton
                name={"Year"}
                onClick={() => handleToggleClick("year")}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-2 max-h-[600px] overflow-auto">
            {loading && (
              <>
                <MeteoriteLineLoading />
                <MeteoriteLineLoading />
                <MeteoriteLineLoading />
                <MeteoriteLineLoading />
                <MeteoriteLineLoading />
                <MeteoriteLineLoading />
              </>
            )}
            {!loading && (
              <>
                {filteredSearchInput.length > 0 &&
                  currentTableData.map((item) => (
                    <MeteoriteLine key={item.id} data={item} />
                  ))}
              </>
            )}
          </div>
          <div className="flex p-3 justify-center">
            <Pagination
              currentPage={currentPage}
              totalCount={filteredSearchInput.length}
              pageSize={PageSize}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        </>
      </Card>
    </div>
  );
};
