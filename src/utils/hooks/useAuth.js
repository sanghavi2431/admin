import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setUser,
  setClientId,
  setUserId,
  setRoleAccess,
  setLooDiscovery,
  setDefaultPageMapping,
  getClient_id,
  setRoleId,
  setUserName,
  setemail,
  setSelectedModule,
  setShowOnChangeModule,
  userLoggedOut
} from "@/store/auth/userSlice";
import { onSignInSuccess, onSignOutSuccess } from "@/store/auth/sessionSlice";
import { apiFacilitySignIn, apiSignIn, apiSignOut } from "@/services/AuthService";
import appConfig from "@/configs/app.config";
import { REDIRECT_URL_KEY } from "@/constants/app.constant";
import useQuery from "./useQuery";
import { setPayload, resetState } from "@/views/TaskMangement/IOTData/iotGraph/store/dataSlice";
import { persistor } from "@/store";
import { PERSIST_STORE_NAME } from "@/constants/app.constant";

function useAuth() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const query = useQuery();

  const { token, signedIn } = useSelector((state) => state.auth.session);

  const signIn = async ({ email, password }) => {
    try {
      const resp = await apiSignIn({ email, password });
      if (resp.data.results) {
        const { token, role_id, name, email, id, rolesAccess, permissions } =
          resp.data.results;
        const {
          showOnChangeModule,
          defaultPageMapping,
          isLoodiscovery,
          selectedModule,
        } = JSON.parse(permissions);
        // let data = { user_id: id };        
        dispatch(onSignInSuccess(token));
        // dispatch(getClient_id(data));
        dispatch(setRoleId(role_id));
        dispatch(setUserId(id));
        dispatch(setUserName(name));
        dispatch(setemail(email));
        dispatch(setRoleAccess(JSON.parse(rolesAccess)));
        dispatch(setDefaultPageMapping(defaultPageMapping));
        dispatch(setLooDiscovery(isLoodiscovery));
        dispatch(setSelectedModule({ label: "Task Management", value: 1 }));
        dispatch(setShowOnChangeModule(showOnChangeModule));

        if (resp.data.results.user) {
          dispatch(
            setUser(
              resp.data.results.user || {
                avatar: "",
                userName: "Anonymous",
                authority: ["USER"],
                email: "",
              }
            )
          );
        }
        const redirectUrl = query.get(REDIRECT_URL_KEY);
        navigate(redirectUrl ? redirectUrl : appConfig.authenticatedEntryPath);
        return {
          status: "success",
          message: "",
        };
      }
    } catch (errors) {
      try {
        const resp = await apiFacilitySignIn({ email, password });
        if (resp.data.results) {
          const { token, role_id, name, email, id, client_id, client_name, rolesaccess, permissions } =
            resp.data.results;
          const {
            showOnChangeModule,
            defaultPageMapping,
            isLoodiscovery,
            selectedModule,
          } = JSON.parse(permissions);
          dispatch(onSignInSuccess(token));
          dispatch(setRoleId(role_id));
          dispatch(setUserId(id));
          dispatch(setUserName(name));
          dispatch(setemail(email));
          dispatch(setRoleAccess(JSON.parse(rolesaccess)));
          dispatch(setDefaultPageMapping(defaultPageMapping));
          dispatch(setShowOnChangeModule(showOnChangeModule));
          dispatch(setLooDiscovery(isLoodiscovery));
          dispatch(setClientId({ label: client_name, value: client_id }));
          if (resp.data.results.user) {
            dispatch(
              setUser(
                resp.data.results.user || {
                  avatar: "",
                  userName: "Anonymous",
                  authority: ["USER"],
                  email: "",
                }
              )
            );
          }
          const redirectUrl = query.get(REDIRECT_URL_KEY);
          navigate(
            redirectUrl ? redirectUrl : appConfig.authenticatedEntryPath
          );
          return {
            status: "success",
            message: "",
          };
        }
      } catch (errors) {
        console.log(errors);
        throw errors.response?.data?.message;
      }
    }
  };

  const handleSignOut = () => {
    dispatch(onSignOutSuccess());
    dispatch(userLoggedOut());
    navigate("/sign-in");
  };

  const signOut = async () => {
    try {
      dispatch(setSelectedModule(""));
      dispatch(setPayload(""));
      dispatch(resetState());
      await apiSignOut();
      // await persistor.purge();
      handleSignOut();
    } catch (errors) {
      // await persistor.purge();
      handleSignOut();
    }
  };

  return {
    authenticated: token && signedIn,
    signIn,
    signOut,
  };
}

export default useAuth;
