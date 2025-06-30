'use client';
import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import Image from "next/image";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function ApprovedPaymentsPage() {
    const [clubData, setClubData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchApprovedPayments() {
            setLoading(true);
            const { data, error } = await supabase
                .from('payment')
                .select("*")
                .eq('status', 'completed');

            if (!error) setClubData(data || []);
            setLoading(false);
        }
        fetchApprovedPayments();
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
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4 text-center">Approved Payments</h1>
            <table className="min-w-full border border-gray-300">
                <thead>
                    <tr className="bg-gray-100 text-black">
                        <th className="py-2 px-4 text-center text-[12px] border-b border-r border-black">Club Name</th>
                        <th className="py-2 px-4 text-center text-[12px] border-b border-r border-black">Fee</th>
                        <th className="py-2 px-4 text-center text-[12px] border-b border-black">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {clubData.map((club) => (
                        <tr key={club.club_id}>
                            <td className="py-2 px-4 text-center text-[12px] border-b border-r border-white">{club.club_name}</td>
                            <td className="py-2 px-4 text-center text-[12px] border-b border-r border-white">RM {club.fee}</td>
                            <td className="py-2 px-4 text-center text-green-300 text-[12px] border-b border-white">{club.status}</td>
                        </tr>
                    ))}
                    {clubData.length === 0 && (
                        <tr>
                            <td colSpan={3} className="py-4 text-center text-gray-500 border-b border-gray-300">
                                No approved payments found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}