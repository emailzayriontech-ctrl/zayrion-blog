"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ChevronRight, Plus, Trash2, Copy, ArrowLeft, GripVertical, CheckCircle2, Save, Globe } from "lucide-react";
import Link from "next/link";

type ContentBlock = {
  id: string;
  type: "h2" | "h3" | "h4" | "p" | "ul" | "faq" | "image" | "table";
  value: string;
  question?: string;
  answer?: string;
  alt?: string;
  rows?: string[][];
};

function EditorForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const editSlug = searchParams.get("slug");

  const [category, setCategory] = useState("blog");
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
  });

  const [status, setStatus] = useState("Draft");
  const [author, setAuthor] = useState("Admin");

  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [targetLocation, setTargetLocation] = useState("");
  const [featuredSnippet, setFeaturedSnippet] = useState("");
  const [targetWords, setTargetWords] = useState(1000);
  
  const [focusKeyword, setFocusKeyword] = useState("");
  const [canonicalUrl, setCanonicalUrl] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [brandName, setBrandName] = useState("Zayrion Tech");

  const [blocks, setBlocks] = useState<ContentBlock[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load existing data if editing
  useEffect(() => {
    if (editSlug) {
      fetch(`/api/blog/get?slug=${editSlug}`)
        .then(res => res.json())
        .then(data => {
          if (data.blog) {
            const b = data.blog;
            setCategory(b.category || "blog");
            setTitle(b.title || "");
            setSlug(b.slug || "");
            setDate(b.date || date);
            setStatus(b.status || "Draft");
            setAuthor(b.author || "Admin");
            setMetaTitle(b.metaTitle || "");
            setMetaDescription(b.metaDescription || "");
            setTargetLocation(b.targetLocation || "");
            setFeaturedSnippet(b.featuredSnippet || "");
            setFocusKeyword(b.focusKeyword || "");
            setCanonicalUrl(b.canonicalUrl || "");
            setFeaturedImage(b.featuredImage || "");
            setBrandName(b.brandName || "Zayrion Tech");
            if (b.rawBlocks) {
              setBlocks(b.rawBlocks);
            }
          } else {
            toast.error("Artikel tidak ditemukan!");
            router.push("/admin");
          }
        })
        .catch(() => toast.error("Gagal memuat artikel"))
        .finally(() => setIsLoaded(true));
    } else {
      setIsLoaded(true);
    }
  }, [editSlug]);

  // Auto-save debouncer
  useEffect(() => {
    if (!isLoaded || !slug) return;
    
    const timeoutId = setTimeout(() => {
      saveToServer(true);
    }, 5000);

    return () => clearTimeout(timeoutId);
  }, [category, title, slug, status, author, metaTitle, metaDescription, targetLocation, featuredSnippet, focusKeyword, canonicalUrl, featuredImage, brandName, blocks]);

  const wordCount = useMemo(() => {
    let text = `${title} ${metaTitle} ${metaDescription} ${featuredSnippet} ${focusKeyword} `;
    blocks.forEach(b => {
      if (b.type === "faq") text += `${b.question} ${b.answer} `;
      else if (b.type === "table" && b.rows) {
        b.rows.forEach(r => text += r.join(" ") + " ");
      }
      else text += `${b.value} `;
    });
    const words = text.trim().split(/\s+/).filter(w => w.length > 0);
    return words.length;
  }, [title, metaTitle, metaDescription, featuredSnippet, focusKeyword, blocks]);

  const addBlock = (type: ContentBlock["type"]) => {
    const newBlock: ContentBlock = { id: Math.random().toString(36).substr(2, 9), type, value: "" };
    if (type === "table") {
      newBlock.rows = [["Header 1", "Header 2"], ["Data 1", "Data 2"]];
    }
    setBlocks([...blocks, newBlock]);
  };

  const updateBlock = (id: string, updates: Partial<ContentBlock>) => {
    setBlocks(blocks.map(b => b.id === id ? { ...b, ...updates } : b));
  };

  const updateTableData = (id: string, rIndex: number, cIndex: number, val: string) => {
    setBlocks(blocks.map(b => {
      if (b.id !== id || !b.rows) return b;
      const newRows = [...b.rows];
      newRows[rIndex][cIndex] = val;
      return { ...b, rows: newRows };
    }));
  };

  const addTableRow = (id: string) => {
    setBlocks(blocks.map(b => {
      if (b.id !== id || !b.rows) return b;
      const colCount = b.rows[0].length;
      return { ...b, rows: [...b.rows, Array(colCount).fill("Data")] };
    }));
  };

  const addTableCol = (id: string) => {
    setBlocks(blocks.map(b => {
      if (b.id !== id || !b.rows) return b;
      return { ...b, rows: b.rows.map((row, i) => [...row, i === 0 ? "Header" : "Data"]) };
    }));
  };

  const removeBlock = (id: string) => setBlocks(blocks.filter(b => b.id !== id));

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
      if (b.type === "image" && b.value.trim()) {
        return `      <figure>\n        <img src="${b.value}" alt="${b.alt || 'Image'}" className="w-full h-auto rounded-xl" />\n      </figure>`;
      }
      if (b.type === "table" && b.rows && b.rows.length > 0) {
        const header = b.rows[0];
        const body = b.rows.slice(1);
        let tableHtml = `      <div className="overflow-x-auto my-6">\n        <table className="w-full text-left border-collapse">\n`;
        if (header.length > 0) {
          tableHtml += `          <thead>\n            <tr className="bg-muted">\n`;
          header.forEach(h => { tableHtml += `              <th className="border p-3 font-bold">${h}</th>\n` });
          tableHtml += `            </tr>\n          </thead>\n`;
        }
        tableHtml += `          <tbody>\n`;
        body.forEach(row => {
          tableHtml += `            <tr>\n`;
          row.forEach(col => { tableHtml += `              <td className="border p-3">${col}</td>\n` });
          tableHtml += `            </tr>\n`;
        });
        tableHtml += `          </tbody>\n        </table>\n      </div>`;
        return tableHtml;
      }
      return "";
    }).filter(Boolean).join("\n");
  };

  const generateDataObj = () => {
    const htmlContent = generateHTML();
    
    const faqBlocks = blocks.filter(b => b.type === "faq" && b.question?.trim() && b.answer?.trim());
    const faqSchema = faqBlocks.map(b => ({
      question: b.question,
      answer: b.answer
    }));

    let schemas: any = {};
    if (faqSchema.length > 0) {
      schemas.faq = faqSchema;
    }
    if (targetLocation) {
      schemas.localBusiness = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": brandName || "Zayrion Tech",
        "image": featuredImage || "",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": targetLocation
        }
      };
    }

    const data: any = {
      id: Date.now(),
      slug: slug || "slug-artikel-baru",
      category: category || "blog",
      status,
      author,
      title: title || "Judul Artikel",
      metaTitle: metaTitle || `${title} | ${brandName}`,
      metaDescription: metaDescription || "Deskripsi singkat SEO",
      focusKeyword,
      canonicalUrl,
      targetLocation,
      featuredSnippet,
      featuredImage,
      brandName,
      date: date,
      content: `\n${htmlContent}\n    `,
      rawBlocks: blocks // Simpan blocks asli untuk bisa diedit lagi
    };

    if (Object.keys(schemas).length > 0) {
      data.schemas = schemas;
    }

    return data;
  };

  const generateJSONCode = () => {
    return JSON.stringify(generateDataObj(), null, 2);
  };

  const saveToServer = async (isAutoSave = false) => {
    if (!slug) {
      if (!isAutoSave) toast.error("Slug (URL) tidak boleh kosong untuk menyimpan!");
      return;
    }
    
    if (!isAutoSave) setIsSaving(true);
    try {
      const res = await fetch('/api/blog/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(generateDataObj())
      });
      const result = await res.json();
      
      if (res.ok) {
        setLastSaved(new Date().toLocaleTimeString());
        if (!isAutoSave) toast.success("Berhasil disimpan ke server (Hosting)!");
      } else {
        if (!isAutoSave) toast.error("Gagal menyimpan: " + result.error);
      }
    } catch (error) {
      if (!isAutoSave) toast.error("Terjadi kesalahan jaringan.");
    } finally {
      if (!isAutoSave) setIsSaving(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateJSONCode());
    toast.success("Kode disalin!");
  };

  const handleSlugify = (text: string) => {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  };

  if (!isLoaded) {
    return <div className="min-h-screen flex items-center justify-center">Memuat Editor...</div>;
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <title>{editSlug ? `Edit ${editSlug}` : 'Tulis Baru'} | Zayrion Admin</title>
      
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b">
        <div className="container-tight h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold font-display">
            <Link href="/admin" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 mr-4">
              <ArrowLeft className="w-4 h-4" /> Dasbor
            </Link>
            <span className="text-primary">Admin</span> Editor
          </div>
          <div className="flex items-center gap-4">
            {lastSaved && <span className="text-xs text-muted-foreground hidden sm:inline-block">Auto-saved at {lastSaved}</span>}
            <Button onClick={() => saveToServer()} disabled={isSaving} className="gap-2" size="sm">
              <Globe className="w-4 h-4" /> {isSaving ? "Menyimpan..." : "Publish / Save"}
            </Button>
          </div>
        </div>
      </header>

      <main className="container-tight mt-8 grid lg:grid-cols-[1fr,400px] gap-8">
        
        {/* Left Column: Form Editor */}
        <div className="space-y-8">
          
          <div className="bg-card border rounded-2xl p-6 space-y-6">
            <div className="flex items-center justify-between border-b pb-2 mb-4">
              <h2 className="text-lg font-bold">1. Informasi Utama (Setup & Metadata)</h2>
              <div className="flex gap-2">
                <select className="text-sm border rounded-md px-2 py-1" value={status} onChange={e => setStatus(e.target.value)}>
                  <option value="Draft">Draft</option>
                  <option value="Review">Review</option>
                  <option value="Published">Published</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2 col-span-2">
                <Label>Judul Utama (H1)</Label>
                <Input placeholder="Jasa Desain..." value={title} onChange={(e) => {
                  setTitle(e.target.value);
                  if (!editSlug && !slug) setSlug(handleSlugify(e.target.value));
                  if (!metaTitle) setMetaTitle(e.target.value);
                }} />
              </div>
              <div className="space-y-2 col-span-2">
                <Label>Slug (URL)</Label>
                <Input placeholder="jasa-desain" value={slug} onChange={(e) => setSlug(e.target.value)} disabled={!!editSlug} />
                {editSlug && <p className="text-[10px] text-muted-foreground">Slug tidak bisa diubah saat mengedit.</p>}
              </div>
              
              <div className="space-y-2">
                <Label>Kategori URL</Label>
                <Input placeholder="blog" value={category} onChange={(e) => setCategory(handleSlugify(e.target.value))} />
              </div>
              <div className="space-y-2">
                <Label>Tanggal</Label>
                <Input value={date} onChange={(e) => setDate(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Author</Label>
                <Input value={author} onChange={(e) => setAuthor(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Brand Name</Label>
                <Input value={brandName} onChange={(e) => setBrandName(e.target.value)} />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Featured Image (Open Graph URL)</Label>
              <Input placeholder="https://res.cloudinary.com/..." value={featuredImage} onChange={(e) => setFeaturedImage(e.target.value)} />
            </div>
          </div>

          <div className="bg-card border rounded-2xl p-6 space-y-6">
            <h2 className="text-lg font-bold mb-4 border-b pb-2">2. Optimasi SEO Lanjutan & GEO</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Focus Keyword</Label>
                <Input placeholder="jasa desain grafis" value={focusKeyword} onChange={(e) => setFocusKeyword(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Target Lokasi (GEO SEO)</Label>
                <Input placeholder="Jakarta Pusat" value={targetLocation} onChange={(e) => setTargetLocation(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Target Kata</Label>
                <Input type="number" value={targetWords} onChange={(e) => setTargetWords(parseInt(e.target.value) || 1000)} />
              </div>
              <div className="space-y-2 col-span-2 md:col-span-3">
                <Label>Canonical URL (Opsional)</Label>
                <Input placeholder="Kosongkan jika asli. Isi URL jika copas dari web lain." value={canonicalUrl} onChange={(e) => setCanonicalUrl(e.target.value)} />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Meta Title</Label>
              <Input placeholder="Sertakan Brand/Lokasi" value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label>Meta Description</Label>
              <Textarea rows={2} placeholder="Rangkuman menarik max 160 karakter..." value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)} />
            </div>

            <div className="space-y-2 p-4 bg-primary/5 rounded-xl border border-primary/20">
              <Label className="text-primary font-bold">Paragraf Pembuka (Featured Snippet / AEO)</Label>
              <Textarea rows={3} placeholder="Jawaban ringkas (30-50 kata) langsung di awal artikel yang merangkum keseluruhan isi..." value={featuredSnippet} onChange={(e) => setFeaturedSnippet(e.target.value)} className="bg-background mt-2" />
            </div>
          </div>

          <div className="bg-card border rounded-2xl p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center justify-between mb-6 border-b pb-4">
              <h2 className="text-lg font-bold">3. Konten Artikel</h2>
              <div className="flex flex-wrap gap-2">
                <Button size="sm" variant="outline" onClick={() => addBlock("h2")}>+ H2</Button>
                <Button size="sm" variant="outline" onClick={() => addBlock("h3")}>+ H3</Button>
                <Button size="sm" variant="default" onClick={() => addBlock("p")}>+ Teks</Button>
                <Button size="sm" variant="outline" onClick={() => addBlock("ul")} className="bg-zinc-100 dark:bg-zinc-800">+ List</Button>
                <Button size="sm" variant="outline" onClick={() => addBlock("image")} className="border-blue-500 text-blue-600 hover:bg-blue-50">+ Gambar</Button>
                <Button size="sm" variant="outline" onClick={() => addBlock("table")} className="border-green-500 text-green-600 hover:bg-green-50">+ Tabel</Button>
                <Button size="sm" variant="outline" onClick={() => addBlock("faq")} className="border-primary/50 text-primary hover:bg-primary/10">+ FAQ</Button>
              </div>
            </div>

            <div className="space-y-6">
              {blocks.length === 0 && (
                <div className="text-center py-12 border-2 border-dashed rounded-xl text-muted-foreground flex flex-col items-center justify-center">
                  <p>Belum ada blok konten. Susun artikel Anda sekarang!</p>
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
                      <Textarea value={block.value} onChange={(e) => updateBlock(block.id, { value: e.target.value })} placeholder="Ketik paragraf..." rows={4} className="w-full resize-y border-muted-foreground/20" />
                    )}
                    {(block.type === 'h2' || block.type === 'h3' || block.type === 'h4') && (
                      <Input value={block.value} onChange={(e) => updateBlock(block.id, { value: e.target.value })} placeholder={`Ketik judul ${block.type.toUpperCase()}...`} className={`w-full font-bold border-muted-foreground/20 ${block.type === 'h2' ? 'text-xl' : 'text-lg'}`} />
                    )}
                    {block.type === 'ul' && (
                      <Textarea value={block.value} onChange={(e) => updateBlock(block.id, { value: e.target.value })} placeholder="Poin 1&#10;Poin 2..." rows={4} className="w-full resize-y font-mono text-sm border-muted-foreground/20" />
                    )}
                    {block.type === 'image' && (
                      <div className="space-y-3 bg-blue-50/50 p-3 rounded-lg border border-blue-100">
                        <div>
                          <Label className="text-xs text-blue-800">URL Gambar</Label>
                          <Input value={block.value} onChange={(e) => updateBlock(block.id, { value: e.target.value })} placeholder="https://..." />
                        </div>
                        <div>
                          <Label className="text-xs text-blue-800">Alt Text (Untuk SEO)</Label>
                          <Input value={block.alt || ''} onChange={(e) => updateBlock(block.id, { alt: e.target.value })} placeholder="Deskripsi gambar..." />
                        </div>
                        {block.value && <img src={block.value} alt="Preview" className="max-h-32 rounded border object-contain bg-white" />}
                      </div>
                    )}
                    {block.type === 'table' && (
                      <div className="space-y-3 bg-green-50/50 p-3 rounded-lg border border-green-100 overflow-x-auto">
                        <div className="flex gap-2 mb-2">
                          <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => addTableRow(block.id)}>+ Baris</Button>
                          <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => addTableCol(block.id)}>+ Kolom</Button>
                        </div>
                        <table className="w-full text-sm border-collapse">
                          <tbody>
                            {block.rows?.map((row, rIndex) => (
                              <tr key={rIndex}>
                                {row.map((col, cIndex) => (
                                  <td key={cIndex} className="border p-1 min-w-[120px]">
                                    <Input 
                                      className={`h-8 text-xs ${rIndex === 0 ? 'font-bold bg-muted/50' : ''}`}
                                      value={col} 
                                      onChange={(e) => updateTableData(block.id, rIndex, cIndex, e.target.value)} 
                                    />
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                    {block.type === 'faq' && (
                      <div className="space-y-3 bg-card p-3 rounded-lg border border-dashed">
                        <div>
                          <Label className="text-xs">Pertanyaan (Q)</Label>
                          <Input value={block.question || ''} onChange={(e) => updateBlock(block.id, { question: e.target.value })} placeholder="Tulis pertanyaan..." className="font-medium" />
                        </div>
                        <div>
                          <Label className="text-xs">Jawaban (A)</Label>
                          <Textarea value={block.answer || ''} onChange={(e) => updateBlock(block.id, { answer: e.target.value })} placeholder="Tulis jawaban..." rows={2} />
                        </div>
                      </div>
                    )}

                    <Button variant="destructive" size="icon" className="absolute -right-3 -top-3 opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 rounded-full shadow-sm" onClick={() => removeBlock(block.id)}>
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
                <span className="text-sm font-medium text-muted-foreground">Target: {targetWords}</span>
              </div>
              <div className="flex items-end gap-2">
                <span className={`text-3xl font-display font-bold ${wordCount >= targetWords ? 'text-green-500' : 'text-primary'}`}>
                  {wordCount}
                </span>
                <span className="text-sm text-muted-foreground pb-1">kata</span>
              </div>
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <div className={`h-full transition-all duration-500 ${wordCount >= targetWords ? 'bg-green-500' : 'bg-primary'}`} style={{ width: `${Math.min((wordCount / targetWords) * 100, 100)}%` }} />
              </div>
              {wordCount >= targetWords && (
                <div className="flex items-center gap-1.5 text-xs text-green-500 font-medium"><CheckCircle2 className="w-3.5 h-3.5" /> Target tercapai!</div>
              )}
            </div>

            {/* Generated JSON Preview */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold">Generated Data (Preview)</h3>
                <Button size="sm" onClick={handleCopy} variant="outline" className="gap-2">
                  <Copy className="w-4 h-4" /> Copy
                </Button>
              </div>
              <p className="text-[10px] text-muted-foreground mb-4">
                Klik tombol <strong className="text-foreground">Publish / Save</strong> di header atas untuk otomatis membuat/menimpa file <code className="bg-muted px-1 rounded text-foreground">{slug || "..."}.json</code> di server Anda (src/data/blog/).
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

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Memuat...</div>}>
      <EditorForm />
    </Suspense>
  );
}
