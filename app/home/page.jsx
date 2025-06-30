"use client";
import React, { useEffect, useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function HomePage() {
    const [loading, setLoading] = useState(true);
    const [clubsCount, setClubsCount] = useState(0);
    const [paymentsCount, setPaymentsCount] = useState(0);
    const [approvedPaymentsCount, setApprovedPaymentsCount] = useState(0);
    const [competitionsCount, setCompetitionsCount] = useState(0);
    const [coachesCount, setCoachesCount] = useState(0);
    const [demoCount, setDemoCount] = useState(0);

    useEffect(() => {
        async function fetchCounts() {
            setLoading(true);
            const [{ count: clubs }, { count: payments }, { count: approved }, { count: competitions }, { count: coaches }, { count: demos }] = await Promise.all([
                supabase.from('clubs').select('*', { count: 'exact', head: true }).eq('club_id', ),
                supabase.from('competitors').select('*', { count: 'exact', head: true }),
                supabase.from('coaches').select('*', { count: 'exact', head: true }),
                supabase.from('demo').select('*', { count: 'exact', head: true }),
            ]);
            setClubsCount(clubs || 0);
            setPaymentsCount(payments || 0);
            setApprovedPaymentsCount(approved || 0);
            setCompetitionsCount(competitions || 0);
            setCoachesCount(coaches || 0);
            setDemoCount(demos || 0);
            setLoading(false);

        }
        fetchCounts();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-black">
                <Image
                    src="/logos/VMALogo.png"
                    alt="Loading"
                    width={80}
                    height={80}
                    className="animate-pulse"
                />
            </div>
        );
    }

    const stats = [
        { label: "Clubs Registered", value: clubsCount, href: "/clubs" },
        { label: "Pending Payments", value: paymentsCount, href: "/payments" },
        { label: "Approved Payments", value: approvedPaymentsCount, href: "/payments?status=approved" },
        { label: "Total Competitors", value: competitionsCount, href: "/competitors" },
        { label: "Total Team Managers & Coaches", value: coachesCount, href: "/coaches" },
        { label: "Total Team Demonstrations", value: demoCount, href: "/demo" },
    ];

    return (
        <>
            <nav className="w-full bg-[#080808] px-4 py-4 flex items-center justify-between border-b border-gray-800" style={{ height: "40px" }}>
                <span className="text-xl font-bold text-white">Host Dashboard</span>
                <button
                    className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-xs font-bold"
                    onClick={async () => {
                        await supabase.auth.signOut();
                        window.location.reload();
                    }}
                >
                    Log out
                </button>
            </nav>
            <main className="bg-[#090909] flex flex-col items-center py-8">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl">
                    {stats.map((stat) => (
                        <Link
                            key={stat.label}
                            href={stat.href}
                            className="bg-gray-900 hover:bg-gray-800 transition rounded-lg shadow p-4 flex flex-col items-center justify-center h-24 cursor-pointer border border-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <span className="text-xl font-semibold mb-1 text-white">{stat.value}</span>
                            <span className="text-gray-400 text-sm">{stat.label}</span>
                        </Link>
                    ))}
                </div>
            </main>
        </>
    );
}
