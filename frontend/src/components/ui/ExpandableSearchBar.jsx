import { useState } from "react";
import Icon from "./Icon"
import SearchBar from "./SearchBar"


const ExpandableSearchBar = () => {
  const [expand, setExpand] = useState(false);

  const handleSearch = () => {
    setExpand(false);
    // TODO :
    /*

    */
  }
  return (
    <div>
        {
            expand ? (
                <SearchBar onClick={() => handleSearch()} size="sm" variant="fill" radious="full" className="w-[24px]"/>
            ) : (
                <Icon onClick={() => setExpand(true)} size="sm" variant="secondary" icon="bi bi-search"/>
            )
        }
    </div>
  )
}

export default ExpandableSearchBar
