import { useMutation } from "react-query";
import { measures } from "../api";

export default function useWorkStatus() {
  const { mutate: updateWorkStatus, ...rest } = useMutation(
    measures.updateWorkStatus
  );
  return { updateWorkStatus, ...rest };
}
