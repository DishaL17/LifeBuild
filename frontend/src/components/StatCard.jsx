import React from 'react';

export default function StatCard({ label, value = 0, icon = '⭐', color = '#6366f1', description }) {
  return (
    <div className="stat-card" style={{ borderTop: `4px solid ${color}` }}>
      <div className="stat-card-header">
        <span className="stat-card-icon">{icon}</span>
        <span className="stat-card-label">{label}</span>
      </div>

      <div className="stat-card-body">
        <span className="stat-card-value">{value}</span>
        {description && <p className="stat-card-desc">{description}</p>}
      </div>
    </div>
  );
}
