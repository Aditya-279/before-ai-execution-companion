import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { Landing } from '@/pages/Landing';
import { Onboarding } from '@/pages/Onboarding';
import { Today } from '@/pages/Today';
import { Capture } from '@/pages/Capture';
import { TaskDetails } from '@/pages/TaskDetails';
import { Settings } from '@/pages/Settings';

interface UserPreferences {
  productiveTime: 'morning' | 'afternoon' | 'evening' | 'night' | null;
  focusArea: 'college' | 'work' | 'personal' | 'mixed' | null;
  struggleWith: 'starting' | 'planning' | 'consistency' | 'finishing' | null;
  onboardingComplete: boolean;
}

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  estimatedTime?: string;
  dueDate?: Date;
  category: 'college' | 'work' | 'personal' | 'mixed';
  priority?: 'high' | 'medium' | 'low';
  suggestedTime?: string;
  aiSuggestion?: string;
  reason?: string;
  createdAt: Date;
}

interface AppState {
  tasks: Task[];
  preferences: UserPreferences;
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleTask: (id: string) => void;
  setPreferences: (prefs: Partial<UserPreferences>) => void;
  completeOnboarding: () => void;
}

const initialPreferences: UserPreferences = {
  productiveTime: null,
  focusArea: null,
  struggleWith: null,
  onboardingComplete: false,
};

const AppContext = createContext<AppState | null>(null);

const STORAGE_KEY = 'before_app_state';

function AppProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [preferences, setPreferencesState] = useState<UserPreferences>(initialPreferences);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.tasks) {
          setTasks(parsed.tasks.map((t: Task) => ({
            ...t,
            createdAt: new Date(t.createdAt),
            dueDate: t.dueDate ? new Date(t.dueDate) : undefined,
          })));
        }
        if (parsed.preferences) {
          setPreferencesState(parsed.preferences);
        }
      } catch {
        // ignore
      }
    }
  }, []);

  useEffect(() => {
    const state = { tasks, preferences };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [tasks, preferences]);

  const addTask = (task: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...task,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, ...updates } : task))
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const setPreferences = (prefs: Partial<UserPreferences>) => {
    setPreferencesState((prev) => ({ ...prev, ...prefs }));
  };

  const completeOnboarding = () => {
    setPreferencesState((prev) => ({ ...prev, onboardingComplete: true }));
  };

  return (
    <AppContext.Provider
      value={{
        tasks,
        preferences,
        addTask,
        updateTask,
        deleteTask,
        toggleTask,
        setPreferences,
        completeOnboarding,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}

type Page = 'landing' | 'onboarding' | 'today' | 'capture' | 'task' | 'settings';

export default function App() {
  const [page, setPage] = useState<Page>('landing');
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  const navigate = (newPage: string) => {
    if (newPage.startsWith('/task/')) {
      const id = newPage.replace('/task/', '');
      setSelectedTaskId(id);
      setPage('task');
    } else if (newPage === '/') {
      setPage('landing');
    } else if (newPage === '/onboarding') {
      setPage('onboarding');
    } else if (newPage === '/today') {
      setPage('today');
    } else if (newPage === '/capture') {
      setPage('capture');
    } else if (newPage === '/settings') {
      setPage('settings');
    }
  };

  return (
    <AppProvider>
      <AppContent page={page} navigate={navigate} selectedTaskId={selectedTaskId} />
    </AppProvider>
  );
}

function AppContent({
  page,
  navigate,
  selectedTaskId
}: {
  page: Page;
  navigate: (path: string) => void;
  selectedTaskId: string | null;
}) {
  const { preferences } = useApp();

  switch (page) {
    case 'landing':
      return <Landing navigate={navigate} />;
    case 'onboarding':
      return <Onboarding navigate={navigate} />;
    case 'today':
      return <Today navigate={navigate} />;
    case 'capture':
      return <Capture navigate={navigate} />;
    case 'task':
      return selectedTaskId ? <TaskDetails taskId={selectedTaskId} navigate={navigate} /> : <Today navigate={navigate} />;
    case 'settings':
      return <Settings navigate={navigate} />;
    default:
      return <Landing navigate={navigate} />;
  }
}
