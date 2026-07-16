"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Plus, Search, Edit, Trash2, ExternalLink } from "lucide-react";

type BlogMeta = {
  id: number;
  slug: string;
  title: string;
  category: string;
  status: string;
  author: string;
  date: string;
};

export default function AdminDashboard() {
  const [blogs, setBlogs] = useState<BlogMeta[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("Semua");

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/blog/list");
      const data = await res.json();
      setBlogs(data.blogs || []);
    } catch (err) {
      toast.error("Gagal mengambil daftar blog.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (slug: string) => {
    if (!confirm("Yakin ingin menghapus artikel ini?")) return;
    try {
      const res = await fetch(`/api/blog/delete?slug=${slug}`, { method: "DELETE" });
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message);
        fetchBlogs();
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      toast.error("Gagal menghapus blog.");
    }
  };

  const filteredBlogs = useMemo(() => {
    return blogs.filter(b => {
      const matchSearch = b.title.toLowerCase().includes(search.toLowerCase()) || b.slug.toLowerCase().includes(search.toLowerCase());
      const matchStatus = filterStatus === "Semua" ? true : b.status === filterStatus;
      return matchSearch && matchStatus;
    });
  }, [blogs, search, filterStatus]);

  return (
    <div className="min-h-screen bg-background pb-20">
      <title>Admin Dashboard | Zayrion</title>
      
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b">
        <div className="container-tight h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold font-display">
            <span className="text-primary">Admin</span> Dashboard
          </div>
          <Link href="/admin/editor">
            <Button size="sm" className="gap-2"><Plus className="w-4 h-4" /> Tulis Artikel Baru</Button>
          </Link>
        </div>
      </header>

      <main className="container-tight mt-8 space-y-6">
        
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Cari judul atau slug..." 
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex gap-2">
            {["Semua", "Published", "Review", "Draft"].map(status => (
              <Button 
                key={status}
                variant={filterStatus === status ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus(status)}
              >
                {status}
              </Button>
            ))}
          </div>
        </div>

        <div className="bg-card border rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted/50 text-muted-foreground border-b">
                <tr>
                  <th className="px-6 py-4 font-medium">Judul Artikel</th>
                  <th className="px-6 py-4 font-medium">Kategori</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">Tanggal</th>
                  <th className="px-6 py-4 font-medium text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground animate-pulse">Memuat data artikel...</td>
                  </tr>
                ) : filteredBlogs.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">Belum ada artikel ditemukan.</td>
                  </tr>
                ) : (
                  filteredBlogs.map(blog => (
                    <tr key={blog.id} className="hover:bg-muted/30 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="font-medium text-base mb-1">{blog.title}</div>
                        <div className="text-xs text-muted-foreground flex items-center gap-1">
                          /{blog.slug} 
                          <a href={`/blog/${blog.category}/${blog.slug}`} target="_blank" rel="noreferrer" className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <ExternalLink className="w-3 h-3 hover:text-primary" />
                          </a>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="bg-secondary px-2 py-1 rounded text-xs">{blog.category}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                          blog.status === 'Published' ? 'bg-green-100 text-green-700' :
                          blog.status === 'Review' ? 'bg-orange-100 text-orange-700' :
                          'bg-zinc-100 text-zinc-700'
                        }`}>
                          {blog.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs text-muted-foreground">
                        {blog.date}
                        <div className="mt-1 font-medium">by {blog.author}</div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link href={`/admin/editor?slug=${blog.slug}`}>
                            <Button size="sm" variant="outline" className="h-8 gap-1"><Edit className="w-3 h-3" /> Edit</Button>
                          </Link>
                          <Button size="sm" variant="destructive" className="h-8 w-8 p-0" onClick={() => handleDelete(blog.slug)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
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
