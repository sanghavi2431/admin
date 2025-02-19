import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setLayout } from "@/store/theme/themeSlice";
import { PERSIST_STORE_NAME } from "@/constants/app.constant";
import deepParseJson from "@/utils/deepParseJson";
import {
  getClient_id,
  setPaymentDialog,
  setSideBarDisabled,
  setIsPlanExpired,
  setIsFreeTrial,
  setExpiryDate
} from "@/store/auth/userSlice";
import { constants } from "@/constants/woloo.constant";
import { getSubscriptionExpiry } from "@/services/taskManagement/plansService";
export default function EntryPath() {
  // const defaultPageMapping = {
  //   1: "/iotData",
  //   9: "/subscription",
  //   11: "/activeBlogs",
  //   8: "/userReport",
  //   13: "/iotData",
  //   3: "/iotData",
  // };
  // const isLoodiscovery = {
  //   1: false,
  //   9: true,
  //   11: true,
  //   8: true,
  //   13: false,
  //   3: false,
  // };
  // const showOnChangeModule = {
  //   1: true,
  //   9: false,
  //   11: false,
  //   8: false,
  //   13: false,
  //   3: false,
  // };
  // const selectedModule = {
  //   1: { label: "Task Management", value: 1 },
  //   9: { label: "Loo Discovery", value: 0 },
  //   11: { label: "Loo Discovery", value: 0 },
  //   8: { label: "Loo Discovery", value: 0 },
  //   13: { label: "Task Management", value: 1 },
  //   3: { label: "Task Management", value: 1 },
  // };
  const roleId = useSelector((state) => state.auth.user.roleId);
  const userId = useSelector((state) => state.auth.user.userId);
  const isFirstTime = useSelector((state) => state.auth.user.isFirstTime);
  const isFreeTrial = useSelector((state) => state.auth.user.isFreeTrial);
  let [expiry, setExpiry] = useState("");
  const clientId = useSelector((state) => state.auth.user.clientId);
  const subscriptionExpiry = useSelector((state) => state.auth.user);
  const defaultPageMapping = useSelector(
    (state) => state.auth.user.defaultPageMapping
  );

  const rawPersistData = localStorage.getItem(PERSIST_STORE_NAME);
  const persistData = deepParseJson(rawPersistData);

  const accessToken = persistData?.auth?.session?.token;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let [flag, setFlag] = useState(false);
  useEffect(() => {
    let data = { user_id: userId };
    dispatch(setLayout("blank"));
    if (accessToken) {
      if (
        roleId === constants?.role_id?.client ||
        roleId === constants?.role_id?.facility_manager
      ) {
        dispatch(getClient_id(data));
      }
    }
    return () => {
      dispatch(setLayout("modern"));
    };
  }, [accessToken]);
  async function getExpiry() {
    try {
      let res = await getSubscriptionExpiry({ id: clientId?.value });

      const expiryDate = new Date(res.data.results?.expiry_date);
      dispatch(setExpiryDate(expiryDate.toISOString().split('T')[0]));

      const currentDate = new Date();

      const isPlanExpired = expiryDate.getTime() < currentDate.getTime();
      if (isPlanExpired) {
        dispatch(setIsPlanExpired(true));
        dispatch(setPaymentDialog(true));
        dispatch(setSideBarDisabled(true));
      }
      const isFreeTrial = res.data.results?.plan_id ? false : true;
      dispatch(setIsFreeTrial(isFreeTrial));
      setFlag(true);
    } catch (err) {}
  }
  useEffect(() => {
    if (clientId?.value) {
      getExpiry();
    }
  }, [clientId, accessToken]);

  useEffect(() => {
    if (
      roleId == constants?.role_id?.client ||
      roleId == constants?.role_id?.facility_manager
    ) {
      if (flag === true) {
        isFirstTime && isFreeTrial
          ? navigate("/client-Onboard")
          : navigate(defaultPageMapping);
        // isFirstTime && dispatch(setPaymentDialog(true));
        dispatch(setSideBarDisabled(false));
      }
    } else {
      isFreeTrial ? navigate("/iotData") : navigate(defaultPageMapping);
      // isFirstTime && dispatch(setPaymentDialog(true));
      dispatch(setSideBarDisabled(false));
    }
  }, [flag]);

  return <></>;
}
