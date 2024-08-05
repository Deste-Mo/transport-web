import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import Icon from "./Icon";
import { globalInputVariants } from "../../styles/globals.input";

const FileInput = ({
  setFile = () => {},
  name = "",
  onChange = () => {},
  onError = () => {},
  className = "",
  block = false,
  inputClassName=""
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

  const fileInputClassName = `flex items-center justify-between ${
    block ? "w-full" : `null`
  } ${className}`;

  return (
    <div className={fileInputClassName}>
      <Icon
        icon="bi-folder"
        size="lg"
        className="rounded-md m-0"
        onClick={() => handleClick(fileRef)}
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
        />
        <label htmlFor="" className="text-black-40 dark:text-white-40">
          {fileRef.current?.value
            ?.split("\\")
            [fileRef.current?.value?.split("\\").length - 1].substr(-20) ||
            "Ajouter un photo"}
        </label>
      </div>
      <Icon className={inputClassName} size="md" variant="danger" icon="bi-trash" onClick={removeFiles} />
    </div>
  );
};

FileInput.propTypes = {
  setFile: PropTypes.func,
  name: PropTypes.string,
  onChange: PropTypes.func,
  onError: PropTypes.func,
  className: PropTypes.string,
  block: PropTypes.bool,
  inputClassName: PropTypes.string
};

export default FileInput;
