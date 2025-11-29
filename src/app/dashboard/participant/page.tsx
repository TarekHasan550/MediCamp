// app/dashboard/participant/page.tsx
'use client';

import { Calendar, DollarSign, TrendingUp, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface CampData {
  name: string;
  fees: number;
  participants: number;
  date: string;
}

interface ChartData {
  name: string;
  fees: number;
  participants?: number;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export default function AnalyticsPage() {
  const [campData, setCampData] = useState<CampData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - replace with actual API call using TanStack Query
    const mockData: CampData[] = [
      {
        name: 'Cardiology Camp',
        fees: 500,
        participants: 45,
        date: '2024-02-15',
      },
      { name: 'Dental Camp', fees: 300, participants: 32, date: '2024-02-20' },
      {
        name: 'Eye Care Camp',
        fees: 400,
        participants: 28,
        date: '2024-02-25',
      },
      {
        name: 'Pediatric Camp',
        fees: 350,
        participants: 38,
        date: '2024-03-01',
      },
      {
        name: 'Orthopedic Camp',
        fees: 600,
        participants: 25,
        date: '2024-03-05',
      },
    ];

    setCampData(mockData);
    setLoading(false);
  }, []);

  // Transform data for charts
  const barChartData: ChartData[] = campData.map((camp) => ({
    name: camp.name,
    fees: camp.fees,
    participants: camp.participants,
  }));

  const pieChartData = campData.map((camp) => ({
    name: camp.name,
    value: camp.fees,
  }));

  // Stats calculation
  const totalSpent = campData.reduce((sum, camp) => sum + camp.fees, 0);
  const totalCamps = campData.length;
  const averageFee = totalCamps > 0 ? totalSpent / totalCamps : 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-muted-foreground">Loading analytics...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          Analytics Dashboard
        </h1>
        <p className="text-muted-foreground mt-2">
          Insights from your registered medical camps
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Total Camps
              </p>
              <p className="text-2xl font-bold text-foreground mt-1">
                {totalCamps}
              </p>
            </div>
            <div className="p-3 bg-primary/10 rounded-lg">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Total Spent
              </p>
              <p className="text-2xl font-bold text-foreground mt-1">
                ৳{totalSpent}
              </p>
            </div>
            <div className="p-3 bg-primary/10 rounded-lg">
              <DollarSign className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Average Fee
              </p>
              <p className="text-2xl font-bold text-foreground mt-1">
                ৳{averageFee.toFixed(0)}
              </p>
            </div>
            <div className="p-3 bg-primary/10 rounded-lg">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Total Participants
              </p>
              <p className="text-2xl font-bold text-foreground mt-1">
                {campData.reduce(
                  (sum, camp) => sum + (camp.participants || 0),
                  0
                )}
              </p>
            </div>
            <div className="p-3 bg-primary/10 rounded-lg">
              <Users className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart - Camp Fees */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Camp Fees Comparison
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barChartData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis
                dataKey="name"
                angle={-45}
                textAnchor="end"
                height={80}
                tick={{ fontSize: 12 }}
              />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip
                formatter={(value) => [`৳${value}`, 'Fees']}
                labelStyle={{ color: '#000' }}
              />
              <Legend />
              <Bar
                dataKey="fees"
                name="Camp Fees"
                fill="#0088FE"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart - Fee Distribution */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Fee Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name} (${(percent * 100).toFixed(0)}%)`
                }
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieChartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`৳${value}`, 'Fees']} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Additional Chart - Participants */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Participants by Camp
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barChartData}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis
              dataKey="name"
              angle={-45}
              textAnchor="end"
              height={80}
              tick={{ fontSize: 12 }}
            />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip
              formatter={(value) => [value, 'Participants']}
              labelStyle={{ color: '#000' }}
            />
            <Legend />
            <Bar
              dataKey="participants"
              name="Participants"
              fill="#00C49F"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
