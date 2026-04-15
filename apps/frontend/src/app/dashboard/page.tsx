'use client';

import { useEffect, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import api from '@/lib/api';
import { Users, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';

export default function DashboardPage() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    hot: 0,
    qualified: 0,
    conversion: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/leads');
        const data = response.data;
        setLeads(data);
        
        setStats({
          total: data.length,
          hot: data.filter((l: any) => l.tag === 'Fechamento').length,
          qualified: data.filter((l: any) => l.tag === 'Orçamento').length,
          conversion: data.length > 0 ? (data.filter((l: any) => l.tag === 'Fechamento').length / data.length) * 100 : 0,
        });
      } catch (err) {
        console.error('Erro ao carregar leads', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-8">
        <header className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500">Hoje: {new Date().toLocaleDateString('pt-BR')}</span>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <StatCard title="Total de Leads" value={stats.total} icon={<Users className="text-blue-500" />} />
          <StatCard title="Leads Quentes" value={stats.hot} icon={<TrendingUp className="text-red-500" />} />
          <StatCard title="Em Orçamento" value={stats.qualified} icon={<AlertCircle className="text-yellow-500" />} />
          <StatCard title="Taxa de Conversão" value={`${stats.conversion.toFixed(1)}%`} icon={<CheckCircle className="text-green-500" />} />
        </div>

        <div className="rounded-lg bg-white shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-800">Leads Recentes</h3>
            <button className="text-indigo-600 hover:text-indigo-500 text-sm font-medium">Ver todos</button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Origem</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Classificação</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr><td colSpan={5} className="px-6 py-4 text-center">Carregando...</td></tr>
                ) : leads.length === 0 ? (
                  <tr><td colSpan={5} className="px-6 py-4 text-center text-gray-500">Nenhum lead encontrado</td></tr>
                ) : (
                  leads.map((lead) => (
                    <tr key={lead.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{lead.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lead.source}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${lead.tag === 'Fechamento' ? 'bg-green-100 text-green-800' : 
                            lead.tag === 'Orçamento' ? 'bg-yellow-100 text-yellow-800' : 
                            lead.tag === 'Interessado' ? 'bg-blue-100 text-blue-800' : 
                            'bg-gray-100 text-gray-800'}`}>
                          {lead.tag}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(lead.intentScore * 100).toFixed(0)}%</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(lead.createdAt).toLocaleDateString('pt-BR')}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({ title, value, icon }: { title: string; value: string | number; icon: React.ReactNode }) {
  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
        </div>
        <div className="h-12 w-12 rounded-full bg-gray-50 flex items-center justify-center">
          {icon}
        </div>
      </div>
    </div>
  );
}
