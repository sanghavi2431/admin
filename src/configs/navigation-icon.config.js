import React from 'react'
import {HiOutlineColorSwatch,HiOutlineDesktopComputer,HiOutlineTemplate,HiOutlineViewGridAdd,HiOutlineHome,HiMenu,HiUser} from 'react-icons/hi'
import {HiCodeBracketSquare, HiRectangleGroup,HiBuildingOffice2 ,HiDocumentChartBar} from 'react-icons/hi2'
import { AiFillSetting,AiOutlineStar } from 'react-icons/ai'
import { GiMoneyStack, GiPayMoney, GiTicket,GiPerson } from 'react-icons/gi'
import { FaBuilding, FaHandshake,FaPersonBooth,FaUsers } from "react-icons/fa"
import { BiSolidNetworkChart, BiTransfer, BiCategory, BiSolidPurchaseTag, BiSolidOffer, BiPurchaseTag, BiSolidPurchaseTagAlt  } from 'react-icons/bi'
import { MdLocalOffer,MdCategory,MdFactCheck } from 'react-icons/md'
import { BsCheckSquareFill, BsFileEarmarkCheckFill, BsKeyFill } from 'react-icons/bs'
import {GoGraph} from 'react-icons/go'
import {IoLocationSharp} from 'react-icons/io5'
import {GrServices, GrUserManager} from 'react-icons/gr'
import {DiOpenshift} from 'react-icons/di'
import {SlGraph} from 'react-icons/sl'
import {RiTeamFill, RiUserSettingsFill} from 'react-icons/ri'
import {PiDevicesFill} from 'react-icons/pi'


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
    IOTData:<GoGraph/>,
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
    iotDevice:<PiDevicesFill/>,
    cluster:<BiSolidNetworkChart/>,
    task_checklist:<BsCheckSquareFill/>,
    roles:<BsKeyFill/>,
    facilityManager: <GrUserManager/>,
    subscriptionPlans: <BiPurchaseTag />,
    subscriptionSettings: <RiUserSettingsFill/>,
    orders:<BiSolidPurchaseTagAlt/>,
    hostOffer:<BiSolidOffer/>,
    reviewManagement: <AiOutlineStar />,
    building: <FaBuilding />
}

export default navigationIcon