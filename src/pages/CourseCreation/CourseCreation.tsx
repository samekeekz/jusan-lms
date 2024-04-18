import ImageUploader from "@/components/ImageUploader/ImageUploader";
import VideoUploader from "@/components/VideoUploader/VideoUploader";

const CourseCreation = () => {
  return (
    <div className="flex items-start  gap-14">
      <div className="flex grow flex-col justify-center">
        <h1 className="font-bold text-[34px] leading-6 mb-3">Описание курса</h1>
        <div className="w-full h-[640px] flex flex-col">
          <div className="flex items-start gap-10 mt-[52px] mb-12">
            <ImageUploader />
            <VideoUploader />
          </div>
          <div className="mb-8">
            <h3>Название курса*</h3>
            <input
              className="bg-[#D9D9D9] rounded-[10px] border-none py-3 px-5 text-black text-lg leading-5 font-medium w-full placeholder:text-lg placeholder:leading-5 placeholder:text-black placeholder:font-medium"
              type="text"
              placeholder="Введите название курса"
            />
          </div>
          <div>
            <h3>О курсе</h3>
            <textarea
              className="bg-[#D9D9D9] rounded-[10px] border-none py-3 px-5 text-black text-lg leading-5 font-medium w-full placeholder:text-lg placeholder:leading-5 placeholder:text-black placeholder:font-medium"
              placeholder="Введите название курса"
            />
          </div>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-3 bg-[#D9D9D9] rounded-[20px] px-5 py-4">
        <div className="w-[50px] h-[50px] bg-white rounded-full"></div>
        <div className="flex flex-col">
          <p>Самат Белентбай</p>
          <p className="underline cursor-pointer">Ментор</p>
        </div>
      </div>
    </div>
  );
};

export default CourseCreation;
