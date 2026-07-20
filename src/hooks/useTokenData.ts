export type PoolType = "airdrop" | "raise" | "reserves" | "team" | "total";

export const poolTypeToPrettyName: Record<PoolType, string> = {
	airdrop: "Airdrop",
	raise: "Raise",
	reserves: "Reserves",
	team: "Team",
	total: "Total",
};

type PoolStat = {
	name: PoolType;
	prettyName: string;
	distributed: number;
	prettyDistributed: string;
	total: number;
	totalPercentage: number;
	prettyTotal: string;
	color: string;
};

type TokenPoolData = {
	pools: Record<PoolType, { type: string; total: number; distributed: number }> | null;
	totalSupply: number;
	circulatingSupply: number;
	poolsStats: PoolStat[];
	isLoading: boolean;
	error: string | null;
};

// Snapshot of the Aleph aggregate published by 0xCBFc3EeC41CBBfCAcc50337d712890C47a14ba99 (key "info"), taken 2026-07-20
const pools = {
	raise: { type: "linear", total: 2000000, distributed: 1773637.2969642999 },
	airdrop: { type: "points", total: 21000000, distributed: 9014080.892192591 },
	reserves: { type: "linear", total: 25000000, distributed: 10298364.275189333 },
	team: { type: "linear", total: 12000000, distributed: 4057034.678713756 },
} as Record<PoolType, { type: string; total: number; distributed: number }>;

export function useTokenData(): TokenPoolData {
	const getTotalSupply = (): number => {
		return pools.raise.total + pools.airdrop.total + pools.reserves.total + pools.team.total;
	};

	const getCirculatingSupply = (): number => {
		return pools.raise.distributed + pools.airdrop.distributed + pools.reserves.distributed + pools.team.distributed;
	};

	const getPoolsStats = (): PoolStat[] => {
		const totalCirculating = getCirculatingSupply();

		const poolsData = [
			{
				name: "raise" as PoolType,
				prettyName: poolTypeToPrettyName.raise,
				distributed: pools.raise.distributed,
				prettyDistributed: Intl.NumberFormat("en", { notation: "compact" }).format(pools.raise.distributed),
				total: pools.raise.distributed,
				totalPercentage: totalCirculating > 0 ? (pools.raise.distributed / totalCirculating) * 100 : 0,
				prettyTotal: Intl.NumberFormat("en", { notation: "compact" }).format(pools.raise.distributed),
				color: "#6A7089",
			},
			{
				name: "airdrop" as PoolType,
				prettyName: poolTypeToPrettyName.airdrop,
				distributed: pools.airdrop.distributed,
				prettyDistributed: Intl.NumberFormat("en", { notation: "compact" }).format(pools.airdrop.distributed),
				total: pools.airdrop.distributed,
				totalPercentage: totalCirculating > 0 ? (pools.airdrop.distributed / totalCirculating) * 100 : 0,
				prettyTotal: Intl.NumberFormat("en", { notation: "compact" }).format(pools.airdrop.distributed),
				color: "#FCCBFF",
			},
			{
				name: "reserves" as PoolType,
				prettyName: poolTypeToPrettyName.reserves,
				distributed: pools.reserves.distributed,
				prettyDistributed: Intl.NumberFormat("en", { notation: "compact" }).format(pools.reserves.distributed),
				total: pools.reserves.distributed,
				totalPercentage: totalCirculating > 0 ? (pools.reserves.distributed / totalCirculating) * 100 : 0,
				prettyTotal: Intl.NumberFormat("en", { notation: "compact" }).format(pools.reserves.distributed),
				color: "#D288FF",
			},
			{
				name: "team" as PoolType,
				prettyName: poolTypeToPrettyName.team,
				distributed: pools.team.distributed,
				prettyDistributed: Intl.NumberFormat("en", { notation: "compact" }).format(pools.team.distributed),
				total: pools.team.distributed,
				totalPercentage: totalCirculating > 0 ? (pools.team.distributed / totalCirculating) * 100 : 0,
				prettyTotal: Intl.NumberFormat("en", { notation: "compact" }).format(pools.team.distributed),
				color: "#644DF9",
			},
		];

		// Add total row with full width bar (100%)
		poolsData.push({
			name: "total" as PoolType,
			prettyName: "Total",
			distributed: totalCirculating,
			prettyDistributed: Intl.NumberFormat("en", { notation: "compact" }).format(totalCirculating),
			total: totalCirculating,
			totalPercentage: 100,
			prettyTotal: Intl.NumberFormat("en", { notation: "compact" }).format(totalCirculating),
			color: "#FFF",
		});

		return poolsData;
	};

	return {
		pools,
		totalSupply: getTotalSupply(),
		circulatingSupply: getCirculatingSupply(),
		poolsStats: getPoolsStats(),
		isLoading: false,
		error: null,
	};
}
