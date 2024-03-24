const LoadingPage = ({
  title = "Loading",
  description,
}: {
  title?: string;
  description?: string;
}) => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="flex flex-row items-center gap-4">
        <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-blue-500 border-solid" />
        <h2 className="text-4xl font-extrabold tracking-tight text-blue-500">
          {title}
        </h2>
      </div>
      {description && (
        <p className="text-md md:text-lg text-blue-400 font-medium mt-4 opacity-40">
          {description}
        </p>
      )}
    </div>
  );
};

export default LoadingPage;
