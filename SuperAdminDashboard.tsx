import { useState } from 'react';
import {
  Building2,
  CreditCard,
  BarChart3,
  Shield,
  LifeBuoy,
  Plus,
  ArrowUpRight,
  CheckCircle2,
  AlertTriangle,
  Server,
  Lock,
  Search,
  ExternalLink,
} from 'lucide-react';
import { SchoolTenant, UserProfile } from '../../types.ts';

interface SuperAdminDashboardProps {
  schools: SchoolTenant[];
  user: UserProfile;
  onOpenOnboarding: () => void;
  onToggleSchoolStatus: (schoolId: string) => void;
  onSelectSchool: (school: SchoolTenant) => void;
}

export function SuperAdminDashboard({
  schools,
  user,
  onOpenOnboarding,
  onToggleSchoolStatus,
  onSelectSchool,
}: SuperAdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'tenants' | 'subscriptions' | 'security'>('tenants');
  const [searchTerm, setSearchTerm] = useState('');

  const totalStudents = schools.reduce((acc, s) => acc + s.studentCount, 0);
  const totalTeachers = schools.reduce((acc, s) => acc + s.teacherCount, 0);
  const totalStorageGb = schools.reduce((acc, s) => acc + s.storageUsedGb, 0);

  const filteredSchools = schools.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Platform Executive Header */}
      <div className="p-6 bg-slate-900 text-white rounded-2xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-purple-400 mb-1">
            <span>Global SaaS Multi-Tenant Engine</span>
            <span aria-hidden="true">·</span>
            <span className="text-emerald-400 font-mono">Platform Health: 99.99%</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white">
            AcademiaHub Global Platform Operations
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Supervise multi-tenant school instances, subscription licensing, cloud storage allocation, and platform compliance.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenOnboarding}
            className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            <span>Provision School Tenant</span>
          </button>
        </div>
      </div>

      {/* Global Telemetry Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-xs text-slate-500 font-semibold uppercase">Active School Tenants</span>
          <div className="text-2xl font-bold font-mono text-slate-900">{schools.length} Institutions</div>
          <p className="text-[11px] text-emerald-600 font-medium">100% SLA uptime</p>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-xs text-slate-500 font-semibold uppercase">Total Enrolled Students</span>
          <div className="text-2xl font-bold font-mono text-indigo-700">{totalStudents.toLocaleString()}</div>
          <p className="text-[11px] text-slate-500">Across {totalTeachers} teaching staff</p>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-xs text-slate-500 font-semibold uppercase">Aggregated Storage</span>
          <div className="text-2xl font-bold font-mono text-slate-900">{totalStorageGb.toFixed(1)} GB</div>
          <p className="text-[11px] text-slate-500">AWS S3 / Cloud Object Storage</p>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-xs text-slate-500 font-semibold uppercase">Platform Monthly Recurring</span>
          <div className="text-2xl font-bold font-mono text-emerald-700">$3,880</div>
          <p className="text-[11px] text-emerald-600 font-medium">+18% MoM Growth</p>
        </div>
      </div>

      {/* Super Admin Navigation Tabs */}
      <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl overflow-x-auto">
        {[
          { id: 'tenants', label: '1. Manage School Tenants & Status' },
          { id: 'subscriptions', label: '2. Subscription Tiers & Billing' },
          { id: 'security', label: '3. Platform Security & Privacy Policy' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab: Tenants List */}
      {activeTab === 'tenants' && (
        <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Provisioned School Tenant Instances</h3>
              <p className="text-xs text-slate-500">Manage tenant isolation, quota enforcement, and institutional health.</p>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                <input
                  type="text"
                  placeholder="Filter institutions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-indigo-600"
                />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 uppercase text-[10px] font-semibold">
                  <th className="py-2.5 px-3">School Name</th>
                  <th className="py-2.5 px-3">Tenant ID</th>
                  <th className="py-2.5 px-3">Subscription Tier</th>
                  <th className="py-2.5 px-3">Headcount</th>
                  <th className="py-2.5 px-3">Storage Allocation</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-right">Administrative Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredSchools.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50/50">
                    <td className="py-2.5 px-3">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{s.logo}</span>
                        <div>
                          <div className="font-semibold text-slate-900">{s.name}</div>
                          <div className="text-[10px] text-slate-400">{s.tagline}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-2.5 px-3 font-mono text-slate-600">{s.code}</td>
                    <td className="py-2.5 px-3">
                      <span className="font-semibold text-slate-800 bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                        {s.plan} Plan
                      </span>
                    </td>
                    <td className="py-2.5 px-3 font-mono text-slate-700">
                      {s.studentCount} Students · {s.teacherCount} Faculty
                    </td>
                    <td className="py-2.5 px-3 font-mono">
                      {s.storageUsedGb} / {s.storageLimitGb} GB
                    </td>
                    <td className="py-2.5 px-3">
                      <span
                        className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded capitalize ${
                          s.status === 'active'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-rose-50 text-rose-700 border border-rose-200'
                        }`}
                      >
                        {s.status}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-right space-x-2">
                      <button
                        onClick={() => onSelectSchool(s)}
                        className="px-2.5 py-1 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded transition-colors cursor-pointer"
                      >
                        Impersonate Tenant
                      </button>
                      <button
                        onClick={() => onToggleSchoolStatus(s.id)}
                        className={`px-2 py-1 text-xs font-semibold rounded transition-colors cursor-pointer ${
                          s.status === 'active'
                            ? 'text-rose-700 hover:bg-rose-50'
                            : 'text-emerald-700 hover:bg-emerald-50'
                        }`}
                      >
                        {s.status === 'active' ? 'Suspend' : 'Activate'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab: Subscriptions */}
      {activeTab === 'subscriptions' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-xl border border-slate-200 space-y-4 shadow-xs">
            <h4 className="text-base font-bold text-slate-900">Starter Tier</h4>
            <div className="text-3xl font-bold font-mono text-slate-900">$490 <span className="text-xs font-normal text-slate-500">/ mo</span></div>
            <p className="text-xs text-slate-600">Up to 500 students. Single campus. Standard object storage.</p>
            <div className="text-xs font-semibold text-slate-700 border-t border-slate-100 pt-3">
              1 Active Tenant on this plan
            </div>
          </div>

          <div className="p-6 bg-white rounded-xl border-2 border-indigo-600 bg-indigo-50/20 space-y-4 shadow-xs">
            <div className="text-xs font-bold text-indigo-700 uppercase">Core Standard Tier</div>
            <h4 className="text-base font-bold text-slate-900">Standard School</h4>
            <div className="text-3xl font-bold font-mono text-indigo-700">$990 <span className="text-xs font-normal text-slate-500">/ mo</span></div>
            <p className="text-xs text-slate-600">Up to 1,500 students. Timed MCQs. Custom branding and crest logo.</p>
            <div className="text-xs font-semibold text-slate-700 border-t border-indigo-100 pt-3">
              1 Active Tenant on this plan
            </div>
          </div>

          <div className="p-6 bg-white rounded-xl border border-slate-200 space-y-4 shadow-xs">
            <h4 className="text-base font-bold text-slate-900">Enterprise District</h4>
            <div className="text-3xl font-bold font-mono text-slate-900">$2,400 <span className="text-xs font-normal text-slate-500">/ mo</span></div>
            <p className="text-xs text-slate-600">Unlimited students. Multi-school district consolidated portal.</p>
            <div className="text-xs font-semibold text-slate-700 border-t border-slate-100 pt-3">
              1 Active Tenant on this plan
            </div>
          </div>
        </div>
      )}

      {/* Tab: Security & Compliance Privacy Boundary */}
      {activeTab === 'security' && (
        <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-indigo-700 font-bold text-sm">
            <Shield className="w-5 h-5" />
            <span>Institutional Privacy & Administrative Access Boundaries</span>
          </div>

          <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl text-xs space-y-2 text-amber-950">
            <div className="font-bold flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
              <span>Mandatory Privacy Architecture Notice (from Workflow Blueprint):</span>
            </div>
            <p className="leading-relaxed">
              "Super Admin should not normally access private student information unless strictly required for formal support/administrative purposes."
            </p>
            <p className="text-[11px] text-amber-800">
              In accordance with this specification, student contact records, grades, and private notes are masked by default from global platform operator views.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
