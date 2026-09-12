import { IoCarOutline, IoLocationOutline, IoReturnUpBackOutline } from "react-icons/io5";



export function DeliveryInfo() {
  return (
    <div className="rounded-xl border border-gray-100 bg-gray-50/50 p-5">
      <h3 className="text-sm font-semibold text-gray-900">Delivery & Returns</h3>

      <div className="mt-4 space-y-4">
        <div className="flex items-start gap-3">
          <IoCarOutline className="mt-0.5 h-5 w-5 flex-shrink-0 text-gray-400" />
          <div>
            <p className="text-sm font-medium text-gray-800">Standard Delivery</p>
            <p className="text-xs text-gray-500">2–5 business days · Lagos & nationwide</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <IoLocationOutline className="mt-0.5 h-5 w-5 flex-shrink-0 text-gray-400" />
          <div>
            <p className="text-sm font-medium text-gray-800">Pickup Station</p>
            <p className="text-xs text-gray-500">Free pickup at selected stations</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <IoReturnUpBackOutline className="mt-0.5 h-5 w-5 flex-shrink-0 text-gray-400" />
          <div>
            <p className="text-sm font-medium text-gray-800">Return Policy</p>
            <p className="text-xs text-gray-500">7-day return window for eligible items</p>
          </div>
        </div>
      </div>
    </div>
  );
}