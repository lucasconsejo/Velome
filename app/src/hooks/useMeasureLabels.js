import { useQuery } from "react-query";
import { measures } from "../api";

export default function useMeasureLabels() {
  const { data, ...rest } = useQuery("measureLabels", measures.getLabels, {
    staleTime: Infinity,
  });
  return { ...rest, labels: data };
}
