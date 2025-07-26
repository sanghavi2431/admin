import React from "react";

const protectedRoute = [
  {
    key: "route",
    path: "/route",
    component: React.lazy(() => import("@/views/entryPathCreator/entryPath")),
    authority: [],
  },
  {
    key: "dashboard",
    path: "/dashboard",
    component: React.lazy(() => import("@/views/Home")),
    authority: [],
  },
  {
    key: "woloos",
    path: "/woloos",
    component: React.lazy(() => import("@/views/woloos/woloosList")),
    authority: [],
  },
  {
    key: "woloos",
    path: "/woloos-Edit/:wolooId",
    component: React.lazy(() => import("@/views/woloos/wolooEdit")),
    authority: [],
  },
  {
    key: "woloos",
    path: "/woloos-View/:wolooId",
    component: React.lazy(() => import("@/views/woloos/wolooView")),
    authority: [],
  },
  {
    key: "woloos",
    path: "/woloos-AddNew",
    component: React.lazy(() => import("@/views/woloos/wolooAddNew")),
    authority: [],
  },
  {
    key: "woloos",
    path: "/woloos-QRCode",
    component: React.lazy(() => import("@/views/woloos/wolooQRCode")),
    authority: [],
  },
  {
    key: "woloos",
    path: "/woloos-QRCode/:id",
    component: React.lazy(() => import("@/views/woloos/wolooQRCode")),
    authority: [],
  },
  {
    key: "users",
    path: "/users",
    component: React.lazy(() => import("@/views/users/usersList")),
    authority: [],
  },
  {
    key: "users",
    path: "/users-Edit/:usersId",
    component: React.lazy(() => import("@/views/users/usersEdit")),
    authority: [],
  },
  {
    key: "users",
    path: "/users-View/:usersId",
    component: React.lazy(() => import("@/views/users/usersView")),
    authority: [],
  },
  {
    key: "users",
    path: "/users-AddNew",
    component: React.lazy(() => import("@/views/users/userAddNew")),
    authority: [],
  },
  {
    key: "corporates",
    path: "/corporates",
    component: React.lazy(() => import("@/views/corporates/corporatesList")),
    authority: [],
  },
  {
    key: "corporates",
    path: "/corporates-Edit/:usersId",
    component: React.lazy(() => import("@/views/corporates/corporatesEdit")),
    authority: [],
  },
  {
    key: "corporates",
    path: "/corporates-View/:usersId",
    component: React.lazy(() => import("@/views/corporates/corporateView")),
    authority: [],
  },
  {
    key: "corporates",
    path: "/corporates-AddNew",
    component: React.lazy(() => import("@/views/corporates/corporatesAddNew")),
    authority: [],
  },
  {
    key: "subscription",
    path: "/subscription",
    component: React.lazy(() => import("@/views/subscription/subscriptionList")),
    authority: [],
  },
  {
    key: "subscription",
    path: "/subscription-Edit/:usersId",
    component: React.lazy(() => import("@/views/subscription/subscriptionEdit")),
    authority: [],
  },
  {
    key: "subscription",
    path: "/subscription-View/:usersId",
    component: React.lazy(() => import("@/views/subscription/subscriptionView")),
    authority: [],
  },
  {
    key: "subscription",
    path: "/subscription-AddNew",
    component: React.lazy(() =>
      import("@/views/subscription/SubscriptionAddNew")
    ),
    authority: [],
  },
  {
    key: "voucher",
    path: "/voucher",
    component: React.lazy(() => import("@/views/voucher/voucherList")),
    authority: [],
  },
  {
    key: "voucher",
    path: "/voucher-Edit/:usersId",
    component: React.lazy(() => import("@/views/voucher/voucherEdit")),
    authority: [],
  },
  {
    key: "voucher",
    path: "/voucher-View/:usersId",
    component: React.lazy(() => import("@/views/voucher/voucherView")),
    authority: [],
  },
  {
    key: "voucher",
    path: "/voucher-AddNew",
    component: React.lazy(() => import("@/views/voucher/voucherAddNew")),
    authority: [],
  },
  {
    key: "voucherUses",
    path: "/voucher-Uses/:usersId",
    component: React.lazy(() => import("@/views/voucher/usesList")),
    authority: [],
  },
  {
    key: "hostOffer",
    path: "/hostOffer",
    component: React.lazy(() => import("@/views/HostOffer/hostOffer")),
    authority: [],
  },
  {
    key: "hostOffer",
    path: "/hostOffer-Edit/:hostOfferId",
    component: React.lazy(() => import("@/views/HostOffer/hostOfferEdit")),
    authority: [],
  },
  {
    key: "hostOffer",
    path: "/hostOffer-View/:hostOfferId",
    component: React.lazy(() => import("@/views/HostOffer/hostOfferView")),
    authority: [],
  },
  {
    key: "hostOffer",
    path: "/hostOffer-AddNew",
    component: React.lazy(() => import("@/views/HostOffer/hostAddNew")),
    authority: [],
  },
  {
    key: "admin",
    path: "/admin",
    component: React.lazy(() => import("@/views/Setting/admin")),
    authority: [],
  },
  {
    key: "general",
    path: "/general",
    component: React.lazy(() => import("@/views/Setting/general")),
    authority: [],
  },
  {
    key: "review",
    path: "/review",
    component: React.lazy(() => import("@/views/Setting/review")),
    authority: [],
  },
  {
    key: "site",
    path: "/site",
    component: React.lazy(() => import("@/views/Setting/site")),
    authority: [],
  },
  {
    key: "franchise",
    path: "/franchise",
    component: React.lazy(() => import("@/views/franchise/franchiseList")),
    authority: [],
  },
  {
    key: "transaction",
    path: "/transaction",
    component: React.lazy(() => import("@/views/transaction/transactionList")),
    authority: [],
  },
  {
    key: "franchise",
    path: "/franchise-Edit/:wolooId",
    component: React.lazy(() => import("@/views/franchise/franchiseEdit")),
    authority: [],
  },
  {
    key: "franchise",
    path: "/franchise-View/:wolooId",
    component: React.lazy(() => import("@/views/franchise/franchiseView")),
    authority: [],
  },
  {
    key: "franchise",
    path: "/franchise-AddNew",
    component: React.lazy(() => import("@/views/franchise/franchiseAddNew")),
    authority: [],
  },
  {
    key: "userReport",
    path: "/userReport",
    component: React.lazy(() => import("@/views/report/userReport")),
    authority: [],
  },
  {
    key: "subscriptionReport",
    path: "/subscriptionReport",
    component: React.lazy(() => import("@/views/report/subscriptionReport")),
    authority: [],
  },
  {
    key: "voucherReport",
    path: "/voucherReport",
    component: React.lazy(() => import("@/views/report/voucherReport")),
    authority: [],
  },
  {
    key: "referrerReport",
    path: "/referrerReport",
    component: React.lazy(() => import("@/views/report/referrerReport")),
    authority: [],
  },
  {
    key: "referrerHistoryReport",
    path: "/referrerHistoryReport",
    component: React.lazy(() => import("@/views/report/referrerHistoryReport")),
    authority: [],
  },
  {
    key: "customerHistory",
    path: "/loyaltyReport",
    component: React.lazy(() => import("@/views/report/customerHistoryReport")),
    authority: [],
  },
  {
    key: "wolooRating",
    path: "/wolooRating",
    component: React.lazy(() => import("@/views/wolooRating/wolooRatingList")),
    authority: [],
  },
  {
    key: "userOffer",
    path: "/userOffer",
    component: React.lazy(() => import("@/views/userOffer/userOfferList")),
    authority: [],
  },
  {
    key: "userOffer",
    path: "/userOffer-AddNew",
    component: React.lazy(() => import("@/views/userOffer/userOfferAddNew")),
    authority: [],
  },
  {
    key: "userOffer",
    path: "/userOffer-Edit/:usersId",
    component: React.lazy(() => import("@/views/userOffer/userOfferEdit")),
    authority: [],
  },
  {
    key: "userOffer",
    path: "/userOffer-View/:usersId",
    component: React.lazy(() => import("@/views/userOffer/userOfferView")),
    authority: [],
  },
  {
    key: "activeBlogs",
    path: "/activeBlogs",
    component: React.lazy(() => import("@/views/activeBlogs/activeBlogsList")),
    authority: [],
  },
  {
    key: "activeBlogs",
    path: "/activeBlogs-AddNew",
    component: React.lazy(() => import("@/views/activeBlogs/activeBlogsAddNew")),
    authority: [],
  },
  {
    key: "activeBlogs",
    path: "/activeBlogs-Edit/:usersId",
    component: React.lazy(() => import("@/views/activeBlogs/activeBlogEdit")),
    authority: [],
  },
  {
    key: "blogCategory",
    path: "/blogCategory",
    component: React.lazy(() => import("@/views/blogCategory/blogCategoryList")),
    authority: [],
  },

  {
    key: "blogCategory",
    path: "/blogCategory-AddNew",
    component: React.lazy(() =>
      import("@/views/blogCategory/blogCategoryAddNew")
    ),
    authority: [],
  },
  {
    key: "blogCategory",
    path: "/blogCategory-Edit/:usersId",
    component: React.lazy(() => import("@/views/blogCategory/blogCategoryEdit")),
    authority: [],
  },
  {
    key: "blogCategory",
    path: "/blogCategory-View/:usersId",
    component: React.lazy(() => import("@/views/blogCategory/blogCategoryView")),
    authority: [],
  },
  {
    key: "blogSubCategory",
    path: "/blogSubCategory",
    component: React.lazy(() =>
      import("@/views/blogSubcategory/blogSubCategoryList")
    ),
    authority: [],
  },
  {
    key: "blogSubCategory",
    path: "/blogSubCategory-AddNew",
    component: React.lazy(() =>
      import("@/views/blogSubcategory/blogSubCategoryAddNew")
    ),
    authority: [],
  },
  {
    key: "blogSubCategory",
    path: "/blogSubCategory-Edit/:usersId",
    component: React.lazy(() =>
      import("@/views/blogSubcategory/blogSubCategoryEdit")
    ),
    authority: [],
  },
  {
    key: "blogSubCategory",
    path: "/blogSubCategory-View/:usersId",
    component: React.lazy(() =>
      import("@/views/blogSubcategory/blogSubCategoryView")
    ),
    authority: [],
  },
  {
    key: "client",
    path: "/client",
    component: React.lazy(() =>
      import("@/views/TaskMangement/client/clientList")
    ),
    authority: [],
  },
  {
    key: "client",
    path: "/client-Edit/:usersId",
    component: React.lazy(() =>
      import("@/views/TaskMangement/client/clientEdit")
    ),
    authority: [],
  },
  {
    key: "client",
    path: "/client-AddNew",
    component: React.lazy(() => import("@/views/TaskMangement/client/clientAdd")),
    authority: [],
  },
  {
    key: 'clientOnboard',
    path: `/client-Onboard`,
    component: React.lazy(() => import('@/views/TaskMangement/ClientOnboard')),
    authority: [],
  },
  {
    key: "iotData",
    path: "/iotData",
    component: React.lazy(() =>
      import("@/views/TaskMangement/IOTData/iotGraph/index")
    ),
    authority: [],
  },
  {
    key: "location",
    path: "/location",
    component: React.lazy(() =>
      import("@/views/TaskMangement/location/locationList/index")
    ),
    authority: [],
  },
  {
    key: "location",
    path: "/location-Edit/:usersId",
    component: React.lazy(() =>
      import("@/views/TaskMangement/location/locationEdit")
    ),
    authority: [],
  },
  {
    key: "location",
    path: "/location-AddNew",
    component: React.lazy(() =>
      import("@/views/TaskMangement/location/locationAdd")
    ),
    authority: [],
  },
  {
    key: "block",
    path: "/block",
    component: React.lazy(() =>
      import("@/views/TaskMangement/block/blockList/index")
    ),
    authority: [],
  },
  {
    key: "block",
    path: "/block-Edit/:usersId",
    component: React.lazy(() => import("@/views/TaskMangement/block/blockEdit")),
    authority: [],
  },
  {
    key: "block",
    path: "/block-AddNew",
    component: React.lazy(() => import("@/views/TaskMangement/block/blockAdd")),
    authority: [],
  },
  {
    key: "facility",
    path: "/facility",
    component: React.lazy(() =>
      import("@/views/TaskMangement/facility/facilityList/index")
    ),
    authority: [],
  },
  {
    key: "facility",
    path: "/facility-Edit/:usersId",
    component: React.lazy(() =>
      import("@/views/TaskMangement/facility/facilityEdit")
    ),
    authority: [],
  },
  {
    key: "facility",
    path: "/facility-AddNew",
    component: React.lazy(() =>
      import("@/views/TaskMangement/facility/facilityAdd")
    ),
    authority: [],
  },
  {
    key: "shift",
    path: "/shift",
    component: React.lazy(() =>
      import("@/views/TaskMangement/shift/shiftList/index")
    ),
    authority: [],
  },
  {
    key: "shift",
    path: "/shift-Edit/:usersId",
    component: React.lazy(() => import("@/views/TaskMangement/shift/shiftEdit")),
    authority: [],
  },
  {
    key: "shift",
    path: "/shift-AddNew",
    component: React.lazy(() => import("@/views/TaskMangement/shift/shiftAdd")),
    authority: [],
  },
  {
    key: "dashboard_task",
    path: "/dashboard_task",
    component: React.lazy(() =>
      import("@/views/TaskMangement/ScrumBoard/index.js")
    ),
    authority: [],
  },
  {
    key: "task_template",
    path: "/task_template",
    component: React.lazy(() =>
      import("@/views/TaskMangement/task_template/task_templateList/index")
    ),
    authority: [],
  },
  {
    key: "templateMap",
    path: "/templateMap",
    component: React.lazy(() =>
      import("@/views/TaskMangement/template_mapping/template_mappingList/index")
    ),
    authority: [],
  },
  {
    key: "templateMap",
    path: "/templateMap-AddNew",
    component: React.lazy(() =>
      import("@/views/TaskMangement/template_mapping/template_mappingAdd/index")
    ),
    authority: [],
  },
  {
    key: "booth",
    path: "/booth",
    component: React.lazy(() =>
      import("@/views/TaskMangement/booth/boothList/index")
    ),
    authority: [],
  },
  {
    key: "janitor",
    path: "/janitor",
    component: React.lazy(() =>
      import("@/views/TaskMangement/janitor/janitorList/index")
    ),
    authority: [],
  },
  {
    key: "janitor",
    path: "/janitor-AddNew",
    component: React.lazy(() =>
      import("@/views/TaskMangement/janitor/janitorAdd")
    ),
    authority: [],
  },
  {
    key: "janitor",
    path: "/janitor-Edit/:usersId",
    component: React.lazy(() =>
      import("@/views/TaskMangement/janitor/janitorEdit")
    ),
    authority: [],
  },
  {
    key: "facilityManager",
    path: "/facilityManager",
    component: React.lazy(() =>
      import("@/views/TaskMangement/facility_manager/facility_managerList/index")
    ),
    authority: [],
  },
  {
    key: "facilityManager",
    path: "/facilityManager-AddNew",
    component: React.lazy(() =>
      import("@/views/TaskMangement/facility_manager/facility_managerAdd/index")
    ),
    authority: [],
  },
  {
    key: "supervisor",
    path: "/supervisor",
    component: React.lazy(() =>
      import("@/views/TaskMangement/supervisior/supervisiorList/index")
    ),
    authority: [],
  },
  {
    key: "supervisor",
    path: "/supervisor-AddNew",
    component: React.lazy(() =>
      import("@/views/TaskMangement/supervisior/supervisorAdd")
    ),
    authority: [],
  },
  {
    key: "supervisor",
    path: "/supervisor-Edit/:usersId",
    component: React.lazy(() =>
      import("@/views/TaskMangement/supervisior/supervisorEdit")
    ),
    authority: [],
  },
  {
    key: "task_template",
    path: "/task_template-AddNew",
    component: React.lazy(() =>
      import("@/views/TaskMangement/task_template/task_templateAdd/index")
    ),
    authority: [],
  },
  {
    key: "task_template",
    path: "/task_template-Edit/:usersId",
    component: React.lazy(() =>
      import("@/views/TaskMangement/task_template/task_templateEdit/index")
    ),
    authority: [],
  },
  {
    key: "iotDevice",
    path: "/iotDevice",
    component: React.lazy(() =>
      import("@/views/TaskMangement/iotDevice/iotDeviceList/index")
    ),
    authority: [],
  },
  {
    key: "iotDevice",
    path: "/iotDevice-AddNew",
    component: React.lazy(() =>
      import("@/views/TaskMangement/iotDevice/iotDeviceAdd")
    ),
    authority: [],
  },
  {
    key: "iotDevice",
    path: "/iotDevice-Edit/:userId",
    component: React.lazy(() =>
      import("@/views/TaskMangement/iotDevice/iotDeviceEdit")
    ),
    authority: [],
  },
  {
    key: "cluster",
    path: "/cluster",
    component: React.lazy(() =>
      import("@/views/TaskMangement/cluster/clusterList/index")
    ),
    authority: [],
  },
  {
    key: "cluster",
    path: "/cluster-AddNew",
    component: React.lazy(() =>
      import("@/views/TaskMangement/cluster/clusterAdd")
    ),
    authority: [],
  },
  {
    key: "cluster",
    path: "/cluster-Edit/:userId",
    component: React.lazy(() =>
      import("@/views/TaskMangement/cluster/clusterEdit")
    ),
    authority: [],
  },
  {
    key: "task_checklist",
    path: "/task_checklist",
    component: React.lazy(() =>
      import("@/views/TaskMangement/task_checklist/task_checklist")
    ),
    authority: [],
  },
  // {
  //   key: "iframe",
  //   path: "/iframe",
  //   component: React.lazy(() => import("@/views/iframe/iframe")),
  //   authority: [],
  // },
  {
    key: "task_checklist",
    path: "/task_checklist-AddNew",
    component: React.lazy(() =>
      import("@/views/TaskMangement/task_checklist/task_checklistAdd")
    ),
    authority: [],
  },
  {
    key: "task_checklist",
    path: "/task_checklist-Edit/:userId",
    component: React.lazy(() =>
      import("@/views/TaskMangement/task_checklist/task_checklistEdit")
    ),
    authority: [],
  },
  {
    key: "rbac",
    path: "/rbac",
    component: React.lazy(() => import("@/views/RBACManagement/roleList")),
    authority: [],
  },
  {
    key: "rbac.roleAdd",
    path: "/rbac-roleAdd",
    component: React.lazy(() => import("@/views/RBACManagement/roleAddNew")),
    authority: [],
  },
  {
    key: "rbac.rolEdit",
    path: "/rbac-roleEdit/:userId",
    component: React.lazy(() => import("@/views/RBACManagement/roleEdit")),
    authority: [],
  },
  {
    key: "subscriptionPlans",
    path: "/subscriptionPlans",
    component: React.lazy(() => import("@/views/TaskMangement/payment/newPlan")),
    authority: [],
  },
  // {
  //   key: "addon",
  //   path: "/addon",
  //   component: React.lazy(() => import("@/views/TaskMangement/")),
  //   authority: [],
  // },
  {
    key: "plan",
    path: "/plan",
    component: React.lazy(() =>
      import("@/views/TaskMangement/subscriptionPlan/subscriptionPlanList")
    ),
    authority: [],
  },
  {
    key: "plan",
    path: "/plan-AddNew",
    component: React.lazy(() =>
      import("@/views/TaskMangement/subscriptionPlan/subscriptionPlanAdd")
    ),
    authority: [],
  },
  {
    key: "addon",
    path: "/addon",
    component: React.lazy(() =>
      import(
        "@/views/TaskMangement/subscriptionIOTAddon/subscriptionIOTAddonList"
      )
    ),
    authority: [],
  },
  {
    key: "addon",
    path: "/addon-AddNew",
    component: React.lazy(() =>
      import("@/views/TaskMangement/subscriptionIOTAddon/subscriptionIOTAddonAdd")
    ),
    authority: [],
  },
  {
    key: "accessDenied",
    path: "/accessDenied",
    component: React.lazy(() => import("@/views/accessDenied/AccessDenied")),
    authority: [],
  },
  {
    key: "orders",
    path: "/orders",
    component: React.lazy(() =>
      import("@/views/TaskMangement/payment/order/orderList")
    ),
    authority: [],
  },
  {
    key: "upgrade",
    path: "/upgrade",
    component: React.lazy(() =>
      import("@/views/TaskMangement/payment/upgradePlan")
    ),
    authority: [],
  },
  {
    key: "reviewManagement",
    path: "/reviewManagement",
    component: React.lazy(() =>
      import("@/views/TaskMangement/ReviewManagement/ReviewManagementGraph/index")
    ),
    authority: [],
  },

  // {
  //   key: 'listFacility',
  //   path: `/list-facility`,
  //   component: React.lazy(() => import('@/views/ClientOnboard/AddFacility')),
  //   authority: [],
  // },
];

export default protectedRoute;
