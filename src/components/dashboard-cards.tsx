import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Target, TrendingUp, Users, type LucideIcon } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { useLeads } from '@/contexts/LeadsContext';

interface StatCard {
  title: string;
  value: string | number;
  description: string;
  icon: LucideIcon;
  iconColor: string;
}

interface StatCardComponentProps {
  card: StatCard;
  delay: number;
}

function StatCardComponent({ card, delay }: StatCardComponentProps) {
  const IconComponent = card.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
          <IconComponent className={`h-4 w-4 ${card.iconColor}`} />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{card.value}</div>
          <p className="text-xs text-muted-foreground">
            {card.description}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function DashboardCards() {
    const { stats } = useLeads();
    
    const statCards: StatCard[] = [
      {
        title: 'Total Leads',
        value: stats.totalLeads,
        description: `${stats.qualifiedLeads} qualified`,
        icon: Users,
        iconColor: 'text-primary'
      },
      {
        title: 'Opportunities',
        value: stats.totalOpportunities,
        description: `${formatCurrency(stats.totalOpportunityValue)} in pipeline`,
        icon: Target,
        iconColor: 'text-success'
      },
      {
        title: 'Conversion Rate',
        value: `${stats.conversionRate}%`,
        description: 'Leads to qualified',
        icon: TrendingUp,
        iconColor: 'text-warning'
      },
      {
        title: 'Average Score',
        value: stats.averageLeadScore,
        description: 'Lead quality',
        icon: TrendingUp,
        iconColor: 'text-primary'
      }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statCards.map((card, index) => (
                <StatCardComponent 
                    key={card.title}
                    card={card}
                    delay={(index + 1) * 0.1}
                />
            ))}
        </div>
    )
}

