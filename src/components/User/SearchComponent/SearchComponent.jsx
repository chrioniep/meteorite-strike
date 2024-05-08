import { useEffect, useState } from "react";
import { Label } from "../../UI/Label";
import { Input } from "../../UI/Input";
import { Button } from "../../UI/Button";
import { BsSearch } from "react-icons/bs";
import { IoCloseCircle } from "react-icons/io5";
import { useApiContext } from "../../../contexts/APIcontext";

export const SearchComponent = () => {
    const { meteoriteData, setfilteredSearchInput } = useApiContext();
    const [inputAttributes, setInputAttributes] = useState({
        id: "name",
        name: "name",
        placeholder: "Search by meteor name (Ex: Aarhus)"
    });
    const [searchInputValue, setSearchInputValue] = useState({
        name: "",
        year: "",
        composition: "",
        mass: "",
    });
    const [isDefaultSearchOption, setIsDefaultSearchOption] = useState(true);
    const [currentInputValue, setCurrentInputValue] = useState("");

    useEffect(() => {
        const name = searchInputValue.name;
        const yearValue = searchInputValue.year;
        const compositionValue = searchInputValue.composition;
        const massValue = searchInputValue.mass;

        let searchedResult = meteoriteData.filter((meteorite) => {
            return meteorite.name.toLowerCase().includes(name.toLowerCase());
        });
        searchedResult = searchedResult.filter((meteorite) => {
            return new Date(meteorite.year).getFullYear().toString().includes(yearValue);
        });
        searchedResult = searchedResult.filter((meteorite) => {
            return meteorite.recclass.toLowerCase().includes(compositionValue.toLowerCase());
        });
        searchedResult = searchedResult.filter((meteorite) => {
            return ((meteorite.mass) / 1000).toString().includes(massValue);
        })
        setfilteredSearchInput(searchedResult);
    }, [meteoriteData, searchInputValue.name, searchInputValue.year, searchInputValue.composition, searchInputValue.mass, setfilteredSearchInput]);

    const handleOnSubmit = (e) => {
        e.preventDefault();
        setSearchInputValue(searchInputValue);
    };

    const handleOnChange = (e) => {
        setSearchInputValue((prev) => ({ ...prev, [`${e.target.id}`]: e.target.value }));
        setCurrentInputValue(e.target.value);
    };

    const clearSearchInputValue = () => {
        setSearchInputValue({
            name: "",
            year: "",
            composition: "",
            mass: "",
        });
        setCurrentInputValue("");
    };

    const handleOnClickName = () => {
        setInputAttributes(inputAttributesSwitch("name"));
        setCurrentInputValue(searchInputValue.name);
    };

    const handleOnClickYearOfStrike = () => {
        setIsDefaultSearchOption(false);
        setInputAttributes(inputAttributesSwitch("year"));
        setCurrentInputValue(searchInputValue.year);
    };

    const handleOnClickMeteoriteComposition = () => {
        setIsDefaultSearchOption(false);
        setInputAttributes(inputAttributesSwitch("composition"));
        setCurrentInputValue(searchInputValue.composition);
    };

    const handleOnClickMassRangeInKilograms = () => {
        setIsDefaultSearchOption(false);
        setInputAttributes(inputAttributesSwitch("mass"));
        setCurrentInputValue(searchInputValue.mass);
    };

    const inputAttributesSwitch = (value) => {
        switch (value) {
            case "name":
                return {
                    id: "name",
                    name: "name",
                    placeholder: "Search by meteor name (Ex: Aarhus)"
                }
            case "year":
                return {
                    id: "year",
                    name: "year",
                    placeholder: "Search by meteor year of strike (Ex: 1880)"
                }
            case "composition":
                return {
                    id: "composition",
                    name: "composition",
                    placeholder: "Search by meteorite composition (Ex: 'Iron' or 'H4')"
                }
            case "mass":
                return {
                    id: "mass",
                    name: "mass",
                    placeholder: "Search by meteorite mass range (Ex: 1.44)"
                }
        }
    };

    return (
        <section className="flex flex-col justify-between">
            <form className="flex flex-col space-y-3 mt-1 px-6 pt-6 md:flex-row md:space-x-6 md:space-y-0 md:pt-8" onSubmit={handleOnSubmit}>
                <section className="relative flex-1 justify-center">
                    <Label htmlFor="search" className="sr-only" text="Search"></Label>
                    <span className="absolute top-[32%] left-[4%] md:left-[5%] lg:left-[3%]">
                        <BsSearch style={{ color: "rgb(99 102 241)", height: "20px", width: "20px" }} />
                    </span>
                    <Input type="text" className="p-4 pl-12 pr-14 text-md text-slate-800 rounded-lg bg-white placeholder-gray-400 shadow-md shadow-indigo-200 w-full focus:ring-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 md:text-lg md:pl-0 md:pr-12 lg:pl-16 lg:pr-20" {...inputAttributes} onChange={handleOnChange} value={currentInputValue} required />
                    <span className="absolute top-[24%] right-[5%] lg:right-[3%]" onClick={clearSearchInputValue}>
                        <IoCloseCircle style={{ color: "rgb(99 102 241)", height: "30px", width: "30px" }} />
                    </span>
                </section>

                <Button type="submit" className="text-md text-slate-200 font-semibold rounded-full py-3 bg-indigo-500 border-indigo-700 hover:bg-indigo-600 focus:ring-2 focus:outline-none focus:ring-indigo-900 focus:bg-indigo-200 focus:text-slate-800 md:px-8 md:py-4" text="Search" />
            </form>

            <section className="flex flex-wrap justify-center gap-2 p-4 text-md font-semibold text-indigo-500 md:pl-6 md:justify-start md:pt-6">
                <Button text="Name" type="button" className={`border-solid border-2 border-indigo-400 rounded-md px-6 py-1 mt-3 hover:bg-gray-100 hover:text-slate-800 hover:border-indigo-900 focus:border-transparent focus:ring-2 focus:outline-none focus:ring-indigo-900 focus:text-slate-800 focus:bg-indigo-200 md:mt-0 ${isDefaultSearchOption ? 'bg-indigo-200 border-indigo-900 text-slate-800' : ''}`} onClick={handleOnClickName} />
                <Button text="Year of strike" type="button" className="border-solid border-2 border-indigo-400 rounded-md px-6 py-1 mt-3 hover:bg-gray-100 hover:text-slate-800 hover:border-indigo-900 focus:border-transparent focus:ring-2 focus:outline-none focus:ring-indigo-900 focus:text-slate-800 focus:bg-indigo-200 md:mt-0" onClick={handleOnClickYearOfStrike} />
                <Button text="Meteorite Composition" type="button" className="border-solid border-2 border-indigo-400 rounded-md px-6 py-1 mt-3 hover:bg-gray-100 hover:text-slate-800 hover:border-indigo-900 focus:border-transparent focus:ring-2 focus:outline-none focus:ring-indigo-900 focus:text-slate-800 focus:bg-indigo-200 md:mt-0" onClick={handleOnClickMeteoriteComposition} />
                <Button text="Mass range" type="button" className="border-solid border-2 border-indigo-400 rounded-md px-6 py-1 mt-3 hover:bg-gray-100 hover:text-slate-800 hover:border-indigo-900 focus:border-transparent focus:ring-2 focus:outline-none focus:ring-indigo-900 focus:text-slate-800 focus:bg-indigo-200 md:mt-0" onClick={handleOnClickMassRangeInKilograms} />
            </section>
        </section>
    )
}
