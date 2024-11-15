import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import Icon from "./Icon";
import { globalInputVariants } from "../../styles/globals.input";

const fileInputStyle = {
  MODERNE: "modern",
  BASIC: "basic",
};

const FileInput = ({
  setFile = () => {},
  name = "",
  onChange = () => {},
  onError = () => {},
  className = "",
  block = false,
  inputClassName = "",
  iconVariant,
  icon = "bi bi-folder",
  style = fileInputStyle.BASIC,
  inputDisabled = false,
}) => {
  const fileRef = useRef(null);
  const [error, setError] = useState(true);
  const [selectedFile, setSelectedFile] = useState("");

  const handleChangeFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const fileReader = new FileReader();
      let filePath = "";
      fileReader.readAsDataURL(e.target.files[0]);

      fileReader.addEventListener("load", function () {
        filePath = fileReader.result;
        setSelectedFile({
          name: e.target.files[0].name,
          path: filePath,
        });
        setFile({
          name: e.target.files[0].name,
          path: filePath,
        });
      });
    }
  };

  const handleClick = (ref) => {
    if (ref.current) ref.current.click();
  };

  const removeFiles = () => {
    setSelectedFile("");
    fileRef.current.value = "";
    setError(true);
    setFile("");
  };

  useEffect(() => {
    onError(error, { target: { name: name } });
  }, [error]);

  switch (style) {
    case fileInputStyle.BASIC:
      return (
        <BasicFileInput
          iconVariant={iconVariant}
          block={block}
          className={className}
          icon={icon}
          inputClassName={inputClassName}
          name={name}
          onChange={onChange}
          onError={onError}
          fileRef={fileRef}
          removeFiles={removeFiles}
          handleClick={handleClick}
          handleChangeFile={handleChangeFile}
          setError={setError}
          inputDisabled={inputDisabled}
        />
      );
    case fileInputStyle.MODERNE:
      return (
        <ModernFileInput
          selectedFile={selectedFile}
          iconVariant={iconVariant}
          block={block}
          className={className}
          icon={icon}
          inputClassName={inputClassName}
          name={name}
          onChange={onChange}
          onError={onError}
          setFile={setFile}
          fileRef={fileRef}
          removeFiles={removeFiles}
          handleClick={handleClick}
          handleChangeFile={handleChangeFile}
          setError={setError}
          inputDisabled={inputDisabled}
        />
      );
    default:
      return (
        <BasicFileInput
          iconVariant={iconVariant}
          block={block}
          className={className}
          icon={icon}
          inputClassName={inputClassName}
          name={name}
          onChange={onChange}
          onError={onError}
          fileRef={fileRef}
          removeFiles={removeFiles}
          handleClick={handleClick}
          handleChangeFile={handleChangeFile}
          setError={setError}
          inputDisabled={inputDisabled}
        />
      );
  }
};


FileInput.propTypes = {
  setFile: PropTypes.func,
  name: PropTypes.string,
  onChange: PropTypes.func,
  onError: PropTypes.func,
  className: PropTypes.string,
  block: PropTypes.bool,
  inputClassName: PropTypes.string,
};

export default FileInput;

const BasicFileInput = ({
  setFile = () => {},
  name = "",
  onChange = () => {},
  onError = () => {},
  className = "",
  block = false,
  inputClassName = "",
  iconVariant,
  icon = "bi bi-folder",
  fileRef,
  removeFiles,
  handleClick,
  setError,
  handleChangeFile,
  inputDisabled = false,
}) => {
  const fileInputClassName = `flex items-center justify-between ${
    block ? "w-full" : `null`
  } ${className}`;
  return (
    <div className={fileInputClassName}>
      <Icon
        icon={icon}
        size="lg"
        variant={iconVariant}
        className=" m-0"
        onClick={() => handleClick(fileRef)}
        disabled={inputDisabled}
      />
      <div className={inputClassName}>
        <input
          ref={fileRef}
          type="file"
          className="-z-10 hidden text-black w-[0.1px] h-[0.1px] input-file dark:text-white"
          accept=".png,.jpeg, .jpg"
          onChange={(e) => {
            handleChangeFile(e);
            onChange(e);
            setError(fileRef.current?.value === "");
          }}
          name={name}
          disabled={inputDisabled}
        />
        <label htmlFor="" className="text-black-40 dark:text-white-40">
          {fileRef.current?.value
            ?.split("\\")
            [fileRef.current?.value?.split("\\").length - 1].substr(-20) ||
            "Ajoutez un photo"}
        </label>
      </div>
      <Icon
        className={inputClassName}
        size="md"
        variant="danger"
        icon="bi-trash"
        onClick={removeFiles}
        disabled={inputDisabled}
      />
    </div>
  );
};
const ModernFileInput = ({
  selectedFile,
  setFile = () => {},
  name = "",
  onChange = () => {},
  onError = () => {},
  className = "",
  block = false,
  inputClassName = "",
  iconVariant,
  icon = "bi bi-folder",
  fileRef,
  removeFiles,
  handleClick,
  setError,
  handleChangeFile,
  inputDisabled = false,
}) => {
  const fileInputClassName = `flex flex-col gap-2 items-center justify-between ${
    block && "w-full"
  } ${className}`;

  return (
    <div className={fileInputClassName}>
      {/* <Icon
        icon={icon}
        size="lg"
        variant={iconVariant}
        className="rounded-md m-0"
        onClick={() => handleClick(fileRef)}
      /> */}
      <div
        onClick={() => handleClick(fileRef)}
        className="bg-black-10 relative cursor-pointer dark:bg-white-10 size-[128px] rounded-xl flex items-center justify-center"
      >
        {selectedFile && (
          <Icon
            className="absolute top-2 right-2"
            size="sm"
            variant="secondary"
            icon="bi-x-lg"
            onClick={removeFiles}
          />
        )}
        {selectedFile ? (
          <i className="bi bi-image text-[64px] text-black-100 dark:text-white-100"></i>
        ) : (
          <img src={selectedFile?.path} />
        )}
      </div>
      <div className={inputClassName}>
        <input
          ref={fileRef}
          type="file"
          className="-z-10 hidden text-black w-[0.1px] h-[0.1px] input-file dark:text-white"
          accept=".png,.jpeg, .jpg"
          onChange={(e) => {
            handleChangeFile(e);
            onChange(e);
            setError(fileRef.current?.value === "");
          }}
          name={name}
          disabled={inputDisabled}
        />
        <label htmlFor="" className="text-black-40 dark:text-white-40">
          {fileRef.current?.value
            ?.split("\\")
            [fileRef.current?.value?.split("\\").length - 1].substr(-20) ||
            "Ajoutez un photo"}
        </label>
      </div>
    </div>
  );
};
