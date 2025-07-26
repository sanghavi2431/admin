import { useState } from "react";
import { Button } from "@/components/ui";
import { Loading } from "@/components/shared";
import parse from 'html-react-parser';

const SummaryCard = ({ defaultSummary, fetchAISummary }) => {
    const [aiSummary, setAISummary] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleAISummaryRequest = async () => {
        setLoading(true);
        const summary = await fetchAISummary();
        if (typeof summary === "string") setAISummary(summary);
        else setAISummary(defaultSummary);
        setLoading(false);
    };

    return (
        <div className="w-full h-[400px] p-6 bg-white shadow-custom rounded-custom flex flex-col justify-between">
            <div className={`flex flex-col`} style={{ maxHeight: aiSummary ? "100%" : "80%" }}>
                <h2 className="text-xl font-bold text-center mb-4">
                    Summary & Recommendation
                </h2>
                <div className="flex-grow overflow-auto text-sm">
                    {loading ? (
                        <div className="flex justify-center items-center">
                            <Loading loading={loading} />
                            <span className="ml-2">Generating AI summary...</span>
                        </div>
                    ) : (
                        <>
                            <p className="mb-2 px-6">
                                {parse(aiSummary || defaultSummary)}
                            </p>
                        </>
                    )}
                </div>
            </div>
            {!aiSummary && (
                <Button
                    className="w-full bg-[#00C3DE] hover:bg-[#00c4debd]"
                    color="black"
                    variant="solid"
                    onClick={handleAISummaryRequest}
                    disabled={loading}
                >
                    {loading ? "Processing..." : "Request AI Summary"}
                </Button>
            )}
        </div>
    );
};

export default SummaryCard;
