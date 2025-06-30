'use client';
import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import Image from "next/image";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function PendingPaymentsPage() {
    const [clubData, setClubData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updatingId, setUpdatingId] = useState(null);

    useEffect(() => {
        async function fetchPendingPayments() {
            setLoading(true);
            const { data, error } = await supabase
                .from('payment')
                .select("*")
                .eq('status', 'pending');

            if (!error) setClubData(data || []);
            setLoading(false);
        }
        fetchPendingPayments();
    }, []);

    async function handleApprove(club_id) {
        setUpdatingId(club_id);
        const { error } = await supabase
            .from('payment')
            .update({ status: 'completed' })
            .eq('club_id', club_id);

        if (!error) {
            setClubData(prev =>
                prev.filter(club => club.club_id !== club_id)
            );
        }
        setUpdatingId(null);
    }

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
            <h1 className="text-2xl font-bold mb-4 text-center">Pending Payments</h1>
            <table className="min-w-full border border-gray-300">
                <thead>
                    <tr className="bg-gray-100 text-black">
                        <th className="py-2 px-4 text-center text-[12px] border-b border-r border-black">Club Name</th>
                        <th className="py-2 px-4 text-center text-[12px] border-b border-r border-black">Fee</th>
                        <th className="py-2 px-4 text-center text-[12px] border-b border-r border-black">Status</th>
                        <th className="py-2 px-4 text-center text-[12px] border-b border-black">Confirm Payment</th>
                    </tr>
                </thead>
                <tbody>
                    {clubData.map((club) => (
                        <tr key={club.club_id}>
                            <td className="py-2 px-4 text-center text-[12px] border-b border-r border-white">{club.club_name}</td>
                            <td className="py-2 px-4 text-center text-[12px] border-b border-r border-white">RM {club.fee}</td>
                            <td className="py-2 px-4 text-center text-[12px] border-b border-r text-orange-500 border-white">{club.status}</td>
                            <td className="py-2 px-4 text-center text-[12px] border-b border-white">
                                <button
                                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded disabled:opacity-50"
                                    onClick={() => handleApprove(club.club_id)}
                                    disabled={updatingId === club.club_id}
                                >
                                    {updatingId === club.club_id ? "Approving..." : "Approve Payment"}
                                </button>
                            </td>
                        </tr>
                    ))}
                    {clubData.length === 0 && (
                        <tr>
                            <td colSpan={4} className="py-4 text-center text-gray-500 border-b border-gray-300">
                                No pending payments found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}