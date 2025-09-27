import React from 'react';
import { motion } from 'framer-motion';
import Navigation from '../components/Navigation';
import NetworkGlobe from '../components/NetworkGlobe';
import HowItWorks from '../components/HowItWorks';
import { ArrowRight, Shield, Zap, Globe, Users, TrendingUp } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-16 min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="z-10"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6"
            >
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-primary text-sm font-medium">Zero-Knowledge Protocol</span>
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
              The Future of AI is{' '}
              <span className="text-glow bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Verifiable
              </span>
            </h1>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-2xl md:text-3xl text-primary mb-6 text-glow"
            >
              Welcome to Chintu.
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl"
            >
              A decentralized protocol for building trustworthy AI. Train models on sensitive, private datasets without ever exposing the raw data. Powered by Midnight's Zero-Knowledge technology.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button className="btn-neural text-lg px-8 py-4 group">
                Start Building
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 rounded-lg border border-primary text-primary hover:bg-primary/10 transition-colors text-lg">
                View Documentation
              </button>
            </motion.div>
          </motion.div>
          
          {/* Right Content - 3D Globe */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="relative"
          >
            <NetworkGlobe />
            
            {/* Floating Info Cards */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2 }}
              className="absolute top-10 right-10 neural-card p-4 max-w-xs"
            >
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 rounded-full bg-primary pulse-neural" />
                <div>
                  <div className="text-sm font-medium">Live Training</div>
                  <div className="text-xs text-muted-foreground">Medical Dataset • 847 contributors</div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.4 }}
              className="absolute bottom-10 left-10 neural-card p-4 max-w-xs"
            >
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 rounded-full bg-accent pulse-neural" />
                <div>
                  <div className="text-sm font-medium">ZK Proof Verified</div>
                  <div className="text-xs text-muted-foreground">Financial Data • +25 tDUST rewarded</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Protocol Stats - Removed fake statistics, now lean */}
        <div className="absolute bottom-8 left-0 right-0">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              className="text-muted-foreground font-body"
            >
              Join the future of trustworthy, verifiable AI training
            </motion.p>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <HowItWorks />
      
      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-glow mb-6">
              Why Choose <span className="text-primary">Chintu</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The most advanced protocol for privacy-preserving AI training
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: 'Zero-Knowledge Privacy',
                description: 'Train on sensitive data without ever exposing it. Mathematical guarantees ensure privacy.',
                color: 'from-primary to-blue-400'
              },
              {
                icon: Globe,
                title: 'Decentralized Network',
                description: 'Global network of data custodians and AI innovators. No single point of failure.',
                color: 'from-blue-400 to-cyan-400'
              },
              {
                icon: TrendingUp,
                title: 'Economic Incentives',
                description: 'Fair rewards for data contributions. Transparent, auditable compensation system.',
                color: 'from-cyan-400 to-primary'
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="neural-card p-8 neural-glow group hover:scale-105 transition-transform"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} p-4 mb-6 neural-glow`}>
                  <feature.icon className="w-full h-full text-background" />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-4">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="neural-card p-12 neural-glow"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-glow mb-6">
              Ready to Transform AI Training?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join the future of trustworthy AI. Whether you're an AI researcher or data custodian, Chintu has the tools you need.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-neural text-lg px-8 py-4 group">
                <Users className="w-5 h-5 mr-2" />
                Join as Data Custodian
              </button>
              <button className="px-8 py-4 rounded-lg border border-primary text-primary hover:bg-primary/10 transition-colors text-lg">
                <Zap className="w-5 h-5 mr-2 inline" />
                Start as AI Innovator
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;
