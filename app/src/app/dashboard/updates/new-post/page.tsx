"use client"
import { IBlog } from "@/interfaces";
import { useState } from "react";
import { AdminPageHeader } from "../../_components/admin-sections";
import BaseTable from "@/components/table/base-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { blogList } from "@/lib/mock/blogs";
import { blogColumns } from "../_components/blogs.columns";
import { IconPlus } from "@tabler/icons-react";
import { Label } from "@/components/ui/label";
import { TextArea } from "@/components/ui/textarea";

export default function NewPostPage() {
  const [data, setData] = useState<IBlog[]>(blogList);

  return (

    <div className="flex flex-col self-stretch px-16 mt-8 max-md:px-5 max-md:max-w-full">
      <div className="flex items-center gap-3 justify-between flex-col md:flex-row mb-4">
        <AdminPageHeader title="Updates" />

      </div>
      <div className="flex flex-wrap w-full gap-6 mt-4 items-center justify-between">
        <p className="text-3xl text-[#424242] font-medium">Publish New Post</p>
        <div className="flex gap-4 items-center">
          <Button className="flex items-center gap-3 font-bold" variant={"outline"} >
            <IconPlus size={'1.1rem'} />
            Save as Draft
          </Button>
          <Button className="flex items-center gap-3 font-bold">
            <IconPlus size={'1.1rem'} />
            Publish Post
          </Button>
        </div>
      </div>
      <div className="flex pt-4 gap-4">
        <div className="flex w-2/3 p-7 gap-6 bg-white rounded-md flex-col">
          <div className="flex gap-2 flex-col">
            <Label>Title*</Label>
            <Input placeholder="Free Plan" />
          </div>
          <div className="flex gap-2 flex-col">
            <Label>Content*</Label>
            <TextArea placeholder="Enter Description" />
          </div>
          <div className="flex gap-4">
            <div className="flex gap-2 flex-col">
              <Label>Featured image*</Label>
              <div className="flex rounded-md border justify-center items-center w-72 h-64 p-7">
                <Button>Upload Image</Button>
              </div>
            </div>
            <div className="flex gap-2 flex-col">
              <Label>Featured image*</Label>
              <div className="flex rounded-md border justify-center items-center w-72 h-64 p-7">
                <Button>Upload Image</Button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-6 flex-col">
          <div className="flex p-7 gap-6 bg-white rounded-md flex-col">
            <div className="flex gap-2 flex-col">
              <Label>Title*</Label>
              <Input placeholder="Free Plan" />
            </div>
          </div>
          <div className="flex p-7 gap-6 bg-white rounded-md flex-col">
            <div className="flex gap-2 flex-col">
              <Label>Featured Image*</Label>
              <div className="flex w-72 h-48 rounded-md bg-black"></div>
            </div>
          </div>
          <div className="flex p-7 gap-6 bg-white rounded-md flex-col">
            <div className="flex gap-2 flex-col">
              <Label>Gallery Image*</Label>
              <div className="flex w-72 h-48 rounded-md bg-black"></div>

            </div>
          </div>
        </div>
      </div>

    </div >

  );
}
