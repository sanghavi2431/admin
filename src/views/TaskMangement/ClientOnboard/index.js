import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setLayout } from "@/store/theme/themeSlice";
import { Dialog } from "@/components/ui";
import WelcomeScreen from "./WelcomeScreen";
import { LAYOUT_TYPE_SET_UP, LAYOUT_TYPE_MODERN } from "@/constants/theme.constant";
import AddFacilityForm from "./AddFacility";
import AddSupervisorForm from "./AddSupervisor";
import AddJanitorForm from "./AddJanitor";
import AssignTaskForm from "./AssignTask";
import CongratulationScreen from "./CongratulationScreen";
import { injectReducer } from "@/store";
import reducer from "./store";
import CancelConfirmation from "./CancelConfirmation";
import { resetClientOnboardState, toggleExitConfirmation } from "./store/dataSlice";

injectReducer("clientOnboard", reducer);
const ClientOnboard = () => {
    const dispatch = useDispatch();
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);

    useEffect(() => {
        dispatch(setLayout(LAYOUT_TYPE_SET_UP));

        return () => {
            dispatch(setLayout(LAYOUT_TYPE_MODERN));
            dispatch(resetClientOnboardState());
        };
    }, []);

    const openPopup = () => {
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        dispatch(toggleExitConfirmation(true));
        setIsPopupOpen(false);
    };

    const goToNextStep = () => {
        if (currentStep < 5) {
            setCurrentStep((prev) => prev + 1);
        }
        else {
            closePopup();
        }
    };

    const goToPreviousStep = () => {
        if (currentStep > 1) {
            setCurrentStep((prev) => prev - 1);
        }
        else {
            closePopup();
        }
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return <AddFacilityForm goToNextStep={goToNextStep} goToPreviousStep={goToPreviousStep} />;
            case 2:
                return (
                    <AddSupervisorForm
                        goToNextStep={goToNextStep}
                        goToPreviousStep={goToPreviousStep}
                    />
                );
            case 3:
                return (
                    <AddJanitorForm
                        goToNextStep={goToNextStep}
                        goToPreviousStep={goToPreviousStep}
                    />
                );
            case 4:
                return (
                    <AssignTaskForm
                        goToNextStep={goToNextStep}
                        goToPreviousStep={goToPreviousStep}
                    />
                );
            case 5:
                return <CongratulationScreen />;
            default:
                return null;
        }
    };

    return (
        <>
            <WelcomeScreen openPopup={openPopup} />
            <Dialog
                isOpen={isPopupOpen}
                onClose={closePopup}
                width="40vw"
                height="auto"
                // className="bg-white shadow-custom"
                overlayClassName="bg-black bg-opacity-50"
                closeTimeoutMS={300}
            >
                {renderStepContent()}
            </Dialog>
            <CancelConfirmation setIsPopupOpen={setIsPopupOpen} />
        </>
    );
};

export default ClientOnboard;
