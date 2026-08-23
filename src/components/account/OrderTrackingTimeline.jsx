import React from 'react';
import { Check, Clipboard, Package, Truck, Compass, Smile, AlertCircle } from 'lucide-react';
import { ORDER_STAGES, CANCELLED_STAGE } from '../../utils/statusStages';

const STAGE_ICONS = {
  'Order Placed': Clipboard,
  'Confirmed': Check,
  'Packed': Package,
  'Shipped': Truck,
  'Out for Delivery': Compass,
  'Delivered': Smile,
  'Cancelled': AlertCircle
};

export default function OrderTrackingTimeline({ currentStatus }) {
  const isCancelled = currentStatus === CANCELLED_STAGE;

  // Get index of current status
  const currentIdx = ORDER_STAGES.indexOf(currentStatus);

  if (isCancelled) {
    return (
      <div style={styles.cancelledBox}>
        <div style={styles.cancelledHeader}>
          <AlertCircle size={24} color="var(--color-danger)" />
          <h3 style={{ color: 'var(--color-danger)' }}>This Order Has Been Cancelled</h3>
        </div>
        <p style={styles.cancelledText}>
          The formulation sequence was aborted. No billing charges have been authorized, and any pending holds will be returned to your payment mode within 24 hours. Contact our pharmacy care desk for further details.
        </p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.timelineRow}>
        {ORDER_STAGES.map((stage, idx) => {
          const IconComponent = STAGE_ICONS[stage] || Clipboard;
          const isCompleted = idx < currentIdx;
          const isActive = idx === currentIdx;
          const isFuture = idx > currentIdx;

          return (
            <React.Fragment key={stage}>
              {/* Step Node */}
              <div style={styles.stepNode}>
                <div 
                  style={{
                    ...styles.circle,
                    backgroundColor: isCompleted ? 'var(--color-teal-700)' : (isActive ? 'var(--color-amber-600)' : 'var(--color-white)'),
                    color: (isCompleted || isActive) ? 'var(--color-white)' : 'var(--color-border)',
                    borderColor: (isCompleted || isActive) ? 'transparent' : 'var(--color-border)'
                  }}
                  title={stage}
                >
                  <IconComponent size={16} />
                </div>
                <span 
                  style={{
                    ...styles.label,
                    fontWeight: isActive ? 'bold' : 'normal',
                    color: isActive ? 'var(--color-ink)' : 'var(--color-charcoal)',
                    opacity: isFuture ? 0.5 : 1
                  }}
                >
                  {stage}
                </span>
              </div>

              {/* Progress Line connecting nodes */}
              {idx < ORDER_STAGES.length - 1 && (
                <div 
                  style={{
                    ...styles.connector,
                    backgroundColor: idx < currentIdx ? 'var(--color-teal-700)' : 'var(--color-border)'
                  }}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '30px 10px',
    width: '100%',
    overflowX: 'auto'
  },
  timelineRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    minWidth: '600px', // Ensures stepper layout doesn't squash on small widths
    position: 'relative'
  },
  stepNode: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
    zIndex: 2,
    position: 'relative',
    width: '100px'
  },
  circle: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    border: '2px solid',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease shadow'
  },
  label: {
    fontSize: '11px',
    textAlign: 'center',
    fontFamily: 'var(--font-body)',
    whiteSpace: 'nowrap'
  },
  connector: {
    height: '3px',
    flex: 1,
    margin: '0 -25px', // overlapping lines with nodes
    zIndex: 1,
    transform: 'translateY(-13px)' // aligns line with vertical centers of nodes
  },
  cancelledBox: {
    backgroundColor: '#FADBD8',
    border: '1px solid var(--color-danger)',
    borderRadius: 'var(--radius-sm)',
    padding: '24px',
    margin: '20px 0'
  },
  cancelledHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '8px'
  },
  cancelledText: {
    fontSize: '13px',
    color: 'var(--color-charcoal)',
    lineHeight: 1.5
  }
};
