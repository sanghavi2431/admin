import { AdaptableCard } from "@/components/shared";
import ActiveBlogsTable from "./components/blogSubCategoryList";
import { injectReducer } from "@/store";
import reducer from "./store";
import BlogSubCategoryTableSearch from "./components/blogSubCategoryTableSearch";
import BlogSubCategoryTools from "./components/blogSubCategoryTools";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { initialTableData, setTableData } from "./store/dataSlice";
import { MdCategory } from "react-icons/md";
injectReducer("blogSubCategoryList", reducer);

function BlogSubCategoryList() {
  const dispatch = useDispatch()
  useEffect(() => {
    return (() => {
      dispatch(setTableData(initialTableData))
    })
  }, []);
  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
      <div className="flex items-center mb-4">
        <MdCategory size={"26"} />
        <h3 className="ml-5">Blog Sub-Category</h3>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between my-10 gap-3">
        <BlogSubCategoryTools/>
      <BlogSubCategoryTableSearch/>
      </div>
      <ActiveBlogsTable />
    </AdaptableCard>
  );
}
export default BlogSubCategoryList;
