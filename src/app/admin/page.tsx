"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ChevronRight, Plus, Trash2, Copy, ArrowLeft } from "lucide-react";
import Link from "next/link";

type ContentBlock = {
  id: string;
  type: "h2" | "h3" | "p";
  value: string;
};

export default function AdminBlogDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
  });
  
  const [blocks, setBlocks] = useState<ContentBlock[]>([]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "zayrionadmin") {
      setIsAuthenticated(true);
    } else {
      toast.error("Password salah!");
    }
  };

  const addBlock = (type: "h2" | "h3" | "p") => {
    setBlocks([...blocks, { id: Math.random().toString(36).substr(2, 9), type, value: "" }]);
  };

  const updateBlock = (id: string, value: string) => {
    setBlocks(blocks.map(b => b.id === id ? { ...b, value } : b));
  };

  const removeBlock = (id: string) => {
    setBlocks(blocks.filter(b => b.id !== id));
  };

  const generateHTML = () => {
    return blocks.map(b => {
      if (!b.value.trim()) return "";
      if (b.type === "h2") return `      <h2>${b.value}</h2>`;
      if (b.type === "h3") return `      <h3>${b.value}</h3>`;
      return `      <p>${b.value}</p>`;
    }).filter(Boolean).join("\n");
  };

  const generateJSONCode = () => {
    const htmlContent = generateHTML();
    const data = {
      id: Date.now(),
      slug: slug || "slug-artikel-baru",
      title: title || "Judul Artikel",
      excerpt: excerpt || "Deskripsi singkat SEO",
      date: date,
      content: `\n${htmlContent}\n    `
    };
    return JSON.stringify(data, null, 2);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateJSONCode());
    toast.success("Kode disalin! Buat file JSON baru di src/data/blog/");
  };

  const handleSlugify = (text: string) => {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <title>Login | Admin Dashboard</title>
        <div className="w-full max-w-md p-8 rounded-2xl bg-card border shadow-lg">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold font-display">Zayrion Admin</h1>
            <p className="text-sm text-muted-foreground mt-2">Masukkan password untuk masuk ke Private Dashboard</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input 
              type="password" 
              placeholder="Password..." 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
            />
            <Button type="submit" className="w-full">Login</Button>
            <div className="text-center pt-4">
              <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" /> Kembali ke Beranda
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <title>Blog Editor | Zayrion Admin</title>
      
      {/* Admin Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b">
        <div className="container-tight h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold font-display">
            <span className="text-primary">Admin</span> Blog Editor
          </div>
          <Link href="/" target="_blank" className="text-sm font-medium hover:text-primary flex items-center gap-1">
            Lihat Blog <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </header>

      <main className="container-tight mt-8 grid lg:grid-cols-[1fr,400px] gap-8">
        
        {/* Left Column: Form Editor */}
        <div className="space-y-8">
          
          <div className="bg-card border rounded-2xl p-6 space-y-6">
            <h2 className="text-lg font-bold mb-4 border-b pb-2">Informasi Utama Artikel</h2>
            
            <div className="space-y-2">
              <Label htmlFor="title">Judul (H1)</Label>
              <Input 
                id="title" 
                placeholder="Cara Meningkatkan Konversi Website..." 
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (!slug) setSlug(handleSlugify(e.target.value));
                }}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">Slug (URL)</Label>
              <Input 
                id="slug" 
                placeholder="cara-meningkatkan-konversi" 
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">URL akan menjadi: zayriontech.com/blog/{slug}</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt">Meta SEO Deskripsi & Excerpt</Label>
              <Textarea 
                id="excerpt" 
                rows={3}
                placeholder="Penjelasan singkat tentang artikel untuk ditampilkan di Google dan list blog..." 
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="date">Tanggal</Label>
              <Input 
                id="date" 
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>

          <div className="bg-card border rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6 border-b pb-2">
              <h2 className="text-lg font-bold">Konten Artikel</h2>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => addBlock("h2")}><Plus className="w-4 h-4 mr-1"/> H2</Button>
                <Button size="sm" variant="outline" onClick={() => addBlock("h3")}><Plus className="w-4 h-4 mr-1"/> H3</Button>
                <Button size="sm" variant="default" onClick={() => addBlock("p")}><Plus className="w-4 h-4 mr-1"/> Teks</Button>
              </div>
            </div>

            <div className="space-y-4">
              {blocks.length === 0 && (
                <div className="text-center py-12 border-2 border-dashed rounded-xl text-muted-foreground">
                  Belum ada konten. Tambahkan H2, H3, atau Teks paragraf di atas.
                </div>
              )}
              {blocks.map((block, index) => (
                <div key={block.id} className="flex gap-3 group relative">
                  <div className="w-16 shrink-0 pt-2 text-xs font-bold text-muted-foreground uppercase text-right">
                    {block.type}
                  </div>
                  <div className="flex-1 relative">
                    {block.type === 'p' ? (
                      <Textarea 
                        value={block.value}
                        onChange={(e) => updateBlock(block.id, e.target.value)}
                        placeholder="Ketik paragraf di sini..."
                        rows={4}
                        className="w-full resize-y"
                      />
                    ) : (
                      <Input 
                        value={block.value}
                        onChange={(e) => updateBlock(block.id, e.target.value)}
                        placeholder={`Ketik judul ${block.type.toUpperCase()} di sini...`}
                        className="w-full font-bold"
                      />
                    )}
                    <Button 
                      variant="destructive" 
                      size="icon" 
                      className="absolute -right-12 top-0 opacity-0 group-hover:opacity-100 transition-opacity h-10 w-10"
                      onClick={() => removeBlock(block.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
        </div>

        {/* Right Column: Code Generator output */}
        <div className="space-y-6">
          <div className="bg-card border rounded-2xl p-6 sticky top-24 shadow-lg shadow-primary/5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold">Generated JSON</h3>
              <Button size="sm" onClick={handleCopy} className="gap-2">
                <Copy className="w-4 h-4" /> Copy Code
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mb-4">
              Copy kode di bawah ini, buat file baru dengan nama <code className="bg-muted px-1 rounded">{slug || "judul"}.json</code> di dalam folder <code className="bg-muted px-1 rounded">src/data/blog/</code>, lalu paste kodenya di sana. Jangan lupa tambahkan import-nya di <code className="bg-muted px-1 rounded">src/data/blog/index.ts</code> (Hanya untuk versi non-Next.js). Untuk Next.js, cukup buat file JSON ini.
            </p>
            <div className="bg-zinc-950 rounded-xl p-4 overflow-x-auto">
              <pre className="text-xs text-green-400 font-mono leading-relaxed">
                {generateJSONCode()}
              </pre>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
