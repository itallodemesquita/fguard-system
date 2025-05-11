
import React, { useState } from 'react';
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
import { Badge } from "@/components/ui/badge";
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { products, demandForecast } from '@/services/mockData';

const Previsao = () => {
  const [selectedProduct, setSelectedProduct] = useState(products[0]?.id.toString() || "");
  const [forecastPeriod, setForecastPeriod] = useState("daily");
  
  // Get selected product data
  const product = products.find(p => p.id.toString() === selectedProduct);
  
  // Get forecast data for the selected product
  const forecast = demandForecast.find(f => f.productId.toString() === selectedProduct);
  
  // Format forecast data for the chart
  const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  const forecastData = forecast?.forecast.map((value, index) => ({
    day: days[index],
    previsto: value,
    real: Math.round(value * (0.85 + Math.random() * 0.3)) // Simulate real sales with some variance
  })) || [];
  
  // Calculate accuracy metrics
  const accuracy = forecast?.accuracy || 0;
  
  // Calculate average daily demand
  const averageDailyDemand = forecast 
    ? Math.round(forecast.forecast.reduce((sum, val) => sum + val, 0) / forecast.forecast.length)
    : 0;
  
  // Calculate stock levels
  const currentStock = product ? product.quantity - product.sold : 0;
  const daysOfStock = averageDailyDemand > 0 ? Math.round(currentStock / averageDailyDemand) : 0;
  
  // Determine stock status
  let stockStatus = 'normal';
  let stockStatusText = 'Normal';
  
  if (daysOfStock <= 2) {
    stockStatus = 'rupture';
    stockStatusText = 'Risco de Ruptura';
  } else if (daysOfStock >= 14) {
    stockStatus = 'excess';
    stockStatusText = 'Excesso de Estoque';
  }
  
  // Calculate suggested order
  const suggestedOrder = Math.max(0, (7 * averageDailyDemand) - currentStock);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Previsão de Demanda</h1>
      
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <Select value={selectedProduct} onValueChange={setSelectedProduct}>
          <SelectTrigger className="w-full md:w-[280px]">
            <SelectValue placeholder="Selecionar produto" />
          </SelectTrigger>
          <SelectContent>
            {products.map((prod) => (
              <SelectItem key={prod.id} value={prod.id.toString()}>
                {prod.name} ({prod.sector})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select value={forecastPeriod} onValueChange={setForecastPeriod}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Período de previsão" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">Diário</SelectItem>
            <SelectItem value="weekly">Semanal</SelectItem>
            <SelectItem value="monthly">Mensal</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {product ? (
        <>
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Demanda Média Diária</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{averageDailyDemand} unid.</div>
                <p className="text-xs text-muted-foreground">
                  Baseado nos últimos 7 dias
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Acurácia da Previsão</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{accuracy}%</div>
                <p className="text-xs text-muted-foreground">
                  MAPE: {100 - accuracy}%
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Status do Estoque</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <div className="text-2xl font-bold">{currentStock} unid.</div>
                  <Badge 
                    className={`
                      ${stockStatus === 'rupture' 
                        ? 'bg-red-500' 
                        : stockStatus === 'excess' 
                          ? 'bg-yellow-500' 
                          : 'bg-green-500'}
                    `}
                  >
                    {stockStatusText}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  {daysOfStock} dias de estoque restantes
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Previsão vs. Realizado (Últimos 7 dias)</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={forecastData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="previsto" fill="#00529b" name="Previsão" />
                    <Bar dataKey="real" fill="#fcbd1f" name="Real" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Análise de Compra Sugerida</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-muted-foreground">Produto</span>
                    <span className="text-lg font-bold">{product.name}</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm font-medium text-muted-foreground">Estoque Atual</span>
                      <p className="text-xl font-bold">{currentStock} unid.</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-muted-foreground">Demanda Prevista (7 dias)</span>
                      <p className="text-xl font-bold">{averageDailyDemand * 7} unid.</p>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-muted-foreground">Quantidade Sugerida para Compra</span>
                      <Badge 
                        variant="outline" 
                        className="bg-primary text-white"
                      >
                        Sugestão
                      </Badge>
                    </div>
                    <p className="text-3xl font-bold text-primary">{suggestedOrder} unid.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Tendência de Demanda</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={[...forecastData, ...Array(7).fill(0).map((_, i) => ({
                  day: `P${i+1}`,
                  previsto: Math.round(averageDailyDemand * (0.9 + Math.random() * 0.3)),
                  tendencia: Math.round(averageDailyDemand * (0.95 + i * 0.05))
                }))].slice(0, 14)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="real" stroke="#fcbd1f" strokeWidth={2} name="Vendas Reais" />
                  <Line type="monotone" dataKey="previsto" stroke="#00529b" strokeWidth={2} name="Previsão" />
                  <Line 
                    type="monotone" 
                    dataKey="tendencia" 
                    stroke="#10b981" 
                    strokeWidth={2} 
                    strokeDasharray="5 5" 
                    name="Tendência"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </>
      ) : (
        <Card>
          <CardContent className="py-10">
            <div className="text-center">
              <p className="text-muted-foreground">
                Selecione um produto para visualizar a previsão de demanda
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Previsao;
