// import { useState } from "react";
// import MarkdownEditor, { ICommand } from "@uiw/react-markdown-editor";
// import { EditorContext } from "@uiw/react-md-editor";

// const mdStr = `# This is a H1  \n## This is a H2  \n###### This is a H6`;

// const uploadImage: ICommand = {
//   name: "uploadImage",
//   keyCommand: "uploadImage",
//   icon: (
//     <svg width="12" height="12" viewBox="0 0 512 512">
//       <path
//         fill="currentColor"
//         d="M256 288c35.29 0 64-28.71 64-64s-28.71-64-64-64-64 28.71-64 64 28.71 64 64 64zm0 32c-48.52 0-144 29.31-144 88v48h288v-48c0-58.69-95.48-88-144-88zm112-96h-224l96-96 96 96z"
//       />
//     </svg>
//   ),
//   execute: () => {
//     const input = document.createElement("input");
//     input.type = "file";
//     input.accept = "image/*";
//     input.onchange = (event) => {
//       const file = (event.target as HTMLInputElement)?.files?.[0];
//       if (file) {
//         const reader = new FileReader();
//         reader.onload = (e) => {
//           if (e.target && typeof e.target.result === "string") {
//             const imageUrl = e.target.result;
//             const markdownImageSyntax = `![Image Description](${imageUrl})\n`;
//             // Append the markdown image syntax to the editor content
//             const editor = ; // Implement this function to get the editor instance
//             editor?.insert(markdownImageSyntax); // Insert the markdown image syntax at the current cursor position
//           }
//         };
//         reader.readAsDataURL(file);
//       }
//     };
//     input.click();
//   },
// };

// const Lesson = () => {
//   const [markdown, setMarkdown] = useState(mdStr);
//   return (
//     <div data-color-mode="light">
//       <MarkdownEditor
//         value={markdown}
//         height="500px"
//         onChange={(value) => setMarkdown(value)}
//         toolbars={[
//           "bold",
//           "italic",
//           "underline",
//           "link",
//           "quote",
//           "image",
//           uploadImage,
//           "code",
//           "undo",
//           "redo",
//           "preview",
//           "fullscreen",
//         ]}
//       />
//     </div>
//   );
// };

// export default Lesson;

import {
  AdmonitionDirectiveDescriptor,
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  ChangeCodeMirrorLanguage,
  CodeToggle,
  ConditionalContents,
  CreateLink,
  DiffSourceToggleWrapper,
  InsertCodeBlock,
  InsertImage,
  InsertSandpack,
  InsertTable,
  InsertThematicBreak,
  ListsToggle,
  MDXEditor,
  MDXEditorMethods,
  SandpackConfig,
  ShowSandpackInfo,
  UndoRedo,
  codeBlockPlugin,
  codeMirrorPlugin,
  diffSourcePlugin,
  directivesPlugin,
  headingsPlugin,
  imagePlugin,
  linkDialogPlugin,
  linkPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  quotePlugin,
  sandpackPlugin,
  tablePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
} from "@mdxeditor/editor";
import { useRef, useState } from "react";
import "@mdxeditor/editor/style.css";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useParams } from "react-router-dom";
import SingleSelect from "@/components/SingleSelect/SingleSelect";
import { editLesson } from "@/store/slices/courseSlice";

const defaultSnippetContent = `
export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
`.trim();

const Lesson = () => {
  const { id, moduleId, lessonId } = useParams();
  const dispatch = useAppDispatch();
  const { courses } = useAppSelector((state) => state.course);
  const course = courses.find((course) => course.id === Number(id));
  const module = course?.modules.find(
    (module) => module.id === Number(moduleId)
  );
  const lesson = module?.lessons.find(
    (lesson) => lesson.id === Number(lessonId)
  );
  const [lessonName, setLessonName] = useState(lesson?.lesson_name || "");
  const [selectedLanguage, setSelectedLanguage] = useState(
    lesson?.language || ""
  );

  const handleSelect = (name: string, option: string) => {
    setSelectedLanguage(option);
  };

  const ref = useRef<MDXEditorMethods>(null);
  const [md, setMd] = useState(lesson?.markdown || "");

  const simpleSandpackConfig: SandpackConfig = {
    defaultPreset: "react",
    presets: [
      {
        label: "React",
        name: "react",
        meta: "live react",
        sandpackTemplate: "react",
        sandpackTheme: "light",
        snippetFileName: "/App.js",
        snippetLanguage: "jsx",
        initialSnippetContent: defaultSnippetContent,
      },
    ],
  };

  async function imageUploadHandler(image: File) {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && typeof event.target.result === "string") {
          resolve(event.target.result);
        } else {
          reject(new Error("Failed to read image file."));
        }
      };
      reader.onerror = () => {
        reject(new Error("Failed to read image file."));
      };
      reader.readAsDataURL(image);
    });
  }

  const handleSave = () => {
    if (!course || !module || !lesson) return;
    const updatedLesson = {
      ...lesson,
      lesson_name: lessonName,
      language: selectedLanguage,
      markdown: md,
    };
    dispatch(
      editLesson({
        courseId: course.id,
        moduleId: module.id,
        lessonId: lesson.id,
        updatedLesson: updatedLesson,
      })
    );
  };
  return (
    <div className="h-screen flex flex-col items-center">
      <div className="self-stretch w-full border-[#D9D9D9] border-[2px] border-solid rounded-[10px] py-[5px] px-4 mb-2">
        <input
          className="text-lg w-full"
          type="text"
          placeholder="Название подглавы"
          value={lessonName}
          onChange={(e) => setLessonName(e.target.value)}
        />
      </div>
      <div className="self-start mb-[58px]">
        <SingleSelect
          type="white"
          name="language"
          options={["Казахский", "Русский", "Английский"]}
          selected={selectedLanguage}
          onSelect={handleSelect}
        />
      </div>
      <MDXEditor
        className="self-stretch"
        ref={ref}
        markdown={md}
        onChange={(value) => setMd(value)}
        plugins={[
          headingsPlugin({ allowedHeadingLevels: [1, 2, 3, 4, 5, 6] }),
          listsPlugin(["bullet", "number", "check"]),
          quotePlugin(),
          thematicBreakPlugin(),
          linkPlugin(),
          linkDialogPlugin(),
          markdownShortcutPlugin(),
          tablePlugin(),
          sandpackPlugin(),
          codeBlockPlugin({ defaultCodeBlockLanguage: "js" }),
          sandpackPlugin({ sandpackConfig: simpleSandpackConfig }),
          codeMirrorPlugin({
            codeBlockLanguages: {
              js: "JavaScript",
              ts: "TypeScript",
              css: "CSS",
            },
          }),
          directivesPlugin({
            directiveDescriptors: [AdmonitionDirectiveDescriptor],
          }),
          diffSourcePlugin({
            diffMarkdown: "An older version",
            viewMode: "rich-text",
          }),

          imagePlugin({ imageUploadHandler }),
          thematicBreakPlugin(),
          toolbarPlugin({
            toolbarContents: () => (
              <DiffSourceToggleWrapper>
                <UndoRedo />
                <BoldItalicUnderlineToggles />
                <CodeToggle />
                <ListsToggle options={["bullet", "number", "check"]} />
                <BlockTypeSelect />
                <CreateLink />
                <InsertImage />
                <InsertTable />
                <InsertThematicBreak />
                <ConditionalContents
                  options={[
                    {
                      when: (editor) => editor?.editorType === "codeblock",
                      contents: () => <ChangeCodeMirrorLanguage />,
                    },
                    {
                      when: (editor) => editor?.editorType === "sandpack",
                      contents: () => <ShowSandpackInfo />,
                    },
                    {
                      fallback: () => (
                        <>
                          <InsertCodeBlock />
                          <InsertSandpack />
                        </>
                      ),
                    },
                  ]}
                />
              </DiffSourceToggleWrapper>
            ),
          }),
        ]}
      />
      <button
        className="self-center bg-[#D9D9D9] hover:bg-[#A9A9A9] py-2 px-8 rounded-[10px]"
        onClick={handleSave}
      >
        Сохранить
      </button>
    </div>
  );
};

export default Lesson;
