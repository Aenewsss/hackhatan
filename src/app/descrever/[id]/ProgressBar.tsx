import { IMetadataDocument } from "@/storage/types";
import { useEffect, useState } from "react";

interface ProgressBarProps {
    documentDescription: IMetadataDocument | any
}

export default function ProgressBar({ documentDescription }: ProgressBarProps) {

    const [percentage, setPercentage] = useState('0%');

    useEffect(() => {
        setPercentage(getFilledPercent())
    }, [documentDescription]);

    function getFilledPercent() {
        if (!documentDescription) return '0%'

        const totalFields = countKeys(documentDescription)
        const totalFieldsFilled = countFilledValues(documentDescription)

        const percentage = Math.round((totalFieldsFilled / totalFields) * 100)

        return percentage + '%'
    }

    const countKeys = (obj: any) => {
        let totalKeys = 0;

        const countKeysRecursive = (obj: any) => {
            for (const key in obj) {
                if (typeof obj[key] === "object") {
                    countKeysRecursive(obj[key]);
                } else {
                    totalKeys += 1;
                }
            }
        };

        countKeysRecursive(obj);
        return totalKeys;
    };

    const countFilledValues = (obj: any) => {
        let filledValues = 0;

        const countFilledValuesRecursive = (obj: any) => {
            for (const key in obj) {
                if (typeof obj[key] === "object") {
                    countFilledValuesRecursive(obj[key]);
                } else if (obj[key] !== "") {
                    filledValues += 1;
                }
            }
        };

        countFilledValuesRecursive(obj);
        return filledValues;
    };

    return (
        <div className="bg-gray-500 w-1/2 self-center justify-center flex text-white relative">
            <div style={{width: `${percentage}`}} className={`bg-green-500 absolute h-full top-0 left-0`}></div>
            <span className="z-10">{percentage}</span>
        </div>
    )

}