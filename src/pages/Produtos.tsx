
import React, { useState } from 'react';
import { Search, Calendar, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { products, sectors, getDaysUntilExpiry } from '@/services/mockData';

const Produtos = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSector, setSelectedSector] = useState("all");
  const [sortBy, setSortBy] = useState("expDate");  // Default sort by expiration date

  // Filter and sort products
  const filteredProducts = products
    .filter(product => 
      (selectedSector === "all" || product.sector === selectedSector) &&
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "expDate") {
        return new Date(a.expDate).getTime() - new Date(b.expDate).getTime();
      } else if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      } else if (sortBy === "stock") {
        return (b.quantity - b.sold) - (a.quantity - a.sold);
      }
      return 0;
    });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Controle de Produtos</h1>
      
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar produtos..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
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
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Ordenar por" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="expDate">Validade (próximos)</SelectItem>
            <SelectItem value="name">Nome (A-Z)</SelectItem>
            <SelectItem value="stock">Estoque (maior)</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Produtos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredProducts.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vencendo em 7 dias</CardTitle>
            <Calendar className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {filteredProducts.filter(p => {
                const daysLeft = getDaysUntilExpiry(p.expDate);
                return daysLeft >= 0 && daysLeft <= 7;
              }).length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Produtos Vencidos</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {filteredProducts.filter(p => getDaysUntilExpiry(p.expDate) < 0).length}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Produto</TableHead>
                  <TableHead>Setor</TableHead>
                  <TableHead>Localização</TableHead>
                  <TableHead>Validade</TableHead>
                  <TableHead>Dias Restantes</TableHead>
                  <TableHead>Em Estoque</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.length > 0 ? (
                  filteredProducts.map(product => {
                    const daysLeft = getDaysUntilExpiry(product.expDate);
                    const shelf = product.shelf;
                    const currentStock = product.quantity - product.sold;
                    
                    return (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>{product.sector}</TableCell>
                        <TableCell>Prateleira {shelf}</TableCell>
                        <TableCell>
                          {new Date(product.expDate).toLocaleDateString('pt-BR')}
                        </TableCell>
                        <TableCell>
                          <span className={`
                            ${daysLeft < 0 ? 'text-red-500' : 
                              daysLeft <= 3 ? 'text-orange-500' : 
                              daysLeft <= 7 ? 'text-yellow-500' : 'text-green-500'}
                            font-medium
                          `}>
                            {daysLeft < 0 ? 'Vencido' : `${daysLeft} dias`}
                          </span>
                        </TableCell>
                        <TableCell>{currentStock} unid.</TableCell>
                        <TableCell>
                          <span className={`
                            inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
                            ${product.risk === 'high' 
                              ? 'bg-red-100 text-red-800' 
                              : product.risk === 'medium'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-green-100 text-green-800'}
                          `}>
                            {product.risk === 'high' ? 'Alto Risco' : product.risk === 'medium' ? 'Médio Risco' : 'Baixo Risco'}
                          </span>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      Nenhum produto encontrado.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      {filteredProducts.length > 0 && (
        <div className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground">
            Mostrando {filteredProducts.length} de {products.length} produtos
          </p>
          <Button variant="outline">Exportar Dados</Button>
        </div>
      )}
    </div>
  );
};

export default Produtos;
