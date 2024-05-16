"use client"

import * as React from 'react';

import { useQuery } from '@tanstack/react-query'; 

import { SearchPaperResult, columns } from './tables/reports-search-columns'
import { ReportsSearchResultTable } from './tables/reports-search-table'

import { useSession } from 'next-auth/react';
        
import { Handle, Position } from 'reactflow';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { 
    Sheet,
    SheetTitle,
    SheetContent,
    SheetTrigger,
    SheetDescription,
 } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormLabel,
  FormField,
  FormItem,
  FormMessage,
 } from "@/components/ui/form";
import { ArrowLeftFromLine, Loader2Icon, SearchIcon } from "lucide-react";

const searchSchema = z.object({
    paperId: z.string().min(6, {
        message: "Please enter a valid paper ID",
    }),
})

function PaperSearchNode() {
    const { data: session } = useSession();
    const [isSheetOpen, setIsSheetOpen] = React.useState(false);
    const [searchResults, setSearchResults] = React.useState<SearchPaperResult[]>([]);

    const searchForm = useForm<z.infer<typeof searchSchema>>({
        resolver: zodResolver(searchSchema),
        defaultValues: {
            paperId: "",
        },
    });

    const userId = session?.user?.id;
    const paperId = searchForm.watch('paperId');

    const fetchSearchResults = async (paperId: string) => {
        try {
            const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
            const url = `${baseUrl}/api/search?query=${paperId}&userId=${userId}`;
            const response = await fetch(url);
        
            if (!response.ok) {
                throw new Error(`Relevance API responded with status code ${response.status}: ${response.statusText}`);
            }

            const results = await response.json();

            setSearchResults(results.data);
            setIsSheetOpen(true);

            return results.data; // cache data
        } catch (error) {
            console.error('Failed to fetch search results during query:', error);
            throw error; // re-throw the error to be caught by the query
        }
    }

    const { isPending, isLoading, isError, data, refetch } = useQuery({
        queryKey: ['search', paperId],
        queryFn: () => fetchSearchResults(paperId),
        enabled: false, // required to manually trigger the query
    });

    const onSubmit = (values: z.infer<typeof searchSchema>) => {
        refetch(); // trigger the query on submit
    }

    return (
        <div className="shadow-md bg-background border-y px-4 py-2 flex flex-col items-center">
            <div className="flex w-full"><h3 className="text-sm font-semibold">Search Semantic Scholar</h3></div>
            <Form {...searchForm}>
              <form onSubmit={searchForm.handleSubmit(onSubmit)} className="flex flex-row space-x-2 items-end justify-center w-full">
                <FormField
                  control={searchForm.control}
                  name="paperId"
                  render={({ field }) => (
                    <FormItem>
                        <FormLabel className="sr-only">Paper identifier</FormLabel>
                        <FormControl>
                            <Input placeholder="Paper title, author, DOI..." type="search" disabled={isPending} {...field} className="w-56"/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                  )}
                />
                <Button size="icon" className="mt-1">
                    {isLoading && (
                        <Loader2Icon className="h-4 w-4 animate-spin" />
                    )}
                    <SearchIcon className={`w-4 h-4 ${isLoading ? 'hidden' : 'block'}`} /> 
                </Button>
              </form>
            </Form>
            {isError &&  (
                <p className="text-xs text-destructive">An error occurred while fetching search results</p>
            )}
                <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                    {data && (
                    <SheetTrigger asChild>
                        <Button variant="default" size="sm" className="mt-2">
                            <ArrowLeftFromLine className="h-4 w-4 mr-2" />
                            Results
                        </Button>
                    </SheetTrigger>
                    )}
                    <SheetContent side="right">
                        <SheetTitle>Results</SheetTitle>
                        <SheetDescription>
                            Search for <span className="font-mono">{paperId}</span>
                        </SheetDescription>
                        <ReportsSearchResultTable columns={columns} data={searchResults} />
                    </SheetContent>
                </Sheet>
            <Handle 
                type="target" 
                position={Position.Left} 
                className="!bg-primary/50 hover:!bg-primary !h-full !w-2 !rounded-none !rounded-tl-lg !rounded-bl-lg !border-0"
            />
            <Handle 
                type="source" 
                position={Position.Right} 
                className="!bg-primary/50 hover:!bg-primary !h-full !w-2 !rounded-none !rounded-tr-lg !rounded-br-lg !border-0"
            />
        </div>
    )
}

export default React.memo(PaperSearchNode);