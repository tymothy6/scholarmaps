"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormLabel,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { Loader2Icon } from "lucide-react";

interface PaperSeedSearchProps extends React.HTMLAttributes<HTMLDivElement> {}

const seedSearchSchema = z.object({
  paperId: z.string().min(6, {
    message: "Please enter a valid Semantic Scholar paper ID",
  }),
});

export function PaperSeedSearch({ className, ...props }: PaperSeedSearchProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const seedSearchForm = useForm<z.infer<typeof seedSearchSchema>>({
    resolver: zodResolver(seedSearchSchema),
    defaultValues: {
      paperId: "",
    },
  });

  async function onSubmit(values: z.infer<typeof seedSearchSchema>) {
    setIsLoading(true);

    console.log("Submitting input:", values);
    // In addition to S2 paper IDs, this function should also be able to handle other identifiers
    // and paper titles
    // Citations API supports many types of IDs, including URLs: https://api.semanticscholar.org/api-docs/#tag/Paper-Data/operation/get_graph_get_paper_citations
    // For paper titles, we first need to submit a query to paper relevance search endpoint
    try {
      const paperId = values.paperId;
      const promise = () =>
        new Promise<{ paperId: string }>((resolve) =>
          setTimeout(() => resolve({ paperId }), 5000),
        );

      toast.promise(promise, {
        loading: "Generating citation graph...",
        success: (values: { paperId: string }) => {
          return `${values.paperId} submitted as seed paper`;
        },
        error: "Error",
      });

      window.location.href = `/map/result?paperId=${paperId}`;
    } catch (error) {
      console.error("Error submitting seed paper:", error);
      toast.error("Error submitting seed paper. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className={cn("w-max p-4", className)} {...props}>
      <Form {...seedSearchForm}>
        <form
          onSubmit={seedSearchForm.handleSubmit(onSubmit)}
          className="flex flex-row space-x-2 items-start justify-start w-full"
        >
          <FormField
            control={seedSearchForm.control}
            name="paperId"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Paper identifier</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Paper ID, DOI, URL, title..."
                    type="search"
                    disabled={isLoading}
                    {...field}
                    className="w-48 md:w-72"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button variant="default" disabled={isLoading} className="w-max mt-2">
            {isLoading && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}
            Seed
          </Button>
        </form>
      </Form>
    </Card>
  );
}
