import useCreateNewLink from "~/utils/hooks/mutations/useCreateNewLink";
import { useForm } from "react-hook-form";
import { vestResolver } from "@hookform/resolvers/vest";
import { Dialog, Input } from "@biolnk/ui";
import { CREATE_LINK_SCHEMA } from "~/data/validations";
import type { FormLinkDto } from "~/types";

export interface AddLinkDialogProps {
  onClose: () => void;
  open: boolean;
}

const AddLinkDialog: React.FC<AddLinkDialogProps> = ({ open, onClose }) => {
  const DEFAULT_FORM_VALUES: FormLinkDto = {
    title: "",
    url: "",
  };

  const {
    register,
    formState: { errors, touchedFields, isValid, isDirty },
    handleSubmit,
    reset,
  } = useForm<FormLinkDto>({
    defaultValues: DEFAULT_FORM_VALUES,
    resolver: vestResolver(CREATE_LINK_SCHEMA),
    mode: "all",
  });
  const { mutate, isLoading } = useCreateNewLink();

  const handleDialogClose = () => {
    onClose();
    reset(DEFAULT_FORM_VALUES);
  };

  const handleCreateLink = async (formData: FormLinkDto) => {
    mutate({ data: formData });
    handleDialogClose();
  };

  return (
    <Dialog
      title="Add"
      open={open}
      onClose={handleDialogClose}
      actions={
        <Dialog.Button
          type="submit"
          form="create-link__form"
          variant="primary"
          size="xl"
          rounded={false}
          loading={isLoading}
          disabled={isDirty && !isValid}
          block
        >
          Save
        </Dialog.Button>
      }
    >
      <form id="create-link__form" onSubmit={handleSubmit(handleCreateLink)}>
        <Input
          id="title"
          type="text"
          title="Please enter your title!"
          label="title"
          srOnlyLabel
          placeholder="Title"
          borderless
          error={errors.title?.message}
          valid={!errors.title && touchedFields.title}
          {...register("title")}
        />
        <Input
          id="url"
          type="text"
          title="Please enter your url!"
          label="URL"
          srOnlyLabel
          placeholder="URL"
          autoComplete="url"
          borderless
          error={errors.url?.message}
          valid={!errors.url && touchedFields.url}
          {...register("url")}
        />
      </form>
    </Dialog>
  );
};

export default AddLinkDialog;
