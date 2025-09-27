import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';

interface ModelConvergenceGraphProps {
  mandateId: number;
}

export default function ModelConvergenceGraph({ mandateId }: ModelConvergenceGraphProps) {
  const [data, setData] = useState<Array<{ epoch: number; accuracy: number; contributions: number }>>([]);

  useEffect(() => {
    // Generate realistic convergence data
    const generateData = () => {
      const points = [];
      let accuracy = 65; // Starting accuracy
      let contributions = 0;
      
      for (let epoch = 1; epoch <= 50; epoch++) {
        // Simulate realistic model convergence with diminishing returns
        const improvement = Math.max(0, (95 - accuracy) * 0.1 * Math.random() * (epoch < 30 ? 1 : 0.3));
        accuracy = Math.min(95, accuracy + improvement);
        contributions += Math.floor(Math.random() * 20) + 5;
        
        points.push({
          epoch,
          accuracy: parseFloat(accuracy.toFixed(1)),
          contributions
        });
      }
      
      return points;
    };

    setData(generateData());
  }, [mandateId]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="neural-card p-3 text-sm">
          <p className="font-display font-semibold text-primary">Epoch {label}</p>
          <p className="font-body text-foreground">
            Accuracy: <span className="font-semibold text-accent">{payload[0].value}%</span>
          </p>
          <p className="font-body text-foreground">
            Contributions: <span className="font-semibold text-success">{payload[1]?.value || 0}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full h-80"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke="hsl(var(--border))" 
            opacity={0.3}
          />
          <XAxis 
            dataKey="epoch" 
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            fontFamily="Rationale"
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            fontFamily="Rationale"
            domain={[60, 100]}
          />
          <Tooltip content={<CustomTooltip />} />
          
          {/* Accuracy Line */}
          <Line
            type="monotone"
            dataKey="accuracy"
            stroke="hsl(var(--primary))"
            strokeWidth={3}
            dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: 'hsl(var(--primary))', strokeWidth: 2 }}
          />
          
          {/* Contributions Line (scaled for visibility) */}
          <Line
            type="monotone"
            dataKey="contributions"
            stroke="hsl(var(--accent))"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={{ fill: 'hsl(var(--accent))', strokeWidth: 2, r: 3 }}
            opacity={0.7}
            yAxisId="right"
          />
        </LineChart>
      </ResponsiveContainer>
      
      <div className="flex items-center justify-center space-x-6 mt-4">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-primary"></div>
          <span className="font-body text-sm text-muted-foreground">Model Accuracy</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-0.5 bg-accent"></div>
          <span className="font-body text-sm text-muted-foreground">Total Contributions</span>
        </div>
      </div>
    </motion.div>
  );
}