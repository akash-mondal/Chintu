import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  Plus, 
  Settings, 
  TrendingUp, 
  Users, 
  Zap,
  FileText,
  Activity,
  Globe2,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import TrainingMandateWizard from '@/components/TrainingMandateWizard';
import ModelConvergenceGraph from '@/components/ModelConvergenceGraph';
import HeatmapVisualization from '@/components/HeatmapVisualization';

const mockMandates = [
  {
    id: 1,
    name: 'Medical Diagnosis Model v2.1',
    status: 'Active',
    contributors: 847,
    accuracy: 94.2,
    budget: 25000,
    spent: 18750,
    criteria: 'Medical records, age 18-80, diagnosis codes'
  },
  {
    id: 2,
    name: 'Financial Risk Assessment',
    status: 'Pending',
    contributors: 156,
    accuracy: 87.5,
    budget: 15000,
    spent: 4200,
    criteria: 'Credit history, transaction data, anonymized'
  },
  {
    id: 3,
    name: 'Legal Document Analysis',
    status: 'Completed',
    contributors: 234,
    accuracy: 96.8,
    budget: 12000,
    spent: 12000,
    criteria: 'Contract analysis, legal precedents'
  }
];

export default function AIInnovatorDashboard() {
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [selectedMandate, setSelectedMandate] = useState(mockMandates[0]);

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-4xl font-display font-bold text-glow">AI Innovator Studio</h1>
            <p className="text-muted-foreground font-body mt-2">
              Manage your training mandates and track model development
            </p>
          </div>
          <Button 
            onClick={() => setIsWizardOpen(true)}
            className="btn-neural font-body"
          >
            <Plus className="w-5 h-5 mr-2" />
            New Training Mandate
          </Button>
        </motion.div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Active Mandates', value: '3', icon: Activity, color: 'text-primary' },
            { label: 'Total Contributors', value: '1,237', icon: Users, color: 'text-accent' },
            { label: 'Models Trained', value: '12', icon: Brain, color: 'text-success' },
            { label: 'tDUST Spent', value: '34.9K', icon: Zap, color: 'text-primary-glow' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="neural-card neural-glow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground font-body">{stat.label}</p>
                      <p className={`text-3xl font-display font-bold ${stat.color}`}>{stat.value}</p>
                    </div>
                    <stat.icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Training Mandates List */}
          <div className="lg:col-span-2">
            <Card className="neural-card">
              <CardHeader>
                <CardTitle className="font-display text-xl text-primary">Your Training Mandates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockMandates.map((mandate, index) => (
                    <motion.div
                      key={mandate.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`p-4 rounded-lg border cursor-pointer transition-all hover:border-primary/50 ${
                        selectedMandate.id === mandate.id ? 'border-primary bg-primary/5' : 'border-border'
                      }`}
                      onClick={() => setSelectedMandate(mandate)}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-body font-medium text-lg">{mandate.name}</h3>
                        <Badge 
                          variant={mandate.status === 'Active' ? 'default' : 
                                 mandate.status === 'Pending' ? 'secondary' : 'destructive'}
                          className="font-body"
                        >
                          {mandate.status}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground font-body">Contributors</p>
                          <p className="font-display font-semibold text-primary">{mandate.contributors}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground font-body">Accuracy</p>
                          <p className="font-display font-semibold text-accent">{mandate.accuracy}%</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground font-body">Budget</p>
                          <p className="font-display font-semibold">{mandate.budget} tDUST</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground font-body">Spent</p>
                          <p className="font-display font-semibold text-success">{mandate.spent} tDUST</p>
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mt-3 font-body">{mandate.criteria}</p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Model Convergence Graph */}
            <Card className="neural-card mt-8">
              <CardHeader>
                <CardTitle className="font-display text-xl text-primary flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Model Convergence Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ModelConvergenceGraph mandateId={selectedMandate.id} />
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-8">
            {/* Global Contribution Heatmap */}
            <Card className="neural-card">
              <CardHeader>
                <CardTitle className="font-display text-xl text-primary flex items-center">
                  <Globe2 className="w-5 h-5 mr-2" />
                  Global Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <HeatmapVisualization />
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="neural-card">
              <CardHeader>
                <CardTitle className="font-display text-xl text-primary flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { action: 'New contribution verified', model: 'Medical Diagnosis v2.1', time: '2 min ago', value: '+75 tDUST' },
                    { action: 'Model accuracy improved', model: 'Financial Risk Assessment', time: '15 min ago', value: '87.5% → 89.1%' },
                    { action: 'Training mandate funded', model: 'Legal Document Analysis', time: '1 hour ago', value: '12,000 tDUST' }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-secondary/10">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 pulse-neural" />
                      <div className="flex-1">
                        <p className="font-body text-sm">{activity.action}</p>
                        <p className="text-xs text-muted-foreground font-body">{activity.model}</p>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-xs text-muted-foreground font-body">{activity.time}</span>
                          <span className="text-xs text-primary font-display font-semibold">{activity.value}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Training Mandate Wizard */}
      <TrainingMandateWizard 
        isOpen={isWizardOpen} 
        onClose={() => setIsWizardOpen(false)} 
      />
    </div>
  );
}