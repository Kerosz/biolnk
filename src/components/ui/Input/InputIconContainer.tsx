export default function InputIconContainer({ icon }: any) {
  return (
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-600 dark:text-white">
      {icon}
    </div>
  );
}
