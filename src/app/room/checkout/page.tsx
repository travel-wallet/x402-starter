"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const PRICE_PER_NIGHT = 100.0;

function todayYMD(offsetDays = 0) {
    const d = new Date();
    d.setDate(d.getDate() + offsetDays);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${dd}`;
}

function daysBetween(startYMD: string, endYMD: string) {
    const [sy, sm, sd] = startYMD.split("-").map(Number);
    const [ey, em, ed] = endYMD.split("-").map(Number);
    const s = Date.UTC(sy, sm - 1, sd);
    const e = Date.UTC(ey, em - 1, ed);
    const diff = Math.round((e - s) / (24 * 60 * 60 * 1000));
    return diff;
}

export default function RoomCheckoutPayPage() {
    const [startDate, setStartDate] = useState<string>(todayYMD(0));
    const [endDate, setEndDate] = useState<string>(todayYMD(1));

    const nights = useMemo(
        () => Math.max(0, daysBetween(startDate, endDate)),
        [startDate, endDate]
    );

    const total = useMemo(
        () => (PRICE_PER_NIGHT * Math.max(0, nights)).toFixed(2),
        [nights]
    );

    const isValid = nights >= 1;

    const handlePay = () => {
        if (!isValid) return;
        window.location.href = `/room/checkout?start=${startDate}&end=${endDate}`;
    };

    return (
        <main className="min-h-screen flex items-center justify-center p-6">
            <div className="w-full max-w-md rounded-lg border bg-white shadow-md overflow-hidden">
                <div className="relative h-48 w-full">
                    <Image
                        src="/hotel.jpg"
                        alt="hotel room"
                        fill
                        style={{ objectFit: "cover" }}
                        priority
                    />
                </div>

                <div className="p-6">
                    <h1 className="text-xl font-semibold mb-1">
                        Sunny Studio — Booking
                    </h1>
                    <p className="text-sm text-gray-500 mb-4">
                        Cozy 1 bed · 1 bath · Kitchen
                    </p>

                    <div className="mb-4">
                        <label className="text-sm text-gray-500 block mb-1">
                            Check-in
                        </label>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => {
                                const next = e.target.value;
                                setStartDate(next);
                                if (daysBetween(next, endDate) < 1) {
                                    setEndDate(todayYMD(1));
                                }
                            }}
                            className="w-full rounded border px-3 py-2"
                            aria-label="check-in date"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="text-sm text-gray-500 block mb-1">
                            Check-out
                        </label>
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="w-full rounded border px-3 py-2"
                            aria-label="check-out date"
                        />
                    </div>

                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <div className="text-sm text-gray-500">
                                Price / night
                            </div>
                            <div className="text-lg font-medium">
                                ${PRICE_PER_NIGHT.toFixed(2)}
                            </div>
                        </div>

                        <div className="text-right">
                            <div className="text-sm text-gray-500">Nights</div>
                            <div className="text-lg font-semibold">
                                {nights}
                            </div>
                        </div>
                    </div>

                    {!isValid && (
                        <div className="text-sm text-red-600 mb-4">
                            Check-out must be after check-in.
                        </div>
                    )}

                    <div className="flex items-center justify-between mb-4">
                        <div className="text-sm text-gray-500">Total</div>
                        <div className="text-lg font-semibold">${total}</div>
                    </div>

                    <div>
                        <Button
                            onClick={handlePay}
                            className="w-full"
                            disabled={!isValid}
                        >
                            Pay with x402
                        </Button>
                    </div>
                </div>
            </div>
        </main>
    );
}
