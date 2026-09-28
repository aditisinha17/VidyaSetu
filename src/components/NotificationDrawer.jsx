import React from 'react';
import { X, Bell, MessageSquare, Mail, Smartphone, CheckCircle2, Clock } from 'lucide-react';
import { MOCK_NOTIFICATIONS } from '../data/mockData';

export function NotificationDrawer({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-lg bg-blue-600/30 text-blue-400">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white">Automated Notification Dispatcher</h3>
              <p className="text-[11px] text-slate-400">SMS • Email • Portal Push Communications</p>
            </div>
          </div>

          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List of dispatches */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50 text-xs">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">
            Recent Communications ({MOCK_NOTIFICATIONS.length} Dispatched)
          </div>

          {MOCK_NOTIFICATIONS.map((n) => {
            const isSms = n.channel.includes('SMS');
            const isEmail = n.channel.includes('EMAIL');

            return (
              <div key={n.id} className="p-3.5 bg-white border border-slate-200 rounded-xl space-y-1.5 shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold font-mono text-slate-800 flex items-center space-x-1">
                    {isSms ? <Smartphone className="w-3.5 h-3.5 text-blue-600" /> : isEmail ? <Mail className="w-3.5 h-3.5 text-amber-600" /> : <Bell className="w-3.5 h-3.5 text-purple-600" />}
                    <span>{n.channel}</span>
                  </span>
                  <span className="text-[10px] text-slate-400 flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{n.time}</span>
                  </span>
                </div>

                <div className="text-slate-900 font-bold">{n.title}</div>
                <div className="text-[11px] text-slate-500">Recipient: <strong className="text-slate-700">{n.recipient}</strong></div>

                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-[11px] text-slate-700 font-mono leading-relaxed">
                  "{n.message}"
                </div>

                <div className="flex justify-end pt-1">
                  <span className="text-[10px] font-semibold text-emerald-700 flex items-center space-x-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Delivered via NIC Gateway</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-3 bg-white border-t border-slate-200 text-center text-[11px] text-slate-500">
          Eliminates repeated manual correspondence through automated trigger webhooks.
        </div>
      </div>
    </div>
  );
}
