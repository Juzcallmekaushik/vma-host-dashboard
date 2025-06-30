"use client";
import React, { useEffect, useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function HomePage({ params }) {
    const [loading, setLoading] = useState(true);
    const resolvedParams = React.use(params);
    const { clubid } = resolvedParams;
    const [competitionsCount, setCompetitionsCount] = useState(0);
    const [coachesCount, setCoachesCount] = useState(0);
    const [demoCount, setDemoCount] = useState(0);
    const [fees, setFees] = useState(0);

    useEffect(() => {
        async function fetchCounts() {
            setLoading(true);
            const [
                { count: competitionsCountRes },
                { count: coachesCountRes },
                { count: demoCountRes }
            ] = await Promise.all([
                supabase.from('competitors').select('*', { count: 'exact', head: true }).eq('club_id', clubid),
                supabase.from('coaches').select('*', { count: 'exact', head: true }).eq('club_id', clubid),
                supabase.from('demo').select('*', { count: 'exact', head: true }).eq('club_id', clubid)
            ]);
            let feesValue = 0;
            if (clubid) {
                const { data: feesData, error: feesError } = await supabase
                    .from('fees')
                    .select('fee')
                    .eq('club_id', clubid);
                if (!feesError && feesData && feesData.length > 0) {
                    feesValue = "RM " + feesData.reduce((sum, fee) => sum + (fee.fee || 0), 0);
                }
            }
            setCompetitionsCount(competitionsCountRes || 0);
            setCoachesCount(coachesCountRes || 0);
            setDemoCount(demoCountRes || 0);
            setFees(feesValue);
            setLoading(false);

        }
        fetchCounts();
    }, []);

    const [clubName, setClubName] = useState("");

    useEffect(() => {
        async function fetchClubName() {
            if (clubid) {
                const { data, error } = await supabase
                    .from('clubs')
                    .select('name')
                    .eq('id', clubid)
                    .single();
                if (!error && data) {
                    setClubName(data.name);
                }
            }
        }
        fetchClubName();
    }, [clubid]);

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
        { label: "Competitors", value: competitionsCount, href: `/clubs/${clubid}/competitors` },
        { label: "Team Demonstration", value: demoCount, href: `/clubs/${clubid}/demo` },
        { label: "Team Managers & Coaches", value: coachesCount, href: `/clubs/${clubid}/coaches` },
        { label: "Fees Payable", value: fees, href: "" },
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
            <main className="bg-[#090909] flex flex-col items-center py-8 min-h-screen">
                <div className="w-full flex flex-col items-center">
                    <h1 className="text-4xl sm:text-6xl font-extrabold text-white mb-2 text-center w-full">
                        {clubName}
                    </h1>
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 w-full max-w-4xl">
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
                </div>
            </main>
        </>
    );
}
