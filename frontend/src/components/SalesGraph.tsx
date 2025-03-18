import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import CustomButton from './CustomButton';

// Define the data structure
interface DataItem {
  name: string;
  Sales: number;
  Revenue: number;
  Commission: number;
}

interface Data {
  week: DataItem[];
  month: DataItem[];
  today: DataItem[];
}

const data: Data = {
  week: [
    { name: 'Mon', Sales: 100, Revenue: 200, Commission: 50 },
    { name: 'Tue', Sales: 150, Revenue: 250, Commission: 60 },
    { name: 'Wed', Sales: 200, Revenue: 300, Commission: 70 },
    { name: 'Thu', Sales: 180, Revenue: 280, Commission: 65 },
    { name: 'Fri', Sales: 220, Revenue: 350, Commission: 80 },
    { name: 'Sat', Sales: 300, Revenue: 400, Commission: 90 },
    { name: 'Sun', Sales: 250, Revenue: 370, Commission: 85 },
  ],
  month: [
    { name: 'Week 1', Sales: 500, Revenue: 1000, Commission: 250 },
    { name: 'Week 2', Sales: 700, Revenue: 1300, Commission: 300 },
    { name: 'Week 3', Sales: 600, Revenue: 1200, Commission: 280 },
    { name: 'Week 4', Sales: 800, Revenue: 1500, Commission: 350 },
  ],
  today: [
    { name: '9 AM', Sales: 20, Revenue: 50, Commission: 10 },
    { name: '12 PM', Sales: 35, Revenue: 75, Commission: 15 },
    { name: '3 PM', Sales: 40, Revenue: 90, Commission: 20 },
    { name: '6 PM', Sales: 50, Revenue: 110, Commission: 25 },
    { name: '9 PM', Sales: 60, Revenue: 130, Commission: 30 },
  ],
};

const SalesGraph: React.FC = () => {
  const [filter, setFilter] = useState<keyof Data>('month');

  const filters: { key: keyof Data; label: string }[] = [
    { key: 'today', label: 'Today' },
    { key: 'week', label: 'Week' },
    { key: 'month', label: 'Month' },
  ];

  return (
    <div className="p-4 bg-white rounded-2xl shadow">
      {/* Header with Filter Buttons */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Sales Overview</h2>
        <div className="space-x-2">
          {filters.map(({ key, label }) => (
            <CustomButton
              key={key}
              active={filter === key}
              onClick={() => setFilter(key)}
            >
              {label}
            </CustomButton>
          ))}
        </div>
      </div>

      {/* Bar Chart for Sales */}
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data[filter]}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Sales" fill="#6366F1" />
        </BarChart>
      </ResponsiveContainer>

      {/* Spacing between the two charts */}
      <div className="my-8" /> {/* Add margin between the charts */}

      {/* Line Chart for Revenue & Commission */}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data[filter]}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Revenue" stroke="#FF00AA" strokeWidth={2} />
          <Line type="monotone" dataKey="Commission" stroke="#999999" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesGraph;