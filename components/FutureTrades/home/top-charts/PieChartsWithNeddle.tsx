import React from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Label } from "recharts";
const RADIAN = Math.PI / 180;
const dataNeddle = [
  { name: "A", value: 60, color: "#f6465d" },
  { name: "B", value: 40, color: "#0ecb81" },
];
const cx = 115;
const cy = 105;
const iR = 70;
const oR = 100;
const value = 70;

// const needle = (
//   value: any,
//   data: any,
//   cx: any,
//   cy: any,
//   iR: any,
//   oR: any,
//   color: any
// ) => {
//   let total = 0;
//   dataNeddle.forEach((v) => {
//     total += v.value;
//   });
//   const ang = 180.0 * (1 - value / total);
//   const length = (iR + 2 * oR) / 3;
//   const sin = Math.sin(-RADIAN * ang);
//   const cos = Math.cos(-RADIAN * ang);
//   const r = 5;
//   const x0 = cx + 5;
//   const y0 = cy + 5;
//   const xba = x0 + r * sin;
//   const yba = y0 - r * cos;
//   const xbb = x0 - r * sin;
//   const ybb = y0 + r * cos;
//   const xp = x0 + length * cos;
//   const yp = y0 + length * sin;

//   return [
//     <circle cx={x0} cy={y0} r={r} fill={color} stroke="none" />,
//     <path
//       d={`M${xba} ${yba}L${xbb} ${ybb} L${xp} ${yp} L${xba} ${yba}`}
//       stroke="#none"
//       fill={color}
//     />,
//   ];
// };
export default function PieChartsWithNeddle() {
  return (
    <div
      className="bg-card-primary-clr"
      style={{ height: "224px", borderRadius: "8px" }}
    >
      {/* <div className="p-3" style={{ height: "245px" }}>
        <div>
          <p className="text-12 text-color-4">Altcoin Week Index </p>
          <div className="d-flex align-items-center">
            <h5 className="text-14">It is not Altcoin week.</h5>
          </div>
        </div>
        <div style={{ width: "100%", height: "100px" }} className="mt-3">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                dataKey="value"
                startAngle={180}
                endAngle={0}
                data={dataNeddle}
                cx={cx}
                cy={cy}
                innerRadius={iR}
                outerRadius={oR}
                fill="#8884d8"
                stroke="none"
              >
                {dataNeddle.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              <Label value="Bitcoin" position="insideStart" offset={10}/>
              <Label value="Altcoin" position="insideEnd" offset={10} />
              </Pie>
              {needle(value, dataNeddle, cx, cy, iR, oR, "#5e6673")}
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="text-center mt-3">
          <h6>{value}</h6>
        </div>
      </div> */}
    </div>
  );
}
