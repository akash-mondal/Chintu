import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Brain, Zap, Award } from 'lucide-react';

const steps = [
  {
    icon: Brain,
    title: 'Define',
    description: 'AI Innovator issues a "Training Mandate" on Chintu, defining data criteria and locking rewards',
    color: 'from-primary to-blue-400'
  },
  {
    icon: Shield,
    title: 'Discover',
    description: 'Data Custodians (hospitals, banks) discover the mandate on the Chintu dashboard',
    color: 'from-blue-400 to-cyan-400'
  },
  {
    icon: Zap,
    title: 'Compute',
    description: 'Custodian\'s secure local "Chintu Node" processes private data and generates ZK proof',
    color: 'from-cyan-400 to-teal-400'
  },
  {
    icon: Award,
    title: 'Verify & Reward',
    description: 'Proof is verified on-chain, model updated, and Custodian instantly rewarded',
    color: 'from-teal-400 to-primary'
  }
];

export default function HowItWorks() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-glow mb-6">
            How Chintu <span className="text-primary">Works</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A seamless, trustless process that transforms how we train AI on sensitive data
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection Lines */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent transform -translate-y-1/2" />
          
          <div className="grid md:grid-cols-4 gap-8 relative">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative group"
              >
                <div className="neural-card p-8 text-center h-full neural-glow group-hover:scale-105 transition-transform">
                  {/* Step Number */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm flex items-center justify-center">
                    {index + 1}
                  </div>
                  
                  {/* Icon */}
                  <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${step.color} p-4 neural-glow`}>
                    <step.icon className="w-full h-full text-background" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-primary mb-4">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
                
                {/* Arrow for desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <ArrowRight className="w-4 h-4 text-primary" />
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <button className="btn-neural text-lg px-8 py-4">
            Explore the Protocol
          </button>
        </motion.div>
      </div>
    </section>
  );
}