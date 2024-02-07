"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormLabel,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { toast } from "sonner"
import { Loader2Icon } from "lucide-react"

interface PaperSeedSearchProps extends React.HTMLAttributes<HTMLDivElement> {}

const seedSearchSchema = z.object({
    paperId: z.string().min(6, {
        message: "Please enter a valid Semantic Scholar paper ID",
    }),
})

export function PaperSeedSearch ({ className, ...props }: PaperSeedSearchProps) {
    const [isLoading, setIsLoading] = React.useState<boolean>(false)

    const seedSearchForm = useForm<z.infer<typeof seedSearchSchema>>({
        resolver: zodResolver(seedSearchSchema),
        defaultValues: {
            paperId: "",
        },
    })

    function onSubmit (paperId: z.infer<typeof seedSearchSchema>) {
        setIsLoading(true);

        try { 
            window.location.href = `/map?paperId=${paperId}`;
            // match paper name to paperId
            // get citations 
        } catch (error) {
            console.error('Error submitting seed paper:', error);
            toast.error('Error submitting seed paper. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Card className={cn("w-max p-4", className)} {...props}>
            <Form {...seedSearchForm}>
              <form onSubmit={seedSearchForm.handleSubmit(onSubmit)} className="flex flex-col space-y-2 items-center w-full">
                <FormField
                  control={seedSearchForm.control}
                  name="paperId"
                  render={({ field }) => (
                    <FormItem>
                        <FormLabel className="sr-only">Semantic Scholar paper ID</FormLabel>
                        <FormControl>
                            <Input placeholder="Enter a Semantic Scholar paper ID" type="search" disabled={isLoading} {...field} className="w-72"/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                  )}
                />
                <Button variant="default" disabled={isLoading} className="w-24">
                    {isLoading && (
                        <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Seed graph
                </Button>
              </form>
            </Form>
        </Card>
    )
}