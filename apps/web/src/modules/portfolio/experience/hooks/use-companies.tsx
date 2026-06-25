import { useQuery } from "@tanstack/react-query";
import { listCompanies } from "../api/list-companies";
import type { CompanyDTO } from "../dto";

interface UseCompanies {
	companies: CompanyDTO[] | undefined;
	companiesIsLoading: boolean;
}

export function useCompanies(): UseCompanies {
	const { data: companies, isLoading: companiesIsLoading } = useQuery({
		queryKey: ["companies"],
		queryFn: listCompanies,
	});

	return { companies, companiesIsLoading };
}
