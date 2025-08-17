import { useEffect } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Save, ArrowRight, Mail, Building2, Trophy, Tag, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectSeparator, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { cn, getStatusColor, getScoreColor } from '@/lib/utils';
import type { Lead, Opportunity } from '@/types';
import { toast } from 'sonner';
import { z } from 'zod';
import { Separator } from '@radix-ui/react-select';

// Validation schema with Zod
const leadFormSchema = z.object({
    email: z.email('Email must have a valid format'),
    status: z.enum(['New', 'Contacted', 'Qualified', 'Disqualified']),
});

type LeadFormValues = z.infer<typeof leadFormSchema>;

type LeadDetailPanelProps = {
    lead: Lead;
    isOpen: boolean;
    isCreating?: boolean;
    onClose: () => void;
    onSave: (lead: Lead) => void;
    onConvertToOpportunity: (opportunity: Opportunity) => void;
}

export default function LeadDetailPanel({
    lead,
    isOpen,
    onClose,
    onSave,
    onConvertToOpportunity
}: LeadDetailPanelProps) {

    const form = useForm<LeadFormValues>({
        resolver: zodResolver(leadFormSchema)
    });

    const { handleSubmit, reset, formState: { isSubmitting }, watch } = form;
    const watchedValues = watch();

    useEffect(() => {
        if (lead) {
            reset({
                email: lead.email,
                status: lead.status
            });
        }
    }, [lead, reset]);

    const onSubmit: SubmitHandler<LeadFormValues> = async (values) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        const leadData: Lead = {
            ...lead,
            email: values.email,
            status: values.status
        };

        onSave(leadData);

        toast('Lead updated', {
            description: 'Lead information was saved successfully.'
        });

        onClose();
    };

    const handleConvert = async () => {
        if (!lead) return;

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        const newOpportunity: Opportunity = {
            id: Date.now(),
            name: lead.name,
            stage: 'Qualification',
            amount: 0,
            accountName: lead.company
        };

        onConvertToOpportunity(newOpportunity);

        toast('Lead converted', {
            description: `${lead.name} was converted to an opportunity.`
        });

        onClose();
    };

    const currentLead = lead || {
        email: watchedValues.email,
        status: watchedValues.status
    };

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="w-full max-w-md overflow-x-hidden overflow-y-auto">
                <SheetHeader className="pb-6">
                    <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getStatusColor(currentLead.status)}`}>
                            <span className="text-sm font-medium">
                                {currentLead.name.charAt(0)}
                            </span>
                        </div>
                        <div>
                            <SheetTitle className="text-lg font-semibold">
                                {currentLead.name}
                            </SheetTitle>
                            <SheetDescription>
                                {currentLead.company}
                            </SheetDescription>
                        </div>
                    </div>
                </SheetHeader>

                <Form {...form}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-6">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between px-6">
                                    <h3 className="text-sm font-medium text-foreground">Lead Information</h3>
                                    <div className="flex items-center space-x-2">
                                        <Trophy className="w-4 h-4 text-muted-foreground" />
                                        <span className={cn('text-sm font-medium', getScoreColor(currentLead.score))}>
                                            Score: {currentLead.score}
                                        </span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 px-6">
                                    <div className='flex flex-col gap-2'>
                                        <Label className="text-sm text-muted-foreground">Source</Label>
                                        <div className="flex items-center space-x-2 mt-1">
                                            <Building2 className="w-4 h-4 text-muted-foreground" />
                                            <span className="text-sm text-foreground">{currentLead.source}</span>
                                        </div>
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <Label className="text-sm text-muted-foreground">Status</Label>
                                        <Badge className={cn('border mt-1', getStatusColor(currentLead.status))}>
                                            {currentLead.status}
                                        </Badge>
                                    </div>
                                </div>
                            </div>

                            <SelectSeparator />

                            {/* Editable Fields */}
                            <div className="space-y-4 px-6">
                                <h3 className="text-sm font-medium text-foreground">
                                    Edit Information
                                </h3>

                                <div className="space-y-4">
                                    {/* Email */}
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                                                        <Input
                                                            type="email"
                                                            placeholder="email@company.com"
                                                            className="pl-10"
                                                            {...field}
                                                        />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <div className="grid grid-cols-2 gap-4">
                                        {/* Status */}
                                        <FormField
                                            control={form.control}
                                            name="status"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Status</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger className="w-full">
                                                                <div className="flex items-center space-x-2">
                                                                    <Tag className="w-4 h-4 text-muted-foreground" />
                                                                    <SelectValue placeholder="Select a status" />
                                                                </div>
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value="New">New</SelectItem>
                                                            <SelectItem value="Contacted">Contacted</SelectItem>
                                                            <SelectItem value="Qualified">Qualified</SelectItem>
                                                            <SelectItem value="Disqualified">Disqualified</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>

                            <SelectSeparator />

                            <div className="space-y-4 px-6">
                                <h3 className="text-sm font-medium text-foreground">Convert to Opportunity</h3>
                                <Button
                                    type="button"
                                    onClick={handleConvert}
                                    className="w-full"
                                    variant="default"
                                >
                                    <ArrowRight className="w-4 h-4 mr-2" />
                                    Convert Lead
                                </Button>
                            </div>

                            <SelectSeparator />

                            {/* Footer */}
                            <div className="flex items-center gap-4 px-6">
                                <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={isSubmitting} className="flex-1">
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                            <span>Saving...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Save className="w-4 h-4 mr-2" />
                                            <span>Save</span>
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>
                    </form>
                </Form>
            </SheetContent>
        </Sheet>
    );
};