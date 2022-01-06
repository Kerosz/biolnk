import useUpdateLink from "~/utils/hooks/mutations/useUpdateLink";
import { useForm } from "react-hook-form";
import { vestResolver } from "@hookform/resolvers/vest";
import { Dialog, Input } from "@biolnk/gamut";
import { UPDATE_LINK_SCHEMA } from "~/data/validations";
import type { FormLinkDto } from "~/types";

export interface UpdateLinkDialogProps {
  onClose: () => void;
  open: boolean;
  currentTitle: string;
  currentUrl: string;
  linkId: string;
}

const UpdateLinkDialog: React.FC<UpdateLinkDialogProps> = ({
  open,
  onClose,
  linkId,
  currentTitle,
  currentUrl,
}) => {
  const DEFAULT_FORM_VALUES: Partial<FormLinkDto> = {
    title: "",
    url: "",
  };

  const {
    register,
    formState: { errors, isValid, isDirty },
    handleSubmit,
    reset,
  } = useForm<Partial<FormLinkDto>>({
    defaultValues: DEFAULT_FORM_VALUES,
    resolver: vestResolver(UPDATE_LINK_SCHEMA),
    mode: "all",
  });
  const { mutate, isLoading } = useUpdateLink();

  const handleDialogClose = () => {
    onClose();
    reset(DEFAULT_FORM_VALUES);
  };

  const handleUpdateLink = async ({ title, url }: Partial<FormLinkDto>) => {
    const data = {
      title: title || currentTitle,
      url: url || currentUrl,
    };

    // If any of the fields are different from the existing values -> send req
    if (data.title !== currentTitle || data.url !== currentUrl) {
      mutate({ data, linkId });
    }

    handleDialogClose();
  };

  return (
    <Dialog
      title="Update"
      open={open}
      onClose={handleDialogClose}
      actions={
        <Dialog.Button
          type="submit"
          form="update-link__form"
          variant="colored"
          size="xl"
          rounded={false}
          loading={isLoading}
          disabled={isDirty && !isValid}
          block
          className="!bg-blue-800 hover:!bg-blue-900 active:!bg-blue-800"
        >
          Update
        </Dialog.Button>
      }
    >
      <form id="update-link__form" onSubmit={handleSubmit(handleUpdateLink)}>
        <Input
          id="title"
          type="text"
          title="Please enter your title!"
          label="title"
          srOnlyLabel
          placeholder={currentTitle}
          borderless
          error={errors.title?.message}
          {...register("title")}
        />
        <Input
          id="url"
          type="text"
          title="Please enter your url!"
          label="URL"
          srOnlyLabel
          placeholder={currentUrl}
          borderless
          error={errors.url?.message}
          {...register("url")}
        />
      </form>
    </Dialog>
  );
};

export default UpdateLinkDialog;
