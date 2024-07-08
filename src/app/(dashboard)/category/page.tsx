"use client";

import { styles } from "@/app/styles";
import CreateCategory from "@/components/CreateCategory";
import CreateSubategory from "@/components/CreateSubcategory";
import { AlertPopup } from "@/components/Dialog/alertDialog";
import { cn } from "@/lib/utils";
import {
  useDeleteCategoryMutation,
  useDeleteSubcategoryMutation,
  useGetCategorySubcategoryQuery,
} from "@/redux/features/categorize/categorizeApi";
import { ICategorySubcategory, ISubCategory } from "@/types/category";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const CategorySubcategory = () => {
  const [subcategory, setSubcategory] = useState<ISubCategory[] | undefined>();
  const [categoryId, setCategoryId] = useState("");

  const { data, refetch } = useGetCategorySubcategoryQuery({});

  const [
    deleteCategory,
    {
      isSuccess: categoryIsSuccess,
      error: categoryError,
      isLoading: categoryIsLoading,
    },
  ] = useDeleteCategoryMutation();
  const [
    deletesubCategory,
    {
      isSuccess: subCategoryIsSuccess,
      error: subCategoryError,
      isLoading: subCategoryIsLoading,
    },
  ] = useDeleteSubcategoryMutation();

  const category = data?.data as ICategorySubcategory;

  const handleCategory = (
    categoryId: string,
    subcategory: ISubCategory[] | undefined
  ) => {
    setSubcategory(subcategory);
    setCategoryId(categoryId);
  };

  const handleDeleteCategory = async (id: string) => {
    await deleteCategory({ id });
    await refetch();
  };
  const handleDeletesubCategory = async (id: string) => {
    await deletesubCategory({ id });
    await refetch();
  };

  useEffect(() => {
    if (categoryIsSuccess) {
      toast.success("Category delete successfull");
    } else if (categoryError) {
      const errorData = categoryError as any;
      toast.error(errorData?.data?.message);
    }
  }, [categoryError, categoryIsSuccess]);

  useEffect(() => {
    if (subCategoryIsSuccess) {
      toast.success("Subcategory delete successfull");
    } else if (subCategoryError) {
      const errorData = subCategoryError as any;
      toast.error(errorData?.data?.message);
    }
  }, [subCategoryError, subCategoryIsSuccess]);

  return (
    <div className={cn(styles.paddingY, styles.paddingX, styles.layoutML)}>
      <div className="space-y-4">
        <h1 className="font-semibold text-2xl">Manage Category</h1>
        <div className="lg:flex block justify-between gap-6 lg:space-y-0 space-y-10">
          <CreateCategory />
          <CreateSubategory />
        </div>
      </div>
      <div className="space-y-4 mt-6">
        <h1 className="font-semibold text-2xl">All Category</h1>
        <div className="lg:flex block justify-between gap-6 lg:space-y-0 space-y-10">
          <ul className="flex-1 bg-gray-100 shadow-md rounded-md">
            {category?.map((item) => {
              return (
                <li
                  onClick={() => handleCategory(item?._id, item?.subcategory)}
                  className={cn(
                    categoryId === item?._id.toString()
                      ? "bg-blue-500 text-white"
                      : "",
                    "text-lg font-medium group cursor-pointer hover:bg-blue-400 hover:text-white transition-all py-1 my-2 px-4"
                  )}
                  key={item?._id}
                >
                  <div className="flex items-center justify-between">
                    <span>{item?.name}</span>
                    <AlertPopup
                      actionFunc={() => handleDeleteCategory(item?._id)}
                    >
                      <button
                        disabled={categoryIsLoading}
                        className="group-hover:block hidden rounded bg-gray-50 p-1"
                      >
                        <Trash2 className="text-red-400" size={20} />
                      </button>
                    </AlertPopup>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="flex-1 text-lg font-medium rounded-md">
            {subcategory?.length! > 0 ? (
              <ul className="shadow-md bg-gray-100 py-1">
                {subcategory &&
                  subcategory?.map((subItem) => (
                    <li
                      key={subItem?._id}
                      className="text-lg group font-medium cursor-pointer hover:bg-green-400 hover:text-white transition-all py-1 my-2 px-4"
                    >
                      <div className="flex items-center justify-between">
                        <span>{subItem?.name}</span>
                        <AlertPopup
                          actionFunc={() =>
                            handleDeletesubCategory(subItem?._id)
                          }
                        >
                          <button
                            disabled={categoryIsLoading}
                            className="group-hover:block hidden rounded bg-gray-50 p-1"
                          >
                            <Trash2 className="text-red-400" size={20} />
                          </button>
                        </AlertPopup>
                      </div>
                    </li>
                  ))}
              </ul>
            ) : (
              <h2 className="flex items-center justify-center h-full text-red-300">
                Select a category
              </h2>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategorySubcategory;
