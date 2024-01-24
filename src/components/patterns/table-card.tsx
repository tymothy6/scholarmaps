"use client"

import * as React from "react"

import { 
    Card
} from "@/components/ui/card";
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell
} from "@/components/ui/table";

export function ResultsTableCard () {
    return (
    <div>
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Publication</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Journal</TableHead>
                    <TableHead className="text-right">Year</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">You can’t compress the program without quantifying the open-source SSL certificate</TableCell>
                    <TableCell>Author 1</TableCell>
                    <TableCell>Publication 1</TableCell>
                    <TableCell className="text-right">2021</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Try to calculate the EXE feed, maybe it will index the multi-byte pixel!</TableCell>
                    <TableCell>Author 2</TableCell>
                    <TableCell>Publication 2</TableCell>
                    <TableCell className="text-right">2020</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">The SAS interface is down, bypass the open-source pixel so we can backup the mainframe.</TableCell>
                    <TableCell>Author 3</TableCell>
                    <TableCell>Publication 3</TableCell>
                    <TableCell className="text-right">2019</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">The UTF8 application is down, parse the neural bandwidth so we can parse the exabyte!</TableCell>
                    <TableCell>Author 4</TableCell>
                    <TableCell>Publication 4</TableCell>
                    <TableCell className="text-right">2018</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Generating the driver won’t do anything, we need to quantify the pixels in 1080p!</TableCell>
                    <TableCell>Author 5</TableCell>
                    <TableCell>Publication 5</TableCell>
                    <TableCell className="text-right">2017</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Card>
          </div>
    )
}