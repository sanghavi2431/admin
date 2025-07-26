import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import QRCode from "react-qr-code";
import { Button } from "@/components/ui";
import { setLayout } from "@/store/theme/themeSlice";
import wolooLogo from "../../../wooloQrBg.png";
// import { useNavigate } from "react-router-dom";
// import { fetchWolooCerticate } from "@/services/wahCertificateService";

const WolooQRCodePrint = () => {
  const [print, setPrint] = useState(false);
  const [wolooById, setWolooById] = useState(null);
  // const [selectedWoloo, setSelectedWoloo] = useState(null);
  const woloosString = localStorage.getItem("woloosList");
  const woloos = woloosString ? JSON.parse(woloosString) : [];
  const dispatch = useDispatch();
  useEffect(() => {
    const url = new URL(window.location.href);
    const pathname = url.pathname;
    const idMatch = pathname.match(/\d+$/);
    const id = idMatch ? parseInt(idMatch[0], 10) : null;
    if (id !== null) {
      woloos.forEach((woloo) => {
        if (woloo.id === id) {
          // setSelectedWoloo(woloo);
          setWolooById(woloo);
        }
      });
    } else {
      setWolooById(null);
    }
    dispatch(setLayout("blank"));
  }, []);

  const printWolooQRCodes = () => {
    if (!wolooById) {
      return (
        <div className="flex flex-wrap justify-center gap-5">
          {woloos.map((woloo) => {
            return (
              <div className="w-[25rem]" key={woloo.id}>
                <div className="relative">
                  <img src={wolooLogo} alt="wolooLogo" className="w-[25rem]" />
                  <QRCode
                    className="absolute right-1 bottom-[85px]"
                    size={80}
                    value={`https://woloo.page.link/?link=${import.meta.env.VITE_BASE_URL}/api/wolooGuest/wahcertificate/${woloo.id}&apn=in.woloo.www&isi=1571476207&ibi=in.woloo.app`}
                    // value={`https://woloo.page.link?link=${process.env.VITE_BASE_URL}/api/wolooGuest/wahcertificate/${woloo.id}`}
                  />
                  <p className="text-center mt-1 mb-0">{woloo.name}</p>
                </div>
              </div>
            );
          })}
        </div>
      );
    } else {
      return (
        <div className="w-[25rem]" key={wolooById.id}>
          <div className="relative">
            <img src={wolooLogo} alt="wolooLogo" className="w-[25rem]" />
            <QRCode
              className="absolute right-1 bottom-[85px]"
              size={80}
              value={`https://woloo.page.link/?link=${import.meta.env.VITE_BASE_URL}/api/wolooGuest/wahcertificate/${wolooById.id}&apn=in.woloo.www&isi=1571476207&ibi=in.woloo.app`}
              // value={`https://woloo.page.link/?link=${process.env.VITE_BASE_URL}/api/wolooGuest/wahcertificate/${wolooById.id}`}
            />
            <p className="text-center mt-1 mb-0">{wolooById.name}</p>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="px-5 py-3 bg-white">
      {!print && (
        <div className="relative mb-1">
          <h3 className="w-full text-center">Woloo's QR Code</h3>
          <Button
            className="text-gray-800 absolute right-0 top-0"
            size="sm"
            variant="solid"
            onClick={() => {
              setPrint(true);
              setTimeout(() => {
                window.print();
                setPrint(false);
              }, 100);
            }}
          >
            Print
          </Button>
        </div>
      )}

      <div className="flex justify-center">{printWolooQRCodes()}</div>
    </div>
  );
};

export default WolooQRCodePrint;
