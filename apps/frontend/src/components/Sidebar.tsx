'use client';

import Link from 'next/link';
import { LayoutDashboard, Users, Settings, LogOut, MessageSquare } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Sidebar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('leadflow_token');
    localStorage.removeItem('leadflow_user');
    router.push('/login');
  };

  return (
    <div className="flex h-screen w-64 flex-col bg-indigo-900 text-white">
      <div className="flex h-16 items-center justify-center border-b border-indigo-800">
        <h1 className="text-xl font-bold">LeadFlow</h1>
      </div>
      <nav className="flex-1 space-y-2 p-4">
        <Link href="/dashboard" className="flex items-center space-x-2 rounded-md bg-indigo-800 p-2 hover:bg-indigo-700 transition">
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </Link>
        <Link href="/dashboard/leads" className="flex items-center space-x-2 rounded-md p-2 hover:bg-indigo-800 transition">
          <Users size={20} />
          <span>Leads</span>
        </Link>
        <Link href="/dashboard/integrations" className="flex items-center space-x-2 rounded-md p-2 hover:bg-indigo-800 transition">
          <MessageSquare size={20} />
          <span>Integrações</span>
        </Link>
      </nav>
      <div className="p-4 border-t border-indigo-800">
        <Link href="/dashboard/settings" className="flex items-center space-x-2 rounded-md p-2 hover:bg-indigo-800 transition">
          <Settings size={20} />
          <span>Configurações</span>
        </Link>
        <button 
          onClick={handleLogout}
          className="flex w-full items-center space-x-2 rounded-md p-2 hover:bg-red-800 transition mt-2"
        >
          <LogOut size={20} />
          <span>Sair</span>
        </button>
      </div>
    </div>
  );
}
