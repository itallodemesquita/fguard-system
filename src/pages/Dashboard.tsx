
import React, { useState } from 'react';
import { 
  AlertCircle, 
  ThermometerSnowflake, 
  Droplets, 
  ShoppingCart, 
  TrendingUp 
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  getDashboardMetrics, 
  sectors, 
  notifications, 
  products, 
  generateChartData 
} from '@/services/mockData';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const [selectedSector, setSelectedSector] = useState<string>("all");
  const metrics = getDashboardMetrics();
  const chartData = generateChartData();
  
  // Format data for temperature chart
  const temperatureData = chartData.labels.map((date, i) => {
    const dataPoint: { [key: string]: any } = { date };
    chartData.datasets.temperature.forEach(dataset => {
      dataPoint[dataset.label] = dataset.data[i];
    });
    return dataPoint;
  });

  // Get expiring products
  const expiringProducts = products
    .filter(product => 
      (selectedSector === "all" || product.sector === selectedSector) && 
      new Date(product.expDate) <= new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
    )
    .sort((a, b) => new Date(a.expDate).getTime() - new Date(b.expDate).getTime())
    .slice(0, 5);

  // Get latest alerts
  const latestAlerts = notifications
    .filter(notification => 
      selectedSector === "all" || 
      notification.message.includes(selectedSector)
    )
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <Select value={selectedSector} onValueChange={setSelectedSector}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrar por setor" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os setores</SelectItem>
            {sectors.map(sector => (
              <SelectItem key={sector} value={sector}>{sector}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Produtos a vencer</CardTitle>
            <AlertCircle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.expiringSoon}</div>
            <p className="text-xs text-muted-foreground">
              Produtos próximos da data de validade
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Temp. Média</CardTitle>
            <ThermometerSnowflake className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {selectedSector === "all" 
                ? `${metrics.averageTemperatures.Hortifruti}°C / ${metrics.averageTemperatures.Açougue}°C / ${metrics.averageTemperatures.Laticínios}°C` 
                : `${metrics.averageTemperatures[selectedSector as keyof typeof metrics.averageTemperatures]}°C`}
            </div>
            <p className="text-xs text-muted-foreground">
              {selectedSector === "all" ? "Hortifruti / Açougue / Laticínios" : selectedSector}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Umidade Média</CardTitle>
            <Droplets className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {selectedSector === "all" 
                ? `${metrics.averageHumidity.Hortifruti}% / ${metrics.averageHumidity.Açougue}% / ${metrics.averageHumidity.Laticínios}%` 
                : `${metrics.averageHumidity[selectedSector as keyof typeof metrics.averageHumidity]}%`}
            </div>
            <p className="text-xs text-muted-foreground">
              {selectedSector === "all" ? "Hortifruti / Açougue / Laticínios" : selectedSector}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Risco de Estoque</CardTitle>
            <ShoppingCart className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.stockRisk}</div>
            <p className="text-xs text-muted-foreground">
              Produtos com risco de ruptura ou excesso
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Temperatura dos Últimos 7 Dias</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={temperatureData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Hortifruti" stroke="#10b981" strokeWidth={2} />
                <Line type="monotone" dataKey="Açougue" stroke="#3b82f6" strokeWidth={2} />
                <Line type="monotone" dataKey="Laticínios" stroke="#8b5cf6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Alertas Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {latestAlerts.length > 0 ? (
                latestAlerts.map(alert => (
                  <div
                    key={alert.id}
                    className={`p-3 rounded-md border ${
                      alert.severity === 'danger' 
                        ? 'bg-red-50 border-red-200 text-red-700' 
                        : 'bg-yellow-50 border-yellow-200 text-yellow-700'
                    }`}
                  >
                    <div className="flex items-center">
                      <AlertCircle className="h-4 w-4 mr-2" />
                      <p className="text-sm">{alert.message}</p>
                    </div>
                    <p className="text-xs mt-1">
                      {new Date(alert.timestamp).toLocaleTimeString('pt-BR')}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground text-center py-4">
                  Nenhum alerta encontrado
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Produtos Próximos do Vencimento</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2">Produto</th>
                  <th className="text-left py-3 px-2">Setor</th>
                  <th className="text-left py-3 px-2">Validade</th>
                  <th className="text-left py-3 px-2">Estoque</th>
                  <th className="text-left py-3 px-2">Risco</th>
                </tr>
              </thead>
              <tbody>
                {expiringProducts.length > 0 ? (
                  expiringProducts.map(product => (
                    <tr key={product.id} className="border-b">
                      <td className="py-3 px-2">{product.name}</td>
                      <td className="py-3 px-2">{product.sector}</td>
                      <td className="py-3 px-2">{new Date(product.expDate).toLocaleDateString('pt-BR')}</td>
                      <td className="py-3 px-2">{product.quantity - product.sold} unid.</td>
                      <td className="py-3 px-2">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          product.risk === 'high' 
                            ? 'bg-red-100 text-red-800' 
                            : product.risk === 'medium'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-green-100 text-green-800'
                        }`}>
                          {product.risk === 'high' ? 'Alto' : product.risk === 'medium' ? 'Médio' : 'Baixo'}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-4 text-center text-muted-foreground">
                      Nenhum produto próximo do vencimento
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
