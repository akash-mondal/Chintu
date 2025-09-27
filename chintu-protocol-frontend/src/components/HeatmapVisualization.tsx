import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface ContributionPulse {
  id: number;
  x: number;
  y: number;
  intensity: number;
  timestamp: number;
}

export default function HeatmapVisualization() {
  const [pulses, setPulses] = useState<ContributionPulse[]>([]);
  const [regions, setRegions] = useState([
    { name: 'North America', x: 20, y: 30, contributions: 245, color: 'hsl(180 100% 50%)' },
    { name: 'Europe', x: 50, y: 25, contributions: 189, color: 'hsl(190 100% 60%)' },
    { name: 'Asia Pacific', x: 75, y: 35, contributions: 312, color: 'hsl(170 100% 55%)' },
    { name: 'South America', x: 30, y: 65, contributions: 67, color: 'hsl(185 100% 45%)' },
    { name: 'Africa', x: 55, y: 55, contributions: 34, color: 'hsl(175 100% 40%)' }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Generate random contribution pulses
      const newPulse: ContributionPulse = {
        id: Date.now() + Math.random(),
        x: Math.random() * 100,
        y: Math.random() * 80 + 10,
        intensity: Math.random() * 0.8 + 0.2,
        timestamp: Date.now()
      };

      setPulses(prev => [...prev.slice(-20), newPulse]);

      // Update region contribution counts
      setRegions(prev => prev.map(region => ({
        ...region,
        contributions: region.contributions + (Math.random() > 0.7 ? 1 : 0)
      })));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Remove old pulses
  useEffect(() => {
    const cleanup = setInterval(() => {
      const now = Date.now();
      setPulses(prev => prev.filter(pulse => now - pulse.timestamp < 5000));
    }, 1000);

    return () => clearInterval(cleanup);
  }, []);

  return (
    <div className="relative w-full h-64 bg-gradient-to-br from-background to-secondary/20 rounded-lg overflow-hidden border border-border">
      {/* World Map Background Grid */}
      <div className="absolute inset-0 opacity-20">
        <svg width="100%" height="100%" className="text-primary/30">
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Continents/Regions */}
      {regions.map((region, index) => (
        <motion.div
          key={region.name}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.2 }}
          className="absolute transform -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${region.x}%`, top: `${region.y}%` }}
        >
          {/* Region Glow */}
          <motion.div
            className="absolute w-16 h-16 rounded-full"
            style={{ 
              background: `radial-gradient(circle, ${region.color}40 0%, transparent 70%)`,
              filter: 'blur(8px)'
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.4, 0.8, 0.4]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Region Node */}
          <div 
            className="w-4 h-4 rounded-full border-2 relative z-10"
            style={{ 
              backgroundColor: region.color + '80',
              borderColor: region.color,
              boxShadow: `0 0 10px ${region.color}60`
            }}
          />
          
          {/* Contribution Count */}
          <div className="absolute top-5 left-1/2 transform -translate-x-1/2 text-xs font-display font-semibold text-primary whitespace-nowrap">
            {region.contributions}
          </div>
        </motion.div>
      ))}

      {/* Live Contribution Pulses */}
      {pulses.map((pulse) => (
        <motion.div
          key={pulse.id}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0, pulse.intensity, 0],
            scale: [0, 2, 4]
          }}
          transition={{ duration: 3, ease: "easeOut" }}
          className="absolute w-2 h-2 rounded-full bg-primary"
          style={{
            left: `${pulse.x}%`,
            top: `${pulse.y}%`,
            transform: 'translate(-50%, -50%)',
            filter: 'blur(1px)'
          }}
        />
      ))}

      {/* Data Flow Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
        {regions.map((region, index) => (
          <motion.path
            key={`line-${index}`}
            d={`M ${region.x}% ${region.y}% Q 50% 20% 50% 50%`}
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="1"
            strokeDasharray="4 6"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: [0, 1, 0],
              opacity: [0, 0.6, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: index * 0.8,
              ease: "easeInOut"
            }}
          />
        ))}
      </svg>

      {/* Legend */}
      <div className="absolute bottom-2 left-2 space-y-1">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-primary pulse-neural"></div>
          <span className="font-body text-xs text-muted-foreground">Live Contributions</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-0.5 bg-primary opacity-60"></div>
          <span className="font-body text-xs text-muted-foreground">Data Flow</span>
        </div>
      </div>

      {/* Stats */}
      <div className="absolute top-2 right-2 text-right">
        <div className="font-display text-lg font-bold text-primary">
          {regions.reduce((sum, region) => sum + region.contributions, 0)}
        </div>
        <div className="font-body text-xs text-muted-foreground">Total Contributions</div>
      </div>
    </div>
  );
}