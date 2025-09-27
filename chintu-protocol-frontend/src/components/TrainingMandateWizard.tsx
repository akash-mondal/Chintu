import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  ChevronRight, 
  ChevronLeft, 
  Upload, 
  Brain, 
  Target, 
  DollarSign,
  CheckCircle2,
  Sliders,
  Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';

interface TrainingMandateWizardProps {
  isOpen: boolean;
  onClose: () => void;
}

const steps = [
  { id: 1, title: 'Model & Goals', icon: Brain },
  { id: 2, title: 'Data Criteria', icon: Filter },
  { id: 3, title: 'Budget & Incentives', icon: DollarSign },
  { id: 4, title: 'Review & Deploy', icon: CheckCircle2 }
];

export default function TrainingMandateWizard({ isOpen, onClose }: TrainingMandateWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    modelName: '',
    modelFile: null as File | null,
    description: '',
    goals: '',
    dataType: 'medical',
    ageRange: [18, 80],
    diagnosisCodes: [] as string[],
    anonymizationLevel: 'high',
    budget: 10000,
    rewardPerContribution: 100,
    deadline: ''
  });

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // Simulate mandate creation
    console.log('Creating mandate:', formData);
    onClose();
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <Label className="font-body">Model Name</Label>
              <Input
                placeholder="e.g., Medical Diagnosis Model v2.1"
                value={formData.modelName}
                onChange={(e) => setFormData({ ...formData, modelName: e.target.value })}
                className="font-body mt-2"
              />
            </div>
            
            <div>
              <Label className="font-body">Upload Model File</Label>
              <div className="mt-2 border-2 border-dashed border-border rounded-lg p-8 text-center neural-card">
                <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="font-body text-muted-foreground">
                  Drop your model file here or click to browse
                </p>
                <Button variant="outline" className="mt-4 font-body">
                  Choose File
                </Button>
              </div>
            </div>

            <div>
              <Label className="font-body">Description</Label>
              <Textarea
                placeholder="Describe your model and its intended use case..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="font-body mt-2"
                rows={3}
              />
            </div>

            <div>
              <Label className="font-body">Training Goals</Label>
              <Textarea
                placeholder="What specific improvements are you looking for?"
                value={formData.goals}
                onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
                className="font-body mt-2"
                rows={3}
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <Label className="font-body mb-4 block">Data Type</Label>
              <div className="grid grid-cols-3 gap-4">
                {['medical', 'financial', 'legal'].map((type) => (
                  <Card
                    key={type}
                    className={`cursor-pointer transition-all neural-card ${
                      formData.dataType === type ? 'border-primary bg-primary/10' : ''
                    }`}
                    onClick={() => setFormData({ ...formData, dataType: type })}
                  >
                    <CardContent className="p-4 text-center">
                      <div className="font-body capitalize font-medium">{type}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {formData.dataType === 'medical' && (
              <>
                <div>
                  <Label className="font-body">Age Range</Label>
                  <div className="mt-4">
                    <Slider
                      value={formData.ageRange}
                      onValueChange={(value) => setFormData({ ...formData, ageRange: value })}
                      max={100}
                      min={0}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground font-body mt-2">
                      <span>Age {formData.ageRange[0]}</span>
                      <span>Age {formData.ageRange[1]}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="font-body">Diagnosis Codes (ICD-10)</Label>
                  <div className="mt-2 space-y-2">
                    <div className="flex flex-wrap gap-2">
                      {['A00-B99', 'C00-D48', 'E00-E89', 'F01-F99', 'G00-G99'].map((code) => (
                        <Badge
                          key={code}
                          variant={formData.diagnosisCodes.includes(code) ? 'default' : 'outline'}
                          className="cursor-pointer font-body"
                          onClick={() => {
                            if (formData.diagnosisCodes.includes(code)) {
                              setFormData({
                                ...formData,
                                diagnosisCodes: formData.diagnosisCodes.filter(c => c !== code)
                              });
                            } else {
                              setFormData({
                                ...formData,
                                diagnosisCodes: [...formData.diagnosisCodes, code]
                              });
                            }
                          }}
                        >
                          {code}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}

            <div>
              <div className="flex items-center justify-between">
                <Label className="font-body">Anonymization Level</Label>
                <Badge className="font-body">{formData.anonymizationLevel.toUpperCase()}</Badge>
              </div>
              <div className="mt-4 space-y-4">
                {['basic', 'medium', 'high'].map((level) => (
                  <div key={level} className="flex items-center space-x-3">
                    <Switch
                      checked={formData.anonymizationLevel === level}
                      onCheckedChange={() => setFormData({ ...formData, anonymizationLevel: level })}
                    />
                    <span className="font-body capitalize">{level} Anonymization</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <Label className="font-body">Total Budget (tDUST)</Label>
              <Input
                type="number"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: parseInt(e.target.value) })}
                className="font-body mt-2"
              />
              <p className="text-sm text-muted-foreground font-body mt-1">
                Total amount you're willing to spend on this training mandate
              </p>
            </div>

            <div>
              <Label className="font-body">Reward per Contribution (tDUST)</Label>
              <Input
                type="number"
                value={formData.rewardPerContribution}
                onChange={(e) => setFormData({ ...formData, rewardPerContribution: parseInt(e.target.value) })}
                className="font-body mt-2"
              />
              <p className="text-sm text-muted-foreground font-body mt-1">
                Amount paid to each data custodian for verified contributions
              </p>
            </div>

            <div>
              <Label className="font-body">Deadline</Label>
              <Input
                type="date"
                value={formData.deadline}
                onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                className="font-body mt-2"
              />
            </div>

            <Card className="neural-card">
              <CardContent className="p-4">
                <h4 className="font-display font-semibold text-primary mb-2">Budget Breakdown</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between font-body">
                    <span>Estimated Contributors:</span>
                    <span>{Math.floor(formData.budget / formData.rewardPerContribution)}</span>
                  </div>
                  <div className="flex justify-between font-body">
                    <span>Reward per Contribution:</span>
                    <span>{formData.rewardPerContribution} tDUST</span>
                  </div>
                  <div className="flex justify-between font-body">
                    <span>Platform Fee (2%):</span>
                    <span>{Math.floor(formData.budget * 0.02)} tDUST</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-display font-semibold text-primary">
                    <span>Total Cost:</span>
                    <span>{formData.budget + Math.floor(formData.budget * 0.02)} tDUST</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <Card className="neural-card">
              <CardHeader>
                <CardTitle className="font-display text-primary">Review Your Mandate</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-display font-semibold mb-2">Model Information</h4>
                  <p className="font-body text-sm text-muted-foreground">{formData.modelName}</p>
                  <p className="font-body text-sm">{formData.description}</p>
                </div>
                
                <div>
                  <h4 className="font-display font-semibold mb-2">Data Criteria</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="font-body">{formData.dataType}</Badge>
                    <Badge variant="outline" className="font-body">
                      Age {formData.ageRange[0]}-{formData.ageRange[1]}
                    </Badge>
                    <Badge variant="outline" className="font-body">
                      {formData.anonymizationLevel} privacy
                    </Badge>
                  </div>
                </div>

                <div>
                  <h4 className="font-display font-semibold mb-2">Budget & Timeline</h4>
                  <p className="font-body text-sm">
                    {formData.budget} tDUST budget • {formData.rewardPerContribution} tDUST per contribution
                  </p>
                  <p className="font-body text-sm text-muted-foreground">
                    Deadline: {formData.deadline}
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
              <p className="font-body text-sm">
                🔒 Your mandate will be deployed to the Midnight network. 
                Data custodians will be able to discover and contribute to your training goal 
                while maintaining complete privacy through Zero-Knowledge proofs.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="neural-card w-full max-w-4xl max-h-[90vh] overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div>
              <h2 className="text-2xl font-display font-bold text-primary">Create Training Mandate</h2>
              <p className="text-sm text-muted-foreground font-body">
                Step {currentStep} of {steps.length}: {steps[currentStep - 1].title}
              </p>
            </div>
            <Button variant="ghost" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Progress */}
          <div className="px-6 py-4 border-b border-border">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                      currentStep >= step.id
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-muted text-muted-foreground'
                    }`}
                  >
                    <step.icon className="w-5 h-5" />
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-16 h-0.5 mx-2 transition-colors ${
                        currentStep > step.id ? 'bg-primary' : 'bg-muted'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[50vh]">
            {renderStepContent()}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-6 border-t border-border">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="font-body"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Previous
            </Button>
            
            {currentStep === steps.length ? (
              <Button onClick={handleSubmit} className="btn-neural font-body">
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Deploy Mandate
              </Button>
            ) : (
              <Button onClick={nextStep} className="btn-neural font-body">
                Next
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}