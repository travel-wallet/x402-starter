import { Account, toAccount } from "viem/accounts";
import { base, baseSepolia } from "viem/chains";
import { env } from "./env";

const PURCHASER = "0x24c72816ccd0be389b0f66038382fd1da3f0bd60";
const SELLER = "0x3181b547a9c45f7fae83287f3871c91adf7491fa";

const chainMap = {
    "base-sepolia": baseSepolia,
    base: base,
} as const;

export function getChain() {
    return chainMap[env.NETWORK];
}

export async function getOrCreatePurchaserAccount(): Promise<Account> {
    return toAccount({ address: PURCHASER });
}

export async function getOrCreateSellerAccount(): Promise<Account> {
    return toAccount({ address: SELLER });
}
