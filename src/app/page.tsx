'use client'

import { useState } from 'react'
import Image from 'next/image'
import {
  ArrowRight,
  Github,
  BookOpen,
  Code2,
  Layers,
  Database,
  Shield,
  Terminal,
  Blocks,
  Palette,
  Settings,
  Users,
  Lock,
  Zap,
  Globe,
  ChevronDown,
  Menu,
  X,
  ExternalLink,
  Check,
  AlertTriangle,
  Sparkles,
  Box,
  FileCode,
  Layout,
  Server
} from 'lucide-react'

// Announcement Bar Component
function AnnouncementBar() {
  return (
    <div className="bg-gradient-to-r from-monkey-orange/20 via-monkey-orange/10 to-monkey-orange/20 border-b border-monkey-orange/20">
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-center gap-3 text-sm">
        <span className="text-monkey-orange">🚧</span>
        <span className="text-dark-200">
          MonkeysCMS is evolving fast — join early as a contributor and help define the future.
        </span>
        <a
          href="https://github.com/MonkeysCloud/MonkeysCMS"
          target="_blank"
          rel="noopener noreferrer"
          className="text-monkey-orange hover:text-monkey-orange-light transition-colors flex items-center gap-1 font-medium"
        >
          View Roadmap <ArrowRight className="w-3 h-3" />
        </a>
      </div>
    </div>
  )
}

// Navigation Component
function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-dark-900/80 backdrop-blur-xl border-b border-dark-700/50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <a href="#" className="flex items-center gap-3">
            <Image
              src="/monkeyscms-logo.png"
              alt="MonkeysCMS"
              width={180}
              height={40}
              className="h-8 w-auto"
            />
          </a>

          <div className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="text-dark-300 hover:text-white transition-colors text-sm font-medium"
            >
              Features
            </a>
            <a
              href="#architecture"
              className="text-dark-300 hover:text-white transition-colors text-sm font-medium"
            >
              Architecture
            </a>
            <a
              href="#comparison"
              className="text-dark-300 hover:text-white transition-colors text-sm font-medium"
            >
              Why MonkeysCMS
            </a>
            <a
              href="#community"
              className="text-dark-300 hover:text-white transition-colors text-sm font-medium"
            >
              Community
            </a>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <a
              href="https://github.com/MonkeysCloud/MonkeysCMS"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              <Github className="w-4 h-4" /> GitHub
            </a>
            <a
              href="https://github.com/MonkeysCloud/MonkeysCMS"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Get Started
            </a>
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-dark-200 p-2">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-dark-700 pt-4 space-y-4">
            <a href="#features" className="block text-dark-200 hover:text-white transition-colors">
              Features
            </a>
            <a
              href="#architecture"
              className="block text-dark-200 hover:text-white transition-colors"
            >
              Architecture
            </a>
            <a href="#comparison" className="block text-dark-200 hover:text-white transition-colors">
              Why MonkeysCMS
            </a>
            <a href="#community" className="block text-dark-200 hover:text-white transition-colors">
              Community
            </a>
            <div className="pt-4 flex flex-col gap-3">
              <a
                href="https://github.com/MonkeysCloud/MonkeysCMS"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary justify-center"
              >
                <Github className="w-4 h-4" /> GitHub
              </a>
              <a
                href="https://github.com/MonkeysCloud/MonkeysCMS"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary justify-center"
              >
                Get Started
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

// Hero Section
function HeroSection() {
  const features = [
    'Code-first content modeling (entities, fields, relations)',
    'Modular architecture (install features as modules)',
    'Blocks + themes for site building',
    'Admin REST API for headless/hybrid projects',
    'Normalized relational schema (no meta-table chaos)',
    'Built on MonkeysLegion (shared services + conventions)'
  ]

  return (
    <section className="relative pt-16 pb-24 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-monkey-orange/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-monkey-orange/5 rounded-full blur-2xl" />

      <div className="max-w-7xl mx-auto px-4 relative">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-dark-800 border border-dark-600 text-sm text-dark-200 mb-8">
            <Sparkles className="w-4 h-4 text-monkey-orange" />
            <span>Open Source • Modular • Hybrid/Headless • Contributor Friendly</span>
          </div>

          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
            A modern CMS for teams who <span className="text-gradient">ship fast</span> and stay organized.
          </h1>

          <p className="text-xl text-dark-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            MonkeysCMS combines Drupal-level structure (content types, relationships, taxonomies, permissions) with
            WordPress-style usability—powered by a code-first approach, a clean relational data model, and a solid
            framework foundation.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <a
              href="https://github.com/MonkeysCloud/MonkeysCMS"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-lg px-8 py-4"
            >
              Get Started <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="https://github.com/MonkeysCloud/MonkeysCMS#readme"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-lg px-8 py-4"
            >
              <BookOpen className="w-5 h-5" /> Read the Docs
            </a>
            <a
              href="https://github.com/MonkeysCloud/MonkeysCMS"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost text-lg"
            >
              <Github className="w-5 h-5" /> GitHub
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {features.map((feature, i) => (
              <div
                key={i}
                className="flex items-start gap-3 text-left p-4 rounded-xl bg-dark-800/40 border border-dark-700/50"
              >
                <Check className="w-5 h-5 text-monkey-orange flex-shrink-0 mt-0.5" />
                <span className="text-dark-200 text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// Social Proof Strip
function SocialProofStrip() {
  return (
    <section className="py-12 border-y border-dark-700/50 bg-dark-800/30">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-sm uppercase tracking-wider text-dark-400 mb-3">Built for real-world projects</p>
        <p className="text-dark-300 max-w-2xl mx-auto">
          Agencies, product teams, and developers use CMSs every day. MonkeysCMS is built for the workflows that matter:
          structured content, reusable building blocks, safe changes, and fast delivery.
        </p>
      </div>
    </section>
  )
}

// Pain Section
function PainSection() {
  const painPoints = [
    {
      title: 'WordPress problems',
      icon: <AlertTriangle className="w-6 h-6" />,
      description:
        'Fast to start, but content structure becomes fragile. Complex sites rely on plugins + conventions + meta-fields that are hard to maintain at scale.',
      color: 'text-red-400'
    },
    {
      title: 'Drupal problems',
      icon: <AlertTriangle className="w-6 h-6" />,
      description:
        'Extremely powerful, but the learning curve and configuration overhead can slow teams down—especially when you want "simple" things done quickly.',
      color: 'text-yellow-400'
    },
    {
      title: 'Custom CMS problems',
      icon: <AlertTriangle className="w-6 h-6" />,
      description:
        'You get control, but you rebuild the same features again: media, permissions, revisions, taxonomy, menus, layouts, caching…',
      color: 'text-orange-400'
    }
  ]

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            The CMS tradeoff is <span className="text-gradient">outdated</span>.
          </h2>
          <p className="text-xl text-dark-300 max-w-3xl mx-auto">
            Most teams end up stuck choosing between two extremes: the speed of a simple CMS with long-term technical debt,
            or the power of a structured CMS with heavy complexity. MonkeysCMS aims to remove that tradeoff.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {painPoints.map((pain, i) => (
            <div key={i} className="card-glass p-8">
              <div className={`${pain.color} mb-4`}>{pain.icon}</div>
              <h3 className="font-display text-xl font-semibold mb-3 text-white">{pain.title}</h3>
              <p className="text-dark-300">{pain.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-lg text-monkey-orange font-medium">
            MonkeysCMS is the middle path: structured, modular, and code-first — without the usual CMS baggage.
          </p>
        </div>
      </div>
    </section>
  )
}

// Use Cases Section
function UseCasesSection() {
  const useCases = [
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Marketing sites with real content structure',
      description: 'Landing pages, product pages, case studies, team pages, press, docs.'
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: 'Documentation + knowledge bases',
      description: 'Taxonomies, categories, versioned content, fast listings.'
    },
    {
      icon: <Layers className="w-8 h-8" />,
      title: 'Multi-site agency setups',
      description: 'Reusable modules, consistent architecture, faster launches.'
    },
    {
      icon: <Server className="w-8 h-8" />,
      title: 'Hybrid web apps',
      description: 'CMS-managed content + app-driven features under one roof.'
    }
  ]

  return (
    <section className="py-24 bg-dark-800/30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Built for websites that need <span className="text-gradient">structure</span>.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {useCases.map((useCase, i) => (
            <div
              key={i}
              className="card-glass p-8 group hover:border-monkey-orange/30 transition-all duration-300"
            >
              <div className="text-monkey-orange mb-4 group-hover:scale-110 transition-transform duration-300">
                {useCase.icon}
              </div>
              <h3 className="font-display text-lg font-semibold mb-3 text-white">{useCase.title}</h3>
              <p className="text-dark-400 text-sm">{useCase.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Core Pillars Section
function CorePillarsSection() {
  const pillars = [
    {
      icon: <FileCode className="w-10 h-10" />,
      title: 'Code-first content modeling',
      description: "Define your content in code so it's reviewable, testable, and versioned.",
      features: [
        'Content types and fields live in code (not clicks-only)',
        'Relationships are explicit (not implied with meta hacks)',
        'You can scaffold and iterate quickly'
      ]
    },
    {
      icon: <Box className="w-10 h-10" />,
      title: 'Modular architecture',
      description: 'Install only what you need; build reusable feature modules.',
      features: ['Features stay isolated and portable', 'Better long-term maintainability', 'Easier contributor ecosystem']
    },
    {
      icon: <Database className="w-10 h-10" />,
      title: 'Clean relational schema',
      description: 'Your content lives in normalized tables designed for clarity and performance.',
      features: ['Easier reporting and integration', 'Better query performance', 'Less "mystery data" and fewer edge cases']
    }
  ]

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-3 gap-8">
          {pillars.map((pillar, i) => (
            <div key={i} className="relative">
              <div className="card-glass p-8 h-full">
                <div className="text-monkey-orange mb-6">{pillar.icon}</div>
                <h3 className="font-display text-2xl font-bold mb-4 text-white">{pillar.title}</h3>
                <p className="text-dark-300 mb-6">{pillar.description}</p>
                <ul className="space-y-3">
                  {pillar.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-3 text-dark-400 text-sm">
                      <Check className="w-4 h-4 text-monkey-orange flex-shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              {i < 2 && <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-px bg-dark-600" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Features Grid Section
function FeaturesGridSection() {
  const featureGroups = [
    {
      title: 'Content & Structure',
      features: [
        { icon: <Layers />, name: 'Content Types', desc: 'Define data models for pages, posts, products, etc.' },
        { icon: <Code2 />, name: 'Field system', desc: 'Text, numbers, booleans, json, datetime, and more' },
        { icon: <Database />, name: 'Relations', desc: 'Model real relationships between entities' },
        { icon: <Blocks />, name: 'Taxonomy', desc: 'Categories, tags, hierarchies, classification' },
        { icon: <Menu />, name: 'Menus', desc: 'Structured navigation, trees, custom links' }
      ]
    },
    {
      title: 'Site Building',
      features: [
        { icon: <Box />, name: 'Blocks', desc: 'Reusable components you can place in regions' },
        { icon: <Layout />, name: 'Theme Regions', desc: 'Predictable layout slots' },
        { icon: <Palette />, name: 'Template-based', desc: 'Clean view layer, component-friendly' },
        { icon: <Globe />, name: 'Hybrid delivery', desc: 'Server-rendered pages + API-driven UI' }
      ]
    },
    {
      title: 'Admin & Security',
      features: [
        { icon: <Users />, name: 'Roles & permissions', desc: 'Granular RBAC' },
        { icon: <Server />, name: 'Admin REST API', desc: 'Build custom admin UI or integrate tools' },
        { icon: <Settings />, name: 'Config & settings', desc: 'Manage site-level configuration cleanly' },
        { icon: <Zap />, name: 'Caching strategy', desc: 'Built-in performance hooks' }
      ]
    },
    {
      title: 'Developer Experience',
      features: [
        { icon: <Terminal />, name: 'CLI tools', desc: 'Scaffold, manage modules, automate tasks' },
        { icon: <FileCode />, name: 'Predictable structure', desc: 'Sane conventions for large projects' },
        { icon: <Shield />, name: 'Testing ready', desc: 'Encourage testable modules and upgrades' }
      ]
    }
  ]

  return (
    <section id="features" className="py-24 bg-dark-800/30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Everything you need to build <span className="text-gradient">structured sites</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {featureGroups.map((group, i) => (
            <div key={i}>
              <h3 className="font-display text-xl font-semibold mb-6 text-monkey-orange">{group.title}</h3>
              <div className="space-y-4">
                {group.features.map((feature, j) => (
                  <div
                    key={j}
                    className="flex items-start gap-4 p-4 rounded-xl bg-dark-800/60 border border-dark-700/50 hover:border-dark-600 transition-colors"
                  >
                    <div className="text-dark-400 w-5 h-5 flex-shrink-0 mt-0.5">{feature.icon}</div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">{feature.name}</h4>
                      <p className="text-dark-400 text-sm">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Architecture Section
function ArchitectureSection() {
  const steps = [
    {
      num: '01',
      title: 'Modules define features + entities',
      desc: 'Encapsulate functionality in portable, reusable modules'
    },
    {
      num: '02',
      title: 'Entities define schema + relationships',
      desc: 'Clear data models with explicit relationships'
    },
    {
      num: '03',
      title: 'Theme layer renders pages + regions',
      desc: 'Predictable templates with component-friendly architecture'
    },
    {
      num: '04',
      title: 'Admin API powers UI and integrations',
      desc: 'RESTful endpoints for headless or hybrid delivery'
    }
  ]

  return (
    <section id="architecture" className="py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            A CMS architecture that <span className="text-gradient">scales</span> with your team
          </h2>
          <p className="text-xl text-dark-300 max-w-3xl mx-auto">
            MonkeysCMS is designed like a modern platform: modular features, explicit data models, clean boundaries, and an
            API-first mindset—with a framework-grade backend underneath.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {steps.map((step, i) => (
            <div key={i} className="relative">
              <div className="card-glass p-6 h-full">
                <span className="text-5xl font-bold text-dark-700 font-display">{step.num}</span>
                <h3 className="font-display text-lg font-semibold mt-4 mb-2 text-white">{step.title}</h3>
                <p className="text-dark-400 text-sm">{step.desc}</p>
              </div>
              {i < 3 && <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-monkey-orange/30" />}
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-dark-300 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-dark-800 border border-dark-700">
            <Zap className="w-4 h-4 text-monkey-orange" />
            Build monolith-first for simplicity, scale outward when needed.
          </p>
        </div>
      </div>
    </section>
  )
}

// How It Works Section
function HowItWorksSection() {
  const steps = [
    {
      icon: <FileCode className="w-8 h-8" />,
      title: 'Model your content',
      description:
        'Define content types and fields. Structure is predictable. You know what "a page" is in your codebase.'
    },
    {
      icon: <Blocks className="w-8 h-8" />,
      title: 'Compose your site with blocks',
      description: 'Build reusable blocks (hero, CTA, testimonial, listing) and place them into theme regions.'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Publish with confidence',
      description: 'Use permissions to protect workflows. Add revisions and moderation as your editorial needs grow.'
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Deliver headless or hybrid',
      description: 'Use the Admin API to power Next.js, mobile apps, dashboards—or render server-side with themes.'
    }
  ]

  return (
    <section className="py-24 bg-dark-800/30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            How it <span className="text-gradient">works</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-monkey-orange/20 to-transparent border border-monkey-orange/30 flex items-center justify-center text-monkey-orange">
                {step.icon}
              </div>
              <div className="text-xs font-mono text-monkey-orange mb-2">Step {i + 1}</div>
              <h3 className="font-display text-xl font-semibold mb-3 text-white">{step.title}</h3>
              <p className="text-dark-400 text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Comparison Section
function ComparisonSection() {
  const wpComparison = [
    'Real content modeling (not just "posts" + custom fields)',
    'Cleaner database structure for long-term growth',
    'Better modularity for teams and reusable features',
    'Modern development patterns (code-first, testable)',
    'A stable foundation without plugin chaos'
  ]

  const drupalComparison = [
    'Faster learning curve and setup',
    'Less configuration ceremony',
    'Code-first modeling without config-sync anxiety',
    'Modern DX for developers and contributors'
  ]

  return (
    <section id="comparison" className="py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Why MonkeysCMS <span className="text-gradient">wins</span> where others hurt
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="card-glass p-8">
            <h3 className="font-display text-2xl font-bold mb-6 text-white">MonkeysCMS vs WordPress</h3>
            <ul className="space-y-4">
              {wpComparison.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-monkey-orange flex-shrink-0 mt-0.5" />
                  <span className="text-dark-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="card-glass p-8">
            <h3 className="font-display text-2xl font-bold mb-6 text-white">MonkeysCMS vs Drupal</h3>
            <ul className="space-y-4">
              {drupalComparison.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-monkey-orange flex-shrink-0 mt-0.5" />
                  <span className="text-dark-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="text-center">
          <p className="text-xl text-dark-200 font-medium">
            WordPress is easy until it isn&apos;t. Drupal is powerful but heavy.{' '}
            <span className="text-monkey-orange">MonkeysCMS is built for the middle ground.</span>
          </p>
        </div>
      </div>
    </section>
  )
}

// Performance Section
function PerformanceSection() {
  const features = [
    { icon: <Zap />, text: 'Cache-friendly rendering model' },
    { icon: <Settings />, text: 'Clear invalidation strategy' },
    { icon: <Database />, text: 'Efficient queries with normalized schema' },
    { icon: <Globe />, text: 'Works nicely with CDNs and modern deployment' }
  ]

  return (
    <section className="py-24 bg-dark-800/30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-display text-4xl font-bold mb-6">
              Fast by default. <span className="text-gradient">Predictable</span> under load.
            </h2>
            <div className="space-y-4">
              {features.map((feature, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-monkey-orange/10 flex items-center justify-center text-monkey-orange">
                    {feature.icon}
                  </div>
                  <span className="text-dark-200">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card-glass p-8">
            <h3 className="font-display text-xl font-semibold mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-monkey-orange" />
              Security without &quot;plugin roulette&quot;
            </h3>
            <ul className="space-y-3 text-dark-300">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-monkey-orange flex-shrink-0 mt-1" />
                RBAC roles and permissions
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-monkey-orange flex-shrink-0 mt-1" />
                Safer extension model via modules
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-monkey-orange flex-shrink-0 mt-1" />
                Clear boundaries between admin, content, and rendering
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-monkey-orange flex-shrink-0 mt-1" />
                Ideal foundation for audited deployments
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

// Community Section
function CommunitySection() {
  const areas = [
    { title: 'Core', desc: 'Schema evolution, field system, caching, APIs' },
    { title: 'Modules', desc: 'Media, views/listings, workflows' },
    { title: 'Themes', desc: 'Starter themes, components, templates' },
    { title: 'Tooling', desc: 'Scaffolding, docs, examples' }
  ]

  return (
    <section id="community" className="py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Open-source and <span className="text-gradient">contributor-friendly</span>
          </h2>
          <p className="text-xl text-dark-300 max-w-3xl mx-auto">
            MonkeysCMS is built in the open. Whether you&apos;re fixing bugs, improving DX, or building modules and
            themes—your contributions shape the platform.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {areas.map((area, i) => (
            <div key={i} className="text-center p-6 rounded-xl bg-dark-800/40 border border-dark-700/50">
              <h3 className="font-display text-lg font-semibold mb-2 text-white">{area.title}</h3>
              <p className="text-dark-400 text-sm">{area.desc}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="https://github.com/MonkeysCloud/MonkeysCMS"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            <Github className="w-5 h-5" /> Contribute on GitHub
          </a>
          <a
            href="https://github.com/MonkeysCloud/MonkeysCMS#readme"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            <BookOpen className="w-5 h-5" /> Read Contribution Guide
          </a>
        </div>
      </div>
    </section>
  )
}

// Roadmap Section
function RoadmapSection() {
  const items = [
    'Safe schema updates & migrations',
    'Blocks placement UI + visibility rules',
    'Media library + derivatives',
    'Revisions + moderation workflows',
    'Views/listings builder for non-devs'
  ]

  return (
    <section className="py-24 bg-dark-800/30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-4xl font-bold mb-8">
            What&apos;s <span className="text-gradient">next</span>
          </h2>

          <div className="space-y-4 mb-10">
            {items.map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-dark-800/60 border border-dark-700/50">
                <div className="w-8 h-8 rounded-full bg-monkey-orange/20 flex items-center justify-center text-monkey-orange text-sm font-mono">
                  {i + 1}
                </div>
                <span className="text-dark-200">{item}</span>
              </div>
            ))}
          </div>

          <a
            href="https://github.com/MonkeysCloud/MonkeysCMS/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary inline-flex"
          >
            View full roadmap <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  )
}

// FAQ Section
function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      q: 'Is MonkeysCMS headless?',
      a: 'It can be. MonkeysCMS supports headless and hybrid approaches, so you can choose what fits your project.'
    },
    {
      q: 'How do I build layouts?',
      a: 'Use blocks + theme regions. Create reusable components, place them into regions, and control visibility rules.'
    },
    {
      q: 'Is it good for agencies?',
      a: 'Yes. The modular approach makes it easier to reuse features and standardize builds across multiple sites.'
    },
    {
      q: 'What is MonkeysLegion?',
      a: 'MonkeysCMS is built on MonkeysLegion: it provides the core framework foundation (services and conventions) so the CMS stays predictable and scalable.'
    },
    {
      q: 'How is it different from a "custom CMS"?',
      a: "You're not starting from zero. MonkeysCMS already targets the hard parts: modeling, modules, permissions, blocks, themes, APIs, and a roadmap for media/workflows."
    },
    {
      q: 'Can I migrate from WordPress or Drupal?',
      a: 'A migration path is planned (content types, taxonomies, menus, media). The goal is to make switching practical, not theoretical.'
    },
    {
      q: 'Can I contribute modules and themes?',
      a: 'Yes. The project is designed around modules and themes so the ecosystem can grow cleanly.'
    }
  ]

  return (
    <section className="py-24">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="font-display text-4xl font-bold mb-12 text-center">
          Frequently asked <span className="text-gradient">questions</span>
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="card-glass overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full p-6 text-left flex items-center justify-between gap-4"
              >
                <span className="font-semibold text-white">{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-dark-400 transition-transform ${openIndex === i ? 'rotate-180' : ''}`}
                />
              </button>
              {openIndex === i && (
                <div className="px-6 pb-6">
                  <p className="text-dark-300">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// CTA Section
function CTASection() {
  return (
    <section className="py-24 bg-gradient-to-b from-dark-800/50 to-dark-900">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
          Build structured websites faster—<br />
          <span className="text-gradient">without CMS headaches</span>.
        </h2>
        <p className="text-xl text-dark-300 mb-10">
          MonkeysCMS gives you a clean data model, modular features, and a modern developer experience.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <a
            href="https://github.com/MonkeysCloud/MonkeysCMS"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-lg px-8 py-4"
          >
            Get Started <ArrowRight className="w-5 h-5" />
          </a>
          <a
            href="https://github.com/MonkeysCloud/MonkeysCMS#readme"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary text-lg px-8 py-4"
          >
            <BookOpen className="w-5 h-5" /> Read Docs
          </a>
        </div>

        <p className="text-dark-400 text-sm">Join the community</p>
      </div>
    </section>
  )
}

// Footer
function Footer() {
  return (
    <footer className="py-12 border-t border-dark-700/50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Image src="/icon-monkey.png" alt="MonkeysCMS" width={32} height={32} className="w-8 h-8" />
            <span className="font-display font-semibold text-white">MonkeysCMS</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <a
              href="https://github.com/MonkeysCloud/MonkeysCMS#readme"
              target="_blank"
              rel="noopener noreferrer"
              className="text-dark-400 hover:text-white transition-colors"
            >
              Docs
            </a>
            <a
              href="https://github.com/MonkeysCloud/MonkeysCMS"
              target="_blank"
              rel="noopener noreferrer"
              className="text-dark-400 hover:text-white transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://github.com/MonkeysCloud/MonkeysLegion-Skeleton"
              target="_blank"
              rel="noopener noreferrer"
              className="text-dark-400 hover:text-white transition-colors"
            >
              MonkeysLegion
            </a>
            <a
              href="https://github.com/MonkeysCloud/MonkeysCMS/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="text-dark-400 hover:text-white transition-colors"
            >
              Roadmap
            </a>
            <a
              href="https://github.com/MonkeysCloud/MonkeysCMS"
              target="_blank"
              rel="noopener noreferrer"
              className="text-dark-400 hover:text-white transition-colors"
            >
              Community
            </a>
          </div>

          <p className="text-dark-500 text-sm">© MonkeysCMS — Structure without complexity.</p>
        </div>
      </div>
    </footer>
  )
}

// MonkeysLegion Section
function MonkeysLegionSection() {
  return (
    <section className="py-24 bg-gradient-to-r from-dark-900 to-dark-800 border-y border-dark-700/50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-monkey-orange/10 border border-monkey-orange/20 text-monkey-orange text-xs font-semibold uppercase tracking-wider mb-6">
              Powered by MonkeysLegion
            </div>
            <h2 className="font-display text-4xl font-bold mb-6">
              Built on a <span className="text-gradient">solid foundation</span>
            </h2>
            <p className="text-xl text-dark-300 mb-6">
              MonkeysCMS isn&apos;t just a CMS—it&apos;s built on the <strong>MonkeysLegion Framework</strong>.
            </p>
            <p className="text-dark-300 mb-8 leading-relaxed">
              MonkeysLegion provides the backend foundation and shared services that make MonkeysCMS predictable to extend,
              easier to maintain, and ready for real projects.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://monkeyslegion.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2"
              >
                <Globe className="w-4 h-4" /> Visit MonkeysLegion.com
              </a>
              <a
                href="https://github.com/MonkeysCloud/MonkeysLegion-Skeleton"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary inline-flex items-center gap-2"
              >
                <Github className="w-4 h-4" /> View Framework Skeleton
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-monkey-orange/20 blur-3xl rounded-full opacity-30" />
            <div className="relative card-glass p-8 border-monkey-orange/20">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-monkey-orange flex items-center justify-center text-white">
                  <Box className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-white">MonkeysLegion</h3>
                  <p className="text-monkey-orange text-sm font-medium">The Core Framework</p>
                </div>
              </div>

              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-dark-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-monkey-orange text-xs">01</span>
                  </div>
                  <span className="text-dark-200 text-sm">Base skeleton for rapid application development</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-dark-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-monkey-orange text-xs">02</span>
                  </div>
                  <span className="text-dark-200 text-sm">Standardized service container and dependency injection</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-dark-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-monkey-orange text-xs">03</span>
                  </div>
                  <span className="text-dark-200 text-sm">Shared core components across the MonkeysCloud ecosystem</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Main Page Component
export default function Home() {
  return (
    <main>
      <AnnouncementBar />
      <Navigation />
      <HeroSection />
      <SocialProofStrip />
      <PainSection />
      <UseCasesSection />
      <CorePillarsSection />
      <FeaturesGridSection />
      <ArchitectureSection />
      <MonkeysLegionSection />
      <HowItWorksSection />
      <ComparisonSection />
      <PerformanceSection />
      <CommunitySection />
      <RoadmapSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </main>
  )
}
