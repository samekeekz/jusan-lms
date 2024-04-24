import ImageUploader from "@/components/ImageUploader/ImageUploader";
import SingleSelect from "@/components/SingleSelect/SingleSelect";
import VideoUploader from "@/components/VideoUploader/VideoUploader";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { editCourse } from "@/store/slices/courseSlice";
import { enqueueSnackbar } from "notistack";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const CourseEdit = () => {
  const { id } = useParams();
  const state = useAppSelector((state) => state.course);
  const course = state.courses.find((course) => course.id === Number(id));
  const dispatch = useAppDispatch();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewURL, setPreviewURL] = useState<string>(
    localStorage.getItem(course?.course_name || "") || ""
  );
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    course_name: course ? course.course_name : "",
    course_description: course ? course.course_description : "",
    learn_description: course ? course.learn_description : "",
  });

  const handleFormChange = (
    e: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target as HTMLInputElement | HTMLTextAreaElement;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageSelect = (file: File | null, previewURL: string) => {
    setSelectedImage(file);
    setPreviewURL(previewURL);
  };

  const [selectedOptions, setSelectedOptions] = useState({
    language: course ? course.language : "",
    level: course ? course.level : "",
    load: course ? course.recommended_load : "",
  });

  const handleSelect = (name: string, option: string) => {
    setSelectedOptions({ ...selectedOptions, [name]: option });
  };

  const handleClick = (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    const data = {
      id: course ? course.id : state.courses.length + 1 || 1,
      course_name: formData.get("course_name")?.toString() || "",
      course_description: formData.get("course_description")?.toString() || "",
      learn_description: formData.get("learn_description")?.toString() || "",
      language: selectedOptions.language,
      level: selectedOptions.level,
      recommended_load: selectedOptions.load,
      logo: selectedImage || new File([], ""),
      video: "",
      score: course?.score || 0,
      modules: course?.modules || [],
    };

    localStorage.setItem(data.course_name, previewURL);

    console.log(data);

    enqueueSnackbar("Курс успешно обновлен", { variant: "success" });

    dispatch(editCourse(data));

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
          {course && (
            <>
              <div className="w-full h-[640px] flex flex-col">
                <div className="flex items-start gap-10 mt-[52px] mb-12">
                  <ImageUploader
                    selectedImage={selectedImage}
                    previewURL={previewURL}
                    onImageSelect={handleImageSelect}
                  />
                  <VideoUploader />
                </div>
                <div className="mb-8">
                  <h3>Название курса*</h3>
                  <input
                    className="bg-[#D9D9D9] rounded-[10px] border-none py-3 px-5 text-black text-lg leading-5 font-medium w-full placeholder:text-lg placeholder:leading-5 placeholder:text-black placeholder:font-medium"
                    type="text"
                    name="course_name"
                    placeholder="Введите название курса"
                    value={formData.course_name}
                    onChange={handleFormChange}
                  />
                </div>
                <div>
                  <h3>О курсе</h3>
                  <textarea
                    className="bg-[#D9D9D9] rounded-[10px] border-none py-3 px-5 text-black text-lg leading-5 font-medium w-full placeholder:text-lg placeholder:leading-5 placeholder:text-[#9D9D9D] placeholder:font-medium"
                    placeholder="Введите описание курса"
                    rows={7}
                    name="course_description"
                    value={formData.course_description}
                    onChange={handleFormChange}
                  />
                </div>
                <div className="w-full flex gap-6">
                  <SingleSelect
                    header="Язык курса*"
                    name="language"
                    options={["Казахский", "Русский", "Английский"]}
                    selected={selectedOptions["language"]}
                    onSelect={handleSelect}
                  />
                  <SingleSelect
                    header="Сложность*"
                    name="level"
                    options={["Начинающий", "Средний", "Продвинутый"]}
                    selected={selectedOptions["level"]}
                    onSelect={handleSelect}
                  />
                  <SingleSelect
                    header="Нагрузка*"
                    name="load"
                    options={[
                      "4-5 часов в неделю",
                      "5-10 часов в неделю",
                      "10-20 часов в неделю",
                    ]}
                    selected={selectedOptions["load"]}
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
                  value={formData.learn_description}
                  onChange={handleFormChange}
                />
              </div>
              <button className="self-center mt-10 mx-auto block bg-[#D9D9D9] text-[20px] font-medium hover:bg-[#A9A9A9] py-2 px-11 rounded-[10px]">
                Сохранить
              </button>
            </>
          )}
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

export default CourseEdit;
