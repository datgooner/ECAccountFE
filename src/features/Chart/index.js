import { CircularProgress } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell, Pie,
  PieChart,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { genChart } from "./chartSlice";

export default function Chart() {
  const data = useSelector((state) => state.chart.data);
  const [data2, setData2] = React.useState([]);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(genChart());
  }, [dispatch]);

  React.useEffect(() => {
    if (data) {
      setData2(
        data.map((item) => ({
          name: item.technology.name,
          value: item.number_member,
        }))
      );
    }
  }, [data]);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  if (data)
    return (
      <div>
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
          
          <Bar dataKey="number_member" fill="#8884d8" name="Number of member" />
        </BarChart>
      
        <PieChart width={1000} height={400}>
          <Pie
            dataKey="value"
            data={data2}
            cx={500}
            cy={200}
            // outerRadius={80}
            label
          >
            {data2.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>
    );
  else return <CircularProgress />;
}
