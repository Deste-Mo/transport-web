const FriendCardLoading = ({ className }) => {
  return (
    <div
      className={`flex items-center justify-between gap-4 w-full  rounded-xl p-4  ${className}`}
    >
      <div className="flex items-center relative gap-2">
        <div className="loader-tag-2 rounded-full size-12"></div>
        <div className="flex flex-col gap-2">
          <div className="loader-tag-2 rounded-full w-[128px] h-[24px]"></div>
          <div className="loader-tag-2 rounded-full w-[84px] h-[12px]"></div>
        </div>
      </div>
      <div className="loader-tag-2 rounded-xl w-1/2 h-[40px]"></div>
    </div>
  );
};

export default FriendCardLoading;
