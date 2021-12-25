import { useMutation, useQueryClient } from "react-query";
import { sbClient } from "~/lib/supabase";
import { createNewLink } from "~/services/supabase";
import type { CreateLinkDto, FormLinkDto } from "~/types";

type NewLinkMutationArgs = {
  data: FormLinkDto,
  kind?: CreateLinkDto["kind"]
}

export default function useCreateNewLink() {
  const authUser = sbClient.auth.user();
  const queryClient = useQueryClient()

  return useMutation(({data, kind}: NewLinkMutationArgs) => {
    const createLinkDto: CreateLinkDto = {
      ...data,
      user_id: authUser?.id,
      kind: kind ?? "default"
    };

    return createNewLink(createLinkDto);
  }, {
    onSettled: () => {
      queryClient.invalidateQueries('links')
    }
  });
}
