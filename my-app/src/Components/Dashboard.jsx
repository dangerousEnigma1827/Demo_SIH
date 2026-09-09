import React, { useState } from 'react';
import {
  LayoutDashboard,
  Wallet,
  ShieldCheck,
  Database,
  ScrollText,
  Settings,
  Search,
  Bell,
  ChevronDown,
  MoreHorizontal,
  ArrowUpRight,
  Link2,
  Activity,
  Clock,
  Zap,
  Gauge,
} from 'lucide-react';

const navItems = [
  { name: 'Overview', icon: LayoutDashboard },
  { name: 'Identity Wallet', icon: Wallet },
  { name: 'Access Control', icon: ShieldCheck },
  { name: 'Asset Ledger', icon: Database },
  { name: 'Audit Logs', icon: ScrollText },
  { name: 'Settings', icon: Settings },
];

const chain = [
  { hash: '0x7a3f…bc80', action: 'Block validated', state: 'done' },
  { hash: '0x91c2…bc90', action: 'NFT minted', state: 'done' },
  { hash: '0xe04d…zc90', action: 'DID verified', state: 'current' },
  { hash: '0x2b8e…ec91', action: 'DID verified', state: 'queued' },
  { hash: '0x6f10…ec92', action: 'Access granted', state: 'queued' },
];

const chainStats = [
  { label: 'Avg confirm time', value: '2.4s', icon: Clock },
  { label: 'Gas used', value: '41%', icon: Zap },
  { label: 'Throughput', value: '312 tx/s', icon: Gauge },
];

const roles = [
  { role: 'Admin', scope: 'Full ledger write access', on: true },
  { role: 'Developer', scope: 'Contract deploy, read-only ledger', on: true },
  { role: 'Auditor', scope: 'Read-only, export logs', on: false },
];

const activity = [
  { name: 'Utkarsh shivhare', action: 'Mint NFT', region: 'Jhansi', when: '1 day ago', img: 12 },
  { name: 'Tijil Shukla', action: 'Grant access', region: 'Delhi', when: '1 hour ago', img: 5 },
  { name: 'Krishna Tiwari', action: 'Verify DID', region: 'Lucknow', when: '3 hours ago', img: 33 },
];

function RadialGauge({ value, size = 64, stroke = 6, color = '#4F46E5', track = '#e0e7ff' }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90 shrink-0">
      <circle cx={size / 2} cy={size / 2} r={r} stroke={track} strokeWidth={stroke} fill="none" />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        stroke={color}
        strokeWidth={stroke}
        fill="none"
        strokeDasharray={c}
        strokeDashoffset={offset}
        strokeLinecap="round"
      />
    </svg>
  );
}

function ChainMark() {
  return (
    <svg width="28" height="28" viewBox="0 0 30 30" fill="none">
      <rect x="2" y="9" width="14" height="14" rx="4" stroke="#4F46E5" strokeWidth="2.2" />
      <rect x="13" y="6" width="15" height="15" rx="4" stroke="#818CF8" strokeWidth="2.2" fill="#ffffff" />
    </svg>
  );
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <div className="h-screen w-full flex bg-slate-50 text-slate-800 font-sans antialiased overflow-hidden">
      {/* ---------------- Sidebar ---------------- */}
      <aside className="w-60 flex flex-col bg-white border-r border-slate-200 shrink-0">
        <div className="h-16 flex items-center gap-2.5 px-5 border-b border-slate-100 shrink-0">
          <ChainMark />
          <div className="leading-tight">
            <div className="text-[14px] font-bold tracking-tight text-slate-900">Bharat Chain</div>
            <div className="text-[11px] font-medium text-slate-500">Secure Registry Platform</div>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.name;
            return (
              <button
                key={item.name}
                onClick={() => setActiveTab(item.name)}
                className={`group w-full flex items-center gap-3 pl-3 pr-3 py-2.5 text-[13px] font-semibold relative transition-all rounded-lg ${
                  isActive ? 'bg-indigo-50 text-indigo-700' : 'text-slate-500 hover:text-indigo-600 hover:bg-indigo-50/50'
                }`}
              >
                <span
                  className={`absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-r-full transition-colors ${
                    isActive ? 'bg-indigo-600' : 'bg-transparent'
                  }`}
                />
                <Icon size={16} strokeWidth={2.2} className={isActive ? 'text-indigo-600' : 'text-slate-400 group-hover:text-indigo-500'} />
                {item.name}
              </button>
            );
          })}
        </nav>

        <div className="p-4 mx-3 mb-4 rounded-lg bg-emerald-50/60 border border-emerald-100 shrink-0">
          <div className="flex items-center gap-2 text-[11.5px] font-bold text-emerald-700">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            Ledger synced
          </div>
          <div className="text-[10.5px] font-medium text-emerald-600/80 mt-1">Block height 2,481,930</div>
        </div>
      </aside>

      {/* ---------------- Main ---------------- */}
      <main className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Top bar */}
        <header className="h-16 flex items-center justify-between px-6 border-b border-slate-200 bg-white shrink-0">
          <div className="flex items-center gap-2 w-80 h-9 px-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-500 focus-within:border-indigo-300 focus-within:ring-2 focus-within:ring-indigo-100 focus-within:bg-white transition-all">
            <Search size={14} className="text-slate-400" />
            <input
              type="text"
              placeholder="Search DID, hash, or asset ID"
              className="bg-transparent border-none outline-none text-[13px] w-full text-slate-700 placeholder:text-slate-400"
            />
          </div>
          <div className="flex items-center gap-5">
            <div className="relative cursor-pointer group">
              <Bell size={18} className="text-slate-400 group-hover:text-indigo-600 transition-colors" />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white" />
            </div>
            <div className="flex items-center gap-2.5 pl-5 border-l border-slate-200 cursor-pointer group">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-indigo-100 border border-indigo-200">
                <img src="https://i.pravatar.cc/150?img=11" alt="User" className="w-full h-full object-cover" />
              </div>
              <div className="leading-tight">
                <div className="text-[13px] font-bold text-slate-800">R. Kulkarni</div>
                <div className="text-[11px] font-medium text-slate-500">Registry admin</div>
              </div>
              <ChevronDown size={14} className="text-slate-400 group-hover:text-indigo-600" />
            </div>
          </div>
        </header>

        {/* Body */}
        <div className="flex-1 min-h-0 px-6 py-4 flex flex-col gap-4">
          <div className="flex items-center justify-between shrink-0">
            <div>
              <h1 className="text-[22px] leading-tight font-bold text-slate-900 tracking-tight">Registry overview</h1>
              <p className="text-[12.5px] font-medium text-slate-500 mt-0.5">Live identity, asset and access state across the chain.</p>
            </div>
            <div className="flex items-center gap-1.5 text-[12px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 px-3 py-1.5 rounded-lg shrink-0">
              <Activity size={14} />
              4 active validators
            </div>
          </div>

          {/* 3 equal rows */}
          <div className="grid grid-rows-3 gap-4 flex-1 min-h-0">
            {/* Row 1: core stats */}
            <div className="grid grid-cols-3 gap-4 min-h-0">
              {/* Active Identities */}
              <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col min-h-0">
                <div className="flex justify-between items-start shrink-0">
                  <h3 className="text-[11.5px] font-bold text-slate-500 uppercase tracking-wide">Active identities</h3>
                  <MoreHorizontal size={16} className="text-slate-400 cursor-pointer hover:text-slate-600" />
                </div>
                <div className="flex items-center justify-between mt-2 shrink-0">
                  <div>
                    <div className="text-[26px] leading-none font-bold text-slate-900 tracking-tight">1,245</div>
                    <div className="text-[11.5px] text-emerald-600 flex items-center gap-1 mt-1.5 font-semibold">
                      <ArrowUpRight size={13} strokeWidth={2.5} /> 4.2% this week
                    </div>
                  </div>
                  <RadialGauge value={82} size={56} stroke={5} color="#4F46E5" track="#e0e7ff" />
                </div>
                <div className="flex-1 flex items-end gap-[3px] mt-3 min-h-0">
                  {[40, 70, 45, 90, 65, 30, 80, 50, 60, 40, 75, 55, 85, 45, 60, 95, 50, 70].map((h, i) => (
                    <div
                      key={i}
                      className={`flex-1 rounded-t-sm ${i === 15 ? 'bg-indigo-500' : 'bg-indigo-100'}`}
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 mt-1.5 font-semibold shrink-0">
                  <span>00:00</span>
                  <span>06:00</span>
                  <span>12:00</span>
                  <span>18:00</span>
                  <span>24:00</span>
                </div>
              </div>

              {/* Secured Assets */}
              <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col min-h-0">
                <div className="flex justify-between items-start shrink-0">
                  <h3 className="text-[11.5px] font-bold text-slate-500 uppercase tracking-wide">Secured assets</h3>
                  <MoreHorizontal size={16} className="text-slate-400 cursor-pointer hover:text-slate-600" />
                </div>
                <div className="text-[26px] leading-none font-bold text-slate-900 tracking-tight mt-2 shrink-0">3,560</div>
                <div className="flex-1 flex flex-col justify-between mt-3 min-h-0 py-1">
                  {[
                    { label: 'Software', pct: 63, color: '#4F46E5' },
                    { label: 'Hardware', pct: 32, color: '#F59E0B' },
                    { label: 'Data records', pct: 5, color: '#059669' },
                  ].map((row) => (
                    <div key={row.label}>
                      <div className="flex justify-between text-[12px] font-semibold text-slate-600 mb-1">
                        <span className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full" style={{ background: row.color }} />
                          {row.label}
                        </span>
                        <span className="text-slate-900 font-bold">{row.pct}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${row.pct}%`, background: row.color }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Access Requests */}
              <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col min-h-0">
                <div className="flex justify-between items-start mb-3 shrink-0">
                  <h3 className="text-[11.5px] font-bold text-slate-500 uppercase tracking-wide">Access requests · 24h</h3>
                  <MoreHorizontal size={16} className="text-slate-400 cursor-pointer hover:text-slate-600" />
                </div>
                <div className="flex gap-8 mb-3 shrink-0">
                  <div>
                    <div className="text-[22px] leading-none font-bold text-amber-600">98</div>
                    <div className="text-[11px] font-bold text-amber-600/70 uppercase tracking-wide mt-1">Pending</div>
                  </div>
                  <div>
                    <div className="text-[22px] leading-none font-bold text-emerald-600">1,102</div>
                    <div className="text-[11px] font-bold text-emerald-600/70 uppercase tracking-wide mt-1">Approved</div>
                  </div>
                </div>
                <div className="flex-1 flex flex-col gap-2 min-h-0">
                  <div className="flex-1 flex items-center gap-3 p-2.5 bg-amber-50 border border-amber-100 rounded-lg min-h-0">
                    <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="text-[12.5px] font-bold text-amber-900 truncate">Resource request queued</div>
                      <div className="text-[11px] font-medium text-amber-700/80">98 awaiting review</div>
                    </div>
                    <div className="text-[10.5px] text-amber-600/60 font-bold shrink-0">11h ago</div>
                  </div>
                  <div className="flex-1 flex items-center gap-3 p-2.5 bg-emerald-50 border border-emerald-100 rounded-lg min-h-0">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="text-[12.5px] font-bold text-emerald-900 truncate">Access grant issued</div>
                      <div className="text-[11px] font-medium text-emerald-700/80">1,102 approved to date</div>
                    </div>
                    <div className="text-[10.5px] text-emerald-600/60 font-bold shrink-0">11h ago</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Row 2: network activity + security health */}
            <div className="grid grid-cols-3 gap-4 min-h-0">
              <div className="col-span-2 bg-white border border-slate-200 rounded-xl p-4 flex flex-col min-h-0">
                <div className="flex justify-between items-center shrink-0">
                  <h3 className="text-[11.5px] font-bold text-slate-500 uppercase tracking-wide">Network activity</h3>
                  <span className="text-[11px] font-bold text-emerald-700 flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 rounded-md border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Automated validation
                  </span>
                </div>

                <div className="relative flex items-center justify-between px-2 flex-1 min-h-0">
                  <div className="absolute left-6 right-6 top-1/2 -translate-y-[18px] h-px bg-slate-200" />
                  {chain.map((node, idx) => {
                    const isDone = node.state === 'done';
                    const isCurrent = node.state === 'current';
                    return (
                      <div key={idx} className="relative z-10 flex flex-col items-center w-1/5">
                        <div
                          className={`w-11 h-11 rounded-xl flex items-center justify-center border-2 ${
                            isCurrent
                              ? 'border-indigo-500 text-indigo-600 bg-indigo-50 ring-4 ring-indigo-50/60'
                              : isDone
                              ? 'border-emerald-400 text-emerald-600 bg-emerald-50'
                              : 'border-slate-200 text-slate-400 bg-white'
                          }`}
                        >
                          <Link2 size={17} strokeWidth={isCurrent || isDone ? 2.5 : 2} />
                        </div>
                        <div className="text-[11px] font-mono font-semibold text-slate-500 mt-2.5 whitespace-nowrap">{node.hash}</div>
                        <div
                          className={`text-[10px] font-bold mt-1.5 px-2 py-0.5 rounded-full text-center whitespace-nowrap ${
                            isCurrent ? 'bg-indigo-100 text-indigo-700' : isDone ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'
                          }`}
                        >
                          {node.action}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="grid grid-cols-3 gap-3 pt-3 mt-1 border-t border-slate-100 shrink-0">
                  {chainStats.map((s) => {
                    const Icon = s.icon;
                    return (
                      <div key={s.label} className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0">
                          <Icon size={13} className="text-slate-500" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-[12.5px] font-bold text-slate-800 leading-none">{s.value}</div>
                          <div className="text-[10px] font-medium text-slate-500 truncate mt-0.5">{s.label}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Security Health */}
              <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col min-h-0">
                <div className="flex justify-between items-start mb-2 shrink-0">
                  <h3 className="text-[11.5px] font-bold text-slate-500 uppercase tracking-wide">Security health</h3>
                  <MoreHorizontal size={16} className="text-slate-400 cursor-pointer hover:text-slate-600" />
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <div className="relative shrink-0">
                    <RadialGauge value={98} size={64} stroke={6} color="#059669" track="#d1fae5" />
                    <div className="absolute inset-0 flex items-center justify-center text-[13px] font-bold text-slate-900">98%</div>
                  </div>
                  <div>
                    <div className="text-[13px] font-bold text-slate-800">All systems verified</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">Last checked 2 min ago</div>
                  </div>
                </div>
                <div className="flex-1 flex flex-col justify-between mt-3 min-h-0 py-1 divide-y divide-slate-100">
                  {['Consensus nodes', 'Contract security', 'Data integrity'].map((item) => (
                    <div key={item} className="flex-1 flex items-center justify-between min-h-0">
                      <span className="text-[12px] font-semibold text-slate-600">{item}</span>
                      <span className="text-[10.5px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full">
                        OK
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Row 3: access control + top user activity */}
            <div className="grid grid-cols-3 gap-4 min-h-0">
              <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col min-h-0">
                <div className="flex justify-between items-start mb-1 shrink-0">
                  <h3 className="text-[11.5px] font-bold text-slate-500 uppercase tracking-wide">Access control</h3>
                  <MoreHorizontal size={16} className="text-slate-400 cursor-pointer hover:text-slate-600" />
                </div>
                <div className="flex-1 flex flex-col divide-y divide-slate-100 min-h-0">
                  {roles.map((r) => (
                    <div key={r.role} className="flex-1 flex items-center justify-between min-h-0">
                      <div className="min-w-0 pr-2">
                        <div className="text-[13px] font-bold text-slate-800">{r.role}</div>
                        <div className="text-[11px] font-medium text-slate-500 truncate mt-0.5">{r.scope}</div>
                      </div>
                      <div className={`w-9 h-5 rounded-full relative shrink-0 cursor-pointer ${r.on ? 'bg-indigo-600' : 'bg-slate-300'}`}>
                        <div className={`absolute top-[2px] w-4 h-4 bg-white rounded-full shadow-sm ${r.on ? 'right-[2px]' : 'left-[2px]'}`} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="col-span-2 bg-white border border-slate-200 rounded-xl p-4 flex flex-col min-h-0">
                <div className="flex justify-between items-start mb-1 shrink-0">
                  <h3 className="text-[11.5px] font-bold text-slate-500 uppercase tracking-wide">Top user activity</h3>
                  <MoreHorizontal size={16} className="text-slate-400 cursor-pointer hover:text-slate-600" />
                </div>
                <div className="flex-1 flex flex-col divide-y divide-slate-100 min-h-0">
                  {activity.map((u) => (
                    <div key={u.name} className="flex-1 flex items-center gap-3 min-h-0">
                      <img src={`https://i.pravatar.cc/150?img=${u.img}`} alt={u.name} className="w-9 h-9 rounded-full bg-slate-200 border-2 border-white shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="text-[13px] font-bold text-slate-800 truncate">{u.name}</div>
                        <div className="text-[11px] text-slate-500 font-medium mt-0.5">{u.region}</div>
                      </div>
                      <div className="text-[12px] font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md w-28 shrink-0 text-center border border-indigo-100">
                        {u.action}
                      </div>
                      <div className="text-[11px] text-slate-400 font-semibold w-20 text-right shrink-0">{u.when}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}