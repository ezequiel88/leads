import { Search, Filter, SortAsc, SortDesc } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import type { SortOrder, TableFilters } from '@/types';

interface SearchAndFiltersProps {
    filters: TableFilters;
    onFiltersChange: (filters: TableFilters) => void;
    leadCount: number;
}

export default function SearchAndFilters({
    filters,
    onFiltersChange,
    leadCount
}: SearchAndFiltersProps) {
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onFiltersChange({
            ...filters,
            search: e.target.value
        });
    };

    const handleStatusChange = (status: string) => {
        onFiltersChange({
            ...filters,
            status: status === 'all' ? '' : status
        });
    };

    const handleSortChange = (field: TableFilters['sortBy']) => {
        const newOrder: SortOrder =
            filters.sortBy === field && filters.sortOrder === 'desc' ? 'asc' : 'desc';

        onFiltersChange({
            ...filters,
            sortBy: field,
            sortOrder: newOrder
        });
    };

    return (
        <div className="flex flex-col sm:flex-row gap-4 p-6 bg-card border rounded-lg shadow-soft">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                    placeholder="Search by email, name or company..."
                    value={filters.search}
                    onChange={handleSearchChange}
                    className="pl-10 pr-4 w-full md:w-96"
                />
            </div>
            
            <div className="flex-1"/>

            <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center text-muted-foreground">
                    <span className="font-medium text-foreground">{leadCount}</span>&nbsp;leads
                </div>
                <Select value={filters.status || 'all'} onValueChange={handleStatusChange}>
                    <SelectTrigger className="w-full sm:w-[160px]">
                        <div className="flex items-center space-x-2">
                            <Filter className="w-4 h-4 text-muted-foreground" />
                            <SelectValue placeholder="Status" />
                        </div>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="New">New</SelectItem>
                        <SelectItem value="Contacted">Contacted</SelectItem>
                        <SelectItem value="Qualified">Qualified</SelectItem>
                        <SelectItem value="Disqualified">Disqualified</SelectItem>
                    </SelectContent>
                </Select>

                <div className="flex gap-3">
                    <Button
                        variant={filters.sortBy === 'score' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => handleSortChange('score')}
                        className="flex items-center space-x-1"
                    >
                        {filters.sortBy === 'score' && filters.sortOrder === 'desc' ? (
                            <SortDesc className="w-4 h-4" />
                        ) : (
                            <SortAsc className="w-4 h-4" />
                        )}
                        <span>Score</span>
                    </Button>

                    <Button
                        variant={filters.sortBy === 'name' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => handleSortChange('name')}
                        className="flex items-center space-x-1"
                    >
                        {filters.sortBy === 'name' && filters.sortOrder === 'desc' ? (
                            <SortDesc className="w-4 h-4" />
                        ) : (
                            <SortAsc className="w-4 h-4" />
                        )}
                        <span>Name</span>
                    </Button>
                </div>
            </div>
        </div>
    );
}