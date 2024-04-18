import ImageUploader from "@/components/ImageUploader/ImageUploader";
import SingleSelect from "@/components/SingleSelect/SingleSelect";
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
              className="bg-[#D9D9D9] rounded-[10px] border-none py-3 px-5 text-black text-lg leading-5 font-medium w-full placeholder:text-lg placeholder:leading-5 placeholder:text-[#9D9D9D] placeholder:font-medium"
              placeholder="Введите описание курса"
              rows={7}
            />
          </div>
          <div className="w-full flex gap-6">
            <SingleSelect
              name="Язык"
              options={["Выберите язык", "Русский", "Казахский", "Английский"]}
            />
            <SingleSelect
              name="Уровень"
              options={[
                "Выберите сложность",
                "Начинающий",
                "Средний",
                "Продвинутый",
              ]}
            />
            <SingleSelect
              name="Рекомендуемая нагрузка"
              options={[
                "Выберите нагрузку",
                "4-5 часов в неделю",
                "5-10 часов в неделю",
                "10-20 часов в неделю",
              ]}
            />
          </div>
        </div>
        <div>
          <h3>Чему Вы научитесь</h3>
          <textarea
            className=" bg-[#D9D9D9] rounded-[10px] border-none py-3 px-5 text-black text-lg leading-5 font-medium w-full placeholder:text-lg placeholder:leading-5 placeholder:text-[#9D9D9D] placeholder:font-medium"
            placeholder="Введите описание"
            rows={7}
          />
        </div>
        <button className="self-center bg-[#D9D9D9] text-[20px] font-medium hover:bg-[#A9A9A9] py-2 px-11 rounded-[10px]">
          Создать курс
        </button>
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
