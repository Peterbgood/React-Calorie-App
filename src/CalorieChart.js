import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';

const CalorieChart = ({ data, totalCalories }) => {
  const colors = totalCalories < 0 ? ['#FF0000', '#FF0000'] : ['#4CAF50', '#3F51B5'];

  return (
    <div style={{
      textAlign: 'center',
      display: 'flex',
      justifyContent: 'center',
    }}>
      <div style={{ width: '200px', height: '200px' }}>
        <PieChart width={200} height={200}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={40}
            outerRadius={60}
            startAngle={90}
            endAngle={-270}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
        </PieChart>
      </div>
    </div>
  );
};

export default CalorieChart;