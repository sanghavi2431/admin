export default function TransactionDetail({ data }) {
    return (
        <div className="">
            <h4 className="m-4">Transaction Details</h4>
            <table className="border-separate [border-spacing:0.65rem]">
                <tr >
                    <td className="w-40 font-black">Transaction Id</td>
                    <td>{data.transaction_id!==null?<span> {`: ${data.transaction_id}`}</span>:<span></span>}</td>
                </tr>
                <tr >
                    <td className="w-40 font-bold">User Name</td>
                    <td>{data.user_name!==null?<span> {`: ${data.user_name}`}</span>:<span>:</span>}</td>
                </tr>
                <tr >
                    <td className="w-40 font-bold">Contact</td>
                    <td>{data.mobile!==null?<span> {`: ${data.mobile}`}</span>:<span>:</span>}</td>
                </tr>
                <tr >
                    <td className="w-40 font-bold">Order Id</td>
                    <td>{data.order_id!==null?<span> {`: ${data.order_id}`}</span>:<span>:</span>}</td>
                </tr>
                <tr >
                    <td className="w-40 font-bold">Transaction Amount</td>
                    <td>{data.transaction_amount!==null?<span> {`: ${data.transaction_amount}`}</span>:<span>:</span>}</td>
                </tr>
                <tr>
                    <td className="w-40 font-bold">Wallet Transaction Id</td>
                    <td>{data.wallet_txn_id!==null?<span> {`: ${data.wallet_txn_id}`}</span>:<span>:</span>}</td>
                </tr>
                <tr>
                    <td className="w-40 font-bold">Channel Name</td>
                    <td>{data.channel_name!==null?<span> {`: ${data.channel_name}`}</span>:<span>:</span>}</td>
                </tr>
                <tr>
                    <td className="w-40 font-bold">Platform</td>
                    <td>{data.platform!==null?<span> {`: ${data.platform}`}</span>:<span>:</span>}</td>
                </tr>
                <tr>
                    <td className="w-40 font-bold">Country</td>
                    <td>{data.country!==null?<span> {`: ${data.country}`}</span>:<span>:</span>}</td>
                </tr>
                <tr>
                    <td className="w-40 font-bold">Plan Id</td>
                    <td>{data.plan_id!==null?<span> {`: ${data.plan_id}`}</span>:<span>:</span>}</td>
                </tr>
                <tr>
                    <td className="w-40 font-bold">Plan Type</td>
                    <td>{data.plan_type!==null?<span> {`: ${data.plan_type}`}</span>:<span>:</span>}</td>
                </tr>
                <tr>
                    <td className="w-40 font-bold">Purchase Time</td>
                    <td>{data.purchase_time!==null?<span> {`: ${data.purchase_time}`}</span>:<span>:</span>}</td>
                </tr>
            </table>
        </div>
    )
}