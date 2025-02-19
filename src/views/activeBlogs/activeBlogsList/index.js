import { AdaptableCard } from "@/components/shared";
import ActiveBlogsTable from "./components/activeBlogsList";
import { injectReducer } from "@/store";
import { BsFileEarmarkCheckFill } from "react-icons/bs";
import reducer from "./store";
import BlogTools from "./components/activeBlogsTools";
injectReducer("activeBlogsList", reducer);

function ActiveBlogsList() {
  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
      <div className="md:flex items-center justify-between mb-6">
        <div className="flex items-center mb-4">
          <BsFileEarmarkCheckFill size={"26"} />
          <h3 className="ml-5">Active Blogs</h3>
        </div>
          <BlogTools/>
      </div>
      <ActiveBlogsTable />
    </AdaptableCard>
  );
}
export default ActiveBlogsList;
