'use client';

import Sidebar from '@/components/Sidebar';
import { Check, Copy } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function IntegrationsPage() {
  const [user, setUser] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem('leadflow_user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const webhookUrl = user ? `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/webhooks/capture/${user.tenantId}?source=API` : '';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(webhookUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-8">
        <header className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Integrações</h2>
          <p className="text-gray-600">Conecte seus canais de captura ao LeadFlow.</p>
        </header>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <span className="bg-indigo-100 text-indigo-800 p-2 rounded-md mr-2 text-sm">API / Webhook</span>
              Captura Universal
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              Use esta URL para capturar leads de qualquer formulário ou sistema que suporte Webhooks (Elementor, Typeform, etc.).
            </p>

            <div className="flex items-center space-x-2 bg-gray-50 p-3 rounded border border-gray-200">
              <code className="text-xs break-all flex-1">{webhookUrl}</code>
              <button
                onClick={copyToClipboard}
                className="p-2 hover:bg-gray-200 rounded transition text-gray-500"
              >
                {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
              </button>
            </div>

            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-2">Payload Esperado (JSON):</h4>
              <pre className="text-xs bg-gray-900 text-gray-300 p-4 rounded-md overflow-x-auto">
{`{
  "name": "Nome do Lead",
  "email": "lead@email.com",
  "phone": "11999999999",
  "message": "Tenho interesse em fechar negócio"
}`}
              </pre>
            </div>
          </div>

          <div className="space-y-6">
            <IntegrationCard
              name="WhatsApp"
              status="Em breve"
              description="Conecte seu WhatsApp Business para capturar conversas automaticamente."
            />
            <IntegrationCard
              name="Instagram"
              status="Em breve"
              description="Capture leads de Direct Messages e comentários."
            />
            <IntegrationCard
              name="Facebook Ads"
              status="Pro"
              description="Integração nativa com Lead Ads para captura em tempo real."
            />
          </div>
        </div>
      </main>
    </div>
  );
}

function IntegrationCard({ name, status, description }: { name: string; status: string; description: string }) {
  return (
    <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-100 flex items-start justify-between">
      <div>
        <h3 className="font-semibold text-gray-800">{name}</h3>
        <p className="text-sm text-gray-500 mt-1">{description}</p>
      </div>
      <span className={`text-xs px-2 py-1 rounded-full font-medium
        ${status === 'Ativo' ? 'bg-green-100 text-green-800' :
          status === 'Pro' ? 'bg-purple-100 text-purple-800' :
          'bg-gray-100 text-gray-600'}`}>
        {status}
      </span>
    </div>
  );
}
