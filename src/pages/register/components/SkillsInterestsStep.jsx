import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const SkillsInterestsStep = ({ formData, onUpdate, errors }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const skillCategories = [
    {
      name: 'Technology',
      icon: 'Code',
      color: 'from-primary to-secondary',
      skills: ['Web Development', 'Mobile Apps', 'Data Analysis', 'AI/ML', 'Cybersecurity', 'Cloud Computing', 'DevOps', 'UI/UX Design']
    },
    {
      name: 'Creative',
      icon: 'Palette',
      color: 'from-accent to-success',
      skills: ['Graphic Design', 'Video Editing', 'Photography', 'Writing', 'Music Production', 'Animation', 'Illustration', 'Content Creation']
    },
    {
      name: 'Business',
      icon: 'Briefcase',
      color: 'from-warning to-primary',
      skills: ['Marketing', 'Sales', 'Project Management', 'Consulting', 'Finance', 'Operations', 'Strategy', 'Leadership']
    },
    {
      name: 'Education',
      icon: 'GraduationCap',
      color: 'from-secondary to-accent',
      skills: ['Teaching', 'Tutoring', 'Course Creation', 'Training', 'Mentoring', 'Research', 'Academic Writing', 'Curriculum Design']
    }
  ];

  const interests = [
    'Entrepreneurship', 'Freelancing', 'E-commerce', 'Digital Marketing', 'Content Creation',
    'Online Teaching', 'Consulting', 'App Development', 'Blogging', 'Social Media',
    'Photography', 'Video Production', 'Graphic Design', 'Web Design', 'Writing',
    'Translation', 'Virtual Assistant', 'Data Entry', 'Customer Service', 'Sales'
  ];

  const selectedSkills = formData?.skills || [];
  const selectedInterests = formData?.interests || [];

  const toggleSkill = (skill) => {
    const updatedSkills = selectedSkills?.includes(skill)
      ? selectedSkills?.filter(s => s !== skill)
      : [...selectedSkills, skill];
    onUpdate({ skills: updatedSkills });
  };

  const toggleInterest = (interest) => {
    const updatedInterests = selectedInterests?.includes(interest)
      ? selectedInterests?.filter(i => i !== interest)
      : [...selectedInterests, interest];
    onUpdate({ interests: updatedInterests });
  };

  const filteredInterests = interests?.filter(interest =>
    interest?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
          className="w-16 h-16 bg-gradient-to-br from-accent to-success rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <Icon name="Star" size={32} color="white" strokeWidth={2} />
        </motion.div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Skills & Interests</h2>
        <p className="text-muted-foreground">Help us personalize your experience</p>
      </div>
      {/* Skills Section */}
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center space-x-2">
            <Icon name="Zap" size={20} className="text-primary" />
            <span>Your Skills</span>
            <span className="text-sm text-muted-foreground font-normal">
              ({selectedSkills?.length} selected)
            </span>
          </h3>
          
          <div className="space-y-6">
            {skillCategories?.map((category, categoryIndex) => (
              <motion.div
                key={category?.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: categoryIndex * 0.1 }}
                className="space-y-3"
              >
                <div className="flex items-center space-x-2">
                  <div className={`w-8 h-8 bg-gradient-to-br ${category?.color} rounded-lg flex items-center justify-center`}>
                    <Icon name={category?.icon} size={16} color="white" />
                  </div>
                  <h4 className="font-medium text-foreground">{category?.name}</h4>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {category?.skills?.map((skill) => {
                    const isSelected = selectedSkills?.includes(skill);
                    return (
                      <motion.button
                        key={skill}
                        onClick={() => toggleSkill(skill)}
                        className={`p-3 rounded-lg border-2 text-sm font-medium transition-all duration-200 hover-lift ${
                          isSelected
                            ? 'border-primary bg-primary text-primary-foreground shadow-elevation-2'
                            : 'border-border bg-background text-foreground hover:border-primary/50 hover:bg-muted'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center justify-between">
                          <span className="truncate">{skill}</span>
                          {isSelected && (
                            <Icon name="Check" size={14} strokeWidth={2.5} />
                          )}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {errors?.skills && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-error text-sm flex items-center space-x-2"
          >
            <Icon name="AlertCircle" size={16} />
            <span>{errors?.skills}</span>
          </motion.div>
        )}
      </div>
      {/* Interests Section */}
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center space-x-2">
            <Icon name="Heart" size={20} className="text-accent" />
            <span>Your Interests</span>
            <span className="text-sm text-muted-foreground font-normal">
              ({selectedInterests?.length} selected)
            </span>
          </h3>

          {/* Search Bar */}
          <div className="relative mb-4">
            <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search interests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e?.target?.value)}
              className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            <AnimatePresence>
              {filteredInterests?.map((interest, index) => {
                const isSelected = selectedInterests?.includes(interest);
                return (
                  <motion.button
                    key={interest}
                    onClick={() => toggleInterest(interest)}
                    className={`p-3 rounded-lg border-2 text-sm font-medium transition-all duration-200 hover-lift ${
                      isSelected
                        ? 'border-accent bg-accent text-accent-foreground shadow-elevation-2'
                        : 'border-border bg-background text-foreground hover:border-accent/50 hover:bg-muted'
                    }`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="truncate">{interest}</span>
                      {isSelected && (
                        <Icon name="Check" size={14} strokeWidth={2.5} />
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {errors?.interests && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-error text-sm flex items-center space-x-2"
          >
            <Icon name="AlertCircle" size={16} />
            <span>{errors?.interests}</span>
          </motion.div>
        )}
      </div>
      {/* Selection Summary */}
      {(selectedSkills?.length > 0 || selectedInterests?.length > 0) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-muted rounded-lg p-4 space-y-3"
        >
          <h4 className="font-medium text-foreground flex items-center space-x-2">
            <Icon name="CheckCircle" size={16} className="text-success" />
            <span>Your Selection Summary</span>
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Skills: </span>
              <span className="font-medium text-foreground">{selectedSkills?.length} selected</span>
            </div>
            <div>
              <span className="text-muted-foreground">Interests: </span>
              <span className="font-medium text-foreground">{selectedInterests?.length} selected</span>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default SkillsInterestsStep;