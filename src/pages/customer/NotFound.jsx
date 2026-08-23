import React from 'react';
import EmptyState from '../../components/common/EmptyState';
import { EyeOff } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="container" style={{ padding: '100px 24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <EmptyState
        icon={EyeOff}
        title="404 — Prescription Path Unrecognized"
        message="The URL route you requested does not correspond to any active dermatology or nutrition section in our apothecary catalog."
        actionLink="/"
        actionText="Return to Dispensary Home"
      />
    </div>
  );
}
