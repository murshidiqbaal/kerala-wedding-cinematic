import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import QRCode from "react-qr-code";
import { 
  LayoutDashboard, UploadCloud, FolderHeart, QrCode, Settings, LogOut, 
  Sparkles, CheckCircle2, AlertCircle, Copy, Share2, Volume2, VolumeX,
  FileImage, Trash2, ArrowUpRight, BarChart3, Database, Users, Landmark, 
  ExternalLink, Eye, CloudLightning, Download, Printer
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { setupDriveStructure, uploadFileWithProgress, GDriveFolder, UploadProgressItem, ALBUM_CATEGORIES, DEFAULT_ALBUMS } from "@/lib/gdrive";

interface AdminDashboardProps {
  token: string;
  onLogout: () => void;
}

export const AdminDashboard = ({ token, onLogout }: AdminDashboardProps) => {
  const [activeTab, setActiveTab] = useState<"overview" | "upload" | "albums" | "qrs" | "settings">("overview");
  
  // Google Credentials configuration state
  const [clientId, setClientId] = useState(() => localStorage.getItem("gdrive_client_id") || "");
  const [apiKey, setApiKey] = useState(() => localStorage.getItem("gdrive_api_key") || "");
  
  // Sound effect toggle
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Synced folders list
  const [folders, setFolders] = useState<GDriveFolder[]>(() => {
    const saved = localStorage.getItem("gdrive_synced_folders");
    return saved ? JSON.parse(saved) : [];
  });

  // Recent uploads
  const [recentUploads, setRecentUploads] = useState<{ id: string; name: string; url: string; time: string; category: string }[]>(() => {
    const saved = localStorage.getItem("gdrive_recent_uploads");
    return saved ? JSON.parse(saved) : [];
  });

  const [isInitializingDrive, setIsInitializingDrive] = useState(false);
  const [driveConnected, setDriveConnected] = useState(false);

  // Upload Center state
  const [selectedCategory, setSelectedCategory] = useState("Ceremony");
  const [uploadQueue, setUploadQueue] = useState<UploadProgressItem[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  // Audio object helper
  const playSound = (type: "success" | "notify") => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      
      if (type === "success") {
        osc.frequency.setValueAtTime(523.25, audioCtx.currentTime); // C5
        osc.frequency.setValueAtTime(659.25, audioCtx.currentTime + 0.15); // E5
        osc.frequency.setValueAtTime(783.99, audioCtx.currentTime + 0.3); // G5
        gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.55);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.6);
      } else {
        osc.frequency.setValueAtTime(329.63, audioCtx.currentTime); // E4
        osc.frequency.setValueAtTime(392.00, audioCtx.currentTime + 0.12); // G4
        gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.35);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.4);
      }
    } catch (e) {
      console.warn("AudioContext failed to load:", e);
    }
  };

  // Sync / Initialize Google Drive structure automatically on mount if connected
  useEffect(() => {
    if (token && token !== "temp_token_unconfigured") {
      initializeGoogleDrive();
    } else if (token === "temp_token_unconfigured") {
      setDriveConnected(false);
      toast.warning("Google Drive client credentials unconfigured. Operating in Demo/Setup mode.");
    }
  }, [token]);

  const initializeGoogleDrive = async () => {
    setIsInitializingDrive(true);
    try {
      const syncedFolders = await setupDriveStructure(token);
      setFolders(syncedFolders);
      localStorage.setItem("gdrive_synced_folders", JSON.stringify(syncedFolders));
      
      // Update local storage so guest view picks it up instantly
      syncedFolders.forEach((f) => {
        localStorage.setItem(`gdrive_link_${f.name.replace(/\s+/g, "")}`, f.shareLink);
      });

      setDriveConnected(true);
      toast.success("Google Drive folders mapped and synchronized successfully!");
      playSound("success");
    } catch (error) {
      console.error(error);
      setDriveConnected(false);
      toast.error("Failed to map Google Drive structure. Check client ID or OAuth consent.");
    } finally {
      setIsInitializingDrive(false);
    }
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("gdrive_client_id", clientId.trim());
    localStorage.setItem("gdrive_api_key", apiKey.trim());
    toast.success("API Credentials saved. Reconnect token to apply changes.");
    playSound("notify");
  };

  // Drag and Drop handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      addFilesToQueue(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      addFilesToQueue(Array.from(e.target.files));
    }
  };

  const addFilesToQueue = (files: File[]) => {
    const validFiles = files.filter(f => f.type.startsWith("image/"));
    if (validFiles.length === 0) {
      toast.error("Only image formats (.jpg, .png, .webp) are allowed.");
      return;
    }

    const newItems: UploadProgressItem[] = validFiles.map(file => ({
      id: Math.random().toString(36).substring(7),
      name: file.name,
      progress: 0,
      status: "pending"
    }));

    setUploadQueue(prev => [...prev, ...newItems]);
    
    // Start processing files
    validFiles.forEach((file, index) => {
      startUpload(file, newItems[index].id);
    });
  };

  const startUpload = (file: File, queueId: string) => {
    const targetFolder = folders.find(f => f.name.toLowerCase() === selectedCategory.toLowerCase());
    
    // Fallback if Drive is not connected to simulate demo mode upload
    if (!driveConnected || !targetFolder || token === "temp_token_unconfigured") {
      simulateDemoUpload(file, queueId);
      return;
    }

    setUploadQueue(prev => 
      prev.map(item => item.id === queueId ? { ...item, status: "uploading" } : item)
    );

    uploadFileWithProgress(
      file,
      targetFolder.id,
      token,
      (progress) => {
        setUploadQueue(prev => 
          prev.map(item => item.id === queueId ? { ...item, progress } : item)
        );
      },
      (previewUrl) => {
        // Success
        setUploadQueue(prev => 
          prev.map(item => item.id === queueId ? { ...item, status: "success", progress: 100, url: previewUrl } : item)
        );
        
        // Add to recent uploads list
        const newItem = {
          id: Math.random().toString(),
          name: file.name,
          url: previewUrl,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          category: selectedCategory
        };
        
        setRecentUploads(prev => {
          const updated = [newItem, ...prev.slice(0, 19)];
          localStorage.setItem("gdrive_recent_uploads", JSON.stringify(updated));
          return updated;
        });

        toast.success(`"${file.name}" uploaded successfully!`);
        playSound("success");
      },
      (err) => {
        console.error(err);
        setUploadQueue(prev => 
          prev.map(item => item.id === queueId ? { ...item, status: "error" } : item)
        );
        toast.error(`"${file.name}" upload failed: ${err}`);
      }
    );
  };

  // Safe client-side simulation in case API is unconfigured, ensuring dashboard functions
  const simulateDemoUpload = (file: File, queueId: string) => {
    setUploadQueue(prev => 
      prev.map(item => item.id === queueId ? { ...item, status: "uploading" } : item)
    );

    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadQueue(prev => 
        prev.map(item => item.id === queueId ? { ...item, progress } : item)
      );

      if (progress >= 100) {
        clearInterval(interval);
        
        // Success
        const mockUrl = URL.createObjectURL(file);
        setUploadQueue(prev => 
          prev.map(item => item.id === queueId ? { ...item, status: "success", progress: 100, url: mockUrl } : item)
        );

        // Add to recent
        const newItem = {
          id: Math.random().toString(),
          name: file.name,
          url: mockUrl,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          category: selectedCategory
        };

        setRecentUploads(prev => {
          const updated = [newItem, ...prev.slice(0, 19)];
          localStorage.setItem("gdrive_recent_uploads", JSON.stringify(updated));
          return updated;
        });

        toast.success(`[Demo Mode] "${file.name}" uploaded locally!`);
        playSound("success");
      }
    }, 250);
  };

  const clearQueue = () => {
    setUploadQueue([]);
  };

  // Convert Dynamic SVG to sharp Canvas PNG to facilitate high-res print downloads
  const downloadQRCodeImage = (svgId: string, name: string) => {
    try {
      const svg = document.getElementById(svgId);
      if (!svg) {
        toast.error("QR Code container node not resolved.");
        return;
      }
      
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement("canvas");
      canvas.width = 512;
      canvas.height = 512;
      
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const img = new Image();
      img.onload = () => {
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, 512, 512);
        // Draw image with padding
        ctx.drawImage(img, 32, 32, 448, 448);
        
        const pngFile = canvas.toDataURL("image/png");
        const downloadLink = document.createElement("a");
        downloadLink.download = `QR_Rohith_Anjana_${name.replace(/\s+/g, "_")}.png`;
        downloadLink.href = pngFile;
        downloadLink.click();
        toast.success(`Downloaded high-res QR for ${name}!`);
      };
      
      img.src = "data:image/svg+xml;base64," + window.btoa(unescape(encodeURIComponent(svgData)));
    } catch (e) {
      console.error(e);
      toast.error("Error generating QR download stream.");
    }
  };

  const copyFolderLink = (link: string, category: string) => {
    navigator.clipboard.writeText(link);
    toast.success(`Link for ${category} copied to clipboard!`);
    playSound("notify");
  };

  const shareWhatsApp = (link: string, category: string) => {
    const text = encodeURIComponent(`Check out our live upload album for the wedding category: *${category}*! Click to view and download full quality memories: ${link}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
  };

  return (
    <div className="fixed inset-0 z-[2000] flex bg-[#0A0D10] text-stone-100 overflow-hidden font-sans">
      
      {/* ── SIDEBAR NAVIGATION ── */}
      <aside className="w-64 bg-zinc-950 border-r border-stone-900 flex flex-col justify-between shrink-0 hidden md:flex">
        <div>
          {/* Header */}
          <div className="p-6 border-b border-stone-900 flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-amber-500/20 to-emerald-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-sm font-semibold tracking-wide font-serif text-amber-100">R & A Memories</h1>
              <span className="text-[10px] text-stone-500 uppercase font-semibold">Photographer Hub</span>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="p-4 space-y-1.5">
            <button
              onClick={() => setActiveTab("overview")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all cursor-pointer ${
                activeTab === "overview" 
                  ? "bg-amber-500/10 text-amber-400 border-l-2 border-amber-500 font-medium" 
                  : "text-stone-400 hover:bg-stone-900 hover:text-stone-200"
              }`}
            >
              <LayoutDashboard className="h-4.5 w-4.5" />
              <span>Overview Panel</span>
            </button>
            <button
              onClick={() => setActiveTab("upload")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all cursor-pointer ${
                activeTab === "upload" 
                  ? "bg-amber-500/10 text-amber-400 border-l-2 border-amber-500 font-medium" 
                  : "text-stone-400 hover:bg-stone-900 hover:text-stone-200"
              }`}
            >
              <UploadCloud className="h-4.5 w-4.5" />
              <span>Upload Center</span>
            </button>
            <button
              onClick={() => setActiveTab("albums")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all cursor-pointer ${
                activeTab === "albums" 
                  ? "bg-amber-500/10 text-amber-400 border-l-2 border-amber-500 font-medium" 
                  : "text-stone-400 hover:bg-stone-900 hover:text-stone-200"
              }`}
            >
              <FolderHeart className="h-4.5 w-4.5" />
              <span>Album Manager</span>
            </button>
            <button
              onClick={() => setActiveTab("qrs")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all cursor-pointer ${
                activeTab === "qrs" 
                  ? "bg-amber-500/10 text-amber-400 border-l-2 border-amber-500 font-medium" 
                  : "text-stone-400 hover:bg-stone-900 hover:text-stone-200"
              }`}
            >
              <QrCode className="h-4.5 w-4.5" />
              <span>QR Code Signage</span>
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all cursor-pointer ${
                activeTab === "settings" 
                  ? "bg-amber-500/10 text-amber-400 border-l-2 border-amber-500 font-medium" 
                  : "text-stone-400 hover:bg-stone-900 hover:text-stone-200"
              }`}
            >
              <Settings className="h-4.5 w-4.5" />
              <span>API Settings</span>
            </button>
          </nav>
        </div>

        {/* Footer actions inside sidebar */}
        <div className="p-4 border-t border-stone-900 space-y-3 bg-zinc-950">
          <div className="flex items-center justify-between px-2">
            <span className="text-[10px] text-stone-500 uppercase tracking-wider">Audio Prompts</span>
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="text-stone-400 hover:text-amber-400 transition-colors"
            >
              {soundEnabled ? <Volume2 className="h-4.5 w-4.5" /> : <VolumeX className="h-4.5 w-4.5" />}
            </button>
          </div>
          <Button
            onClick={onLogout}
            variant="outline"
            className="w-full flex items-center justify-center gap-2 border-stone-800 text-stone-400 hover:bg-stone-900 hover:text-white"
          >
            <LogOut className="h-4 w-4" />
            <span>Close Dashboard</span>
          </Button>
        </div>
      </aside>

      {/* ── MAIN CONTENT AREA ── */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#0A0D10]">
        
        {/* Header (Top bar) */}
        <header className="h-16 bg-zinc-950/80 border-b border-stone-900/60 px-6 flex items-center justify-between z-10">
          {/* Mobile title */}
          <div className="flex items-center gap-2.5 md:hidden">
            <h1 className="text-sm font-semibold font-serif text-amber-100">Photographer Hub</h1>
          </div>

          <div className="flex items-center gap-3">
            {/* Connection Indicator */}
            {isInitializingDrive ? (
              <span className="flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1 text-[11px] font-medium text-amber-400 animate-pulse border border-amber-500/20">
                <Database className="h-3.5 w-3.5" />
                Setting up Google Drive...
              </span>
            ) : driveConnected ? (
              <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-[11px] font-medium text-emerald-400 border border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)]">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Live Sync Enabled
              </span>
            ) : (
              <span className="flex items-center gap-1.5 rounded-full bg-stone-500/10 px-3 py-1 text-[11px] font-medium text-stone-400 border border-stone-800">
                <AlertCircle className="h-3.5 w-3.5" />
                Offline Mode / Setup Needed
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 md:hidden">
            <Button
              onClick={onLogout}
              size="sm"
              variant="outline"
              className="border-stone-850 text-stone-400 text-xs px-2.5"
            >
              Exit
            </Button>
          </div>
        </header>

        {/* Dynamic Inner views */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {/* Welcome Card */}
              <div className="relative overflow-hidden rounded-2xl border border-amber-500/15 bg-gradient-to-r from-zinc-950 via-zinc-900 to-stone-950 p-6 md:p-8 shadow-xl">
                <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-amber-500/5 blur-3xl pointer-events-none" />
                <div className="relative z-10 max-w-2xl">
                  <div className="flex items-center gap-2 mb-3">
                    <CloudLightning className="h-4 w-4 text-emerald-400 animate-pulse" />
                    <span className="text-[10px] text-emerald-400 font-semibold uppercase tracking-wider">Live Synchronizer active</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-serif text-amber-100 tracking-wide">
                    Rohith & Anjana Wedding Photo Stream
                  </h2>
                  <p className="text-stone-400 text-xs md:text-sm mt-2 leading-relaxed">
                    Upload wedding photographs directly to your Google account folder. Photos will sync instantly and become publicly available via guest-scannable QR cards without taxing client-side vercel bandwidth limits.
                  </p>
                  
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Button
                      onClick={() => setActiveTab("upload")}
                      className="bg-amber-500 hover:bg-amber-600 text-stone-950 font-semibold"
                    >
                      <UploadCloud className="mr-2 h-4 w-4" /> Start Live Uploads
                    </Button>
                    <Button
                      variant="outline"
                      onClick={initializeGoogleDrive}
                      className="border-stone-800 text-stone-300 hover:bg-stone-900"
                    >
                      Sync drive schema
                    </Button>
                  </div>
                </div>
              </div>

              {/* Stats Widgets */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-zinc-950 border border-stone-900 p-5 rounded-xl">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-stone-500 text-xs font-medium uppercase tracking-wider">Photos Uploaded</span>
                    <FileImage className="h-4.5 w-4.5 text-amber-500/60" />
                  </div>
                  <p className="text-2xl font-bold tracking-tight">{recentUploads.length}</p>
                  <p className="text-[10px] text-emerald-400 mt-1 flex items-center gap-1 font-medium">
                    <CheckCircle2 className="h-3 w-3" /> Sync buffer active
                  </p>
                </div>
                <div className="bg-zinc-950 border border-stone-900 p-5 rounded-xl">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-stone-500 text-xs font-medium uppercase tracking-wider">Synced Categories</span>
                    <FolderHeart className="h-4.5 w-4.5 text-emerald-500/60" />
                  </div>
                  <p className="text-2xl font-bold tracking-tight">
                    {folders.length > 0 ? folders.length : 6} / 6
                  </p>
                  <p className="text-[10px] text-stone-400 mt-1">Automatic folders generated</p>
                </div>
                <div className="bg-zinc-950 border border-stone-900 p-5 rounded-xl">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-stone-500 text-xs font-medium uppercase tracking-wider">Public Bandwidth</span>
                    <Database className="h-4.5 w-4.5 text-blue-500/60" />
                  </div>
                  <p className="text-2xl font-bold tracking-tight">Unlimited</p>
                  <p className="text-[10px] text-blue-400 mt-1">Backed by Google Cloud</p>
                </div>
                <div className="bg-zinc-950 border border-stone-900 p-5 rounded-xl">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-stone-500 text-xs font-medium uppercase tracking-wider">Guest Signage</span>
                    <QrCode className="h-4.5 w-4.5 text-pink-500/60" />
                  </div>
                  <p className="text-2xl font-bold tracking-tight">Active</p>
                  <p className="text-[10px] text-stone-400 mt-1">QRs downloaded ready</p>
                </div>
              </div>

              {/* Recent Uploads Grid */}
              <div className="space-y-4">
                <h3 className="text-lg font-serif text-amber-100 flex items-center gap-2">
                  <Eye className="h-5 w-5 text-amber-500/70" /> Recent Upload Stream
                </h3>
                
                {recentUploads.length === 0 ? (
                  <div className="rounded-xl border border-dashed border-stone-850 p-12 text-center text-stone-500 text-xs">
                    No images uploaded in this browser session yet. Start uploading images in the Upload Center!
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {recentUploads.map((img) => (
                      <div 
                        key={img.id} 
                        className="group bg-zinc-950 border border-stone-900 rounded-xl overflow-hidden shadow-lg relative flex flex-col justify-between"
                      >
                        {/* Image preview */}
                        <div className="aspect-square w-full bg-stone-900 overflow-hidden relative">
                          <img 
                            src={img.url} 
                            alt={img.name} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2.5">
                            <a 
                              href={img.url} 
                              target="_blank" 
                              rel="noreferrer"
                              className="text-[10px] text-amber-400 hover:text-white flex items-center gap-1 font-semibold uppercase tracking-wider"
                            >
                              Open view <ArrowUpRight className="h-3 w-3" />
                            </a>
                          </div>
                        </div>

                        {/* Title and stats */}
                        <div className="p-3">
                          <p className="text-[10px] text-amber-500/80 font-bold uppercase tracking-wider">{img.category}</p>
                          <p className="text-xs text-stone-300 truncate mt-0.5">{img.name}</p>
                          <span className="text-[9px] text-stone-500 block mt-1">{img.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* TAB 2: UPLOAD CENTER */}
          {activeTab === "upload" && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6 max-w-4xl"
            >
              <div className="flex flex-wrap justify-between items-center gap-4">
                <div>
                  <h2 className="text-xl font-serif text-amber-100">Direct Upload Center</h2>
                  <p className="text-xs text-stone-500 mt-1">Select an album subfolder and choose files or drag them directly into the zone.</p>
                </div>
                
                {/* Category Selector dropdown */}
                <div className="flex items-center gap-3">
                  <label className="text-xs text-stone-400 font-semibold uppercase tracking-wider">Destination folder:</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="bg-zinc-950 border border-stone-850 text-stone-300 text-xs px-3.5 py-2.5 rounded-lg focus:outline-none focus:border-amber-500"
                  >
                    {ALBUM_CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Upload Drag Target */}
              <div
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                  dragActive 
                    ? "border-amber-500 bg-amber-500/5 shadow-[0_0_20px_rgba(245,158,11,0.05)]" 
                    : "border-stone-800 hover:border-amber-500/40 hover:bg-stone-950/40"
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                
                <div className="h-16 w-16 bg-stone-900 border border-stone-850 rounded-full flex items-center justify-center text-stone-400 mb-4 group-hover:text-amber-500 transition-colors">
                  <UploadCloud className="h-8 w-8" />
                </div>
                
                <h3 className="text-sm font-semibold text-stone-200">
                  Drag and drop wedding photos here, or <span className="text-amber-400 hover:underline">browse</span>
                </h3>
                <p className="text-[11px] text-stone-500 mt-2 max-w-sm">
                  Supports high-resolution JPEG, PNG, or WEBP photos. Multi-file upload stream will execute automatically.
                </p>
              </div>

              {/* Upload Queue Panel */}
              {uploadQueue.length > 0 && (
                <div className="bg-zinc-950 border border-stone-900 rounded-xl overflow-hidden">
                  <div className="p-4 border-b border-stone-900 flex justify-between items-center">
                    <span className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                      Upload Queue ({uploadQueue.filter(q => q.status === "success").length} / {uploadQueue.length} Done)
                    </span>
                    <button
                      onClick={clearQueue}
                      className="text-stone-500 hover:text-stone-300 text-xs transition-colors flex items-center gap-1.5"
                    >
                      <Trash2 className="h-3.5 w-3.5" /> Clear Queue
                    </button>
                  </div>
                  
                  <ScrollArea className="max-h-80">
                    <div className="p-4 space-y-3.5">
                      {uploadQueue.map((item) => (
                        <div key={item.id} className="flex flex-col gap-1.5 p-3 rounded-lg bg-[#0F1216] border border-stone-900/60">
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-stone-300 font-medium truncate max-w-xs">{item.name}</span>
                            {item.status === "success" && (
                              <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">Success</span>
                            )}
                            {item.status === "uploading" && (
                              <span className="text-[10px] text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">Uploading {item.progress}%</span>
                            )}
                            {item.status === "pending" && (
                              <span className="text-[10px] text-stone-400 bg-stone-900 px-2 py-0.5 rounded-full">Waiting...</span>
                            )}
                            {item.status === "error" && (
                              <span className="text-[10px] text-red-400 bg-red-500/10 px-2 py-0.5 rounded-full border border-red-500/20">Failed</span>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <Progress value={item.progress} className="h-1.5 flex-1" />
                            {item.url && (
                              <a
                                href={item.url}
                                target="_blank"
                                rel="noreferrer"
                                className="text-[10px] text-amber-400 hover:text-white flex items-center gap-0.5"
                              >
                                View <ExternalLink className="h-3 w-3" />
                              </a>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              )}
            </motion.div>
          )}

          {/* TAB 3: ALBUM MANAGER */}
          {activeTab === "albums" && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-xl font-serif text-amber-100">Live Album Manager</h2>
                <p className="text-xs text-stone-500 mt-1">Configure and manage guest access points for each of the six major wedding categories.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(folders.length > 0 ? folders : DEFAULT_ALBUMS.map((f, i) => ({ id: `default-${i}`, name: f.title, shareLink: f.link }))).map((folder, index) => {
                  // Retrieve placeholder image matching category
                  const fallback = DEFAULT_ALBUMS.find(d => d.title.toLowerCase() === folder.name.toLowerCase());
                  const cover = fallback ? fallback.image : "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=600&auto=format&fit=crop";

                  return (
                    <div 
                      key={folder.id || index}
                      className="bg-zinc-950 border border-stone-900 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between"
                    >
                      {/* Image cover header */}
                      <div className="h-32 w-full bg-stone-900 relative">
                        <img 
                          src={cover} 
                          alt={folder.name} 
                          className="w-full h-full object-cover opacity-60"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent" />
                        <div className="absolute bottom-4 left-5">
                          <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">Subfolder Album</span>
                          <h3 className="text-lg font-serif font-semibold text-amber-100">{folder.name}</h3>
                        </div>
                      </div>

                      {/* Folder settings */}
                      <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                        <div className="space-y-3">
                          <div className="space-y-1">
                            <span className="text-[10px] text-stone-500 font-semibold uppercase">Google Drive Link</span>
                            <div className="flex gap-2">
                              <Input
                                readOnly
                                value={folder.shareLink}
                                className="bg-black/45 border-stone-900 text-stone-400 text-xs truncate h-9 pointer-events-all select-all focus-visible:ring-0 focus-visible:ring-offset-0"
                              />
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => copyFolderLink(folder.shareLink, folder.name)}
                                className="border-stone-850 hover:bg-stone-900 shrink-0 h-9 px-3"
                              >
                                <Copy className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            {/* SVG Mini QR Code */}
                            <div className="p-2 bg-white rounded-lg inline-flex select-none">
                              <QRCode
                                id={`mini-qr-${index}`}
                                size={56}
                                value={folder.shareLink}
                                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                              />
                            </div>
                            <div className="text-xs text-stone-400 leading-normal">
                              Guests scan this QR to instantly view full-res pictures in this album.
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="pt-4 border-t border-stone-900/60 flex items-center justify-between gap-2.5">
                          <a
                            href={folder.shareLink}
                            target="_blank"
                            rel="noreferrer"
                            className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs text-stone-300 font-semibold bg-stone-900 hover:bg-stone-850 h-9 rounded-lg border border-stone-850 transition-colors"
                          >
                            Open Folder <ArrowUpRight className="h-3.5 w-3.5" />
                          </a>
                          
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => shareWhatsApp(folder.shareLink, folder.name)}
                            className="border-stone-850 hover:bg-emerald-950/20 hover:text-emerald-400 h-9 px-3 text-stone-400"
                          >
                            <Share2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* TAB 4: QR CODE MANAGER */}
          {activeTab === "qrs" && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-xl font-serif text-amber-100">QR Code Guest Signage</h2>
                <p className="text-xs text-stone-500 mt-1">Download high-resolution 512x512 PNG images of album QR codes to print out on greeting signage cards for guest tables.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(folders.length > 0 ? folders : DEFAULT_ALBUMS.map((f, i) => ({ id: `default-qr-${i}`, name: f.title, shareLink: f.link }))).map((folder, index) => {
                  const qrElementId = `signage-qr-${index}`;

                  return (
                    <div 
                      key={folder.id || index}
                      className="bg-zinc-950 border border-stone-900 rounded-2xl p-6 flex flex-col items-center justify-between text-center relative overflow-hidden"
                    >
                      {/* Gold border accent */}
                      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-amber-500/20 via-amber-500 to-amber-500/20" />

                      <span className="text-[9px] text-amber-500 font-bold uppercase tracking-widest mt-2">Signage QR Block</span>
                      <h3 className="text-base font-serif text-amber-100 font-semibold mb-5">{folder.name} Album</h3>
                      
                      {/* Larger high-fidelity QR Code box */}
                      <div className="p-4 bg-white rounded-xl shadow-lg border border-amber-500/10 mb-6 flex items-center justify-center select-none">
                        <QRCode
                          id={qrElementId}
                          size={180}
                          value={folder.shareLink}
                          level="H" // High error correction for reliable prints
                          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                        />
                      </div>

                      <p className="text-[11px] text-stone-400 leading-relaxed mb-6 max-w-xs px-2">
                        Contains the dynamic public sharing link with anyone reader access permissions.
                      </p>

                      <div className="flex gap-3.5 w-full">
                        <Button
                          onClick={() => downloadQRCodeImage(qrElementId, folder.name)}
                          className="flex-1 bg-amber-500 hover:bg-amber-600 text-stone-950 font-semibold h-10 text-xs"
                        >
                          <Download className="mr-1.5 h-3.5 w-3.5" /> Download PNG
                        </Button>
                        <Button
                          onClick={() => {
                            // Quick Print signage wrapper helper
                            const win = window.open("");
                            if (win) {
                              const svg = document.getElementById(qrElementId)?.outerHTML;
                              win.document.write(`
                                <html>
                                  <head>
                                    <title>Print QR - ${folder.name}</title>
                                    <style>
                                      body { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; font-family: serif; margin: 0; }
                                      .qr-box { padding: 40px; border: 2px solid gold; border-radius: 20px; text-align: center; }
                                      h1 { font-size: 32px; color: navy; margin-bottom: 5px; }
                                      p { font-size: 16px; color: gray; margin-bottom: 30px; }
                                    </style>
                                  </head>
                                  <body>
                                    <div class="qr-box">
                                      <h1>Rohith & Anjana</h1>
                                      <p>Scan to relive memories instantly: <strong>${folder.name}</strong></p>
                                      ${svg}
                                    </div>
                                    <script>window.onload = function() { window.print(); }</script>
                                  </body>
                                </html>
                              `);
                              win.document.close();
                            }
                          }}
                          variant="outline"
                          className="border-stone-850 text-stone-400 hover:bg-stone-900 h-10 px-3 shrink-0"
                        >
                          <Printer className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* TAB 5: API SETTINGS */}
          {activeTab === "settings" && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl bg-zinc-950 border border-stone-900 rounded-2xl p-6 md:p-8 space-y-6"
            >
              <div>
                <h2 className="text-xl font-serif text-amber-100">Google Cloud Console Integration</h2>
                <p className="text-xs text-stone-500 mt-1">Configure your Client ID and API Key to activate live file writing capabilities.</p>
              </div>

              <form onSubmit={handleSaveSettings} className="space-y-5">
                <div className="space-y-1">
                  <label className="text-stone-300 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
                    Google OAuth Client ID
                  </label>
                  <Input
                    type="text"
                    value={clientId}
                    onChange={(e) => setClientId(e.target.value)}
                    placeholder="xxxxxxxxxxxx-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.apps.googleusercontent.com"
                    className="bg-black/45 border-stone-900 focus:border-amber-500/50 text-white placeholder-stone-700 text-sm h-11 focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                  <p className="text-[10px] text-stone-500 italic mt-0.5">
                    Generate this Client ID under credentials in Google Cloud Console. Set Authorized JavaScript Origins to your Vercel URL.
                  </p>
                </div>

                <div className="space-y-1">
                  <label className="text-stone-300 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
                    Google Drive API Key
                  </label>
                  <Input
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
                    className="bg-black/45 border-stone-900 focus:border-amber-500/50 text-white placeholder-stone-700 text-sm h-11 focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </div>

                <div className="pt-2 flex gap-3">
                  <Button
                    type="submit"
                    className="bg-amber-500 hover:bg-amber-600 text-stone-950 font-semibold h-11 px-6 shadow-md border-0"
                  >
                    Save API Keys
                  </Button>
                </div>
              </form>

              {/* Instructions Callout block */}
              <div className="rounded-xl bg-amber-500/5 border border-amber-500/15 p-5 text-xs text-stone-400 space-y-3 leading-relaxed">
                <h4 className="font-serif text-amber-100 font-semibold uppercase tracking-wider text-xs flex items-center gap-1">
                  <Sparkles className="h-3.5 w-3.5 text-amber-500" /> Easy Credentials Setup Guide:
                </h4>
                <ol className="list-decimal list-inside space-y-2 text-stone-400 pl-1.5">
                  <li>Visit <a href="https://console.cloud.google.com" target="_blank" rel="noreferrer" className="text-amber-400 underline">Google Cloud Console</a> and create a project.</li>
                  <li>Enable the <strong>Google Drive API</strong>.</li>
                  <li>Navigate to <strong>OAuth Consent Screen</strong>: set Publishing status to <i>Testing</i> and add <i>weddinginvitationworks@gmail.com</i> as a Test User. Add scope: <code>.../auth/drive.file</code>.</li>
                  <li>Navigate to <strong>Credentials</strong>: click Create Credentials &rarr; <strong>OAuth Client ID</strong>. Set application type to <i>Web Application</i>.</li>
                  <li>In <strong>Authorized JavaScript Origins</strong>, add <code>http://localhost:5173</code> (for local testing) and your Vercel web URL (e.g. <code>https://anjana-rohit-invitation.vercel.app</code>). Click save and copy Client ID here.</li>
                </ol>
              </div>
            </motion.div>
          )}

        </div>
      </main>
    </div>
  );
};
