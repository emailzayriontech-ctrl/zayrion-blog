"use client";

import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ChevronRight, Plus, Trash2, Copy, ArrowLeft, GripVertical, CheckCircle2 } from "lucide-react";
import Link from "next/link";

type ContentBlock = {
  id: string;
  type: "h2" | "h3" | "h4" | "p" | "ul" | "faq";
  value: string;
  question?: string;
  answer?: string;
};

export default function AdminBlogDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");

  const [category, setCategory] = useState("blog");
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
  });

  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [targetLocation, setTargetLocation] = useState("");
  const [featuredSnippet, setFeaturedSnippet] = useState("");
  const [targetWords, setTargetWords] = useState(1000);
  
  const [blocks, setBlocks] = useState<ContentBlock[]>([]);

  // Calculate total words
  const wordCount = useMemo(() => {
    let text = `${title} ${metaTitle} ${metaDescription} ${featuredSnippet} `;
    blocks.forEach(b => {
      if (b.type === "faq") {
        text += `${b.question} ${b.answer} `;
      } else {
        text += `${b.value} `;
      }
    });
    // Count words (splitting by whitespace and filtering empty strings)
    const words = text.trim().split(/\s+/).filter(w => w.length > 0);
    return words.length;
  }, [title, metaTitle, metaDescription, featuredSnippet, blocks]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "zayrionadmin") {
      setIsAuthenticated(true);
    } else {
      toast.error("Password salah!");
    }
  };

  const addBlock = (type: ContentBlock["type"]) => {
    setBlocks([...blocks, { id: Math.random().toString(36).substr(2, 9), type, value: "", question: "", answer: "" }]);
  };

  const updateBlock = (id: string, updates: Partial<ContentBlock>) => {
    setBlocks(blocks.map(b => b.id === id ? { ...b, ...updates } : b));
  };

  const removeBlock = (id: string) => {
    setBlocks(blocks.filter(b => b.id !== id));
  };

  const moveBlock = (index: number, direction: "up" | "down") => {
    if (direction === "up" && index > 0) {
      const newBlocks = [...blocks];
      [newBlocks[index - 1], newBlocks[index]] = [newBlocks[index], newBlocks[index - 1]];
      setBlocks(newBlocks);
    } else if (direction === "down" && index < blocks.length - 1) {
      const newBlocks = [...blocks];
      [newBlocks[index + 1], newBlocks[index]] = [newBlocks[index], newBlocks[index + 1]];
      setBlocks(newBlocks);
    }
  };

  const generateHTML = () => {
    return blocks.map(b => {
      if (b.type === "h2" && b.value.trim()) return `      <h2>${b.value}</h2>`;
      if (b.type === "h3" && b.value.trim()) return `      <h3>${b.value}</h3>`;
      if (b.type === "h4" && b.value.trim()) return `      <h4>${b.value}</h4>`;
      if (b.type === "p" && b.value.trim()) return `      <p>${b.value}</p>`;
      if (b.type === "ul" && b.value.trim()) {
        const listItems = b.value.split('\n').filter(line => line.trim() !== '').map(line => `        <li>${line.trim()}</li>`).join('\n');
        if (!listItems) return "";
        return `      <ul>\n${listItems}\n      </ul>`;
      }
      if (b.type === "faq" && b.question?.trim() && b.answer?.trim()) {
        return `      <div className="faq-item">\n        <h4>${b.question}</h4>\n        <p>${b.answer}</p>\n      </div>`;
      }
      return "";
    }).filter(Boolean).join("\n");
  };

  const generateJSONCode = () => {
    const htmlContent = generateHTML();
    
    // Extract FAQs for Schema
    const faqBlocks = blocks.filter(b => b.type === "faq" && b.question?.trim() && b.answer?.trim());
    const faqSchema = faqBlocks.map(b => ({
      question: b.question,
      answer: b.answer
    }));

    const data = {
      id: Date.now(),
      slug: slug || "slug-artikel-baru",
      category: category || "blog",
      title: title || "Judul Artikel",
      metaTitle: metaTitle || title || "Judul Artikel",
      metaDescription: metaDescription || "Deskripsi singkat SEO",
      targetLocation: targetLocation || "",
      featuredSnippet: featuredSnippet || "",
      date: date,
      content: `\n${htmlContent}\n    `,
      faqSchema: faqSchema.length > 0 ? faqSchema : undefined,
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
            <h2 className="text-lg font-bold mb-4 border-b pb-2">1. Informasi Utama (SEO Dasar)</h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Kategori URL</Label>
                <Input 
                  id="category" 
                  placeholder="jasa-desain" 
                  value={category}
                  onChange={(e) => setCategory(handleSlugify(e.target.value))}
                />
                <p className="text-[10px] text-muted-foreground">Struktur: domain.com/blog/<strong>{category || "kategori"}</strong>/{slug || "slug"}</p>
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

            <div className="space-y-2">
              <Label htmlFor="title">Judul Utama (H1)</Label>
              <Input 
                id="title" 
                placeholder="Jasa Desain Grafis Terbaik di Jakarta" 
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (!slug) setSlug(handleSlugify(e.target.value));
                  if (!metaTitle) setMetaTitle(e.target.value);
                }}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">Slug (URL)</Label>
              <Input 
                id="slug" 
                placeholder="jasa-desain-grafis-terbaik-di-jakarta" 
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
              />
            </div>
          </div>

          <div className="bg-card border rounded-2xl p-6 space-y-6">
            <h2 className="text-lg font-bold mb-4 border-b pb-2">2. Optimasi GEO & AEO</h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="targetLocation">Target Lokasi (GEO SEO)</Label>
                <Input 
                  id="targetLocation" 
                  placeholder="Jakarta Pusat, Indonesia" 
                  value={targetLocation}
                  onChange={(e) => setTargetLocation(e.target.value)}
                />
                <p className="text-[10px] text-muted-foreground">Opsional. Untuk penargetan audiens lokal.</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="targetWords">Target Jumlah Kata</Label>
                <Input 
                  id="targetWords" 
                  type="number"
                  value={targetWords}
                  onChange={(e) => setTargetWords(parseInt(e.target.value) || 1000)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="metaTitle">Meta Title</Label>
              <Input 
                id="metaTitle" 
                placeholder="Sertakan Brand/Lokasi. Cth: Jasa Desain Jakarta | Zayrion" 
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="metaDescription">Meta Description</Label>
              <Textarea 
                id="metaDescription" 
                rows={2}
                placeholder="Rangkuman menarik max 160 karakter untuk ditampilkan di Google..." 
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
              />
            </div>

            <div className="space-y-2 p-4 bg-primary/5 rounded-xl border border-primary/20">
              <Label htmlFor="featuredSnippet" className="text-primary font-bold">Paragraf Pembuka (Featured Snippet / AEO)</Label>
              <p className="text-[10px] text-muted-foreground mb-2">Jawaban ringkas (30-50 kata) langsung di awal artikel yang merangkum keseluruhan isi. Sangat disukai AI Search Engine.</p>
              <Textarea 
                id="featuredSnippet" 
                rows={3}
                placeholder="Kami adalah penyedia jasa desain grafis di Jakarta yang berfokus pada..." 
                value={featuredSnippet}
                onChange={(e) => setFeaturedSnippet(e.target.value)}
                className="bg-background"
              />
            </div>
          </div>

          <div className="bg-card border rounded-2xl p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center justify-between mb-6 border-b pb-4">
              <h2 className="text-lg font-bold">3. Konten Artikel</h2>
              <div className="flex flex-wrap gap-2">
                <Button size="sm" variant="outline" onClick={() => addBlock("h2")}><Plus className="w-4 h-4 mr-1"/> H2</Button>
                <Button size="sm" variant="outline" onClick={() => addBlock("h3")}><Plus className="w-4 h-4 mr-1"/> H3</Button>
                <Button size="sm" variant="outline" onClick={() => addBlock("h4")}><Plus className="w-4 h-4 mr-1"/> H4</Button>
                <Button size="sm" variant="default" onClick={() => addBlock("p")}><Plus className="w-4 h-4 mr-1"/> Teks</Button>
                <Button size="sm" variant="outline" onClick={() => addBlock("ul")} className="bg-zinc-100 dark:bg-zinc-800"><Plus className="w-4 h-4 mr-1"/> List</Button>
                <Button size="sm" variant="outline" onClick={() => addBlock("faq")} className="border-primary/50 text-primary hover:bg-primary/10"><Plus className="w-4 h-4 mr-1"/> FAQ</Button>
              </div>
            </div>

            <div className="space-y-6">
              {blocks.length === 0 && (
                <div className="text-center py-12 border-2 border-dashed rounded-xl text-muted-foreground flex flex-col items-center justify-center">
                  <p>Belum ada blok konten.</p>
                  <p className="text-sm">Gunakan tombol di atas untuk menyusun hierarki artikel yang rapi.</p>
                </div>
              )}
              {blocks.map((block, index) => (
                <div key={block.id} className="flex gap-3 group relative bg-background border p-4 rounded-xl shadow-sm hover:border-primary/30 transition-colors">
                  <div className="flex flex-col gap-2 items-center justify-center cursor-move text-muted-foreground/30 hover:text-muted-foreground">
                    <button onClick={() => moveBlock(index, "up")} disabled={index === 0} className="disabled:opacity-20 hover:text-primary">↑</button>
                    <GripVertical className="w-4 h-4" />
                    <button onClick={() => moveBlock(index, "down")} disabled={index === blocks.length - 1} className="disabled:opacity-20 hover:text-primary">↓</button>
                  </div>
                  
                  <div className="w-12 shrink-0 pt-2 text-[10px] font-bold text-primary/70 uppercase text-center bg-primary/5 h-min px-1 py-1 rounded">
                    {block.type}
                  </div>

                  <div className="flex-1 relative space-y-2">
                    {block.type === 'p' && (
                      <Textarea 
                        value={block.value}
                        onChange={(e) => updateBlock(block.id, { value: e.target.value })}
                        placeholder="Ketik paragraf di sini..."
                        rows={4}
                        className="w-full resize-y border-muted-foreground/20"
                      />
                    )}
                    {(block.type === 'h2' || block.type === 'h3' || block.type === 'h4') && (
                      <Input 
                        value={block.value}
                        onChange={(e) => updateBlock(block.id, { value: e.target.value })}
                        placeholder={`Ketik judul ${block.type.toUpperCase()} di sini...`}
                        className={`w-full font-bold border-muted-foreground/20 ${block.type === 'h2' ? 'text-xl' : block.type === 'h3' ? 'text-lg' : 'text-base'}`}
                      />
                    )}
                    {block.type === 'ul' && (
                      <div className="space-y-1">
                        <p className="text-[10px] text-muted-foreground font-medium uppercase">Setiap baris baru akan menjadi poin (bullet point)</p>
                        <Textarea 
                          value={block.value}
                          onChange={(e) => updateBlock(block.id, { value: e.target.value })}
                          placeholder="Poin 1&#10;Poin 2&#10;Poin 3..."
                          rows={4}
                          className="w-full resize-y font-mono text-sm border-muted-foreground/20"
                        />
                      </div>
                    )}
                    {block.type === 'faq' && (
                      <div className="space-y-3 bg-card p-3 rounded-lg border border-dashed">
                        <div>
                          <Label className="text-xs">Pertanyaan (Q)</Label>
                          <Input 
                            value={block.question || ''}
                            onChange={(e) => updateBlock(block.id, { question: e.target.value })}
                            placeholder="Tulis pertanyaan..."
                            className="w-full font-medium"
                          />
                        </div>
                        <div>
                          <Label className="text-xs">Jawaban (A)</Label>
                          <Textarea 
                            value={block.answer || ''}
                            onChange={(e) => updateBlock(block.id, { answer: e.target.value })}
                            placeholder="Tulis jawaban lengkap..."
                            rows={3}
                            className="w-full"
                          />
                        </div>
                      </div>
                    )}

                    <Button 
                      variant="destructive" 
                      size="icon" 
                      className="absolute -right-3 -top-3 opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 rounded-full shadow-sm"
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

        {/* Right Column: Code Generator output & Stats */}
        <div className="space-y-6">
          <div className="bg-card border rounded-2xl p-6 sticky top-24 shadow-lg shadow-primary/5 space-y-6">
            
            {/* Word Counter */}
            <div className="bg-background rounded-xl p-4 border space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold">Total Kata</span>
                <span className="text-sm font-medium text-muted-foreground">
                  Target: {targetWords}
                </span>
              </div>
              <div className="flex items-end gap-2">
                <span className={`text-3xl font-display font-bold ${wordCount >= targetWords ? 'text-green-500' : 'text-primary'}`}>
                  {wordCount}
                </span>
                <span className="text-sm text-muted-foreground pb-1">kata</span>
              </div>
              
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-500 ${wordCount >= targetWords ? 'bg-green-500' : 'bg-primary'}`} 
                  style={{ width: `${Math.min((wordCount / targetWords) * 100, 100)}%` }}
                />
              </div>
              
              {wordCount >= targetWords && (
                <div className="flex items-center gap-1.5 text-xs text-green-500 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Target tercapai! Konten optimal.
                </div>
              )}
              {wordCount < targetWords && (
                <div className="text-[10px] text-muted-foreground text-center">
                  Butuh {targetWords - wordCount} kata lagi untuk mencapai target.
                </div>
              )}
            </div>

            {/* Generated JSON */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold">Generated JSON</h3>
                <Button size="sm" onClick={handleCopy} className="gap-2">
                  <Copy className="w-4 h-4" /> Copy Code
                </Button>
              </div>
              <p className="text-[10px] text-muted-foreground mb-4 leading-relaxed">
                Buat file baru bernama <code className="bg-muted px-1 py-0.5 rounded text-foreground">{slug || "judul"}.json</code> di dalam folder data blog Anda, lalu paste kode di bawah.
              </p>
              <div className="bg-zinc-950 rounded-xl p-4 overflow-x-auto max-h-[400px]">
                <pre className="text-[10px] text-green-400 font-mono leading-relaxed">
                  {generateJSONCode()}
                </pre>
              </div>
            </div>

          </div>
        </div>

      </main>
    </div>
  );
}
