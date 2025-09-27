import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Database, 
  Shield, 
  TrendingUp, 
  Award, 
  Search,
  Filter,
  Eye,
  CheckCircle2,
  Clock,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import ContributionModal from '@/components/ContributionModal';
import ZKProofAnimation from '@/components/ZKProofAnimation';

const mockMandates = [
  {
    id: 1,
    title: 'Medical Diagnosis Model v2.1',
    innovator: 'HealthTech Research',
    reward: 125,
    criteria: 'Medical records, age 18-80, diagnosis codes ICD-10',
    matchingRecords: 8432,
    dataType: 'Medical',
    status: 'Available',
    reputation: 4.8,
    deadline: '2024-12-15'
  },
  {
    id: 2,
    title: 'Financial Risk Assessment',
    innovator: 'FinanceAI Corp',
    reward: 95,
    criteria: 'Credit history, transaction data, anonymized',
    matchingRecords: 2156,
    dataType: 'Financial',
    status: 'Available',
    reputation: 4.6,
    deadline: '2024-11-30'
  },
  {
    id: 3,
    title: 'Legal Document Analysis',
    innovator: 'LegalTech Solutions',
    reward: 180,
    criteria: 'Contract analysis, legal precedents, case law',
    matchingRecords: 1847,
    dataType: 'Legal',
    status: 'Contributed',
    reputation: 4.9,
    deadline: '2024-10-20'
  }
];

export default function DataCustodianDashboard() {
  const [isContributionModalOpen, setIsContributionModalOpen] = useState(false);
  const [selectedMandate, setSelectedMandate] = useState<typeof mockMandates[0] | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleContribute = (mandate: typeof mockMandates[0]) => {
    setSelectedMandate(mandate);
    setIsContributionModalOpen(true);
  };

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
            <h1 className="text-4xl font-display font-bold text-glow">Data Custodian Portal</h1>
            <p className="text-muted-foreground font-body mt-2">
              Secure, private data contributions with Zero-Knowledge proofs
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Badge className="bg-success/20 text-success border-success/30 font-body">
              <Shield className="w-4 h-4 mr-1" />
              Node Secure
            </Badge>
          </div>
        </motion.div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Earned', value: '2,847', icon: Award, color: 'text-primary', suffix: ' tDUST' },
            { label: 'Contributions', value: '23', icon: CheckCircle2, color: 'text-success', suffix: ' verified' },
            { label: 'Privacy Score', value: '100%', icon: Shield, color: 'text-accent', suffix: ' secure' },
            { label: 'Active Mandates', value: '8', icon: TrendingUp, color: 'text-primary-glow', suffix: ' available' }
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
                      <p className={`text-2xl font-display font-bold ${stat.color}`}>
                        {stat.value}<span className="text-sm font-body">{stat.suffix}</span>
                      </p>
                    </div>
                    <stat.icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Training Mandates Marketplace */}
          <div className="lg:col-span-2">
            <Card className="neural-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="font-display text-xl text-primary">Training Mandate Marketplace</CardTitle>
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="Search mandates..."
                        className="pl-10 w-64 font-body"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <Button variant="outline" size="sm" className="font-body">
                      <Filter className="w-4 h-4 mr-1" />
                      Filters
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {mockMandates
                    .filter(mandate => 
                      mandate.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      mandate.innovator.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((mandate, index) => (
                    <motion.div
                      key={mandate.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="neural-card p-6 hover:scale-[1.02] transition-transform"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="font-body font-semibold text-lg">{mandate.title}</h3>
                            <Badge 
                              variant={mandate.status === 'Available' ? 'default' : 'secondary'}
                              className="font-body"
                            >
                              {mandate.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground font-body mb-2">
                            by {mandate.innovator} • ⭐ {mandate.reputation}/5.0
                          </p>
                          <p className="text-sm font-body text-foreground mb-4">{mandate.criteria}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-display font-bold text-primary">
                            {mandate.reward} <span className="text-sm font-body">tDUST</span>
                          </div>
                          <p className="text-xs text-muted-foreground font-body">per contribution</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-xs text-muted-foreground font-body">Matching Records</p>
                          <p className="font-display font-semibold text-success">
                            {mandate.matchingRecords.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground font-body">Data Type</p>
                          <p className="font-body font-medium">{mandate.dataType}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground font-body">Deadline</p>
                          <p className="font-body font-medium">{mandate.deadline}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Database className="w-4 h-4 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground font-body">
                            Private scan completed
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm" className="font-body">
                            <Eye className="w-4 h-4 mr-1" />
                            Details
                          </Button>
                          {mandate.status === 'Available' && (
                            <Button 
                              onClick={() => handleContribute(mandate)}
                              className="btn-neural font-body"
                              size="sm"
                            >
                              <Zap className="w-4 h-4 mr-1" />
                              Contribute
                            </Button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-8">
            {/* ZK Proof Visualization */}
            <Card className="neural-card">
              <CardHeader>
                <CardTitle className="font-display text-xl text-primary flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Privacy Protection
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ZKProofAnimation />
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-body text-muted-foreground">Data Encryption</span>
                    <span className="font-display font-semibold text-success">AES-256</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-body text-muted-foreground">Zero-Knowledge Proofs</span>
                    <span className="font-display font-semibold text-primary">Active</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-body text-muted-foreground">Privacy Score</span>
                    <span className="font-display font-semibold text-accent">100%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Contributions */}
            <Card className="neural-card">
              <CardHeader>
                <CardTitle className="font-display text-xl text-primary flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Recent Contributions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { mandate: 'Medical Diagnosis v2.1', records: '8,432', reward: '125 tDUST', status: 'Verified', time: '2 hours ago' },
                    { mandate: 'Financial Risk Model', records: '2,156', reward: '95 tDUST', status: 'Processing', time: '1 day ago' },
                    { mandate: 'Legal Document AI', records: '1,847', reward: '180 tDUST', status: 'Verified', time: '3 days ago' }
                  ].map((contribution, index) => (
                    <div key={index} className="p-3 rounded-lg bg-secondary/10">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-body text-sm font-medium">{contribution.mandate}</p>
                        <Badge 
                          variant={contribution.status === 'Verified' ? 'default' : 'secondary'}
                          className="text-xs font-body"
                        >
                          {contribution.status}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span className="font-body">{contribution.records} records</span>
                        <span className="font-display font-semibold text-primary">{contribution.reward}</span>
                      </div>
                      <p className="text-xs text-muted-foreground font-body mt-1">{contribution.time}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Contribution Modal */}
      {selectedMandate && (
        <ContributionModal
          isOpen={isContributionModalOpen}
          onClose={() => {
            setIsContributionModalOpen(false);
            setSelectedMandate(null);
          }}
          mandate={selectedMandate}
        />
      )}
    </div>
  );
}