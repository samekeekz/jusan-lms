import ImageUploader from "@/components/ImageUploader/ImageUploader";
import SingleSelect from "@/components/SingleSelect/SingleSelect";
import VideoUploader from "@/components/VideoUploader/VideoUploader";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { addCourse } from "@/store/slices/courseSlice";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CourseCreation = () => {
  const state = useAppSelector((state) => state.course);
  const dispatch = useAppDispatch();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewURL, setPreviewURL] = useState<string>("");
  const navigate = useNavigate();

  const handleImageSelect = (file: File | null, previewURL: string) => {
    setSelectedImage(file);
    setPreviewURL(previewURL);
  };

  const [selectedOptions, setSelectedOptions] = useState({
    language: "",
    level: "",
    load: "",
  });

  const handleSelect = (name: string, option: string) => {
    setSelectedOptions({ ...selectedOptions, [name]: option });
  };

  const handleClick = (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    const data = {
      id: state.courses.length + 1 || 1,
      course_name: formData.get("course_name")?.toString() || "",
      course_description: formData.get("course_description")?.toString() || "",
      learn_description: formData.get("learn_description")?.toString() || "",
      language: selectedOptions.language,
      level: selectedOptions.level,
      recommended_load: selectedOptions.load,
      logo: selectedImage || new File([], ""),
      video: "",
      modules: [],
    };

    localStorage.setItem(data.course_name, previewURL);

    console.log(data);

    dispatch(addCourse(data));

    (e.target as HTMLFormElement).reset();
    setSelectedImage(null);
    setPreviewURL("");
    setSelectedOptions({
      language: "",
      level: "",
      load: "",
    });

    navigate("/learn/courses");
  };

  useEffect(() => {
    console.log("Course added to store", state.courses);
  }, [state.courses]);

  return (
    <div className="flex items-start  gap-14">
      <div className="flex grow flex-col justify-center">
        <h1 className="font-bold text-[34px] leading-6 mb-3">Описание курса</h1>
        <form onSubmit={handleClick}>
          <div className="w-full h-[640px] flex flex-col">
            <div className="flex items-start gap-10 mt-[52px] mb-12">
              <ImageUploader
                selectedImage={selectedImage}
                previewURL={previewURL}
                onImageSelect={handleImageSelect}
              />{" "}
              <VideoUploader />
            </div>
            <div className="mb-8">
              <h3>Название курса*</h3>
              <input
                className="bg-[#D9D9D9] rounded-[10px] border-none py-3 px-5 text-black text-lg leading-5 font-medium w-full placeholder:text-lg placeholder:leading-5 placeholder:text-black placeholder:font-medium"
                type="text"
                name="course_name"
                placeholder="Введите название курса"
              />
            </div>
            <div>
              <h3>О курсе</h3>
              <textarea
                className="bg-[#D9D9D9] rounded-[10px] border-none py-3 px-5 text-black text-lg leading-5 font-medium w-full placeholder:text-lg placeholder:leading-5 placeholder:text-[#9D9D9D] placeholder:font-medium"
                placeholder="Введите описание курса"
                rows={7}
                name="course_description"
              />
            </div>
            <div className="w-full flex gap-6">
              <SingleSelect
                header="Язык курса*"
                name="language"
                options={[
                  "Выберите язык",
                  "Казахский",
                  "Русский",
                  "Английский",
                ]}
                onSelect={handleSelect}
              />
              <SingleSelect
                header="Сложность*"
                name="level"
                options={[
                  "Выберите сложность",
                  "Начинающий",
                  "Средний",
                  "Продвинутый",
                ]}
                onSelect={handleSelect}
              />
              <SingleSelect
                header="Нагрузка*"
                name="load"
                options={[
                  "Выберите нагрузку",
                  "4-5 часов в неделю",
                  "5-10 часов в неделю",
                  "10-20 часов в неделю",
                ]}
                onSelect={handleSelect}
              />
            </div>
          </div>
          <div>
            <h3>Чему Вы научитесь</h3>
            <textarea
              className=" bg-[#D9D9D9] rounded-[10px] border-none py-3 px-5 text-black text-lg leading-5 font-medium w-full placeholder:text-lg placeholder:leading-5 placeholder:text-black placeholder:font-medium"
              placeholder="Введите описание"
              rows={7}
              name="learn_description"
            />
          </div>
          <button className="block mx-auto self-center bg-[#D9D9D9] text-[20px] font-medium hover:bg-[#A9A9A9] py-2 px-11 rounded-[10px]">
            Создать курс
          </button>
        </form>
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
