import Skeleton from "react-loading-skeleton";
import { AccountLayout } from "~/components/layouts";
import { Flex } from "@biolnk/ui";
import { FC } from "react";

const AccountSkeleton: FC = () => {
  return (
    <AccountLayout>
      <section className="bg-mauve-50 rounded pt-4 pb-5 px-6 shadow-sm">
        <Skeleton width={100} height={19} className="mb-2" />
        <Skeleton width={220} height={15} />

        <Flex className="mt-9 space-y-4" layout="vertical">
          <Flex className="w-full">
            <Skeleton width={135} height={16} />
            <Skeleton containerClassName="block w-full ml-20" height={37} />
          </Flex>

          <Flex className="w-full">
            <Skeleton width={135} height={16} />
            <Skeleton containerClassName="block w-full ml-20" height={37} />
          </Flex>

          <Flex className="w-full">
            <Skeleton width={135} height={16} />
            <Skeleton containerClassName="block w-full ml-20" height={37} />
          </Flex>
        </Flex>
      </section>

      <section className="bg-mauve-50 rounded pt-4 pb-5 px-6 shadow-sm">
        <div className="w-full h-0.5 bg-mauve-300 mb-7 mt-1" />
        <Skeleton width={100} height={19} className="mb-2" />
        <Skeleton width={220} height={15} />

        <Flex className="mt-9 space-y-4" layout="vertical">
          <Flex className="w-full" align="center">
            <Skeleton circle width={20} height={20} />
            <Skeleton containerClassName="ml-3" width={170} height={40} />
          </Flex>

          <Flex className="w-full" align="center">
            <Skeleton circle width={20} height={20} />
            <Skeleton containerClassName="ml-3" width={170} height={40} />
          </Flex>

          <Flex className="w-full" align="center">
            <Skeleton circle width={20} height={20} />
            <Skeleton containerClassName="ml-3" width={170} height={40} />
          </Flex>
        </Flex>

        <Flex layout="vertical">
          <div className="w-full h-0.5 bg-mauve-300 mt-9 mb-7" />

          <Flex justify="between">
            <Skeleton width={130} height={19} className="mb-2" />

            <Skeleton width={70} height={34} className="!rounded-2xl" />
          </Flex>

          <Skeleton width={260} height={15} />
        </Flex>

        <Flex layout="vertical">
          <div className="w-full h-0.5 bg-mauve-300 mt-7 mb-7" />

          <Flex justify="between">
            <Skeleton width={130} height={19} className="mb-2" />

            <Skeleton width={70} height={34} className="!rounded-2xl" />
          </Flex>

          <Skeleton width={260} height={15} />
        </Flex>
      </section>

      <section className="bg-mauve-50 rounded pt-4 pb-5 px-6 shadow-sm">
        <div className="w-full h-0.5 bg-mauve-300 mb-7" />
        <Skeleton width={100} height={19} className="mb-2" />
        <Skeleton width={220} height={15} />

        <Flex className="mt-9 space-y-4" layout="vertical">
          <Flex className="w-full">
            <Skeleton width={135} height={16} />
            <Skeleton containerClassName="block w-full ml-20" height={37} />
          </Flex>

          <Flex className="w-full">
            <Skeleton width={135} height={16} />
            <Skeleton containerClassName="block w-full ml-20" height={37} />
          </Flex>

          <Flex className="w-full">
            <Skeleton width={135} height={16} />
            <Skeleton containerClassName="block w-full ml-20" height={37} />
          </Flex>
        </Flex>
      </section>
    </AccountLayout>
  );
};

export default AccountSkeleton;
