
import React, { useState } from 'react';
import { 
  Thermometer, 
  Droplets, 
  AlertCircle, 
  Check 
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  shelves, 
  sectors, 
  checkEnvironmentalStatus,
  idealParameters, 
  products 
} from '@/services/mockData';

const Monitoramento = () => {
  const [activeTab, setActiveTab] = useState(sectors[0]);

  // Get shelves for the active sector
  const sectorShelves = shelves.filter(shelf => shelf.sector === activeTab);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Monitoramento Ambiental</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3">
          {sectors.map(sector => (
            <TabsTrigger key={sector} value={sector}>{sector}</TabsTrigger>
          ))}
        </TabsList>

        {sectors.map(sector => (
          <TabsContent key={sector} value={sector}>
            <div className="mb-4">
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Parâmetros Ideais - {sector}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Thermometer className="h-5 w-5 text-blue-500" />
                      <div>
                        <p className="text-sm font-medium">Temperatura</p>
                        <p className="text-sm text-muted-foreground">
                          {idealParameters[sector as keyof typeof idealParameters].minTemp}°C - {idealParameters[sector as keyof typeof idealParameters].maxTemp}°C
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Droplets className="h-5 w-5 text-blue-500" />
                      <div>
                        <p className="text-sm font-medium">Umidade</p>
                        <p className="text-sm text-muted-foreground">
                          {idealParameters[sector as keyof typeof idealParameters].minHumidity}% - {idealParameters[sector as keyof typeof idealParameters].maxHumidity}%
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sectorShelves.map(shelf => {
                // Get products for this shelf
                const shelfProducts = products.filter(p => p.shelf === shelf.id);
                
                // Check if environmental parameters are within range
                const status = checkEnvironmentalStatus(
                  shelf.sector, 
                  shelf.temperature, 
                  shelf.humidity
                );
                
                return (
                  <Card key={shelf.id} className={`
                    ${status === 'alert' ? 'border-red-300' : 'border-green-300'}
                  `}>
                    <CardHeader className={`
                      ${status === 'alert' ? 'bg-red-50' : 'bg-green-50'} 
                      border-b rounded-t-lg
                    `}>
                      <CardTitle className="flex items-center justify-between text-base">
                        <span>{shelf.name}</span>
                        {status === 'alert' ? (
                          <AlertCircle className="h-5 w-5 text-red-500" />
                        ) : (
                          <Check className="h-5 w-5 text-green-500" />
                        )}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="flex flex-col items-center justify-center bg-blue-50 p-3 rounded-md">
                          <div className="flex items-center space-x-1">
                            <Thermometer className="h-4 w-4 text-blue-500" />
                            <span className="text-sm font-medium">Temperatura</span>
                          </div>
                          <span className={`
                            text-xl font-bold mt-1
                            ${shelf.temperature > idealParameters[sector as keyof typeof idealParameters].maxTemp || 
                              shelf.temperature < idealParameters[sector as keyof typeof idealParameters].minTemp 
                                ? 'text-red-500' : 'text-green-500'}
                          `}>
                            {shelf.temperature}°C
                          </span>
                        </div>
                        <div className="flex flex-col items-center justify-center bg-blue-50 p-3 rounded-md">
                          <div className="flex items-center space-x-1">
                            <Droplets className="h-4 w-4 text-blue-500" />
                            <span className="text-sm font-medium">Umidade</span>
                          </div>
                          <span className={`
                            text-xl font-bold mt-1
                            ${shelf.humidity > idealParameters[sector as keyof typeof idealParameters].maxHumidity || 
                              shelf.humidity < idealParameters[sector as keyof typeof idealParameters].minHumidity 
                                ? 'text-red-500' : 'text-green-500'}
                          `}>
                            {shelf.humidity}%
                          </span>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium mb-2">Produtos ({shelfProducts.length})</h4>
                        <ul className="space-y-2 text-sm">
                          {shelfProducts.length > 0 ? (
                            shelfProducts.map(product => (
                              <li key={product.id} className="flex justify-between items-center">
                                <span>{product.name}</span>
                                <span className="text-xs text-muted-foreground">
                                  Val: {new Date(product.expDate).toLocaleDateString('pt-BR')}
                                </span>
                              </li>
                            ))
                          ) : (
                            <li className="text-muted-foreground text-center py-2">
                              Nenhum produto cadastrado
                            </li>
                          )}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {sectorShelves.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Nenhuma prateleira cadastrada para este setor</p>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default Monitoramento;
