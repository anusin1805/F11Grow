import React, { useState, useEffect } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  ChevronRight, 
  ArrowLeft, 
  Settings, 
  Camera, 
  Mic, 
  PiggyBank, 
  BarChart3, 
  Wallet, 
  MessageSquare, 
  User, 
  Globe,
  Bell,
  CheckCircle2,
  AlertCircle,
  Phone,
  Mail,
  Send
} from 'lucide-react';

// --- COLOR PALETTE ---
const COLORS = {
  bg: '#050505',
  card: '#121212',
  cardBorder: '#2A2A2A',
  primary: '#FFFFFF',
  secondary: '#A0A0A0',
  accent: '#5E5CE6',
  danger: '#FF453A',
  success: '#32D74B',
  warning: '#FFD60A',
  inputBg: '#1C1C1E',
};

// --- MAIN APP COMPONENT ---
export default function App() {
  const [currentScreen, setCurrentScreen] = useState('Menu');
  
  const navigateTo = (screen) => setCurrentScreen(screen);
  const goBack = () => setCurrentScreen('Menu');

  const renderScreen = () => {
    switch (currentScreen) {
      case 'Menu':
        return <MenuScreen navigate={navigateTo} />;
      case 'NewFlexibleExpense':
        return <NewFlexibleExpenseScreen onBack={goBack} />;
      case 'WeeklyVariables':
        return <WeeklyVariablesScreen onBack={goBack} />;  
      case 'AnnualOverview':
        return <AnnualOverviewScreen onBack={goBack} />;
      case 'BudgetHub':
        return <BudgetHubScreen onBack={goBack} />;
      case 'FullScopeAnalysis':
        return <FullScopeAnalysisScreen onBack={goBack} />;
      case 'TalkToUs':
        return <TalkToUsScreen onBack={goBack} />;
      case 'Dashboard':
        return <DashboardScreen onBack={goBack} />;
      default:
        return <MenuScreen navigate={navigateTo} />;
    }
  };

  return (
    <div style={{ 
      backgroundColor: COLORS.bg, 
      minHeight: '100vh',
      color: COLORS.primary,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {renderScreen()}
    </div>
  );
}

// --- SCREEN 1: MENU ---
const MenuScreen = ({ navigate }) => {
  const [expandedSection, setExpandedSection] = useState('Variable Expenses');

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div style={{ minHeight: '100vh', paddingBottom: '100px' }}>
      {/* Header */}
      <div style={{
        padding: '40px 20px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: `1px solid #222`
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <PiggyBank size={20} color={COLORS.primary} />
          <span style={{ fontSize: '18px', fontWeight: 'bold', letterSpacing: '1px' }}>FINWISE</span>
        </div>
        <button style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
          <Settings size={24} color={COLORS.secondary} />
        </button>
      </div>

      <div style={{ padding: '20px' }}>
        {/* Dashboard */}
        <MenuItem 
          icon={<BarChart3 size={22} color={COLORS.secondary} />}
          label="Dashboard" 
          onPress={() => navigate('Dashboard')} 
        />

        {/* Variable Expenses */}
        <Accordion 
          title="Variable Expenses" 
          isOpen={expandedSection === 'Variable Expenses'}
          onToggle={() => toggleSection('Variable Expenses')}
        >
          <SubMenuItem 
            label="New Flexible Expense" 
            highlight 
            onPress={() => navigate('NewFlexibleExpense')} 
          />
          <SubMenuItem label="Weekly Variables (Editable)" onPress={() => navigate('WeeklyVariables')} />
        </Accordion>

        {/* Annual Overview */}
        <MenuItem 
          icon={<BarChart3 size={22} color={COLORS.secondary} />}
          label="Annual Overview (Aggregated)" 
          onPress={() => navigate('AnnualOverview')} 
        />

        {/* Full Scope Analysis (Subscriptions) */}
        <MenuItem 
          icon={<AlertCircle size={22} color={COLORS.secondary} />}
          label="Full-Scope Analysis (Subs)" 
          onPress={() => navigate('FullScopeAnalysis')} 
        />

        {/* Budget Hub */}
        <MenuItem 
          icon={<Wallet size={22} color={COLORS.secondary} />} 
          label="Budget Hub" 
          onPress={() => navigate('BudgetHub')} 
        />
        
        {/* Talk to Us */}
        <MenuItem 
          icon={<MessageSquare size={22} color={COLORS.secondary} />} 
          label="Talk to Us" 
          onPress={() => navigate('TalkToUs')} 
        />
        
        <div style={{ height: '1px', backgroundColor: '#222', margin: '20px 0' }} />

        <MenuItem icon={<User size={22} color={COLORS.secondary} />} label="Profile" />
        <MenuItem icon={<Globe size={22} color={COLORS.secondary} />} label="Language: English" />
      </div>

      {/* Footer Record Button */}
      <div style={{
        position: 'fixed',
        bottom: '30px',
        right: '20px'
      }}>
        <button style={{
          backgroundColor: COLORS.danger,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '12px 20px',
          borderRadius: '30px',
          border: 'none',
          color: '#fff',
          fontWeight: 'bold',
          cursor: 'pointer',
          boxShadow: `0 4px 20px ${COLORS.danger}66`
        }}>
          <Mic size={22} />
          <span>Record</span>
        </button>
      </div>
    </div>
  );
};

// --- SCREEN 2: DASHBOARD (UPDATED) ---
const DashboardScreen = ({ onBack }) => {
  const [financials, setFinancials] = useState({ fixed: 0, variable: 0, subs: 0 });

  useEffect(() => {
    // 1. Calculate Variable (from saved expenses)
    const expenses = JSON.parse(localStorage.getItem('myExpenses') || '[]');
    const varTotal = expenses.reduce((acc, curr) => acc + curr.amount, 0);

    // 2. Calculate Subs (Static mock for now + saved)
    // In a real app, this would come from the subs screen storage
    const subsTotal = 12.99 + 9.99 + 45.00; // Netflix, Spotify, Gym

    // 3. Calculate Fixed (Static mock for Rent/Loans)
    const fixedTotal = 1200.00; // Placeholder for Rent/Car

    setFinancials({ fixed: fixedTotal, variable: varTotal, subs: subsTotal });
  }, []);

  const total = financials.fixed + financials.variable + financials.subs;

  return (
    <div style={{ minHeight: '100vh' }}>
      <ScreenHeader title="Dashboard" onBack={onBack} />
      
      <div style={{ padding: '20px' }}>
        
        {/* Summary Cards */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <SummaryCard title="Fixed" amount={financials.fixed} color={COLORS.secondary} />
          <SummaryCard title="Variable" amount={financials.variable} color={COLORS.accent} />
          <SummaryCard title="Subs" amount={financials.subs} color={COLORS.warning} />
        </div>

        {/* Big Total */}
        <div style={{ 
          backgroundColor: COLORS.card, 
          padding: '20px', 
          borderRadius: '16px', 
          textAlign: 'center',
          marginBottom: '25px',
          border: `1px solid ${COLORS.cardBorder}`
        }}>
          <p style={{ color: COLORS.secondary, margin: 0, fontSize: '14px' }}>Total Monthly Outflow</p>
          <h1 style={{ margin: '10px 0', fontSize: '36px' }}>€ {total.toFixed(2)}</h1>
        </div>

        {/* Month over Month Graph */}
        <h3 style={{ fontSize: '18px', marginBottom: '15px' }}>Monthly Trend</h3>
        <div style={{
          padding: '20px',
          backgroundColor: COLORS.card,
          borderRadius: '16px',
          marginBottom: '25px'
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', height: '120px', gap: '8px', justifyContent: 'space-between' }}>
            {[40, 65, 30, 85, 50, 70].map((h, i) => (
              <div key={i} style={{ 
                width: '12%', 
                height: `${h}%`, 
                backgroundColor: i === 5 ? COLORS.success : COLORS.accent, 
                borderRadius: '4px',
                opacity: i === 5 ? 1 : 0.5
              }} />
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', color: COLORS.secondary, fontSize: '12px' }}>
            <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
          </div>
        </div>

        {/* Category Breakdown */}
        <h3 style={{ fontSize: '18px', marginBottom: '15px' }}>Category Breakdown</h3>
        <div style={{ backgroundColor: COLORS.card, borderRadius: '16px', padding: '20px' }}>
          {[
            { name: 'Fixed Expenses', val: financials.fixed, color: '#444' },
            { name: 'Variable', val: financials.variable, color: COLORS.accent },
            { name: 'Subscriptions', val: financials.subs, color: COLORS.warning }
          ].map((cat, i) => (
            <div key={i} style={{ marginBottom: '15px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', fontSize: '14px' }}>
                <span>{cat.name}</span>
                <span>€{cat.val.toFixed(2)}</span>
              </div>
              <div style={{ width: '100%', height: '8px', backgroundColor: '#222', borderRadius: '4px' }}>
                <div style={{ 
                  width: `${Math.min((cat.val / total) * 100, 100)}%`, 
                  height: '100%', 
                  backgroundColor: cat.color, 
                  borderRadius: '4px' 
                }} />
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

// --- SCREEN 3: TALK TO US (NEW!) ---
const TalkToUsScreen = ({ onBack }) => {
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');

  const handleSend = () => {
    if (!email || !comment) {
      alert("Please fill in both fields.");
      return;
    }
    alert("Message sent! We will contact you shortly.");
    onBack();
  };

  return (
    <div style={{ minHeight: '100vh' }}>
      <ScreenHeader title="Talk to Us" onBack={onBack} />
      
      <div style={{ padding: '20px' }}>
        
        {/* Helpline Card */}
        <div style={{ 
          backgroundColor: COLORS.card, 
          padding: '25px', 
          borderRadius: '16px', 
          textAlign: 'center',
          marginBottom: '30px',
          border: `1px solid ${COLORS.accent}`
        }}>
          <Phone size={32} color={COLORS.accent} style={{ marginBottom: '10px' }} />
          <h3 style={{ margin: '0 0 5px 0' }}>Helpline</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold', margin: 0, color: COLORS.primary }}>
            1800 1800 000
          </p>
          <p style={{ color: COLORS.secondary, fontSize: '12px', marginTop: '5px' }}>Available 24/7</p>
        </div>

        {/* Contact Form */}
        <h3 style={{ fontSize: '18px', marginBottom: '15px' }}>Send us a message</h3>
        
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', color: COLORS.secondary, marginBottom: '8px', fontSize: '14px' }}>Your Email</label>
          <div style={{ position: 'relative' }}>
            <Mail size={18} color={COLORS.secondary} style={{ position: 'absolute', left: '15px', top: '15px' }} />
            <input 
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ ...styles.input, paddingLeft: '45px' }}
            />
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', color: COLORS.secondary, marginBottom: '8px', fontSize: '14px' }}>How can we help?</label>
          <textarea 
            rows="5"
            placeholder="Type your question or feedback here..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            style={{ 
              ...styles.input, 
              height: 'auto', 
              fontFamily: 'inherit' 
            }}
          />
        </div>

        <button onClick={handleSend} style={{ ...styles.button, display: 'flex', justifyContent: 'center', gap: '10px' }}>
          <Send size={20} />
          <span>Send Message</span>
        </button>

      </div>
    </div>
  );
};

// --- SCREEN 4: BUDGET HUB ---
const BudgetHubScreen = ({ onBack }) => {
  const [budgets, setBudgets] = useState(() => {
    const saved = localStorage.getItem('myBudgets');
    return saved ? JSON.parse(saved) : [
      { id: 1, category: 'Food', limit: 300, spent: 150 },
      { id: 2, category: 'Transport', limit: 100, spent: 80 },
    ];
  });

  const [newCategory, setNewCategory] = useState('');
  const [newLimit, setNewLimit] = useState('');
  const [newSpent, setNewSpent] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleAddBudget = () => {
    if(!newCategory || !newLimit) return;
    const newBudget = {
      id: Date.now(),
      category: newCategory,
      limit: parseFloat(newLimit),
      spent: parseFloat(newSpent) || 0
    };
    const updated = [...budgets, newBudget];
    setBudgets(updated);
    localStorage.setItem('myBudgets', JSON.stringify(updated));
    setIsAdding(false);
    setNewCategory(''); setNewLimit(''); setNewSpent('');
  };

  return (
    <div style={{ minHeight: '100vh' }}>
      <ScreenHeader title="Budget Hub" onBack={onBack} />
      <div style={{ padding: '20px' }}>
        
        {budgets.map(b => {
          const percent = Math.min((b.spent / b.limit) * 100, 100);
          const isOver = b.spent > b.limit;
          
          return (
            <div key={b.id} style={{ backgroundColor: COLORS.card, padding: '15px', borderRadius: '12px', marginBottom: '15px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ fontWeight: 'bold' }}>{b.category}</span>
                <span style={{ color: isOver ? COLORS.danger : COLORS.success }}>{b.spent} / {b.limit} €</span>
              </div>
              <div style={{ width: '100%', height: '8px', backgroundColor: '#333', borderRadius: '4px' }}>
                <div style={{ width: `${percent}%`, height: '100%', backgroundColor: isOver ? COLORS.danger : COLORS.accent, borderRadius: '4px' }} />
              </div>
            </div>
          );
        })}

        {isAdding ? (
          <div style={{ backgroundColor: COLORS.card, padding: '20px', borderRadius: '12px', marginTop: '20px', border: `1px solid ${COLORS.accent}` }}>
            <h4 style={{ marginTop: 0 }}>New Budget Goal</h4>
            <input placeholder="Category" value={newCategory} onChange={e => setNewCategory(e.target.value)} style={styles.input} />
            <input placeholder="Limit (€)" type="number" value={newLimit} onChange={e => setNewLimit(e.target.value)} style={styles.input} />
            <input placeholder="Spent (€)" type="number" value={newSpent} onChange={e => setNewSpent(e.target.value)} style={styles.input} />
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={handleAddBudget} style={{ ...styles.button, backgroundColor: COLORS.success }}>Save</button>
              <button onClick={() => setIsAdding(false)} style={{ ...styles.button, backgroundColor: COLORS.danger }}>Cancel</button>
            </div>
          </div>
        ) : (
          <button onClick={() => setIsAdding(true)} style={{ ...styles.button, marginTop: '20px' }}>+ Create New Budget</button>
        )}
      </div>
    </div>
  );
};

// --- SCREEN 5: FULL SCOPE ANALYSIS ---
const FullScopeAnalysisScreen = ({ onBack }) => {
  const [subs, setSubs] = useState([
    { id: 1, name: 'Netflix', cost: 12.99, date: '15th', reminder: true },
    { id: 2, name: 'Spotify', cost: 9.99, date: '28th', reminder: false },
    { id: 3, name: 'Gym', cost: 45.00, date: '1st', reminder: true },
  ]);

  const toggleReminder = (id) => {
    setSubs(subs.map(s => s.id === id ? { ...s, reminder: !s.reminder } : s));
  };

  return (
    <div style={{ minHeight: '100vh' }}>
      <ScreenHeader title="Recurring Subscriptions" onBack={onBack} />
      <div style={{ padding: '20px' }}>
        <p style={{ color: COLORS.secondary, fontSize: '14px', marginBottom: '20px' }}>Manage recurring payments.</p>
        {subs.map(sub => (
          <div key={sub.id} style={{ backgroundColor: COLORS.card, padding: '15px', borderRadius: '12px', marginBottom: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: 'bold' }}>{sub.name}</div>
              <div style={{ color: COLORS.secondary, fontSize: '13px' }}>Due: {sub.date} • €{sub.cost}</div>
            </div>
            <button onClick={() => toggleReminder(sub.id)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer' }}>
              <Bell size={20} fill={sub.reminder ? COLORS.warning : 'none'} color={sub.reminder ? COLORS.warning : COLORS.secondary} />
              <span style={{ fontSize: '10px', color: sub.reminder ? COLORS.warning : COLORS.secondary, marginTop: '4px' }}>{sub.reminder ? 'On' : 'Off'}</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- SCREEN 6: ANNUAL OVERVIEW ---
const AnnualOverviewScreen = ({ onBack }) => {
  const [totalSpent, setTotalSpent] = useState(0);
  useEffect(() => {
    const savedExpenses = JSON.parse(localStorage.getItem('myExpenses') || '[]');
    const sum = savedExpenses.reduce((acc, current) => acc + current.amount, 0);
    setTotalSpent(sum);
  }, []);

  const categories = [
    { name: 'Food', amount: 450, color: COLORS.accent },
    { name: 'Transport', amount: 120, color: COLORS.success },
    { name: 'Bills', amount: 300, color: COLORS.warning },
    { name: 'Other', amount: 80, color: COLORS.secondary },
  ];
  const maxCat = Math.max(...categories.map(c => c.amount));

  return (
    <div style={{ minHeight: '100vh' }}>
      <ScreenHeader title="Annual Overview" onBack={onBack} />
      <div style={{ padding: '20px' }}>
        <div style={{ padding: '20px', backgroundColor: COLORS.card, borderRadius: '16px', marginBottom: '20px' }}>
          <h3 style={{ color: COLORS.primary, fontSize: '16px', margin: '0 0 10px 0' }}>Spending Trend (6 Mo)</h3>
          <div style={{ display: 'flex', alignItems: 'flex-end', height: '150px', gap: '8px', justifyContent: 'space-between' }}>
            {[40, 65, 30, 85, 50, 70].map((h, i) => (
              <div key={i} style={{ width: '30px', height: `${h}%`, backgroundColor: COLORS.accent, borderRadius: '4px' }} />
            ))}
          </div>
        </div>
        <h3 style={{ fontSize: '18px', marginBottom: '15px' }}>Category Breakdown</h3>
        <div style={{ backgroundColor: COLORS.card, borderRadius: '16px', padding: '20px' }}>
          {categories.map((cat, i) => (
            <div key={i} style={{ marginBottom: '15px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', fontSize: '14px' }}>
                <span>{cat.name}</span><span>€{cat.amount}</span>
              </div>
              <div style={{ width: '100%', height: '8px', backgroundColor: '#333', borderRadius: '4px' }}>
                <div style={{ width: `${(cat.amount / maxCat) * 100}%`, height: '100%', backgroundColor: cat.color, borderRadius: '4px' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- SCREEN 7: WEEKLY VARIABLES ---
const WeeklyVariablesScreen = ({ onBack }) => {
  const [variables, setVariables] = useState(() => {
    const saved = localStorage.getItem('weeklyVariables');
    return saved ? JSON.parse(saved) : [
      { id: 1, label: 'Groceries', amount: '150.00' },
      { id: 2, label: 'Transport', amount: '50.00' },
      { id: 3, label: 'Entertainment', amount: '100.00' },
    ];
  });
  const handleChange = (id, text) => {
    setVariables(variables.map(item => item.id === id ? { ...item, amount: text } : item));
  };
  const handleSave = () => {
    localStorage.setItem('weeklyVariables', JSON.stringify(variables));
    alert("Weekly budget updated successfully!");
    onBack();
  };
  return (
    <div style={{ minHeight: '100vh' }}>
      <ScreenHeader title="Weekly Variables" onBack={onBack} />
      <div style={{ padding: '20px' }}>
        {variables.map((item) => (
          <div key={item.id} style={{ marginBottom: '20px' }}>
            <label style={{ color: COLORS.secondary, marginBottom: '8px', display: 'block' }}>{item.label} (€)</label>
            <input type="number" value={item.amount} onChange={(e) => handleChange(item.id, e.target.value)} style={styles.input} />
          </div>
        ))}
        <button onClick={handleSave} style={styles.button}>Save Changes</button>
      </div>
    </div>
  );
};

// --- SCREEN 8: NEW EXPENSE ---
const NewFlexibleExpenseScreen = ({ onBack }) => {
  const [category, setCategory] = useState('Food');
  const [expenseName, setExpenseName] = useState('');
  const [amount, setAmount] = useState('');
  const handleSave = () => {
    if (!expenseName || !amount) { alert("Please enter a name and amount!"); return; }
    const newExpense = {
      id: Date.now(),
      name: expenseName,
      amount: parseFloat(amount),
      category: category,
      date: new Date().toLocaleDateString()
    };
    const existing = JSON.parse(localStorage.getItem('myExpenses') || '[]');
    localStorage.setItem('myExpenses', JSON.stringify([...existing, newExpense]));
    alert(`Saved: ${expenseName} for €${amount}`);
    onBack();
  };
  return (
    <div style={{ minHeight: '100vh' }}>
      <ScreenHeader title="New Expense" onBack={onBack} />
      <div style={{ padding: '20px' }}>
        <div style={{ height: '150px', border: '1px dashed #333', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', backgroundColor: COLORS.inputBg }}>
          <Camera size={40} color={COLORS.secondary} />
          <span style={{ color: COLORS.secondary, marginTop: '10px' }}>Scan Bill</span>
        </div>
        <input placeholder="Expense Name" value={expenseName} onChange={e => setExpenseName(e.target.value)} style={styles.input} />
        <input placeholder="Amount (€)" type="number" value={amount} onChange={e => setAmount(e.target.value)} style={styles.input} />
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          {['Food', 'Transport', 'Leisure', 'Shop'].map(cat => (
            <button key={cat} onClick={() => setCategory(cat)} style={{ ...styles.chip, backgroundColor: category === cat ? COLORS.accent : 'transparent', border: `1px solid ${category === cat ? COLORS.accent : '#444'}` }}>{cat}</button>
          ))}
        </div>
        <button onClick={handleSave} style={styles.button}>Save Expense</button>
      </div>
    </div>
  );
};

// --- HELPERS & STYLES ---
const SummaryCard = ({ title, amount, color }) => (
  <div style={{ flex: 1, backgroundColor: COLORS.card, padding: '15px', borderRadius: '12px', textAlign: 'center' }}>
    <p style={{ color: COLORS.secondary, fontSize: '12px', margin: '0 0 5px 0' }}>{title}</p>
    <p style={{ color: color, fontSize: '18px', fontWeight: 'bold', margin: 0 }}>€{amount.toFixed(0)}</p>
  </div>
);

const ScreenHeader = ({ title, onBack }) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '50px 20px 20px', backgroundColor: COLORS.card }}>
    <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><ArrowLeft size={24} color={COLORS.primary} /></button>
    <span style={{ fontSize: '18px', fontWeight: '600' }}>{title}</span>
    <div style={{ width: '24px' }} />
  </div>
);

const MenuItem = ({ icon, label, onPress }) => (
  <button onClick={onPress} style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '25px', background: 'none', border: 'none', cursor: 'pointer', width: '100%' }}>
    {icon} <span style={{ color: COLORS.secondary, fontSize: '16px' }}>{label}</span>
  </button>
);

const Accordion = ({ title, isOpen, onToggle, children }) => (
  <div style={{ marginBottom: '15px' }}>
    <button onClick={onToggle} style={{ display: 'flex', justifyContent: 'space-between', width: '100%', background: 'none', border: 'none', cursor: 'pointer', marginBottom: '15px' }}>
      <span style={{ color: isOpen ? COLORS.primary : COLORS.secondary, fontSize: '16px' }}>{title}</span>
      {isOpen ? <ChevronUp size={24} color={COLORS.secondary} /> : <ChevronDown size={24} color={COLORS.secondary} />}
    </button>
    {isOpen && <div style={{ backgroundColor: COLORS.card, borderRadius: '12px', padding: '10px', borderLeft: `2px solid ${COLORS.cardBorder}` }}>{children}</div>}
  </div>
);

const SubMenuItem = ({ label, highlight, onPress }) => (
  <button onClick={onPress} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 10px', background: 'none', border: 'none', cursor: 'pointer', width: '100%' }}>
    <span style={{ color: highlight ? COLORS.primary : COLORS.secondary, fontWeight: highlight ? '600' : 'normal' }}>{label}</span>
    {highlight && <ChevronRight size={16} color={COLORS.secondary} />}
  </button>
);

const styles = {
  input: {
    backgroundColor: COLORS.inputBg,
    color: COLORS.primary,
    padding: '15px',
    borderRadius: '8px',
    marginBottom: '15px',
    border: '1px solid #333',
    width: '100%',
    fontSize: '16px',
    outline: 'none',
    boxSizing: 'border-box'
  },
  button: {
    backgroundColor: COLORS.accent,
    padding: '15px',
    borderRadius: '10px',
    border: 'none',
    width: '100%',
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: '16px',
    cursor: 'pointer'
  },
  chip: {
    padding: '8px 16px',
    borderRadius: '20px',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '12px'
  }
};
