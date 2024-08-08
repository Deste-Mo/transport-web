import { useState } from "react";
import Icon from "./Icon"
import SearchBar from "./SearchBar"


const ExpandableSearchBar = ({
  value="",
  setValue=()=>{},
}) => {
  const [expand, setExpand] = useState(false);

  return (
    <div>
        {
            expand ? (
                <SearchBar setValue={setValue} value={value} size="sm" variant="fill" radious="full" className="w-[24px]"/>
            ) : (
                <Icon onClick={() => setExpand(true)} size="sm" variant="secondary" icon="bi bi-search"/>
            )
        }
    </div>
  )
}

export default ExpandableSearchBar
