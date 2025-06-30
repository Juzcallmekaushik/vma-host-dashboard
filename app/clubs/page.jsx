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
    const [clubs, setClubs] = useState([]);

    useEffect(() => {
        async function fetchClubs() {
            setLoading(true);
            const { data, error } = await supabase.from('clubs').select('club_id, name');
            if (!error) setClubs(data || []);
            setLoading(false);
        }
        fetchClubs();
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
            <main className="bg-[#090909] flex flex-col items-center py-10">
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 w-full max-w-5xl">
                    {clubs.map((club) => (
                        <Link
                            key={club.id}
                            href={`/clubs/${club.club_id}/home`}
                            className="bg-gray-900 hover:bg-gray-800 transition rounded-lg shadow p-4 flex flex-col items-center justify-center h-24 cursor-pointer border border-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <span className="text-xl font-semibold mb-1 text-white">{club.name}</span>
                        </Link>
                    ))}
                </div>
            </main>
        </>
    );
}
