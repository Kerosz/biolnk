import ComingSoon from "../ComingSoon";

const PreviewEmbed: React.FC = () => {
  return (
    <aside className="hidden md:block col-span-2 px-3">
      <ComingSoon showExtras={false} showTitle={false} />
    </aside>
  );
};

export default PreviewEmbed;
