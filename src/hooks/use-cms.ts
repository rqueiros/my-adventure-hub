import { useQuery } from "@tanstack/react-query";
import { listFacet, getProfile, getOpinionById, type Facet } from "@/lib/cms.functions";

export function useFacetData<T = Record<string, unknown>>(facet: Facet) {
  return useQuery({
    queryKey: ["cms", facet],
    queryFn: () => listFacet({ data: { facet } }) as Promise<T[]>,
    staleTime: 60_000,
  });
}

export function useProfile() {
  return useQuery({
    queryKey: ["cms", "profile"],
    queryFn: () => getProfile(),
    staleTime: 60_000,
  });
}

export function useOpinion(id: string) {
  return useQuery({
    queryKey: ["cms", "opinion", id],
    queryFn: () => getOpinionById({ data: { id } }),
    staleTime: 60_000,
    enabled: !!id,
  });
}
