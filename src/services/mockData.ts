
// Mock data for the application

// Sectors
export const sectors = ['Hortifruti', 'Açougue', 'Laticínios'];

// Environmental parameters by sector
export const idealParameters = {
  Hortifruti: { minTemp: 5, maxTemp: 10, minHumidity: 85, maxHumidity: 95 },
  Açougue: { minTemp: 0, maxTemp: 4, minHumidity: 75, maxHumidity: 85 },
  Laticínios: { minTemp: 2, maxTemp: 6, minHumidity: 80, maxHumidity: 90 }
};

// Shelves with environmental data
export const shelves = [
  { id: 1, name: 'Prateleira A1', sector: 'Hortifruti', temperature: 7.2, humidity: 88, status: 'normal' },
  { id: 2, name: 'Prateleira A2', sector: 'Hortifruti', temperature: 11.5, humidity: 87, status: 'alert' },
  { id: 3, name: 'Prateleira B1', sector: 'Hortifruti', temperature: 8.1, humidity: 92, status: 'normal' },
  { id: 4, name: 'Prateleira C1', sector: 'Açougue', temperature: 2.3, humidity: 78, status: 'normal' },
  { id: 5, name: 'Prateleira C2', sector: 'Açougue', temperature: 5.2, humidity: 76, status: 'alert' },
  { id: 6, name: 'Prateleira D1', sector: 'Laticínios', temperature: 4.1, humidity: 85, status: 'normal' },
  { id: 7, name: 'Prateleira D2', sector: 'Laticínios', temperature: 5.7, humidity: 91, status: 'alert' }
];

// Products data
export const products = [
  { id: 1, name: 'Maçã Gala', sector: 'Hortifruti', shelf: 1, expDate: '2024-05-18', quantity: 120, sold: 32, risk: 'medium' },
  { id: 2, name: 'Banana Prata', sector: 'Hortifruti', shelf: 2, expDate: '2024-05-15', quantity: 80, sold: 45, risk: 'high' },
  { id: 3, name: 'Alface Americana', sector: 'Hortifruti', shelf: 3, expDate: '2024-05-14', quantity: 40, sold: 12, risk: 'high' },
  { id: 4, name: 'Picanha Bovina', sector: 'Açougue', shelf: 4, expDate: '2024-05-20', quantity: 35, sold: 18, risk: 'low' },
  { id: 5, name: 'Coxa de Frango', sector: 'Açougue', shelf: 5, expDate: '2024-05-16', quantity: 55, sold: 27, risk: 'medium' },
  { id: 6, name: 'Queijo Mussarela', sector: 'Laticínios', shelf: 6, expDate: '2024-05-25', quantity: 42, sold: 15, risk: 'low' },
  { id: 7, name: 'Iogurte Natural', sector: 'Laticínios', shelf: 7, expDate: '2024-05-17', quantity: 85, sold: 34, risk: 'high' },
  { id: 8, name: 'Leite Integral', sector: 'Laticínios', shelf: 6, expDate: '2024-05-22', quantity: 120, sold: 67, risk: 'medium' }
];

// Historical temperature data (for charts)
export const tempHistory = [
  { sector: 'Hortifruti', data: [8.2, 7.9, 8.5, 9.2, 8.8, 9.1, 9.4, 8.7, 8.3, 8.0, 7.8, 7.5] },
  { sector: 'Açougue', data: [2.5, 2.3, 2.7, 2.9, 3.1, 2.8, 2.6, 2.4, 2.2, 2.0, 2.1, 2.3] },
  { sector: 'Laticínios', data: [4.2, 4.1, 4.3, 4.5, 4.4, 4.2, 4.0, 3.9, 4.1, 4.3, 4.5, 4.6] }
];

// Historical humidity data (for charts)
export const humidityHistory = [
  { sector: 'Hortifruti', data: [88, 89, 90, 91, 90, 88, 87, 86, 89, 90, 91, 90] },
  { sector: 'Açougue', data: [79, 80, 78, 77, 79, 80, 81, 80, 79, 78, 77, 78] },
  { sector: 'Laticínios', data: [83, 84, 85, 86, 85, 84, 83, 82, 83, 84, 85, 86] }
];

// Demand forecast
export const demandForecast = [
  { id: 1, productId: 1, forecast: [35, 38, 42, 37, 40, 41, 39], accuracy: 92 },
  { id: 2, productId: 2, forecast: [47, 45, 50, 48, 52, 49, 51], accuracy: 88 },
  { id: 3, productId: 3, forecast: [13, 15, 14, 16, 15, 17, 14], accuracy: 84 },
  { id: 4, productId: 4, forecast: [20, 19, 21, 22, 20, 23, 21], accuracy: 90 },
  { id: 5, productId: 5, forecast: [28, 30, 32, 29, 31, 30, 28], accuracy: 87 },
  { id: 6, productId: 6, forecast: [17, 19, 18, 20, 18, 19, 17], accuracy: 91 },
  { id: 7, productId: 7, forecast: [35, 38, 36, 39, 37, 40, 38], accuracy: 85 },
  { id: 8, productId: 8, forecast: [70, 68, 72, 75, 71, 73, 74], accuracy: 89 }
];

// Notifications
export const notifications = [
  { id: 1, type: 'environment', message: 'Temperatura acima do ideal na Prateleira A2 (Hortifruti)', severity: 'warning', timestamp: '2024-05-11T09:30:00' },
  { id: 2, type: 'expiration', message: 'Alface Americana vencerá em 3 dias', severity: 'danger', timestamp: '2024-05-11T10:15:00' },
  { id: 3, type: 'stock', message: 'Risco de ruptura de estoque: Banana Prata', severity: 'warning', timestamp: '2024-05-11T11:00:00' },
  { id: 4, type: 'environment', message: 'Temperatura acima do ideal na Prateleira C2 (Açougue)', severity: 'warning', timestamp: '2024-05-11T11:45:00' },
  { id: 5, type: 'expiration', message: 'Iogurte Natural vencerá em 5 dias', severity: 'warning', timestamp: '2024-05-11T12:30:00' }
];

// Dashboard metrics
export const getDashboardMetrics = () => {
  return {
    expiringSoon: products.filter(p => {
      const expDate = new Date(p.expDate);
      const daysUntilExpiry = Math.round((expDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
      return daysUntilExpiry <= 5;
    }).length,
    outOfRangeTemperature: shelves.filter(s => s.status === 'alert').length,
    averageTemperatures: {
      Hortifruti: (shelves.filter(s => s.sector === 'Hortifruti').reduce((sum, s) => sum + s.temperature, 0) / 
                  shelves.filter(s => s.sector === 'Hortifruti').length).toFixed(1),
      Açougue: (shelves.filter(s => s.sector === 'Açougue').reduce((sum, s) => sum + s.temperature, 0) / 
              shelves.filter(s => s.sector === 'Açougue').length).toFixed(1),
      Laticínios: (shelves.filter(s => s.sector === 'Laticínios').reduce((sum, s) => sum + s.temperature, 0) / 
                 shelves.filter(s => s.sector === 'Laticínios').length).toFixed(1)
    },
    averageHumidity: {
      Hortifruti: Math.round(shelves.filter(s => s.sector === 'Hortifruti').reduce((sum, s) => sum + s.humidity, 0) / 
                 shelves.filter(s => s.sector === 'Hortifruti').length),
      Açougue: Math.round(shelves.filter(s => s.sector === 'Açougue').reduce((sum, s) => sum + s.humidity, 0) / 
              shelves.filter(s => s.sector === 'Açougue').length),
      Laticínios: Math.round(shelves.filter(s => s.sector === 'Laticínios').reduce((sum, s) => sum + s.humidity, 0) / 
                shelves.filter(s => s.sector === 'Laticínios').length)
    },
    totalAlerts: notifications.length,
    stockRisk: products.filter(p => p.risk === 'high').length
  };
};

// Get days until expiration for a product
export const getDaysUntilExpiry = (expDate: string) => {
  const exp = new Date(expDate);
  const today = new Date();
  return Math.round((exp.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
};

// Check if environmental parameters are within ideal range
export const checkEnvironmentalStatus = (sector: string, temp: number, humidity: number) => {
  const params = idealParameters[sector as keyof typeof idealParameters];
  
  if (!params) return 'unknown';
  
  if (temp < params.minTemp || temp > params.maxTemp || 
      humidity < params.minHumidity || humidity > params.maxHumidity) {
    return 'alert';
  }
  
  return 'normal';
};

// Generate chart data
export const generateChartData = (days = 7) => {
  const labels = Array.from({length: days}, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (days - 1) + i);
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
  });

  return {
    labels,
    datasets: {
      temperature: sectors.map(sector => ({
        label: sector,
        data: Array.from({length: days}, () => +(Math.random() * 5 + 
          (sector === 'Hortifruti' ? 7 : 
          sector === 'Açougue' ? 2 : 4)).toFixed(1))
      })),
      humidity: sectors.map(sector => ({
        label: sector,
        data: Array.from({length: days}, () => 
          Math.round(Math.random() * 10 + 
          (sector === 'Hortifruti' ? 85 : 
          sector === 'Açougue' ? 75 : 80)))
      })),
      sales: products.slice(0, 5).map(product => ({
        label: product.name,
        data: Array.from({length: days}, () => 
          Math.round(Math.random() * 20 + 10))
      }))
    }
  };
};
