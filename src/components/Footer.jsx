import React from 'react';
import { ShieldCheck, Phone, Mail, ExternalLink, Heart } from 'lucide-react';

export function Footer({ contrast }) {
  return (
    <footer className={`border-t mt-12 transition-colors no-print ${contrast ? 'bg-black text-yellow-400 border-yellow-500' : 'bg-slate-900 text-slate-300 border-slate-800'}`}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-xs">
          {/* Col 1 */}
          <div className="space-y-3">
            <div className="font-bold text-sm text-white font-serif">VidyaSetu (विद्यासेतु)</div>
            <p className="text-slate-400 leading-relaxed">
              AI-Enabled Unified Scholarship and Fellowship Governance Platform for Scheduled Tribe Students.
            </p>
            <div className="text-[11px] text-slate-500">
              Ministry of Tribal Affairs, Shastri Bhawan, New Delhi – 110001
            </div>
          </div>

          {/* Col 2 */}
          <div className="space-y-2">
            <div className="font-bold text-slate-200 uppercase tracking-wider text-[11px]">Governed Schemes</div>
            <ul className="space-y-1.5 text-slate-400">
              <li>• National Fellowship for ST Students (NFST)</li>
              <li>• National Overseas Scholarship for ST (NOS)</li>
              <li>• Top Class Education for ST Students</li>
              <li>• Pre-Matric & Post-Matric Scholarships</li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-2">
            <div className="font-bold text-slate-200 uppercase tracking-wider text-[11px]">Integrated Gateways</div>
            <ul className="space-y-1.5 text-slate-400">
              <li>• DigiLocker & Jan Parichay Single Sign-On</li>
              <li>• PFMS (Public Financial Management System)</li>
              <li>• NPCI Aadhaar Payment Bridge (APB)</li>
              <li>• National Scholarship Portal (NSP 2.0)</li>
            </ul>
          </div>

          {/* Col 4 */}
          <div className="space-y-2">
            <div className="font-bold text-slate-200 uppercase tracking-wider text-[11px]">Tribal Welfare Helpdesk</div>
            <div className="flex items-center space-x-2 text-slate-300">
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>Toll Free: 1800-11-7788</span>
            </div>
            <div className="flex items-center space-x-2 text-slate-300">
              <Mail className="w-4 h-4 text-blue-400" />
              <span>fellowship-mota@gov.in</span>
            </div>
            <div className="pt-2 text-[10px] text-slate-400">
              Grievance Redressal Officer: Director (Education), MoTA
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between text-[11px] text-slate-400 gap-2">
          <div>
            © 2026 Ministry of Tribal Affairs, Government of India. All Rights Reserved.
          </div>
          <div className="flex items-center space-x-4">
            <span>RTI Act 2005 Compliant</span>
            <span>•</span>
            <span>WCAG 2.1 AA Accessible</span>
            <span>•</span>
            <span>Designed for Smart Education & Tribal Empowerment</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
