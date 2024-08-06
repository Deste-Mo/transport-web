

const ProfileLeftLoading = () => {
  return (
<div className="flex flex-col gap-6 rounded-xl shadow-sm border border-black-0 p-4 bg-white-100 dark:bg-black-100 dark:border-none w-full">
      <div >
      <div className="flex justify-between items-center">
        <div className="w-full flex flex-col items-center justify-center gap-4">
          <div className="loader-tag-2 size-[84px] rounded-full"></div>
          <div className="loader-tag-2 rounded-full w-[254px] h-[24px]">
          </div>
        </div>
      </div>
      </div>
      <div
        className={`flex gap-4 text-base text-black-80  dark:text-white-80
          flex-col
        `}
      >
        <div className="loader-tag-2 rounded-xl w-full h-[24px]"></div>
        <div className="loader-tag-2 rounded-xl w-full h-[24px]"></div>
      </div>
        <div className="loader-tag-2 rounded-xl w-full h-[40px]"></div>

    </div>
  )
}

export default ProfileLeftLoading
