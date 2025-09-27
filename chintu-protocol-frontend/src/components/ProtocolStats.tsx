import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface StatItem {
  label: string;
  value: number;
  suffix: string;
  prefix?: string;
}

export default function ProtocolStats() {
  const [stats, setStats] = useState<StatItem[]>([
    { label: 'Total Verified Contributions', value: 0, suffix: '' },
    { label: 'Active Training Mandates', value: 0, suffix: '' },
    { label: 'tDUST Rewarded to Custodians', value: 0, suffix: 'K', prefix: '' },
    { label: 'Data Custodians Active', value: 0, suffix: '' }
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const targetValues = [12847, 23, 156, 89];
    
    const interval = setInterval(() => {
      setStats(prevStats => 
        prevStats.map((stat, index) => ({
          ...stat,
          value: Math.min(stat.value + Math.ceil(targetValues[index] / 100), targetValues[index])
        }))
      );
    }, 50);

    const timeout = setTimeout(() => {
      clearInterval(interval);
      // Continue with periodic small updates to simulate real activity
      const liveUpdateInterval = setInterval(() => {
        setStats(prevStats => 
          prevStats.map((stat, index) => ({
            ...stat,
            value: stat.value + (Math.random() > 0.7 ? 1 : 0)
          }))
        );
      }, 3000);

      return () => clearInterval(liveUpdateInterval);
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="neural-card p-6 text-center neural-glow"
        >
          <div className="text-3xl md:text-4xl font-bold text-primary text-glow mb-2">
            {stat.prefix}{stat.value.toLocaleString()}{stat.suffix}
          </div>
          <div className="text-sm text-muted-foreground font-medium">
            {stat.label}
          </div>
          <div className="w-full h-1 bg-muted rounded-full mt-3 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-accent"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 2, delay: index * 0.2 }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}