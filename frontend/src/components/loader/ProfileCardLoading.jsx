

const ProfileCardLoading = () => {
  return (
    <div className="flex flex-col gap-6 rounded-xl shadow-sm border text-black-100 dark:text-white-100 border-black-0 p-4 bg-white-100 dark:bg-black-100 dark:border-none w-full">
      <div className="flex justify-between items-center">
        <div className="w-full flex flex-col items-center justify-center gap-4">
          <div className="loader-tag-2 size-[84px] rounded-full"></div>
          <div className="loader-tag-2 rounded-full w-[254px] h-[40px]">
          </div>
        </div>
      </div>
      <div
        className={`flex w-full text-base text-black-100 
           items-center justify-between
        `}
      >
          <div className="loader-tag-2 rounded-full w-[184px] h-[32px]"/>
          <div className="loader-tag-2 rounded-full w-[184px] h-[32px]"/>
          <div className="loader-tag-2 rounded-full w-[184px] h-[32px]"/>
        
      </div>

      <div className="loader-tag-2 rounded-xl w-full h-[44px]"/>

    </div>
  );
};
export default ProfileCardLoading
