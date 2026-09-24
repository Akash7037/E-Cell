"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  initialEvents,
  initialMembers,
  initialInquiries,
  initialLogs,
  initialGallery,
  EventItem,
  TeamMember,
  ContactInquiry,
  AuditLog,
  GalleryItem,
} from "@/lib/data";
import {
  ShieldCheck,
  Lock,
  Calendar,
  Users,
  Inbox,
  Activity,
  Plus,
  Trash2,
  Edit2,
  X,
  LogOut,
  Download,
  Image as ImageIcon,
  Tag,
} from "lucide-react";

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string; role: string } | null>(null);
  const [csrfToken, setCsrfToken] = useState("");

  // Login Form
  const [email, setEmail] = useState("admin@vsbcetc.edu.in");
  const [password, setPassword] = useState("ECell_Admin_2026!");
  const [totpCode, setTotpCode] = useState("");
  const [show2FA, setShow2FA] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [lockedOutSeconds, setLockedOutSeconds] = useState(0);
  const [remainingAttempts, setRemainingAttempts] = useState(5);
  const [loginLoading, setLoginLoading] = useState(false);

  // Tabs
  const [activeTab, setActiveTab] = useState<"events" | "members" | "gallery" | "inquiries" | "logs">("events");

  // Stores
  const [eventsList, setEventsList] = useState<EventItem[]>(initialEvents);
  const [membersList, setMembersList] = useState<TeamMember[]>(initialMembers);
  const [galleryList, setGalleryList] = useState<GalleryItem[]>(initialGallery);
  const [inquiriesList, setInquiriesList] = useState<ContactInquiry[]>(initialInquiries);
  const [logsList, setLogsList] = useState<AuditLog[]>(initialLogs);

  // Modals
  const [eventModalOpen, setEventModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Partial<EventItem> | null>(null);

  const [memberModalOpen, setMemberModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<Partial<TeamMember> | null>(null);

  const [galleryModalOpen, setGalleryModalOpen] = useState(false);
  const [editingGallery, setEditingGallery] = useState<Partial<GalleryItem> | null>(null);

  // Lockout countdown
  useEffect(() => {
    if (lockedOutSeconds <= 0) return;
    const interval = setInterval(() => {
      setLockedOutSeconds((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [lockedOutSeconds]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setLoginLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, totpCode }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 429) {
          setLockedOutSeconds(data.retryAfterSeconds || 60);
          setLoginError(data.error);
        } else {
          setLoginError(data.error || "Authentication failed.");
          if (data.remainingAttempts !== undefined) {
            setRemainingAttempts(data.remainingAttempts);
          }
        }
        setLoginLoading(false);
        return;
      }

      if (data.requires2FA) {
        setShow2FA(true);
        setLoginLoading(false);
        return;
      }

      setIsLoggedIn(true);
      setCurrentUser(data.user);
      setCsrfToken(data.csrfToken || "csrf_active");
      setShow2FA(false);
      setLoginLoading(false);
    } catch {
      setLoginError("Failed to authenticate session.");
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    setIsLoggedIn(false);
    setCurrentUser(null);
    setTotpCode("");
  };

  const handleAutofillDemo = () => {
    setEmail("admin@vsbcetc.edu.in");
    setPassword("ECell_Admin_2026!");
    setTotpCode("728491");
  };

  // Event actions
  const handleDeleteEvent = async (id: string) => {
    if (!confirm("Are you sure you want to delete this event?")) return;
    setEventsList((prev) => prev.filter((e) => e.id !== id));
    await fetch(`/api/admin/events?id=${id}`, { method: "DELETE" });
  };

  const handleSaveEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEvent?.title) return;

    if (editingEvent.id) {
      setEventsList((prev) =>
        prev.map((item) => (item.id === editingEvent.id ? ({ ...item, ...editingEvent } as EventItem) : item))
      );
    } else {
      const newEvt: EventItem = {
        id: `evt-${Date.now()}`,
        title: editingEvent.title || "New Challenge",
        subtitle: editingEvent.subtitle || "E-Cell Innovation Initiative",
        category: (editingEvent.category as any) || "Workshop",
        date: editingEvent.date || new Date().toISOString().split("T")[0],
        time: editingEvent.time || "10:00 AM IST",
        venue: editingEvent.venue || "Innovation Sandbox Hub",
        isSpotlight: Boolean(editingEvent.isSpotlight),
        status: editingEvent.status || "Upcoming",
        description: editingEvent.description || "Description",
        fullDetails: editingEvent.fullDetails || "Full details",
        prizePool: editingEvent.prizePool || "Grants + Incubation",
        registrationOpen: true,
        image: editingEvent.image || "/photos/workshop_1.webp",
        agenda: [{ time: "10:00 AM", activity: "Kickoff" }],
      };
      setEventsList((prev) => [newEvt, ...prev]);
    }
    setEventModalOpen(false);
    setEditingEvent(null);
  };

  // Member actions
  const handleDeleteMember = async (id: string) => {
    if (!confirm("Remove this member from active roster?")) return;
    setMembersList((prev) => prev.filter((m) => m.id !== id));
    await fetch(`/api/admin/members?id=${id}`, { method: "DELETE" });
  };

  const handleSaveMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMember?.name) return;

    if (editingMember.id) {
      setMembersList((prev) =>
        prev.map((item) => (item.id === editingMember.id ? ({ ...item, ...editingMember } as TeamMember) : item))
      );
    } else {
      const newMem: TeamMember = {
        id: `mem-${Date.now()}`,
        name: editingMember.name || "Student Innovator",
        role: editingMember.role || "Executive Lead",
        department: editingMember.department || "Computer Science",
        category: (editingMember.category as any) || "Technology & AI",
        image: editingMember.image || "/photos/members/member_tech.webp",
        bio: editingMember.bio || "Active contributor to campus incubator sprints.",
        contribution: editingMember.contribution || "Spearheaded prototype build.",
        skills: editingMember.skills || ["Innovation", "Leadership"],
        socials: { linkedin: "https://linkedin.com" },
      };
      setMembersList((prev) => [newMem, ...prev]);
    }
    setMemberModalOpen(false);
    setEditingMember(null);
  };

  // Gallery actions (Requested specifically by user)
  const handleDeleteGallery = (id: string) => {
    if (!confirm("Delete this gallery item?")) return;
    setGalleryList((prev) => prev.filter((g) => g.id !== id));
  };

  const handleSaveGallery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingGallery?.title) return;

    if (editingGallery.id) {
      setGalleryList((prev) =>
        prev.map((g) => (g.id === editingGallery.id ? ({ ...g, ...editingGallery } as GalleryItem) : g))
      );
    } else {
      const newItem: GalleryItem = {
        id: `gal-${Date.now()}`,
        title: editingGallery.title || "Campus Workshop Moment",
        caption: editingGallery.caption || "Student founders in action",
        category: (editingGallery.category as any) || "Workshop",
        date: editingGallery.date || new Date().toISOString().split("T")[0],
        imageUrl: editingGallery.imageUrl || "/photos/workshop_1.webp",
        description: editingGallery.description || "Detailed session description.",
        tags: editingGallery.tags || ["Campus", "Innovation"],
      };
      setGalleryList((prev) => [newItem, ...prev]);
    }
    setGalleryModalOpen(false);
    setEditingGallery(null);
  };

  const handleUpdateInquiry = (id: string, status: ContactInquiry["status"]) => {
    setInquiriesList((prev) =>
      prev.map((inq) => (inq.id === id ? { ...inq, status } : inq))
    );
  };

  return (
    <div className="relative pt-28 pb-24 overflow-hidden min-h-screen text-[#121316]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {!isLoggedIn ? (
          /* ================= SECURITY LOGIN ================= */
          <div className="max-w-md mx-auto my-12">
            <div className="rounded-3xl p-8 bg-white border border-[#121316]/10 shadow-[0_15px_45px_rgba(70,55,35,0.08)] space-y-6">
              <div className="space-y-2 text-center">
                <div className="w-12 h-12 rounded-2xl bg-[#82111E]/10 border border-[#82111E]/20 flex items-center justify-center text-[#82111E] mx-auto">
                  <Lock className="w-6 h-6" />
                </div>
                <h1 className="text-2xl font-bold font-display uppercase tracking-tight">
                  E-Cell Admin Portal
                </h1>
                <p className="text-xs text-[#58554F] font-mono">
                  Autonomous System Management & Data Control
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#FAF6F0] border border-[#121316]/5 text-[11px] text-[#58554F] space-y-1">
                <div className="flex items-center gap-1.5 text-[#82111E] font-mono font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Security Active: Bcrypt • Rate-Limiting • TOTP 2FA</span>
                </div>
                <p>
                  Attempts remaining: <span className="text-[#121316] font-mono font-bold">{remainingAttempts}</span>. 5 failed attempts trigger a 15-minute temporary lockout.
                </p>
              </div>

              {loginError && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-700">
                  {loginError}
                </div>
              )}

              {lockedOutSeconds > 0 ? (
                <div className="p-6 rounded-2xl bg-red-50 text-center space-y-1 border border-red-200">
                  <div className="text-3xl font-black font-display text-[#82111E]">
                    {lockedOutSeconds}s
                  </div>
                  <div className="text-xs text-red-700 font-mono">
                    Security Lockout Active. Please wait before retrying.
                  </div>
                </div>
              ) : (
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-[#58554F] mb-1 font-semibold">
                      Admin Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@vsbcetc.edu.in"
                      className="brand-input-field"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-[#58554F] mb-1 font-semibold">
                      Master Password
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="brand-input-field"
                      required
                    />
                  </div>

                  {show2FA && (
                    <div className="space-y-1 pt-2">
                      <div className="flex justify-between items-center">
                        <label className="text-[11px] font-mono uppercase tracking-wider text-[#82111E] font-bold">
                          TOTP Authenticator 2FA (6 Digits)
                        </label>
                        <span className="text-[10px] font-mono text-[#58554F]">
                          Demo: 728491
                        </span>
                      </div>
                      <input
                        type="text"
                        maxLength={6}
                        value={totpCode}
                        onChange={(e) => setTotpCode(e.target.value)}
                        placeholder="728491"
                        className="brand-input-field text-center font-mono tracking-widest text-lg"
                        required
                        autoFocus
                      />
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loginLoading}
                    className="btn-glitch w-full py-3.5 rounded-full bg-[#82111E] hover:bg-[#9E1B28] text-white font-bold text-xs uppercase tracking-widest shadow-sm transition-all duration-200 mt-2 disabled:opacity-50"
                  >
                    {loginLoading
                      ? "Verifying Hash..."
                      : show2FA
                      ? "Verify 2FA Code"
                      : "Authenticate Session"}
                  </button>

                  <div className="pt-2 text-center">
                    <button
                      type="button"
                      onClick={handleAutofillDemo}
                      className="btn-glitch text-[11px] font-mono text-[#82111E] hover:underline"
                    >
                      Autofill Demo Credentials (Superadmin + 2FA)
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        ) : (
          /* ================= DASHBOARD ================= */
          <div className="space-y-8">
            {/* Header */}
            <div className="p-6 rounded-3xl bg-white border border-[#121316]/10 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#82111E] flex items-center justify-center text-white font-display font-black text-lg">
                  ECell
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-xl font-bold font-display text-[#121316]">
                      {currentUser?.name || "System Administrator"}
                    </h1>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-[#82111E]/10 text-[#82111E] font-bold border border-[#82111E]/20">
                      {currentUser?.role || "Superadmin"}
                    </span>
                  </div>
                  <span className="text-xs text-[#58554F] font-mono">
                    CSRF Token: {csrfToken.substring(0, 16)}... • Session Active
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href="/api/brochure"
                  download="ECELL_FOUNDER_PROSPECTUS_2026.pdf"
                  className="btn-glitch px-4 py-2 rounded-full bg-[#FAF6F0] hover:bg-white border border-[#121316]/10 text-xs font-mono text-[#121316] flex items-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-[#D48B28]" />
                  <span>Brochure PDF</span>
                </a>

                <button
                  onClick={handleLogout}
                  className="btn-glitch px-4 py-2 rounded-full bg-red-50 hover:bg-red-100 border border-red-200 text-xs font-mono text-red-700 flex items-center gap-1.5 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout</span>
                </button>
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { label: "Active Events", val: eventsList.length, icon: Calendar },
                { label: "Roster Members", val: membersList.length, icon: Users },
                { label: "Gallery Assets", val: galleryList.length, icon: ImageIcon },
                { label: "Pitch Inquiries", val: inquiriesList.length, icon: Inbox },
                { label: "Audit Events", val: logsList.length, icon: Activity },
              ].map((m, i) => (
                <div key={i} className="p-5 rounded-2xl bg-white border border-[#121316]/10 shadow-xs space-y-1">
                  <div className="flex items-center justify-between text-[#58554F] text-xs font-mono">
                    <span>{m.label}</span>
                    <m.icon className="w-4 h-4 text-[#82111E]" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-black font-display text-[#121316]">
                    {m.val}
                  </div>
                </div>
              ))}
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-2 border-b border-[#121316]/10 pb-3 overflow-x-auto">
              {[
                { id: "events", label: "Events CRUD", icon: Calendar },
                { id: "members", label: "Team (20 Members)", icon: Users },
                { id: "gallery", label: "Gallery & Media", icon: ImageIcon },
                { id: "inquiries", label: "Inquiries Queue", icon: Inbox },
                { id: "logs", label: "Audit Logs", icon: Activity },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`btn-glitch flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all ${
                    activeTab === tab.id
                      ? "bg-[#82111E] text-white shadow-sm font-semibold"
                      : "text-[#58554F] hover:text-[#121316] hover:bg-white"
                  }`}
                >
                  <tab.icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* TAB 1: EVENTS */}
            {activeTab === "events" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold font-display uppercase">
                    Events Registry
                  </h2>
                  <button
                    onClick={() => {
                      setEditingEvent({});
                      setEventModalOpen(true);
                    }}
                    className="btn-glitch px-4 py-2 rounded-full bg-[#82111E] text-white text-xs font-mono uppercase flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Create Event</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {eventsList.map((evt) => (
                    <div
                      key={evt.id}
                      className="p-5 rounded-2xl bg-white border border-[#121316]/10 shadow-xs flex flex-col justify-between space-y-4"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#FAF6F0] text-[#82111E] font-bold">
                            {evt.category} • {evt.status}
                          </span>
                          {evt.isSpotlight && (
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#82111E] text-white font-bold">
                              Spotlight
                            </span>
                          )}
                        </div>
                        <h3 className="text-base font-bold font-display text-[#121316]">
                          {evt.title}
                        </h3>
                        <p className="text-xs text-[#58554F] line-clamp-2">
                          {evt.description}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-[#121316]/5 flex items-center justify-between text-xs font-mono text-[#58554F]">
                        <span>{evt.date}</span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setEditingEvent(evt);
                              setEventModalOpen(true);
                            }}
                            className="p-1.5 rounded hover:bg-[#FAF6F0] text-[#121316]"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteEvent(evt.id)}
                            className="p-1.5 rounded hover:bg-red-50 text-red-600"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 2: MEMBERS */}
            {activeTab === "members" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold font-display uppercase">
                    Team & Leadership (20 Members)
                  </h2>
                  <button
                    onClick={() => {
                      setEditingMember({});
                      setMemberModalOpen(true);
                    }}
                    className="btn-glitch px-4 py-2 rounded-full bg-[#82111E] text-white text-xs font-mono uppercase flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Member</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {membersList.map((m) => (
                    <div
                      key={m.id}
                      className="p-4 rounded-2xl bg-white border border-[#121316]/10 shadow-xs flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-black shrink-0 border border-[#121316]/10">
                          <Image src={m.image} alt={m.name} fill className="object-cover" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-[#121316] truncate max-w-[140px]">
                            {m.name}
                          </div>
                          <div className="text-xs text-[#82111E] font-mono truncate max-w-[140px] font-semibold">
                            {m.role}
                          </div>
                          <div className="text-[10px] text-[#58554F]">{m.category}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => {
                            setEditingMember(m);
                            setMemberModalOpen(true);
                          }}
                          className="p-1.5 rounded hover:bg-[#FAF6F0] text-[#121316]"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteMember(m.id)}
                          className="p-1.5 rounded hover:bg-red-50 text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: GALLERY MANAGER (User requested with text description) */}
            {activeTab === "gallery" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold font-display uppercase">
                      Gallery & Media Manager
                    </h2>
                    <p className="text-xs text-[#58554F]">
                      Manage event photography, workshop captures, and descriptive captions
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setEditingGallery({});
                      setGalleryModalOpen(true);
                    }}
                    className="btn-glitch px-4 py-2 rounded-full bg-[#82111E] text-white text-xs font-mono uppercase flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Gallery Item</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {galleryList.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-2xl overflow-hidden bg-white border border-[#121316]/10 shadow-xs flex flex-col justify-between"
                    >
                      <div className="relative aspect-[16/10] w-full bg-black">
                        <Image
                          src={item.imageUrl}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase bg-white/90 text-[#121316] font-bold">
                          {item.category}
                        </div>
                      </div>

                      <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                        <div className="space-y-2">
                          <div className="text-[11px] font-mono text-[#82111E] font-semibold">
                            {item.date}
                          </div>
                          <h3 className="text-base font-bold font-display text-[#121316]">
                            {item.title}
                          </h3>
                          <p className="text-xs text-[#58554F] font-medium italic">
                            {item.caption}
                          </p>
                          <p className="text-xs text-[#58554F] line-clamp-3 leading-relaxed">
                            {item.description}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-[#121316]/5 flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            {item.tags?.map((t, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-0.5 rounded text-[9px] font-mono bg-[#FAF6F0] text-[#58554F]"
                              >
                                #{t}
                              </span>
                            ))}
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                setEditingGallery(item);
                                setGalleryModalOpen(true);
                              }}
                              className="p-1.5 rounded hover:bg-[#FAF6F0] text-[#121316]"
                              title="Edit"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteGallery(item.id)}
                              className="p-1.5 rounded hover:bg-red-50 text-red-600"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: INQUIRIES */}
            {activeTab === "inquiries" && (
              <div className="space-y-6">
                <h2 className="text-lg font-bold font-display uppercase">
                  Incoming Startup Pitches & Inquiries
                </h2>

                <div className="space-y-3">
                  {inquiriesList.map((inq) => (
                    <div
                      key={inq.id}
                      className="p-5 rounded-2xl bg-white border border-[#121316]/10 shadow-xs space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <span className="text-sm font-bold text-[#121316] mr-3">
                            {inq.name}
                          </span>
                          <span className="text-xs font-mono text-[#82111E] font-semibold">
                            {inq.email}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2.5 py-0.5 rounded text-[10px] font-mono uppercase font-bold ${
                              inq.status === "New"
                                ? "bg-emerald-100 text-emerald-800"
                                : inq.status === "In Review"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-neutral-100 text-neutral-600"
                            }`}
                          >
                            {inq.status}
                          </span>
                          <span className="text-[10px] text-[#58554F] font-mono">
                            {inq.timestamp}
                          </span>
                        </div>
                      </div>

                      <div className="text-xs font-semibold text-[#121316] font-display">
                        {inq.subject}
                      </div>

                      <p className="text-xs text-[#58554F] leading-relaxed">
                        {inq.message}
                      </p>

                      <div className="pt-2 border-t border-[#121316]/5 flex items-center gap-2">
                        <button
                          onClick={() => handleUpdateInquiry(inq.id, "In Review")}
                          className="btn-glitch px-3 py-1 rounded-full text-[10px] font-mono bg-[#FAF6F0] text-[#58554F] border border-[#121316]/10"
                        >
                          Mark In Review
                        </button>
                        <button
                          onClick={() => handleUpdateInquiry(inq.id, "Resolved")}
                          className="btn-glitch px-3 py-1 rounded-full text-[10px] font-mono bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold"
                        >
                          Mark Resolved
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 5: AUDIT LOGS */}
            {activeTab === "logs" && (
              <div className="space-y-6">
                <h2 className="text-lg font-bold font-display uppercase">
                  Security Access & Audit Trail
                </h2>

                <div className="rounded-2xl bg-white border border-[#121316]/10 shadow-xs overflow-hidden">
                  <div className="divide-y divide-[#121316]/5">
                    {logsList.map((log) => (
                      <div
                        key={log.id}
                        className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono"
                      >
                        <div className="space-y-0.5">
                          <span className="text-[#121316] font-medium block">
                            {log.action}
                          </span>
                          <span className="text-[#58554F] text-[11px]">
                            User: {log.user} • IP: {log.ip}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-[#58554F]">{log.timestamp}</span>
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              log.status === "Success"
                                ? "bg-emerald-100 text-emerald-800"
                                : log.status === "Warning"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {log.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* EVENT MODAL */}
      {eventModalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto"
          onClick={() => setEventModalOpen(false)}
        >
          <div
            className="relative max-w-xl w-full bg-[#FAF6F0] rounded-3xl border border-[#121316]/15 p-6 sm:p-8 shadow-2xl my-8 text-[#121316]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setEventModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-white text-[#121316]"
            >
              <X className="w-5 h-5" />
            </button>

            <form onSubmit={handleSaveEvent} className="space-y-4">
              <h3 className="text-xl font-bold font-display uppercase">
                {editingEvent?.id ? "Edit Event" : "Create New Event"}
              </h3>

              <div>
                <label className="block text-[11px] font-mono text-[#58554F] mb-1 font-semibold">
                  Title
                </label>
                <input
                  type="text"
                  required
                  value={editingEvent?.title || ""}
                  onChange={(e) => setEditingEvent({ ...editingEvent, title: e.target.value })}
                  className="brand-input-field"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-[#58554F] mb-1 font-semibold">
                  Subtitle
                </label>
                <input
                  type="text"
                  value={editingEvent?.subtitle || ""}
                  onChange={(e) => setEditingEvent({ ...editingEvent, subtitle: e.target.value })}
                  className="brand-input-field"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono text-[#58554F] mb-1 font-semibold">
                    Date
                  </label>
                  <input
                    type="date"
                    value={editingEvent?.date || ""}
                    onChange={(e) => setEditingEvent({ ...editingEvent, date: e.target.value })}
                    className="brand-input-field"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-[#58554F] mb-1 font-semibold">
                    Category
                  </label>
                  <select
                    value={editingEvent?.category || "Workshop"}
                    onChange={(e) => setEditingEvent({ ...editingEvent, category: e.target.value as any })}
                    className="brand-input-field bg-[#FAF6F0]"
                  >
                    <option value="Hackathon">Hackathon</option>
                    <option value="Workshop">Workshop</option>
                    <option value="Summit">Summit</option>
                    <option value="Bootcamp">Bootcamp</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-[#58554F] mb-1 font-semibold">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={editingEvent?.description || ""}
                  onChange={(e) => setEditingEvent({ ...editingEvent, description: e.target.value })}
                  className="brand-input-field resize-none"
                />
              </div>

              <button
                type="submit"
                className="btn-glitch w-full py-3 rounded-full bg-[#82111E] text-white font-bold text-xs uppercase font-mono mt-3"
              >
                Save Event Record
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MEMBER MODAL */}
      {memberModalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto"
          onClick={() => setMemberModalOpen(false)}
        >
          <div
            className="relative max-w-xl w-full bg-[#FAF6F0] rounded-3xl border border-[#121316]/15 p-6 sm:p-8 shadow-2xl my-8 text-[#121316]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setMemberModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-white text-[#121316]"
            >
              <X className="w-5 h-5" />
            </button>

            <form onSubmit={handleSaveMember} className="space-y-4">
              <h3 className="text-xl font-bold font-display uppercase">
                {editingMember?.id ? "Edit Team Member" : "Add Team Member"}
              </h3>

              <div>
                <label className="block text-[11px] font-mono text-[#58554F] mb-1 font-semibold">
                  Name
                </label>
                <input
                  type="text"
                  required
                  value={editingMember?.name || ""}
                  onChange={(e) => setEditingMember({ ...editingMember, name: e.target.value })}
                  className="brand-input-field"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono text-[#58554F] mb-1 font-semibold">
                    Role
                  </label>
                  <input
                    type="text"
                    required
                    value={editingMember?.role || ""}
                    onChange={(e) => setEditingMember({ ...editingMember, role: e.target.value })}
                    className="brand-input-field"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-[#58554F] mb-1 font-semibold">
                    Department
                  </label>
                  <input
                    type="text"
                    value={editingMember?.department || ""}
                    onChange={(e) => setEditingMember({ ...editingMember, department: e.target.value })}
                    className="brand-input-field"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-[#58554F] mb-1 font-semibold">
                  Category
                </label>
                <select
                  value={editingMember?.category || "Leadership"}
                  onChange={(e) => setEditingMember({ ...editingMember, category: e.target.value as any })}
                  className="brand-input-field bg-[#FAF6F0]"
                >
                  <option value="Leadership">Leadership</option>
                  <option value="Technology & AI">Technology & AI</option>
                  <option value="Incubation & Ventures">Incubation & Ventures</option>
                  <option value="Operations & Logistics">Operations & Logistics</option>
                  <option value="Design & Media">Design & Media</option>
                  <option value="Faculty">Faculty</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-[#58554F] mb-1 font-semibold">
                  Bio & Accomplishment
                </label>
                <textarea
                  rows={3}
                  value={editingMember?.bio || ""}
                  onChange={(e) => setEditingMember({ ...editingMember, bio: e.target.value })}
                  className="brand-input-field resize-none"
                />
              </div>

              <button
                type="submit"
                className="btn-glitch w-full py-3 rounded-full bg-[#82111E] text-white font-bold text-xs uppercase font-mono mt-3"
              >
                Save Member Record
              </button>
            </form>
          </div>
        </div>
      )}

      {/* GALLERY MODAL */}
      {galleryModalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto"
          onClick={() => setGalleryModalOpen(false)}
        >
          <div
            className="relative max-w-xl w-full bg-[#FAF6F0] rounded-3xl border border-[#121316]/15 p-6 sm:p-8 shadow-2xl my-8 text-[#121316]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setGalleryModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-white text-[#121316]"
            >
              <X className="w-5 h-5" />
            </button>

            <form onSubmit={handleSaveGallery} className="space-y-4">
              <h3 className="text-xl font-bold font-display uppercase">
                {editingGallery?.id ? "Edit Gallery Content" : "Add Gallery Content with Text"}
              </h3>

              <div>
                <label className="block text-[11px] font-mono text-[#58554F] mb-1 font-semibold">
                  Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. AI Prototyping Workshop"
                  value={editingGallery?.title || ""}
                  onChange={(e) => setEditingGallery({ ...editingGallery, title: e.target.value })}
                  className="brand-input-field"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-[#58554F] mb-1 font-semibold">
                  Caption *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Hands-on coding in the research computing suite"
                  value={editingGallery?.caption || ""}
                  onChange={(e) => setEditingGallery({ ...editingGallery, caption: e.target.value })}
                  className="brand-input-field"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono text-[#58554F] mb-1 font-semibold">
                    Category
                  </label>
                  <select
                    value={editingGallery?.category || "Workshop"}
                    onChange={(e) => setEditingGallery({ ...editingGallery, category: e.target.value as any })}
                    className="brand-input-field bg-[#FAF6F0]"
                  >
                    <option value="Workshop">Workshop</option>
                    <option value="Ideathon">Ideathon</option>
                    <option value="Summit">Summit</option>
                    <option value="Induction">Induction</option>
                    <option value="Campus">Campus</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-[#58554F] mb-1 font-semibold">
                    Date
                  </label>
                  <input
                    type="date"
                    value={editingGallery?.date || ""}
                    onChange={(e) => setEditingGallery({ ...editingGallery, date: e.target.value })}
                    className="brand-input-field"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-[#58554F] mb-1 font-semibold">
                  Image Path / URL
                </label>
                <input
                  type="text"
                  placeholder="/photos/workshop_1.webp"
                  value={editingGallery?.imageUrl || ""}
                  onChange={(e) => setEditingGallery({ ...editingGallery, imageUrl: e.target.value })}
                  className="brand-input-field"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-[#58554F] mb-1 font-semibold">
                  Detailed Description with Context
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe the moment, student participation, outcomes, and mentors involved..."
                  value={editingGallery?.description || ""}
                  onChange={(e) => setEditingGallery({ ...editingGallery, description: e.target.value })}
                  className="brand-input-field resize-none"
                />
              </div>

              <button
                type="submit"
                className="btn-glitch w-full py-3 rounded-full bg-[#82111E] text-white font-bold text-xs uppercase font-mono mt-3"
              >
                Save Gallery Entry
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
