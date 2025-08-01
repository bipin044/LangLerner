import { useState } from "react";
import { Link } from "react-router";
import { 
  BookOpenIcon, 
  TargetIcon, 
  TrendingUpIcon,
  CalendarIcon,
  AwardIcon,
  ClockIcon,
  CheckCircleIcon,
  PlayIcon,
  MicIcon,
  MessageSquareIcon,
  GlobeIcon,
  UsersIcon,
  StarIcon,
  TrophyIcon,
  BarChart3Icon
} from "lucide-react";

const PracticePage = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("spanish");

  // Mock data for learning progress
  const learningProgress = {
    currentStreak: 7,
    totalPracticeTime: 45,
    lessonsCompleted: 12,
    wordsLearned: 150,
    weeklyGoal: 5,
    weeklyProgress: 3,
    level: "Intermediate",
    nextMilestone: "Advanced"
  };

  const practiceActivities = [
    {
      id: 1,
      title: "Daily Conversation",
      description: "Practice speaking with native speakers",
      icon: MessageSquareIcon,
      color: "from-primary-500 to-primary-600",
      progress: 80,
      timeEstimate: "15 min",
      difficulty: "Intermediate",
      type: "speaking"
    },
    {
      id: 2,
      title: "Vocabulary Builder",
      description: "Learn new words and phrases",
      icon: BookOpenIcon,
      color: "from-secondary-500 to-secondary-600",
      progress: 65,
      timeEstimate: "10 min",
      difficulty: "Beginner",
      type: "vocabulary"
    },
    {
      id: 3,
      title: "Grammar Practice",
      description: "Improve your grammar skills",
      icon: TargetIcon,
      color: "from-accent-500 to-accent-600",
      progress: 45,
      timeEstimate: "20 min",
      difficulty: "Advanced",
      type: "grammar"
    },
    {
      id: 4,
      title: "Listening Comprehension",
      description: "Enhance your listening skills",
      icon: MicIcon,
      color: "from-neutral-500 to-neutral-600",
      progress: 90,
      timeEstimate: "12 min",
      difficulty: "Intermediate",
      type: "listening"
    },
    {
      id: 5,
      title: "Cultural Exchange",
      description: "Learn about different cultures",
      icon: GlobeIcon,
      color: "from-purple-500 to-purple-600",
      progress: 30,
      timeEstimate: "25 min",
      difficulty: "All Levels",
      type: "culture"
    },
    {
      id: 6,
      title: "Group Practice",
      description: "Practice with multiple partners",
      icon: UsersIcon,
      color: "from-orange-500 to-orange-600",
      progress: 55,
      timeEstimate: "30 min",
      difficulty: "Intermediate",
      type: "group"
    }
  ];

  const achievements = [
    {
      id: 1,
      title: "First Conversation",
      description: "Complete your first conversation",
      icon: MessageSquareIcon,
      earned: true,
      date: "2024-01-15"
    },
    {
      id: 2,
      title: "7-Day Streak",
      description: "Practice for 7 consecutive days",
      icon: TrendingUpIcon,
      earned: true,
      date: "2024-01-20"
    },
    {
      id: 3,
      title: "Vocabulary Master",
      description: "Learn 100 new words",
      icon: BookOpenIcon,
      earned: false,
      progress: 75
    },
    {
      id: 4,
      title: "Cultural Explorer",
      description: "Learn about 5 different cultures",
      icon: GlobeIcon,
      earned: false,
      progress: 40
    }
  ];

  const weeklyGoals = [
    { day: "Mon", target: 5, completed: 5, color: "bg-accent-500" },
    { day: "Tue", target: 5, completed: 3, color: "bg-accent-400" },
    { day: "Wed", target: 5, completed: 5, color: "bg-accent-500" },
    { day: "Thu", target: 5, completed: 4, color: "bg-accent-400" },
    { day: "Fri", target: 5, completed: 5, color: "bg-accent-500" },
    { day: "Sat", target: 5, completed: 2, color: "bg-accent-300" },
    { day: "Sun", target: 5, completed: 0, color: "bg-neutral-200" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-white">
      <div className="p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-3xl p-8 text-white">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <h1 className="text-3xl lg:text-4xl font-heading font-bold mb-2">
                  Practice & Learn
                </h1>
                <p className="text-lg text-white/90 font-body">
                  Track your progress and improve your language skills
                </p>
              </div>
              <div className="flex gap-4">
                <select 
                  className="bg-white/20 text-white border border-white/30 rounded-xl px-4 py-2 font-body"
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                >
                  <option value="spanish">Spanish</option>
                  <option value="french">French</option>
                  <option value="german">German</option>
                  <option value="italian">Italian</option>
                </select>
              </div>
            </div>
          </div>

          {/* Progress Overview */}
          <div className="grid lg:grid-cols-4 gap-6">
            <div className="card-lingualink p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                  <TrendingUpIcon className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-heading font-bold text-primary-600">
                  {learningProgress.currentStreak}
                </span>
              </div>
              <h3 className="font-heading font-semibold text-neutral-800 mb-1">Day Streak</h3>
              <p className="text-sm text-neutral-600 font-body">Keep it going!</p>
            </div>

            <div className="card-lingualink p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-xl flex items-center justify-center">
                  <ClockIcon className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-heading font-bold text-secondary-600">
                  {learningProgress.totalPracticeTime}m
                </span>
              </div>
              <h3 className="font-heading font-semibold text-neutral-800 mb-1">Practice Time</h3>
              <p className="text-sm text-neutral-600 font-body">This week</p>
            </div>

            <div className="card-lingualink p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-accent-500 to-accent-600 rounded-xl flex items-center justify-center">
                  <BookOpenIcon className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-heading font-bold text-accent-600">
                  {learningProgress.lessonsCompleted}
                </span>
              </div>
              <h3 className="font-heading font-semibold text-neutral-800 mb-1">Lessons Done</h3>
              <p className="text-sm text-neutral-600 font-body">Great progress!</p>
            </div>

            <div className="card-lingualink p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-neutral-500 to-neutral-600 rounded-xl flex items-center justify-center">
                  <AwardIcon className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-heading font-bold text-neutral-600">
                  {learningProgress.wordsLearned}
                </span>
              </div>
              <h3 className="font-heading font-semibold text-neutral-800 mb-1">Words Learned</h3>
              <p className="text-sm text-neutral-600 font-body">Vocabulary growth</p>
            </div>
          </div>

          {/* Weekly Goals */}
          <div className="card-lingualink p-6">
            <h2 className="text-xl font-heading font-bold text-neutral-800 mb-4">Weekly Goals</h2>
            <div className="grid grid-cols-7 gap-2">
              {weeklyGoals.map((goal, index) => (
                <div key={index} className="text-center">
                  <div className="text-sm font-medium text-neutral-600 mb-2">{goal.day}</div>
                  <div className="relative">
                    <div className={`w-8 h-8 rounded-full ${goal.color} mx-auto flex items-center justify-center`}>
                      <span className="text-xs font-bold text-white">{goal.completed}</span>
                    </div>
                    <div className="text-xs text-neutral-500 mt-1">/ {goal.target}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Practice Activities */}
          <div>
            <h2 className="text-2xl font-heading font-bold text-neutral-800 mb-6">Practice Activities</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {practiceActivities.map((activity) => {
                const Icon = activity.icon;
                return (
                  <div key={activity.id} className="card-lingualink hover:scale-105 transition-transform duration-200 group">
                    <div className="p-5 space-y-4">
                      <div className="flex items-start justify-between">
                        <div className={`w-12 h-12 bg-gradient-to-br ${activity.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-neutral-500 font-body">{activity.timeEstimate}</div>
                          <div className="text-xs text-neutral-400 font-body">{activity.difficulty}</div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-heading font-semibold text-neutral-800 mb-2">{activity.title}</h3>
                        <p className="text-sm text-neutral-600 font-body mb-3">{activity.description}</p>
                        
                        {/* Progress Bar */}
                        <div className="mb-3">
                          <div className="flex justify-between text-xs text-neutral-500 mb-1">
                            <span>Progress</span>
                            <span>{activity.progress}%</span>
                          </div>
                          <div className="w-full bg-neutral-200 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${activity.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>

                      <button className="w-full btn-lingualink font-accent text-sm py-2">
                        <PlayIcon className="size-4 mr-2" />
                        Start Practice
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Achievements */}
          <div>
            <h2 className="text-2xl font-heading font-bold text-neutral-800 mb-6">Achievements</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {achievements.map((achievement) => {
                const Icon = achievement.icon;
                return (
                  <div key={achievement.id} className="card-lingualink p-5 text-center">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                      achievement.earned 
                        ? 'bg-gradient-to-br from-accent-500 to-accent-600' 
                        : 'bg-neutral-100'
                    }`}>
                      <Icon className={`w-8 h-8 ${achievement.earned ? 'text-white' : 'text-neutral-400'}`} />
                    </div>
                    <h3 className="font-heading font-semibold text-neutral-800 mb-2">{achievement.title}</h3>
                    <p className="text-sm text-neutral-600 font-body mb-3">{achievement.description}</p>
                    
                    {achievement.earned ? (
                      <div className="flex items-center justify-center gap-2 text-accent-600">
                        <CheckCircleIcon className="size-4" />
                        <span className="text-sm font-medium">Earned</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2 text-neutral-500">
                        <div className="w-full bg-neutral-200 rounded-full h-2">
                          <div 
                            className="bg-accent-500 h-2 rounded-full"
                            style={{ width: `${achievement.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{achievement.progress}%</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Learning Stats */}
          <div className="card-lingualink p-6">
            <h2 className="text-xl font-heading font-bold text-neutral-800 mb-4">Learning Statistics</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-heading font-bold text-primary-600 mb-2">
                  {learningProgress.level}
                </div>
                <div className="text-sm text-neutral-600 font-body">Current Level</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-heading font-bold text-secondary-600 mb-2">
                  {learningProgress.nextMilestone}
                </div>
                <div className="text-sm text-neutral-600 font-body">Next Milestone</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-heading font-bold text-accent-600 mb-2">
                  {Math.round((learningProgress.weeklyProgress / learningProgress.weeklyGoal) * 100)}%
                </div>
                <div className="text-sm text-neutral-600 font-body">Weekly Goal Progress</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PracticePage; 