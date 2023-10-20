import { useState, useEffect } from "react";
import { PieChart, Pie, Legend, Cell, ResponsiveContainer } from "recharts";

// define outside because it doesn't change ever
const genres = ["React", "JavaScript", "Node", "jQuery", "Angular"];
const colors = ["#a84740", "#dba51a", "#6cbd7a", "#6c95bd", "#906cbd"];

const EventGenresChart = ({ events }) => {
  const [data, setData] = useState([]);

  // simplified by putting getData inside useEffect, and then just change from function to variable
  // to place inside setData
  useEffect(() => {
    const data = genres.map((genre) => {
      const filteredEvents = events.filter((event) =>
        event.summary.includes(genre)
      );
      return {
        name: genre,
        value: filteredEvents.length,
      };
    });
    setData(data);
  }, [events]); // events dont need to be stringified to check for comparison because
                // changes are being handled in App.js anyways

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    outerRadius,
    percent,
    index,
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius;
    const x = cx + radius * Math.cos(-midAngle * RADIAN) * 1.2;
    const y = cy + radius * Math.sin(-midAngle * RADIAN) * 1.2;
    return percent ? (
      <text
        x={x}
        y={y}
        fill={colors[index]}
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    ) : null;
  };

  return (
    <ResponsiveContainer width="99%" height={400}>
      <PieChart
        margin={{
          top: 20,
          right: 20,
          bottom: 60,
          left: -30,
        }}
      >
        <Pie
          data={data}
          dataKey="value"
          fill="#8884d8"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={120}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index]} />
          ))}
        </Pie>
        <Legend verticalAlign="bottom" height={36} />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default EventGenresChart;
