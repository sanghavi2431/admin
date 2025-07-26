import { AdaptableCard } from "@/components/shared";
import { GiTicket } from "react-icons/gi";
import VoucherForm from "../voucherViewForm";
import React, { useEffect } from "react";
import { Loading, DoubleSidedImage } from "@/components/shared";
import { useDispatch, useSelector } from "react-redux";
import reducer from "./store";
import { injectReducer } from "@/store/index";
import { useLocation, useNavigate } from "react-router-dom";
import { getVoucher } from "./store/dataSlice";
import isEmpty from "lodash/isEmpty";

injectReducer("voucherListView", reducer);

const UserEdit = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const voucherData = useSelector(
    (state) => state.voucherListView.data.voucherList
  );
  const loading = useSelector((state) => state.voucherListView.data.loading);
  const fetchData = (data) => {
    if (loading) return;
    dispatch(getVoucher(data));
  };

  const handleFormSubmit = async (values, setSubmitting) => {
    setSubmitting(true);
  };

  const handleDiscard = () => {
    navigate("/voucher");
  };

  useEffect(() => {
    const path = location.pathname.substring(
      location.pathname.lastIndexOf("/") + 1
    );
    const rquestParam = { id: path };
    fetchData(rquestParam);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return (
    <>
      <AdaptableCard className="h-full" bodyClass="h-full">
        <div className="flex items-center mb-4">
          <GiTicket size={"30"} />
          <h3 className="ml-5">Voucher View</h3>
        </div>
        <Loading loading={loading}>
          {!isEmpty(voucherData) && (
            <>
              <VoucherForm
                type="edit"
                initialData={voucherData}
                onFormSubmit={handleFormSubmit}
                onDiscard={handleDiscard}
              />
            </>
          )}
        </Loading>
        {!loading && isEmpty(voucherData) && (
          <div className="h-full flex flex-col items-center justify-center">
            <DoubleSidedImage
              src="/img/others/img-2.png"
              darkModeSrc="/img/others/img-2-dark.png"
              alt="No Voucher found!"
            />
            <h3 className="mt-8">No Voucher found!</h3>
          </div>
        )}
      </AdaptableCard>
    </>
  );
};

export default UserEdit;
