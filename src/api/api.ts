// import { TOKEN_STORAGE_KEY } from "./const";
// import apiDataAdmin from "./apiData";

// export default class CustomerAPI {
//     public static async getCustomerInfo(): Promise<CustomerIncomeData> {
//         const url = `${apiDataAdmin.API_URL}/${apiDataAdmin.PROJECT_KEY}/me`;
//         const response = await fetch(url, {
//           method: 'GET',
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem(TOKEN_STORAGE_KEY)}`,
//           },
//         });
//         const data = await response.json();
//         return data;
//       }
// }
