import { useMutation, useQueryClient } from "react-query";
import { makeToast } from "@biolnk/gamut";
import { sbClient } from "~/lib/supabase";
import { createNewLink } from "~/services/supabase";
import { LinkKind } from "~/data/enums";
import type { CreateLinkDto, FormLinkDto } from "~/types";

type NewLinkMutationArgs = {
  data: FormLinkDto;
  kind?: CreateLinkDto["kind"];
};

export default function useCreateNewLink() {
  const authUser = sbClient.auth.user();
  const queryClient = useQueryClient();

  return useMutation(
    ({ data, kind }: NewLinkMutationArgs) => {
      const createLinkDto: CreateLinkDto = {
        ...data,
        user_id: authUser?.id,
        kind: kind ?? LinkKind.LINK,
      };

      return createNewLink(createLinkDto);
    },
    {
      onSettled: () => {
        queryClient.invalidateQueries("links");
      },
      onSuccess: () =>
        makeToast({
          duration: 2500,
          kind: "success",
          title: "Successfully created",
          message: "The new link has been successfully created!",
        }),
    }
  );
}
