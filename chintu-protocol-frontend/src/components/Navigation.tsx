import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Database, Menu, X } from 'lucide-react';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { label: 'Protocol', href: '#protocol' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'AI Innovators', href: '#ai-innovators' },
    { label: 'Data Custodians', href: '#custodians' },
    { label: 'Documentation', href: '#docs' }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-3"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center neural-glow">
              <Brain className="w-6 h-6 text-background" />
            </div>
            <div>
              <div className="text-xl font-bold text-glow">Chintu</div>
              <div className="text-xs text-muted-foreground -mt-1">Trust Unit</div>
            </div>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-foreground hover:text-primary transition-colors relative group"
              >
                {item.label}
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
              </motion.a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="px-4 py-2 text-primary border border-primary rounded-lg hover:bg-primary/10 transition-colors">
              <Database className="w-4 h-4 inline mr-2" />
              Custodian Portal
            </button>
            <button className="btn-neural">
              <Brain className="w-4 h-4 inline mr-2" />
              AI Innovator
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden py-4 border-t border-border"
          >
            <div className="flex flex-col space-y-4">
              {menuItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-foreground hover:text-primary transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <div className="flex flex-col space-y-2 mt-4 pt-4 border-t border-border">
                <button className="px-4 py-2 text-primary border border-primary rounded-lg hover:bg-primary/10 transition-colors text-left">
                  <Database className="w-4 h-4 inline mr-2" />
                  Custodian Portal
                </button>
                <button className="btn-neural text-left">
                  <Brain className="w-4 h-4 inline mr-2" />
                  AI Innovator
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
}