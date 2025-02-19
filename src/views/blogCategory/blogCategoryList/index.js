import { AdaptableCard } from "@/components/shared";
import BlogCategoryTable from "./components/blogCategoryList";
import { injectReducer } from "@/store";
import { BsFileEarmarkCheckFill } from "react-icons/bs";
import reducer from "./store";
import BlogCategoryTableSearch from "./components/blogCategoryTableSearch";
import BlogCategoryTools from "./components/blogCategoryTools";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { initialTableData, setTableData } from "./store/dataSlice";
import { BiCategory } from "react-icons/bi";
injectReducer("blogCategory", reducer);

function ActiveBlogsList() {
  const dispatch = useDispatch()
  useEffect(() => {
    return (() => {
      dispatch(setTableData(initialTableData))
    })
  }, []);
  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
      <div className="flex items-center mb-4">
        <BiCategory size={"30"} />
        <h3 className="ml-5">Blog Category</h3>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between my-10 gap-3">
      <BlogCategoryTools/>
      <BlogCategoryTableSearch/>

      </div>
      <BlogCategoryTable />
    </AdaptableCard>
  );
}
export default ActiveBlogsList;
