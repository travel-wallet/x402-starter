"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const PRICE_PER_NIGHT = 100.0;

export default function RoomCheckoutPayPage() {
    const [nights, setNights] = useState<number>(1);

    const total = useMemo(
        () => (PRICE_PER_NIGHT * nights).toFixed(2),
        [nights]
    );

    const decrease = () => setNights((s) => Math.max(1, s - 1));
    const increase = () => setNights((s) => s + 1);

    const handlePay = () => {
        // 回到受保護路徑觸發 x402 middleware/payment flow
        window.location.href = "/room/checkout";
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

                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <div className="text-sm text-gray-500">
                                Price / night
                            </div>
                            <div className="text-lg font-medium">
                                ${PRICE_PER_NIGHT.toFixed(2)}
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                aria-label="decrease nights"
                                className="px-3 py-1 rounded border"
                                onClick={decrease}
                            >
                                −
                            </button>
                            <div className="w-12 text-center">{nights}</div>
                            <button
                                aria-label="increase nights"
                                className="px-3 py-1 rounded border"
                                onClick={increase}
                            >
                                +
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between mb-6">
                        <div className="text-sm text-gray-500">Total</div>
                        <div className="text-lg font-semibold">${total}</div>
                    </div>

                    <div>
                        <Button onClick={handlePay} className="w-full">
                            Pay with x402
                        </Button>
                    </div>
                </div>
            </div>
        </main>
    );
}
