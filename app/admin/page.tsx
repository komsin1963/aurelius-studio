'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Book, Trash2, Plus, X, Link as LinkIcon, ShoppingCart, Loader2 } from 'lucide-react';
import { toast, Toaster } from 'react-hot-toast';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export default function AdminEbookManager() {
  const [ebooks, setEbooks] = useState<any[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(true);
  const [newEbook, setNewEbook] = useState({ 
    title: '', 
    description: '', 
    price: 0, 
    pdf_url: '', 
    cover_url: '',
    affiliate_url: '' // รองรับ Affiliate Link
  });

  const fetchEbooks = async () => {
    setLoading(true);
    const { data } = await supabase.from('ebooks').select('*').order('created_at', { ascending: false });
    if (data) setEbooks(data);
    setLoading(false);
  };

  useEffect(() => { fetchEbooks(); }, []);

  const handleAddEbook = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from('ebooks').insert([newEbook]);
    if (error) {
      toast.error('FAILED TO DEPLOY ASSET');
    } else {
      toast.success('NEW KNOWLEDGE ASSET DEPLOYED');
      setIsAdding(false);
      setNewEbook({ title: '', description: '', price: 0, pdf_url: '', cover_url: '', affiliate_url: '' });
      fetchEbooks();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('ERASE THIS ASSET FROM THE VAULT?')) return;
    const { error } = await supabase.from('ebooks').delete().eq('id', id);
    if (error) toast.error('ERROR REMOVING ASSET');
    else {
      toast.success('ASSET REMOVED');
      fetchEbooks();
    }
  };

  return (
    <div className="min-h-screen bg-[#050508] text-white p-8">
      <Toaster position="top-right" />
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-black italic uppercase tracking-tighter text-cyan-500">
              Vault <span className="text-white">Control Center</span>
            </h1>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mt-2 italic">
              Managed by Komsin Intelligence
            </p>
          </div>
          <button 
            onClick={() => setIsAdding(!isAdding)}
            className="bg-white text-black px-6 py-3 rounded-xl font-black uppercase italic tracking-widest hover:bg-cyan-500 transition-all flex items-center gap-2"
          >
            {isAdding ? <><X size={18}/> Cancel</> : <><Plus size={18}/> New E-book</>}
          </button>
        </header>

        {/* Add Form */}
        {isAdding && (
          <div className="bg-white/5 border border-cyan-500/30 rounded-[2.5rem] p-8 mb-12 backdrop-blur-xl">
            <form onSubmit={handleAddEbook} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <input type="text" placeholder="BOOK TITLE" className="admin-input" 
                  value={newEbook.title} onChange={e => setNewEbook({...newEbook, title: e.target.value})} required />
                <input type="number" placeholder="PRICE (XP)" className="admin-input" 
                  value={newEbook.price} onChange={e => setNewEbook({...newEbook, price: parseInt(e.target.value)})} required />
                <textarea placeholder="DESCRIPTION" className="admin-input h-32" 
                  value={newEbook.description} onChange={e => setNewEbook({...newEbook, description: e.target.value})} required />
              </div>
              <div className="space-y-4">
                <input type="text" placeholder="PDF URL (Internal Asset)" className="admin-input" 
                  value={newEbook.pdf_url} onChange={e => setNewEbook({...newEbook, pdf_url: e.target.value})} required />
                <input type="text" placeholder="COVER IMAGE URL" className="admin-input" 
                  value={newEbook.cover_url} onChange={e => setNewEbook({...newEbook, cover_url: e.target.value})} required />
                <div className="relative">
                  <input type="text" placeholder="AFFILIATE URL (External Store)" className="admin-input border-cyan-500/50" 
                    value={newEbook.affiliate_url} onChange={e => setNewEbook({...newEbook, affiliate_url: e.target.value})} />
                  <ShoppingCart size={14} className="absolute right-4 top-4 text-cyan-500 opacity-50" />
                </div>
                <button type="submit" className="w-full bg-cyan-500 text-black py-4 rounded-xl font-black uppercase italic hover:bg-white transition-all mt-2">
                  Confirm Deployment
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Assets List */}
        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="animate-spin text-cyan-500" size={40} /></div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {ebooks.map((book) => (
              <div key={book.id} className="bg-[#0b0b12] border border-white/5 rounded-2xl p-6 flex items-center justify-between group hover:border-white/10 transition-all">
                <div className="flex items-center gap-6">
                  <div className="w-12 h-16 bg-white/5 rounded-md overflow-hidden">
                    <img src={book.cover_url} className="w-full h-full object-cover opacity-50" />
                  </div>
                  <div>
                    <h3 className="font-black uppercase italic text-lg tracking-tight">{book.title}</h3>
                    <div className="flex gap-4 mt-1">
                      <span className="text-[10px] font-bold text-cyan-500 uppercase italic bg-cyan-500/10 px-2 py-0.5 rounded">
                        {book.price} XP
                      </span>
                      {book.affiliate_url && (
                        <span className="text-[10px] font-bold text-green-500 uppercase italic bg-green-500/10 px-2 py-0.5 rounded flex items-center gap-1">
                          <LinkIcon size={10} /> Affiliate Linked
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <button onClick={() => handleDelete(book.id)} className="text-slate-600 hover:text-red-500 transition-colors p-2">
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        .admin-input {
          width: 100%;
          background: rgba(0,0,0,0.4);
          border: 1px solid rgba(255,255,255,0.1);
          padding: 1rem;
          border-radius: 0.75rem;
          font-weight: 900;
          font-size: 11px;
          text-transform: uppercase;
          outline: none;
          transition: all 0.2s;
        }
        .admin-input:focus {
          border-color: #06b6d4;
          box-shadow: 0 0 20px rgba(6,182,212,0.1);
        }
      `}</style>
    </div>
  );
}