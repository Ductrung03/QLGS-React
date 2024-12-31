import React from 'react';
import { Card, CardContent, CardHeader, Typography } from '@mui/material';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ChartCard = ({ title, children }) => (
  <Card className="mb-4 shadow-sm">
    <CardHeader 
      title={<Typography variant="h6">{title}</Typography>}
      className="border-b"
    />
    <CardContent>
      {children}
    </CardContent>
  </Card>
);

const BieuDoBienDongRungBaoCaoComponent = () => {
  // Sample data - replace with your actual data
  const sampleData = [
    { name: '1/1', value: 400 },
    { name: '2/1', value: 300 },
    { name: '3/1', value: 500 },
    { name: '4/1', value: 280 },
    { name: '5/1', value: 390 },
  ];

  const renderAreaChart = (data) => (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="value" stroke="#82ca9d" fill="#82ca9d" />
      </AreaChart>
    </ResponsiveContainer>
  );

  return (
    <div className="p-4">
      <ChartCard title="Biểu đồ biến động rừng theo huyện trong 30 ngày gần nhất">
        {renderAreaChart(sampleData)}
      </ChartCard>

      <ChartCard title="Biểu đồ biến động rừng theo xã trong 30 ngày gần nhất">
        {renderAreaChart(sampleData)}
      </ChartCard>
    </div>
  );
};

export default BieuDoBienDongRungBaoCaoComponent;