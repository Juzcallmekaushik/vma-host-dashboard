'use client';
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import Image from 'next/image';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function DemoPage({ params }) {
    const router = useRouter();
    const resolvedParams = React.use(params);
    const { clubid } = resolvedParams;
    const [teamData, setTeamData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchTeamData() {
            setLoading(true);
            const { data, error } = await supabase
                .from('demo')
                .select('*')
                .eq('club_id', clubid);
            if (!error) setTeamData(data || []);
            setLoading(false);
        }
        if (clubid) {
            fetchTeamData();
        } else {
            setLoading(false);
        }
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

    return (
        <div className="p-6">
            <button
                type="button"
                onClick={() => router.back()}
                className="fixed top-2 left-2 z-30 flex text-sm items-center text-white p-2 shadow-lg"
                aria-label="Back"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
                <span className="hidden sm:inline ml-1">Back</span>
            </button>
            <h1 className="text-2xl font-bold mb-4 text-center">Team Demonstration</h1>
            <table className="min-w-full border border-gray-300">
                <thead>
                    <tr className="bg-gray-100 text-black">
                        <th className="py-2 px-4 text-center text-[10px] border-b border-r border-black">Name</th>
                        <th className="py-2 px-4 text-center text-[10px] border-b border-r border-black">Date of Birth</th>
                        <th className="py-2 px-4 text-center text-[10px] border-b border-r border-black">Gender</th>
                        <th className="py-2 px-4 text-center text-[10px] border-b border-r border-black">Kup</th>
                        <th className="py-2 px-4 text-center text-[10px] border-b border-r border-black">IC/Passport Number</th>
                        <th className="py-2 px-4 text-center text-[10px] border-b border-r border-black">Fee</th>
                    </tr>
                </thead>
                <tbody>
                    {teamData.map((member) => (
                        <tr key={member.club_id + member.id_number}>
                            <td className="py-2 px-4 text-center text-[10px] border-b border-r border-white">{member.name}</td>
                            <td className="py-2 px-4 text-center text-[10px] border-b border-r border-white">{member.date_of_birth}</td>
                            <td className="py-2 px-4 text-center text-[10px] border-b border-r border-white">{member.gender}</td>
                            <td className="py-2 px-4 text-center text-[10px] border-b border-r border-white">{member.kup}</td>
                            <td className="py-2 px-4 text-center text-[10px] border-b border-r border-white">{member.id_number}</td>
                            <td className="py-2 px-4 text-center text-[10px] border-b border-r border-white">{member.fee}</td>
                        </tr>
                    ))}
                    {teamData.length === 0 && (
                        <tr>
                            <td colSpan={6} className="py-4 text-center text-gray-500 border-b border-gray-300">
                                No team members found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
