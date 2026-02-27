import api from "../index";
import ENDPOINTS from "../endpoints";

export const getCustomers = () => api(ENDPOINTS.getCustomers, {}, "get");

export const getCustomerById = (id) =>
  api(`${ENDPOINTS.getCustomers}/${id}`, null, "get");

export const adminUpdateCustomer = (id, payload) =>
  api(`${ENDPOINTS.adminUpdateCustomer}/${id}`, payload, "put");

export const adminCreateCustomer = (payload) =>
    api(`${ENDPOINTS.adminCreateCustomer}`, payload, "post");

export const adminDeleteCustomer = (id) =>
    api(`${ENDPOINTS.getCustomers}/${id}`, null, "DELETE");

  const queryParams = new URLSearchParams();

  // if (params.status) queryParams.append("status", params.status);
  // if (params.customerId) queryParams.append("customerId", params.customerId);
  // if (params.startDate && params.endDate) {
  //   queryParams.append("startDate", params.startDate);
  //   queryParams.append("endDate", params.endDate);
  // }
  //
  // if (params.page) queryParams.append("page", params.page);
  // if (params.limit) queryParams.append("limit", params.limit);

  // const finalUrl = queryParams.toString()
  //   ? `${url}?${queryParams.toString()}`
  //   : url;

  // return api(finalUrl, null, "get");
// };

// export const updateCaseStatus = (id, payload) =>
//   api(`${ENDPOINTS.updateCaseStatus}/${id}`, payload, "put");
//
// export const getCaseInstallment = (id, customerId) =>
//   api(`${ENDPOINTS.requestCaseInstallment}/${id}/${customerId}`, null, "get");
