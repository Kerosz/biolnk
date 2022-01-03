import { useMutation } from "react-query";

const fetcher = (token: string) =>
  fetch(`/api/delete-account`, {
    method: "POST",
    headers: new Headers({ "Content-Type": "application/json", token }),
    credentials: "same-origin",
  }).then((res) => res.json());

export default function useDeleteUser() {
  const { data, ...methods } = useMutation("user", (token: string) =>
    fetcher(token)
  );

  return { user: data, ...methods };
}
