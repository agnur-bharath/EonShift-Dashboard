const Message = ({
  title,
  description,
}: {
  title: string;
  description?: string;
}) => {
  return (
    <div
      className={"min-h-screen flex flex-col gap-1 justify-center items-center"}
    >
      <h1 className="text-5xl font-extrabold tracking-tight text-blue-500">
        {title}
      </h1>
      {description && <p className="text-2xl text-blue-400">{description}</p>}
    </div>
  );
};

export default Message;
