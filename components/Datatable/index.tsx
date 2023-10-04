import SectionLoading from "components/common/SectionLoading";
import useTranslation from "next-translate/useTranslation";
import React, { useMemo } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useTable, useSortBy, useGlobalFilter } from "react-table";

const CustomDataTable = ({
  columns,
  data,
  Links,
  setSelectedLimit,
  selectedLimit,
  paginateFunction,
  paginate = true,
  search,
  setSearch,
  dataNotFoundText,
  processing,
  verticalAlignData = "top",
}: any) => {
  const dataColumns = useMemo(() => columns, [columns]);
  const tableData = useMemo(() => data, [data]);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    //@ts-ignore
    setGlobalFilter,
  } = useTable(
    {
      columns: dataColumns,
      data: tableData,
    },
    useGlobalFilter,
    useSortBy
  );
  const { t } = useTranslation("common");

  const { globalFilter }: any = state;

  return (
    <div>
      <div id="assetBalances_wrapper" className="dataTables_wrapper no-footer">
        <div className="dataTables_head">
          <div className="dataTables_length" id="assetBalances_length">
            <label className="">
              {t("Show")}
              <select
                name="assetBalances_length"
                aria-controls="assetBalances"
                className="h-auto text-14"
                placeholder="10"
                onChange={(e) => {
                  setSelectedLimit(e.target.value);
                }}
                value={selectedLimit}
              >
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </label>
          </div>
          <div id="table_filter" className="dataTables_filter_class">
            <label>
              <AiOutlineSearch />
              <input
                type="search"
                className="data_table_input bg-transparent"
                aria-controls="table"
                placeholder="Search..."
                value={search || ""}
                onChange={(e) => setSearch(e.target.value)}
              />
            </label>
          </div>
        </div>
      </div>
      {processing ? (
        <SectionLoading />
      ) : (
        <>
          <table {...getTableProps()} className="table">
            <thead>
              {headerGroups.map((headerGroup, index) => (
                <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                  {headerGroup.headers.map((column: any, key: number) => (
                    <th
                      key={key}
                      {...column.getHeaderProps(column.getSortByToggleProps())} // Add sorting props to the column header
                      style={{
                        borderBottom: "1px solid #7d7d7d33",
                        background: "var(--main-background-color)",
                        padding: "12px 8px",
                        textAlign: "left", // Update this line
                        cursor: "pointer",
                      }}
                      className="dataTables_header_class"
                    >
                      {column.render("Header")}
                      <span>
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <i className="fa fa-caret-down" />
                          ) : (
                            <i className="fa fa-caret-up" />
                          )
                        ) : (
                          ""
                        )}
                      </span>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.length > 0 && (
                <>
                  {rows.map((row, index) => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()} key={index}>
                        {row.cells.map((cell, key) => (
                          <td
                            //@ts-ignore
                            key={key}
                            {...cell.getCellProps()}
                            style={{
                              borderBottom: "1px solid #7d7d7d33",
                              padding: "12px 8px",
                              textAlign: "start",
                              // whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                              maxWidth: "200px",
                              verticalAlign: verticalAlignData,
                              wordBreak: "break-word",
                            }}
                          >
                            {cell.render("Cell")}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </>
              )}
            </tbody>
          </table>
          {rows.length == 0 && (
            <div className="p-3 text-center">
              <p>{`${dataNotFoundText ?? "No Item Found"} `}</p>
            </div>
          )}
        </>
      )}

      {paginate === true && (
        <div className="pagination-wrapper" id="assetBalances_paginate">
          <span>
            {Links?.map((link: any, index: number) =>
              link.label === "&laquo; Previous" ? (
                <a
                  className="paginate-button"
                  onClick={() => {
                    if (link.url) paginateFunction(link);
                  }}
                  key={index}
                >
                  <i className="fa fa-angle-left"></i>
                </a>
              ) : link.label === "Next &raquo;" ? (
                <a
                  className="paginate-button"
                  onClick={() => paginateFunction(link)}
                  key={index}
                >
                  <i className="fa fa-angle-right"></i>
                </a>
              ) : (
                <a
                  className={`paginate_button paginate-number ${
                    link.active === true && "text-warning"
                  }`}
                  aria-controls="assetBalances"
                  data-dt-idx="1"
                  onClick={() => paginateFunction(link)}
                  key={index}
                >
                  {link.label}
                </a>
              )
            )}
          </span>
        </div>
      )}
    </div>
  );
};

export default CustomDataTable;
