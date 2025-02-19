import React from 'react'
import {HiOutlineColorSwatch,HiOutlineDesktopComputer,HiOutlineTemplate,HiOutlineViewGridAdd,HiOutlineHome,HiMenu,HiUser} from 'react-icons/hi'
import {HiCodeBracketSquare, HiRectangleGroup,HiBuildingOffice2 ,HiDocumentChartBar} from 'react-icons/hi2'
import { AiFillSetting,AiOutlineStar } from 'react-icons/ai'
import { GiMoneyStack, GiPayMoney, GiTicket,GiPerson } from 'react-icons/gi'
import { FaBuilding, FaHandshake,FaPersonBooth,FaUsers } from "react-icons/fa"
import { BiSolidNetworkChart, BiTransfer, BiCategory, BiSolidPurchaseTag, BiSolidOffer, BiPurchaseTag, BiSolidPurchaseTagAlt  } from 'react-icons/bi'
import { MdLocalOffer,MdCategory,MdFactCheck } from 'react-icons/md'
import { BsCheckSquareFill, BsFileEarmarkCheckFill, BsKeyFill } from 'react-icons/bs'
import {IoLocationSharp} from 'react-icons/io5'
import {GrServices, GrUserManager} from 'react-icons/gr'
import {DiOpenshift} from 'react-icons/di'
import {SlGraph} from 'react-icons/sl'
import {RiTeamFill} from 'react-icons/ri'

const navigationIcon = {
    dashboard: <HiOutlineHome />,
    singleMenu: <HiOutlineViewGridAdd />,
    collapseMenu: <HiOutlineTemplate />,
    groupSingleMenu: <HiOutlineDesktopComputer />,
    groupCollapseMenu: <HiOutlineColorSwatch />,
    woloo: <HiMenu />,
    users: <HiUser />,
    corporates: <HiBuildingOffice2 />,
    subscription: <GiMoneyStack />,
    voucher: <GiTicket />,
    payment: <GiPayMoney />,
    setting: <AiFillSetting />,
    franchise: <FaHandshake />,
    transaction: <BiTransfer />,
    report:<HiDocumentChartBar/>,
    userReport:<FaUsers/>,
    wolooRating:<AiOutlineStar/>,
    userOffer:<MdLocalOffer/>,
    activeBlogs:<BsFileEarmarkCheckFill/>,
    blogCategory:<BiCategory/>,
    blogSubCategory:<MdCategory/>,
    // IOTData:<GoGraph/>,
    client:<FaUsers/>,
    location:<IoLocationSharp/>,
    block:<HiCodeBracketSquare/>,
    facility:<GrServices/>,
    shift:<DiOpenshift/>,
    dashboard_task:<SlGraph/>,
    task_template:<MdFactCheck/>,
    booth:<FaPersonBooth/>,
    templateMap:<HiRectangleGroup/>,
    janitor:<GiPerson/>,
    supervisor:<RiTeamFill/>,
    // iotDevice:<PiDevicesFill/>,
    cluster:<BiSolidNetworkChart/>,
    task_checklist:<BsCheckSquareFill/>,
    // roles:<BsKeyFill/>,
    facilityManager: <GrUserManager/>,
    // subscriptionPlans: <BiPurchaseTag />,
    // subscriptionSettings: <RiUserSettingsFill/>,
    orders:<BiSolidPurchaseTagAlt/>,
    hostOffer:<BiSolidOffer/>,
    reviewManagement: <AiOutlineStar />,
    building: <FaBuilding />,
    IOTData: "/img/icons/dashboard.png",
    client_setup: "/img/icons/client.png",
    user_setup: "/img/icons/user.png",
    task_setup: "/img/icons/task.png",
    iotDevice: "/img/icons/iot-device.png",
    subscription_plans: "/img/icons/subscription.png",
    subscription_settings: "/img/icons/subscription-settings.png",
    roles: "/img/icons/roles.png",
    plans: "/img/icons/hosting-plan.png",
    addons: "/img/icons/addon.png",
    admin: "/img/icons/admin.png",
    general: "/img/icons/general.png",
    site: "/img/icons/site.png",
    review: "/img/icons/review.png",
    userReferral: "/img/icons/user-referral.png",
    subscriptionTransaction: "/img/icons/subscription-transaction.png",
    referrer: "/img/icons/referrer.png",
    userHistory: "/img/icons/user-history.png",
    loyalty: "/img/icons/loyalty.png",
}

export default navigationIcon