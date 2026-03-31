import { getSessions, getSessionTerm } from "@/lib/endpoints";
import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "next/navigation";

export const useSession = () => {
  const params = useSearchParams();
  const page = Number(params.get("page") || 1);
  const limit = Number(params.get("limit") || 20);
  const {
    data: sessionData,
    isLoading: isLoadingSession,
    refetch: refetchSession,
  } = useQuery({
    queryKey: ["session", page, limit],
    queryFn: () => getSessions({ page, limit }).then((res) => res.data),
  });
  return { sessionData, isLoadingSession, refetchSession };
};

export const useTerms = (sessId?: string) => {
  const { sessionId } = useParams();

  const sessIdToUse = sessId || sessionId;

  const {
    data: termsData,
    isLoading: isLoadingTerm,
    refetch: refetchTerms,
  } = useQuery({
    queryKey: ["session-terms", sessIdToUse],
    queryFn: () =>
      getSessionTerm(sessIdToUse as string).then((res) => res.data),
    enabled: !!sessIdToUse,
  });
  return { termsData, isLoadingTerm, refetchTerms };
};
