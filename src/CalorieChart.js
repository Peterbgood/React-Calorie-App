import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';

const CalorieChart = ({ data }) => {
  const colors = ['#4CAF50', '#3F51B5'];

  return (
    <div style={{
      textAlign: 'center',
      display: 'flex',
      justifyContent: 'center',
      paddingBottom: '20px'
    }}>
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          startAngle={90}
          endAngle={-270}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
      </PieChart>
    </div>
  );
};

export default CalorieChart;