"use client";
import { ChangeEvent, useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import { fetchWikipedia } from "@/app/lib/action";
export default function TitleInput({
  url,
  setUrl,
}: {
  url: string;
  setUrl: any;
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [debouncedInputTerm] = useDebounce(url, 300);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setUrl(e.target.value);
  }

  useEffect(() => {
    const searchHN = async () => {
      let results = [];
      if (debouncedInputTerm) {
        try {
          const data = await fetchWikipedia(debouncedInputTerm);
          if (data != undefined) results = data;
        } catch (error) {
          // handle error
        }
      }
      setSuggestions(results);
    };
    searchHN();
  }, [debouncedInputTerm]);

  function handleFocus() {
    setIsFocused(true);
  }

  function handleBlur() {
    setTimeout(() => {
      setIsFocused(false);
      setSuggestions([]);
    }, 300);
  }

  const handleKeyPress = (event: any) => {
    if (event.key === "Enter" && suggestions.length > 0) {
      setUrl(suggestions[0]); // Select the first suggestion
      setIsFocused(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setUrl(suggestion);
    setIsFocused(false);
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={url}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyPress}
        required
        className="text-[#333] py-3 px-5 box-border text-xl lg:text-3xl bg-[#ddd] text-center border-[3px] border-black"
      />
      {isFocused && (
        <ul className="absolute text-[#333] text-2xl z-4 w-full">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="bg-[#ddd]"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
