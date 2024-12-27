import { useQuery } from "@tanstack/react-query";
import { fetchWithAuth } from "./queryUtils";
import { endpoints } from "./endpoints";
import { ApiResponse } from "@/types/ApiResponse";

export const useCalculateElectricityCarbonEmissions = (billAmount: string | number) => {
    const query = useQuery({
        queryKey: ['calculateElectricityCarbonEmissions', billAmount],
        queryFn: async () => {
            const response = await fetchWithAuth(
                `${endpoints.electricity.calculate.emission}?billAmount=${billAmount}`,
                {
                    method: 'GET',
                }
            );
            if (!response.ok) {
                throw new Error('Failed to calculate emissions');
            }
            return response.json();
        },
        enabled: false,
    });

    return {
        ...query,
        isLoading: query.isLoading,
        refetch: query.refetch,
        isError: query.isError,
    } as {
        data: ApiResponse<number>;
        isLoading: boolean;
        refetch: () => Promise<any>;
        isError: boolean;
    };
};
