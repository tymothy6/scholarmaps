"use client"

import * as React from 'react';

import { type RecentSearchResponse } from './page';
import { Card } from '@/components/ui/card';

export function RecentSearches ({ recentSearches }:{ recentSearches: RecentSearchResponse[] }) {
    return (
        <div className="flex flex-col gap-2 w-full mt-2">
            <h3>Recent searches</h3>
                <ul className="flex gap-2">
                    {recentSearches.length > 0 ? (
                    recentSearches.map((search, index) => (
                        <li key={index}>
                            <Card className="w-max p-4 text-sm font-medium hover:bg-muted">{search.query}</Card>
                        </li>
                    ))
                    ) : (
                        <li>
                            <Card className="w-max p-4 text-sm font-medium hover:bg-muted">
                                No recent searches found 🥹
                            </Card>
                        </li>
                    )}
                </ul>
        </div>
    )
}