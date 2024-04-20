"use client";
import { ChangeEvent, useState } from "react";
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

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setUrl(e.target.value);

    if (e.target.value != "" || e.target.value != undefined)
      fetchInputSuggestion(e.target.value);
    else setSuggestions([]);
  }

  function handleFocus() {
    setIsFocused(true);
  }

  function handleBlur() {
    setTimeout(() => {
      setIsFocused(false);
      setSuggestions([]);
    }, 300);
  }

  async function fetchInputSuggestion(term: string) {
    try {
      const res = await fetchWikipedia(term);
      if (res != undefined) setSuggestions(res);
      else setSuggestions([]);
    } catch (error) {
      // handle error
      setSuggestions([]);
    }
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
    console.log("on click suggestion");
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
