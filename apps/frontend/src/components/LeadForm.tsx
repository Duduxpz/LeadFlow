'use client';

import { useState } from 'react';
import api from '@/lib/api';

export default function LeadForm({ leadId }: { leadId?: string }) {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const endpoint = leadId ? `/webhooks/capture/${leadId}` : '/api/leads';
      const source = 'formulario_site';
      await api.post(`${endpoint}?source=${source}`, formData);
      setStatus('success');
      setFormData({ nome: '', email: '', telefone: '' });
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="rounded-lg bg-green-50 p-6 text-center text-green-800">
        <h3 className="text-lg font-bold">Obrigado!</h3>
        <p>Recebemos seu contato e retornaremos em breve.</p>
        <button onClick={() => setStatus('idle')} className="mt-4 text-sm underline">Enviar outro</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-lg bg-white p-6 shadow-md">
      <h3 className="text-xl font-bold text-gray-800">Entre em Contato</h3>
      <div>
        <label className="block text-sm font-medium text-gray-700">Nome</label>
        <input
          type="text"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
          value={formData.nome}
          onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">E-mail</label>
        <input
          type="email"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Telefone</label>
        <input
          type="text"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
          value={formData.telefone}
          onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
        />
      </div>
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full rounded-md bg-indigo-600 py-2 text-white hover:bg-indigo-700 disabled:opacity-50"
      >
        {status === 'loading' ? 'Enviando...' : 'Enviar'}
      </button>
      {status === 'error' && <p className="text-xs text-red-500">Ocorreu um erro. Tente novamente.</p>}
    </form>
  );
}
