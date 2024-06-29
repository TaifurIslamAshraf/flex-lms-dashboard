"use client";

import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const Search = () => {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchText) {
      router.push(`/courses?search=${searchText}`);
    }
  };

  return (
    <form className="flex items-center" onSubmit={handleSearch}>
      <Button
        type="submit"
        variant={"ghost"}
        size={"icon"}
        className="absolute z-30 text-secondary placeholder:font-siliguri"
      >
        <SearchIcon fillRule="evenodd" clipRule="evenodd" className="" />
      </Button>
      <Input
        className="relative pl-12 max-w-[400px] min-w-[400px] w-full"
        name="search"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="আপনার কাঙ্খিত কোর্সটি সার্চ করুন"
      />
    </form>
  );
};

export default Search;
