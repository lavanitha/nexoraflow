import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import FilterControls from './components/FilterControls';
import OpportunityGrid from './components/OpportunityGrid';
import OpportunityModal from './components/OpportunityModal';

const SideHustleDiscovery = () => {
  const navigate = useNavigate();
  const [opportunities, setOpportunities] = useState([]);
  const [filteredOpportunities, setFilteredOpportunities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: 'all',
    timeCommitment: 'all',
    earningPotential: 'all',
    difficulty: 'all',
    skills: 'all'
  });
  const [savedOpportunities, setSavedOpportunities] = useState([]);
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [sortBy, setSortBy] = useState('match-score');

  // Mock opportunities data
  const mockOpportunities = [
    {
      id: 1,
      title: "Freelance Web Development",
      category: "freelancing",
      description: "Build websites and web applications for clients worldwide using modern technologies.",
      longDescription: `Join the thriving world of freelance web development where you can work with clients from around the globe to create stunning websites and powerful web applications.

This opportunity is perfect for developers who want to leverage their technical skills while enjoying the flexibility of remote work. You'll work on diverse projects ranging from simple landing pages to complex e-commerce platforms.

The demand for skilled web developers continues to grow, making this an excellent long-term side hustle with potential for significant income growth.`,
      earningPotential: "$1,000-3,000/month",
      timeCommitment: "10-20 hours/week",
      difficulty: "intermediate",
      requiredSkills: ["HTML/CSS", "JavaScript", "React", "Node.js"],
      matchScore: 92,
      whyItFits: "Your programming skills and portfolio make you an excellent candidate for web development projects.",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop",
      rating: 4.8,
      reviewCount: 234,
      tags: ["Remote", "High Demand", "Scalable"],
      gettingStarted: [
        "Create profiles on Upwork, Fiverr, and Freelancer platforms",
        "Build a portfolio showcasing your best web development projects",
        "Set competitive hourly rates based on your skill level",
        "Start with smaller projects to build client reviews",
        "Gradually increase rates as you gain experience and testimonials"
      ],
      requirements: [
        "Proficiency in HTML, CSS, and JavaScript",
        "Experience with at least one modern framework (React, Vue, Angular)",
        "Understanding of responsive design principles",
        "Basic knowledge of backend technologies",
        "Strong communication skills for client interaction"
      ],
      pros: [
        "High earning potential with experience",
        "Work from anywhere in the world",
        "Diverse and challenging projects",
        "Opportunity to learn new technologies",
        "Build long-term client relationships"
      ],
      cons: [
        "Income can be inconsistent initially",
        "Need to handle client acquisition and management",
        "Requires staying updated with latest technologies",
        "Competition from global developers"
      ]
    },
    {
      id: 2,
      title: "Content Writing & Copywriting",
      category: "creative",
      description: "Create engaging content for blogs, websites, and marketing materials.",
      longDescription: `Transform your writing skills into a profitable side hustle by creating compelling content for businesses and publications worldwide.

Content writing offers incredible flexibility and the opportunity to work across various industries, from technology and healthcare to lifestyle and finance. You'll help businesses communicate their message effectively while building your expertise in different niches.

This field is perfect for those who enjoy research, have a way with words, and want to make a meaningful impact on businesses' success through quality content.`,
      earningPotential: "$500-2,000/month",
      timeCommitment: "5-15 hours/week",
      difficulty: "beginner",
      requiredSkills: ["Writing", "Research", "SEO", "Marketing"],
      matchScore: 85,
      whyItFits: "Your communication skills and attention to detail align perfectly with content creation needs.",
      image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=250&fit=crop",
      rating: 4.6,
      reviewCount: 189,
      tags: ["Flexible", "Creative", "Remote"],
      gettingStarted: [
        "Create writing samples in your areas of interest",
        "Set up profiles on content platforms like Contently and ClearVoice",
        "Join freelance marketplaces and pitch to content writing jobs",
        "Start a blog to showcase your writing style",
        "Network with marketing agencies and small businesses"
      ],
      requirements: [
        "Excellent written English skills",
        "Ability to research and understand different topics",
        "Basic understanding of SEO principles",
        "Time management and deadline adherence",
        "Adaptability to different writing styles and tones"
      ],
      pros: [
        "Low barrier to entry",
        "Flexible working hours",
        "Opportunity to learn about various industries",
        "Build a diverse portfolio",
        "Potential for recurring client relationships"
      ],
      cons: [
        "Lower initial rates for beginners",
        "Need to constantly find new clients",
        "Requires continuous learning and adaptation",
        "Can be mentally demanding with tight deadlines"
      ]
    },
    {
      id: 3,
      title: "Online Tutoring & Teaching",
      category: "tutoring",
      description: "Share your knowledge by teaching students online in your area of expertise.",
      longDescription: `Make a meaningful impact while earning extra income by sharing your knowledge and expertise with students around the world through online tutoring.

Whether you're skilled in academic subjects, languages, or professional skills, there's a growing demand for quality online education. You'll help students achieve their goals while building a rewarding teaching practice.

This opportunity is perfect for those who enjoy helping others learn and grow, offering both personal satisfaction and financial rewards.`,
      earningPotential: "$800-2,500/month",
      timeCommitment: "8-15 hours/week",
      difficulty: "beginner",
      requiredSkills: ["Teaching", "Communication", "Subject Expertise", "Patience"],
      matchScore: 78,
      whyItFits: "Your educational background and communication skills make you well-suited for online teaching.",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=250&fit=crop",
      rating: 4.7,
      reviewCount: 156,
      tags: ["Rewarding", "Flexible", "Growing Market"],
      gettingStarted: [
        "Identify your strongest subjects or skills to teach",
        "Create profiles on tutoring platforms like Wyzant, Tutor.com, or Preply",
        "Prepare lesson plans and teaching materials",
        "Set up a professional online teaching environment",
        "Start with competitive rates and gradually increase with experience"
      ],
      requirements: [
        "Expertise in at least one subject area",
        "Strong communication and explanation skills",
        "Patience and empathy for student learning",
        "Reliable internet connection and quiet space",
        "Basic understanding of online teaching tools"
      ],
      pros: [
        "Personally rewarding and meaningful work",
        "Flexible scheduling around your availability",
        "Opportunity to work with diverse students",
        "Build long-term student relationships",
        "Continuous learning and skill development"
      ],
      cons: [
        "Requires preparation time outside of teaching hours",
        "Student progress can vary significantly",
        "Need to adapt teaching methods for online format",
        "Income depends on student retention"
      ]
    },
    {
      id: 4,
      title: "Graphic Design Services",
      category: "creative",
      description: "Create visual designs for businesses, including logos, marketing materials, and digital assets.",
      longDescription: `Turn your creative talents into a thriving side business by providing graphic design services to businesses and entrepreneurs who need professional visual content.

From logo design and branding to social media graphics and marketing materials, the demand for quality graphic design continues to grow as businesses recognize the importance of strong visual identity.

This opportunity allows you to work on diverse creative projects while building a portfolio that showcases your unique style and capabilities.`,
      earningPotential: "$600-2,200/month",
      timeCommitment: "6-12 hours/week",
      difficulty: "intermediate",
      requiredSkills: ["Adobe Creative Suite", "Design Principles", "Branding", "Typography"],
      matchScore: 88,
      whyItFits: "Your creative background and design skills align perfectly with current market demands.",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop",
      rating: 4.5,
      reviewCount: 203,
      tags: ["Creative", "High Demand", "Portfolio Building"],
      gettingStarted: [
        "Build a strong portfolio showcasing various design styles",
        "Create profiles on 99designs, Dribbble, and Behance",
        "Start with logo design contests to build reputation",
        "Reach out to local businesses for design needs",
        "Develop packages for common design services"
      ],
      requirements: [
        "Proficiency in design software (Adobe Creative Suite preferred)",
        "Strong understanding of design principles and typography",
        "Ability to understand and interpret client briefs",
        "Creative problem-solving skills",
        "Attention to detail and quality"
      ],
      pros: [
        "High creative satisfaction",
        "Diverse range of projects and clients",
        "Opportunity to build a strong portfolio",
        "Potential for high-value projects",
        "Skills are always in demand"
      ],
      cons: [
        "Subjective feedback and revisions",
        "Need to stay updated with design trends",
        "Competition from other designers",
        "Client education sometimes required"
      ]
    },
    {
      id: 5,
      title: "Virtual Assistant Services",
      category: "consulting",
      description: "Provide administrative and business support services to entrepreneurs and small businesses.",
      longDescription: `Help busy entrepreneurs and small business owners manage their operations more effectively by providing virtual assistant services from the comfort of your home.

As a virtual assistant, you'll handle a variety of tasks including email management, scheduling, research, data entry, and customer service. This role offers excellent flexibility and the opportunity to work with multiple clients across different industries.

The demand for virtual assistants continues to grow as more businesses embrace remote work and seek cost-effective solutions for administrative tasks.`,
      earningPotential: "$400-1,500/month",
      timeCommitment: "5-12 hours/week",
      difficulty: "beginner",
      requiredSkills: ["Organization", "Communication", "Microsoft Office", "Time Management"],
      matchScore: 82,
      whyItFits: "Your organizational skills and attention to detail make you an ideal virtual assistant candidate.",
      image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=400&h=250&fit=crop",
      rating: 4.4,
      reviewCount: 178,
      tags: ["Entry Level", "Flexible", "Diverse Tasks"],
      gettingStarted: [
        "Identify your strongest administrative skills",
        "Create profiles on Belay, Time Etc, and Fancy Hands",
        "Develop service packages for common VA tasks",
        "Set up efficient systems for task management",
        "Start with lower rates to build client testimonials"
      ],
      requirements: [
        "Strong organizational and time management skills",
        "Excellent written and verbal communication",
        "Proficiency in common office software",
        "Reliable internet connection and computer",
        "Ability to work independently and meet deadlines"
      ],
      pros: [
        "Low barrier to entry",
        "Flexible working arrangements",
        "Opportunity to work with diverse businesses",
        "Develop a broad skill set",
        "Potential for long-term client relationships"
      ],
      cons: [
        "Lower hourly rates compared to specialized skills",
        "Need to manage multiple clients and tasks",
        "Limited growth potential without specialization",
        "Requires strong self-discipline and organization"
      ]
    },
    {
      id: 6,
      title: "Social Media Management",
      category: "digital-marketing",
      description: "Manage social media accounts and create content strategies for businesses and influencers.",
      longDescription: `Help businesses build their online presence and engage with their audience through strategic social media management and content creation.

As social media becomes increasingly important for business success, there's growing demand for skilled professionals who can create engaging content, manage posting schedules, and analyze performance metrics.

This opportunity combines creativity with strategy, allowing you to work with diverse brands while staying current with the latest social media trends and platforms.`,
      earningPotential: "$700-2,800/month",
      timeCommitment: "8-16 hours/week",
      difficulty: "intermediate",
      requiredSkills: ["Social Media Strategy", "Content Creation", "Analytics", "Copywriting"],
      matchScore: 90,
      whyItFits: "Your understanding of social media trends and content creation skills are highly valuable in today\'s market.",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=250&fit=crop",
      rating: 4.6,
      reviewCount: 167,
      tags: ["Trending", "Creative", "High Growth"],
      gettingStarted: [
        "Build your own strong social media presence",
        "Create case studies of successful social media campaigns",
        "Offer free audits to potential clients",
        "Develop content templates and posting schedules",
        "Stay updated with platform algorithm changes"
      ],
      requirements: [
        "Deep understanding of major social media platforms",
        "Content creation and copywriting skills",
        "Basic graphic design abilities",
        "Analytics and reporting capabilities",
        "Understanding of social media advertising"
      ],
      pros: [
        "High demand across all industries",
        "Creative and dynamic work environment",
        "Opportunity to work with trending topics",
        "Potential for agency growth",
        "Measurable results and impact"
      ],
      cons: [
        "Need to stay constantly updated with platform changes",
        "Results can be affected by algorithm changes",
        "Requires consistent content creation",
        "Client expectations can be unrealistic"
      ]
    }
  ];

  // Simulate loading and data fetch
  useEffect(() => {
    const loadOpportunities = async () => {
      setIsLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      setOpportunities(mockOpportunities);
      setFilteredOpportunities(mockOpportunities);
      setIsLoading(false);
    };

    loadOpportunities();
  }, []);

  // Load saved opportunities from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('savedOpportunities');
    if (saved) {
      setSavedOpportunities(JSON.parse(saved));
    }
  }, []);

  // Filter opportunities based on active filters
  useEffect(() => {
    let filtered = [...opportunities];

    // Apply filters
    if (filters?.category !== 'all') {
      filtered = filtered?.filter(opp => opp?.category === filters?.category);
    }

    if (filters?.timeCommitment !== 'all') {
      filtered = filtered?.filter(opp => {
        const timeRange = filters?.timeCommitment;
        const oppTime = opp?.timeCommitment?.toLowerCase();
        
        switch (timeRange) {
          case '1-5':
            return oppTime?.includes('1-5') || oppTime?.includes('5 hours');
          case '5-10':
            return oppTime?.includes('5-10') || oppTime?.includes('8');
          case '10-20':
            return oppTime?.includes('10-20') || oppTime?.includes('15');
          case '20+':
            return oppTime?.includes('20+') || oppTime?.includes('25');
          default:
            return true;
        }
      });
    }

    if (filters?.earningPotential !== 'all') {
      filtered = filtered?.filter(opp => {
        const earningRange = filters?.earningPotential;
        const oppEarning = opp?.earningPotential?.toLowerCase();
        
        switch (earningRange) {
          case '100-500':
            return oppEarning?.includes('400') || oppEarning?.includes('500');
          case '500-1000':
            return oppEarning?.includes('500') || oppEarning?.includes('800') || oppEarning?.includes('1,000');
          case '1000-2500':
            return oppEarning?.includes('1,000') || oppEarning?.includes('2,000') || oppEarning?.includes('2,500');
          case '2500+':
            return oppEarning?.includes('2,500') || oppEarning?.includes('3,000');
          default:
            return true;
        }
      });
    }

    if (filters?.difficulty !== 'all') {
      filtered = filtered?.filter(opp => opp?.difficulty === filters?.difficulty);
    }

    if (filters?.skills !== 'all') {
      filtered = filtered?.filter(opp => 
        opp?.requiredSkills?.some(skill => 
          skill?.toLowerCase()?.includes(filters?.skills?.toLowerCase())
        )
      );
    }

    // Apply sorting
    switch (sortBy) {
      case 'match-score':
        filtered?.sort((a, b) => b?.matchScore - a?.matchScore);
        break;
      case 'earning-high':
        filtered?.sort((a, b) => {
          const aMax = parseInt(a?.earningPotential?.match(/\d+,?\d*/g)?.pop()?.replace(',', '') || '0');
          const bMax = parseInt(b?.earningPotential?.match(/\d+,?\d*/g)?.pop()?.replace(',', '') || '0');
          return bMax - aMax;
        });
        break;
      case 'earning-low':
        filtered?.sort((a, b) => {
          const aMin = parseInt(a?.earningPotential?.match(/\d+,?\d*/g)?.[0]?.replace(',', '') || '0');
          const bMin = parseInt(b?.earningPotential?.match(/\d+,?\d*/g)?.[0]?.replace(',', '') || '0');
          return aMin - bMin;
        });
        break;
      case 'rating':
        filtered?.sort((a, b) => b?.rating - a?.rating);
        break;
      default:
        break;
    }

    setFilteredOpportunities(filtered);
  }, [opportunities, filters, sortBy]);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleSaveOpportunity = (opportunityId) => {
    const newSaved = savedOpportunities?.includes(opportunityId)
      ? savedOpportunities?.filter(id => id !== opportunityId)
      : [...savedOpportunities, opportunityId];
    
    setSavedOpportunities(newSaved);
    localStorage.setItem('savedOpportunities', JSON.stringify(newSaved));
  };

  const handleShareOpportunity = (opportunity) => {
    if (navigator.share) {
      navigator.share({
        title: opportunity?.title,
        text: opportunity?.description,
        url: window.location?.href
      });
    } else {
      // Fallback to copying to clipboard
      navigator.clipboard?.writeText(`${opportunity?.title} - ${window.location?.href}`);
      // You could show a toast notification here
    }
  };

  const handleLearnMore = (opportunity) => {
    setSelectedOpportunity(opportunity);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedOpportunity(null);
  };

  const clearAllFilters = () => {
    setFilters({
      category: 'all',
      timeCommitment: 'all',
      earningPotential: 'all',
      difficulty: 'all',
      skills: 'all'
    });
  };

  const handleEnhanceProfile = () => {
    navigate('/dashboard');
  };

  const sortOptions = [
    { value: 'match-score', label: 'Best Match' },
    { value: 'earning-high', label: 'Highest Earning' },
    { value: 'earning-low', label: 'Lowest Earning' },
    { value: 'rating', label: 'Highest Rated' }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-primary/5 to-accent/5 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Discover Your Perfect Side Hustle
              </h1>
              <p className="text-lg text-muted-foreground">
                Find personalized income opportunities that match your skills and schedule
              </p>
            </div>
            
            <div className="hidden lg:flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Your Match Score</p>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-success to-accent rounded-full flex items-center justify-center">
                    <Icon name="TrendingUp" size={16} color="white" />
                  </div>
                  <span className="text-2xl font-bold text-success">87%</span>
                </div>
              </div>
              
              <Button
                variant="outline"
                onClick={() => navigate('/dashboard')}
                iconName="ArrowLeft"
                iconPosition="left"
              >
                Back to Dashboard
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Filter Controls */}
          <FilterControls
            filters={filters}
            onFiltersChange={handleFiltersChange}
            resultCount={filteredOpportunities?.length}
            isLoading={isLoading}
          />

          {/* Results Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h2 className="text-xl font-semibold text-foreground">
                {isLoading ? 'Loading opportunities...' : `${filteredOpportunities?.length} Opportunities Found`}
              </h2>
              
              {savedOpportunities?.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/dashboard')}
                  iconName="Heart"
                  iconPosition="left"
                  className="text-primary"
                >
                  {savedOpportunities?.length} Saved
                </Button>
              )}
            </div>
            
            {!isLoading && filteredOpportunities?.length > 0 && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e?.target?.value)}
                  className="px-3 py-1 bg-card border border-border rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {sortOptions?.map(option => (
                    <option key={option?.value} value={option?.value}>
                      {option?.label}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Opportunities Grid */}
          <OpportunityGrid
            opportunities={filteredOpportunities}
            isLoading={isLoading}
            savedOpportunities={savedOpportunities}
            onSave={handleSaveOpportunity}
            onShare={handleShareOpportunity}
            onLearnMore={handleLearnMore}
            filters={filters}
          />

          {/* Quick Actions */}
          {!isLoading && filteredOpportunities?.length > 0 && (
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <h3 className="text-lg font-semibold text-card-foreground mb-2">
                Ready to get started?
              </h3>
              <p className="text-muted-foreground mb-4">
                Get personalized coaching to help you succeed in your chosen side hustle
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  variant="default"
                  onClick={() => navigate('/ai-coaching-chat')}
                  iconName="MessageCircle"
                  iconPosition="left"
                >
                  Get AI Coaching
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate('/achievements')}
                  iconName="Trophy"
                  iconPosition="left"
                >
                  Track Progress
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Opportunity Modal */}
      <OpportunityModal
        opportunity={selectedOpportunity}
        isOpen={showModal}
        onClose={handleCloseModal}
        onSave={handleSaveOpportunity}
        onShare={handleShareOpportunity}
        isSaved={selectedOpportunity ? savedOpportunities?.includes(selectedOpportunity?.id) : false}
      />
      {/* Mobile Bottom Navigation Spacing */}
      <div className="h-20 md:h-0" />
    </div>
  );
};

export default SideHustleDiscovery;