import useUpdateUser from "~/utils/hooks/mutations/useUpdateUser";
import useUpdateEffect from "~/utils/hooks/useUpdateEffect";
import useDisclosure from "~/utils/hooks/useDisclosure";
import useUpdatePage from "~/utils/hooks/mutations/useUpdatePage";
import { ChangeEvent, FC, useState } from "react";
import { Heading, Text, Flex, Toggle } from "@biolnk/ui";
import { PageLinkPreference } from "~/data/enums";
import { PageWithMetadata } from "~/types";

export interface PreferenceSectionProps {
  page: PageWithMetadata;
}

const PreferenceSection: FC<PreferenceSectionProps> = ({ page }) => {
  const [domainPreference, setDomainPreference] = useState(page.user.page_link);

  const username = page?.user.username;

  const sensitiveToggle = useDisclosure({ defaultIsOpen: page.nsfw_content });
  const supportToggle = useDisclosure({ defaultIsOpen: page.show_branding });

  const updateUser = useUpdateUser();
  const updatePage = useUpdatePage();

  const handleDomainChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDomainPreference(event.currentTarget.id as `${PageLinkPreference}`);
  };

  // Update page link preference
  useUpdateEffect(() => {
    if (page?.user.page_link !== domainPreference) {
      updateUser.mutate({
        data: { page_link: domainPreference },
        userId: page?.user.id,
      });
    }
  }, [domainPreference]);

  // Update sensitive [nsfw_content] content
  useUpdateEffect(() => {
    if (sensitiveToggle.isOpen !== page?.nsfw_content) {
      updatePage.mutate({
        data: { nsfw_content: sensitiveToggle.isOpen },
        userId: page?.user.id,
      });
    }
  }, [sensitiveToggle.isOpen]);

  // Update support [show_branding]
  useUpdateEffect(() => {
    if (supportToggle.isOpen !== page?.show_branding) {
      updatePage.mutate({
        data: { show_branding: supportToggle.isOpen },
        userId: page?.user.id,
      });
    }
  }, [supportToggle.isOpen]);

  return (
    <section
      id="preferences"
      className="bg-mauve-50 rounded pt-4 pb-5 px-4 sm:px-6 shadow-sm -translate-y-1 sm:scroll-mt-12"
    >
      {/* Divider */}
      <div className="w-full h-0.5 bg-mauve-300 mb-6 mt-1" />

      <div>
        <Heading as="h2" size="sm" className="pb-1 font-medium">
          Domain
        </Heading>
        <Text size="sm" variant="light" className="mb-10">
          Select your prefered way to generate and access your page
        </Text>

        <div className="space-y-4">
          <Flex
            as="label"
            align="center"
            id={PageLinkPreference.PATH}
            className="cursor-pointer max-w-max"
          >
            <input
              className="!h-5 !w-5 border !bg-mauve-50 checked:!bg-blue-800 checked:!border-blue-800 !ring-blue-800 focus:outline-none transition duration-200 mt-0.5 mr-3 cursor-pointer"
              type="radio"
              name="page-prefference"
              id={PageLinkPreference.PATH}
              value={PageLinkPreference.PATH}
              checked={domainPreference === PageLinkPreference.PATH}
              onChange={handleDomainChange}
              disabled={updateUser.isLoading}
              aria-disabled={updateUser.isLoading}
            />
            <Text
              className="py-2 px-4 bg-mauve-200 rounded-lg max-w-max"
              variant="light"
            >
              biolnk.me/
              <span className="font-medium text-mauve-1000">{username}</span>
            </Text>
          </Flex>

          <Flex
            as="label"
            align="center"
            id={PageLinkPreference.SUBDOMAIN}
            className="cursor-pointer max-w-max"
          >
            <input
              className="!h-5 !w-5 border !bg-mauve-50 checked:!bg-blue-800 checked:!border-blue-800 !ring-blue-800 focus:outline-none transition duration-200 mt-0.5 mr-3 cursor-pointer"
              type="radio"
              name="page-prefference"
              id={PageLinkPreference.SUBDOMAIN}
              value={PageLinkPreference.SUBDOMAIN}
              checked={domainPreference === PageLinkPreference.SUBDOMAIN}
              onChange={handleDomainChange}
              disabled={updateUser.isLoading}
              aria-disabled={updateUser.isLoading}
            />
            <Text
              className="py-2 px-4 bg-mauve-200 rounded-lg max-w-max"
              variant="light"
            >
              <span className="font-medium text-mauve-1000">{username}</span>
              .biolnk.me
            </Text>
          </Flex>

          <Flex
            as="label"
            align="center"
            id={PageLinkPreference.CUSTOM}
            className="cursor-not-allowed max-w-max"
          >
            <input
              className="!h-5 !w-5 border !bg-mauve-50 checked:!bg-blue-800 checked:!border-blue-800 !ring-blue-800 focus:outline-none transition duration-200 mt-0.5 mr-3 cursor-pointer"
              type="radio"
              name="page-prefference"
              id={PageLinkPreference.CUSTOM}
              defaultValue={PageLinkPreference.CUSTOM}
              defaultChecked={domainPreference === PageLinkPreference.CUSTOM}
              disabled
              aria-disabled
            />
            <Text
              className="py-2 px-4 bg-mauve-200 rounded-lg max-w-max"
              variant="lighter"
            >
              yourdomain.com
            </Text>
          </Flex>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-0.5 bg-mauve-300 mt-7 mb-6" />

      <div>
        <Flex justify="between">
          <Heading as="h2" size="sm" className="pb-4 font-medium">
            Show support
          </Heading>

          <Toggle
            checked={supportToggle.isOpen}
            onCheckedChange={supportToggle.onToggle}
            variant="blue"
            size="md"
          />
        </Flex>

        <Text size="sm" variant="light">
          Show your support towards Biolnk by displaying our branding on your
          page
        </Text>
      </div>

      {/* Divider */}
      <div className="w-full h-0.5 bg-mauve-300 mt-7 mb-6" />

      <div>
        <Flex justify="between">
          <Heading as="h2" size="sm" className="pb-4 font-medium">
            Sensitive Content
          </Heading>

          <Toggle
            checked={sensitiveToggle.isOpen}
            onCheckedChange={sensitiveToggle.onToggle}
            variant="blue"
            size="md"
          />
        </Flex>

        <Text size="sm" variant="light">
          Visitors of your Biolnk will see a Sensitive Content message before
          being able to view your page.
        </Text>
      </div>
    </section>
  );
};

export default PreferenceSection;
