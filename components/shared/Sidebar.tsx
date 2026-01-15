import Link from 'next/link';
import { LayoutDashboard, Library, Settings, Mic2, Video } from 'lucide-react';

export default function Sidebar() {
  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20}/>, href: '/dashboard' },
    { name: 'AI Studio', icon: <Mic2 size={20}/>, href: '/studio' },
    { name: 'Library', icon: <Library size={20}/>, href: '/library' },
    { name: 'Settings', icon: <Settings size={20}/>, href: '/settings' },
  ];

  return (
    <div className="w-64 h-screen bg-slate-900 text-white p-4 fixed left-0 top-0">
      <h1 className="text-xl font-bold mb-8 px-2 text-blue-400">Aurelius Plus</h1>
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <Link key={item.name} href={item.href} className="flex items-center gap-3 p-3 hover:bg-slate-800 rounded-lg transition">
            {item.icon}
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}