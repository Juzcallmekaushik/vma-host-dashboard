'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import Image from "next/image";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function ClubCoachesPage({ params }) {
    const router = useRouter();
    const resolvedParams = React.use(params);
    const { clubid } = resolvedParams;
    const [coachData, setCoachData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchCoachData() {
            setLoading(true);
            const { data, error } = await supabase
                .from('coaches')
                .select('*')
                .eq('club_id', clubid);
            if (!error) setCoachData(data || []);
            setLoading(false);
        }
        fetchCoachData();
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

    const teamManagerCount = coachData.filter(c => c.tag_type === "Team Manager").length;
    const coachCount = coachData.filter(c => c.tag_type === "Coach").length;

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
            <h1 className="text-2xl font-bold mb-4 text-center">Coaches & Team Managers</h1>
            <table className="min-w-full border border-gray-300">
                <thead>
                    <tr className="bg-gray-100 text-black">
                        <th className="py-2 px-4 text-center text-[10px] border-b border-r border-black">Full Name</th>
                        <th className="py-2 px-4 text-center text-[10px] border-b border-r border-black">Date of Birth</th>
                        <th className="py-2 px-4 text-center text-[10px] border-b border-r border-black">Club Name</th>
                        <th className="py-2 px-4 text-center text-[10px] border-b border-r border-black">Gender</th>
                        <th className="py-2 px-4 text-center text-[10px] border-b border-r border-black">IC/Passport Number</th>
                        <th className="py-2 px-4 text-center text-[10px] border-b border-r border-black">Tag Type</th>
                        <th className="py-2 px-4 text-center text-[10px] border-b border-r border-black">Phone Number</th>
                    </tr>
                </thead>
                <tbody>
                    {coachData.map((coach) => (
                        <tr key={coach.club_id + coach.id_number}>
                            <td className="py-2 px-4 text-center text-[10px] border-b border-r border-white">{coach.full_name}</td>
                            <td className="py-2 px-4 text-center text-[10px] border-b border-r border-white">{coach.date_of_birth}</td>
                            <td className="py-2 px-4 text-center text-[10px] border-b border-r border-white">{coach.club_name}</td>
                            <td className="py-2 px-4 text-center text-[10px] border-b border-r border-white">{coach.gender}</td>
                            <td className="py-2 px-4 text-center text-[10px] border-b border-r border-white">{coach.id_number}</td>
                            <td className="py-2 px-4 text-center text-[10px] border-b border-r border-white">{coach.tag_type}</td>
                            <td className="py-2 px-4 text-center text-[10px] border-b border-r border-white">{coach.phone_number}</td>
                        </tr>
                    ))}
                    {coachData.length === 0 && (
                        <tr>
                            <td colSpan={7} className="py-4 text-center text-gray-500 border-b border-gray-300">
                                No coaches found for this club.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}