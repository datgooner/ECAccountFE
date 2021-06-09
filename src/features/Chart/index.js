import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BarChart,Bar,XAxis,YAxis,CartesianGrid,Tooltip,Legend,Cell} from "recharts";
import { genChart } from "./chartSlice";
const idToColor = (id) => {
  switch (id) {
    case 1: return "#ffffff";
      
    case 2: return
    case 3: return 
    default:
      return "#ffffff";
  }
};
export default function Chart() {
  const data = useSelector((state) => state.chart.data);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(genChart());
  }, [dispatch]);
  return (
    <BarChart
      width={1000}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="technology.name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="value">
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.status.name === 2 ? 4 : 1} />
        ))}
      </Bar>
      <Bar dataKey="number_member" fill="#8884d8" name="Number of member" />
    </BarChart>
  );
}
