"use client"

import * as React from 'react';

import { useQuery } from '@tanstack/react-query'; 

import { Handle, Position } from 'reactflow';

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormLabel,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Loader2Icon, SearchIcon } from "lucide-react"

const searchSchema = z.object({
    paperId: z.string().min(6, {
        message: "Please enter a valid Semantic Scholar paper ID",
    }),
})

function PaperSearchNode() {

    const searchForm = useForm<z.infer<typeof searchSchema>>({
        resolver: zodResolver(searchSchema),
        defaultValues: {
            paperId: "",
        },
    });

    const paperId = searchForm.watch('paperId');

    const fetchSearchResults = async (paperId: string) => {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
        const url = `${baseUrl}/api/search?query=${paperId}`;
        const response = await fetch(url);
    
        if (!response.ok) {
            throw new Error(`Relevance API responded with status code ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log('Search results:', data);
        return data;
    }

    const { isPending, refetch } = useQuery({
        queryKey: ['search', paperId],
        queryFn: () => fetchSearchResults(paperId),
        enabled: false,
    });

    const onSubmit = (values: z.infer<typeof searchSchema>) => {
        refetch(); // trigger the query manually
    }

    return (
        <div className="shadow-md bg-background border-y px-4 py-2 flex flex-col items-center">
            <h3 className="text-sm font-semibold">Semantic Scholar</h3>
            <Form {...searchForm}>
              <form onSubmit={searchForm.handleSubmit(onSubmit)} className="flex flex-row space-x-2 items-end justify-center w-full">
                <FormField
                  control={searchForm.control}
                  name="paperId"
                  render={({ field }) => (
                    <FormItem>
                        <FormLabel className="sr-only">Paper identifier</FormLabel>
                        <FormControl>
                            <Input placeholder="Enter Paper ID, DOI, URL..." type="search" disabled={isPending} {...field} className="w-56"/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                  )}
                />
                <Button size="icon" disabled={isPending} className="mt-1">
                    {isPending && (
                        <Loader2Icon className="h-4 w-4 animate-spin" />
                    )}
                    <SearchIcon className={`w-4 h-4 ${isPending ? 'hidden' : 'block'}`} /> 
                </Button>
              </form>
            </Form>
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