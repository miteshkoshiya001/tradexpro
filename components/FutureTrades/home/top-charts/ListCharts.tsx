import React from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Label } from "recharts";

const COLORS = ["#f6465d", "#0ecb81"];
export default function ListCharts({ tradeDatas }: any) {
  const data02 = [
    {
      name: "Group A",
      value: tradeDatas?.getHighestVolumePair?.short_account * 100,
    },
    {
      name: "Group B",
      value: tradeDatas?.getHighestVolumePair?.long_account * 100,
    },
  ];
  return (
    <div
      className="bg-card-primary-clr"
      style={{ height: "224px", borderRadius: "8px" }}
    >
      <div className="p-3">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <span className="text-12 text-color-4">
              Highest/Lowest PNL{" "}
              <span
                className="ml-1 px-1 rounded"
                style={{ color: "#F0B90B", background: "#3C2601" }}
              >
                24 hour
              </span>
            </span>
          </div>
        </div>

        <div className="row">
          <div className="col-6 pl-3 pr-1">
            <div>
              <div className="d-flex align-items-center">
                <h5 className="text-14 mr-1">
                  {tradeDatas?.profit_loss_by_coin_pair?.highest_PNL?.symbol}
                </h5>
                <span className="text-12 text-color-4">Perpetual</span>
              </div>
              <p className="text-16" style={{ color: "#0ecb81" }}>
                {tradeDatas?.profit_loss_by_coin_pair?.highest_PNL
                  ?.total_amount || 0}
                {tradeDatas?.profit_loss_by_coin_pair?.highest_PNL?.coin_type}
              </p>
            </div>
            <div>
              <div className="d-flex align-items-center">
                <h5 className="text-14 mr-1">
                  {tradeDatas?.profit_loss_by_coin_pair?.lowest_PNL?.symbol}
                </h5>
                <span className="text-12 text-color-4">Perpetual</span>
              </div>
              <p className="text-16" style={{ color: "#F6465D" }}>
                {tradeDatas?.profit_loss_by_coin_pair?.lowest_PNL
                  ?.total_amount || 0}
                {tradeDatas?.profit_loss_by_coin_pair?.lowest_PNL?.coin_type}
              </p>
            </div>
          </div>
          {/* <div className="col-6 px-1 d-flex align-items-center">
            <div style={{ width: "100%", height: 100 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={data02}
                    innerRadius={30}
                    outerRadius={50}
                    dataKey="value"
                    stroke="none"
                  >
                    {data02.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                    <Label
                      value={tradeDatas?.getHighestVolumePair?.ratio}
                      position="center"
                    />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
