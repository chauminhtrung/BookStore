const BASE_URL = "http://localhost:8080/api"; // URL của API Spring Boot

// Hàm xử lý phản hồi JSON
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage || "Something went wrong!");
  }
  return response.json();
};

// ----------- API cho bảng Author -----------

export const getAllAuthors = async (): Promise<Author[]> => {
  const response = await fetch(`${BASE_URL}/authors`);
  return handleResponse(response);
};

export const getAuthorById = async (id: number): Promise<Author> => {
  const response = await fetch(`${BASE_URL}/authors/${id}`);
  return handleResponse(response);
};

export const createAuthor = async (author: Author): Promise<Author> => {
  const response = await fetch(`${BASE_URL}/authors`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(author),
  });
  return handleResponse(response);
};

export const updateAuthor = async (
  id: number,
  author: Author
): Promise<Author> => {
  const response = await fetch(`${BASE_URL}/authors/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(author),
  });
  return handleResponse(response);
};

export const deleteAuthor = async (id: number): Promise<void> => {
  const response = await fetch(`${BASE_URL}/authors/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Error deleting author");
  }
};

// Define Author type
export interface Author {
  authorID?: number;
  name: string;
  biography?: string;
  nationality?: string;
  books: Book[];
}

// ----------- API cho bảng Blog -----------

export const getAllBlogs = async (): Promise<Blog[]> => {
  const response = await fetch(`${BASE_URL}/blogs`);
  return handleResponse(response);
};

export const getBlogById = async (id: number): Promise<Blog> => {
  const response = await fetch(`${BASE_URL}/blogs/${id}`);
  return handleResponse(response);
};

export const createBlog = async (blog: Blog): Promise<Blog> => {
  const response = await fetch(`${BASE_URL}/blogs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(blog),
  });
  return handleResponse(response);
};

export const updateBlog = async (id: number, blog: Blog): Promise<Blog> => {
  const response = await fetch(`${BASE_URL}/blogs/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(blog),
  });
  return handleResponse(response);
};

export const deleteBlog = async (id: number): Promise<void> => {
  const response = await fetch(`${BASE_URL}/blogs/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Error deleting blog");
  }
};

// Define Blog type
export interface Blog {
  blogID?: number; // ID có thể không có trong khi tạo mới
  title: string;
  content: string;
  authorID: number;
  authorType?: string; // authorType có thể không cần thiết
  publishedDate?: string; // Có thể sử dụng Date tùy thuộc vào cách bạn xử lý
  status: string;
  tags?: string; // tags có thể không cần thiết
  imageURL?: string; // imageURL có thể không cần thiết
}

// ----------- API cho bảng Book -----------

export const getAllBooks = async (): Promise<Book[]> => {
  const response = await fetch(`${BASE_URL}/books`);
  return handleResponse(response);
};

export const getBookById = async (id: number): Promise<Book> => {
  const response = await fetch(`${BASE_URL}/books/${id}`);
  return handleResponse(response);
};

export const createBook = async (book: Book): Promise<Book> => {
  const response = await fetch(`${BASE_URL}/books`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(book),
  });
  return handleResponse(response);
};

export const updateBook = async (id: number, book: Book): Promise<Book> => {
  const response = await fetch(`${BASE_URL}/books/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(book),
  });
  return handleResponse(response);
};

export const deleteBook = async (id: number): Promise<void> => {
  const response = await fetch(`${BASE_URL}/books/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Error deleting book");
  }
};

// Define Book type
export interface Book {
  bookID: number;
  title: string;
  genre: string;
  publicationdate: string; // hoặc Date nếu bạn xử lý dạng Date
  price: number;
  description: string;
  stockquantity: number;
  imageURL: string;
  publisher: string;
  isbn: string;
  author: Author;
  supplier: Supplier;
  bookReviews: BookReview[];
}

// ----------- API cho bảng BookReview -----------

export const getAllBookReviews = async (): Promise<BookReview[]> => {
  const response = await fetch(`${BASE_URL}/bookreviews`);
  return handleResponse(response);
};

export const getBookReviewById = async (id: number): Promise<BookReview> => {
  const response = await fetch(`${BASE_URL}/bookreviews/${id}`);
  return handleResponse(response);
};

export const getBookReviewByBookId = async (
  id: number
): Promise<BookReview[]> => {
  const response = await fetch(`${BASE_URL}/bookreviews/Book-Id/${id}`);
  return handleResponse(response);
};

export const createBookReview = async (
  review: BookReview
): Promise<BookReview> => {
  const response = await fetch(`${BASE_URL}/bookreviews`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(review),
  });
  return handleResponse(response);
};

export const updateBookReview = async (
  id: number,
  review: BookReview
): Promise<BookReview> => {
  const response = await fetch(`${BASE_URL}/bookreviews/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(review),
  });
  return handleResponse(response);
};

export const deleteBookReview = async (id: number): Promise<void> => {
  const response = await fetch(`${BASE_URL}/bookreviews/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Error deleting book review");
  }
};

// Define BookReview type
export interface BookReview {
  id?: number;
  bookId: number;
  customer: number;
  reviewContent: string;
  rating: number;
  reviewDate?: string;
}

// ----------- API cho bảng Customer -----------

export const getAllCustomers = async (): Promise<Customer[]> => {
  const response = await fetch(`${BASE_URL}/customers`);
  return handleResponse(response);
};

export const getCustomerById = async (id: number): Promise<Customer> => {
  const response = await fetch(`${BASE_URL}/customers/${id}`);
  return handleResponse(response);
};

export const createCustomer = async (customer: Customer): Promise<Customer> => {
  const response = await fetch(`${BASE_URL}/customers`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(customer),
  });
  return handleResponse(response);
};

export const updateCustomer = async (
  id: number,
  customer: Customer
): Promise<Customer> => {
  const response = await fetch(`${BASE_URL}/customers/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(customer),
  });
  return handleResponse(response);
};

export const deleteCustomer = async (id: number): Promise<void> => {
  const response = await fetch(`${BASE_URL}/customers/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Error deleting customer");
  }
};

// Define Customer type
export interface Customer {
  customerID: number;
  name: string;
  email: string;
  phoneNumber?: string;
  address?: string;
}

// ----------- API cho bảng Order -----------

export const getAllOrders = async (): Promise<Order[]> => {
  const response = await fetch(`${BASE_URL}/orders`);
  return handleResponse(response);
};

export const getOrderById = async (id: number): Promise<Order> => {
  const response = await fetch(`${BASE_URL}/orders/${id}`);
  return handleResponse(response);
};

export const getOrderByUsId = async (id: number): Promise<Order[]> => {
  const response = await fetch(`${BASE_URL}/orders/Cus-Id/${id}`);
  return handleResponse(response);
};

export const createOrder = async (order: Order): Promise<Order> => {
  const response = await fetch(`${BASE_URL}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
};

export const updateOrder = async (id: number, order: Order): Promise<Order> => {
  const response = await fetch(`${BASE_URL}/orders/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  });
  return handleResponse(response);
};

export const deleteOrder = async (id: number): Promise<void> => {
  const response = await fetch(`${BASE_URL}/orders/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Error deleting order");
  }
};

// Define Order type
export interface Order {
  id?: number;
  customer: Customer;
  orderdate?: string;
  totalprice: number;
  orderstatus: string;
  shippingaddress?: string;
  paymentmethod: string;
}

// ----------- API cho bảng Supplier -----------

export const getAllSuppliers = async (): Promise<Supplier[]> => {
  const response = await fetch(`${BASE_URL}/suppliers`);
  return handleResponse(response);
};

export const getSupplierById = async (id: number): Promise<Supplier> => {
  const response = await fetch(`${BASE_URL}/suppliers/${id}`);
  return handleResponse(response);
};

export const createSupplier = async (supplier: Supplier): Promise<Supplier> => {
  const response = await fetch(`${BASE_URL}/suppliers`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(supplier),
  });
  return handleResponse(response);
};

export const updateSupplier = async (
  id: number,
  supplier: Supplier
): Promise<Supplier> => {
  const response = await fetch(`${BASE_URL}/suppliers/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(supplier),
  });
  return handleResponse(response);
};

export const deleteSupplier = async (id: number): Promise<void> => {
  const response = await fetch(`${BASE_URL}/suppliers/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Error deleting supplier");
  }
};

// Define Supplier type
export interface Supplier {
  supplierID?: number;
  name: string;
  contact?: string;
  address?: string;
}

// ----------- API cho bảng Payment -----------

export const getAllPayments = async (): Promise<Payment[]> => {
  const response = await fetch(`${BASE_URL}/payments`);
  return handleResponse(response);
};

export const getPaymentById = async (id: number): Promise<Payment> => {
  const response = await fetch(`${BASE_URL}/payments/${id}`);
  return handleResponse(response);
};

export const createPayment = async (payment: Payment): Promise<Payment> => {
  const response = await fetch(`${BASE_URL}/payments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payment),
  });
  return handleResponse(response);
};

export const updatePayment = async (
  id: number,
  payment: Payment
): Promise<Payment> => {
  const response = await fetch(`${BASE_URL}/payments/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payment),
  });
  return handleResponse(response);
};

export const deletePayment = async (id: number): Promise<void> => {
  const response = await fetch(`${BASE_URL}/payments/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Error deleting payment");
  }
};

// Define Payment type
export interface Payment {
  id?: number;
  order: Order;
  paymentdate?: string;
  paymentmethod: string;
  amount: number;
}

// ----------- API cho bảng OrderDetail -----------

export const getAllOrderDetails = async (): Promise<OrderDetail[]> => {
  const response = await fetch(`${BASE_URL}/orderdetails`);
  return handleResponse(response);
};

export const getOrderDetailById = async (id: number): Promise<OrderDetail> => {
  const response = await fetch(`${BASE_URL}/orderdetails/${id}`);
  return handleResponse(response);
};

export const getOrderDetailsbyOrderid = async (
  id: number
): Promise<OrderDetailDTO[]> => {
  const response = await fetch(`${BASE_URL}/orderdetails/or-Id/${id}`);
  return handleResponse(response);
};

// Hàm để tạo OrderDetail
export const createOrderDetails = async (
  orderDetails: OrderDetail[]
): Promise<OrderDetail[]> => {
  const createdOrderDetails: OrderDetail[] = []; // Mảng lưu trữ các OrderDetail đã tạo

  try {
    await Promise.all(
      orderDetails.map(async (detail) => {
        const response = await fetch(`${BASE_URL}/orderdetails`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(detail),
        });

        // Kiểm tra xem phản hồi có thành công hay không
        if (!response.ok) {
          throw new Error(
            `Failed to create order detail: ${response.statusText}`
          );
        }

        // Phân tích cú pháp dữ liệu phản hồi và lưu vào mảng
        const data: OrderDetail = await response.json();
        createdOrderDetails.push(data); // Thêm dữ liệu đã tạo vào mảng
      })
    );
  } catch (error) {
    console.error("Error creating order details:", error);
    throw error; // Ném lại lỗi để có thể xử lý bên ngoài nếu cần
  }

  return createdOrderDetails; // Trả về mảng các OrderDetail đã tạo
};

export const updateOrderDetail = async (
  id: number,
  orderDetail: OrderDetail
): Promise<OrderDetail> => {
  const response = await fetch(`${BASE_URL}/orderdetails/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderDetail),
  });
  return handleResponse(response);
};

export const deleteOrderDetail = async (id: number): Promise<void> => {
  const response = await fetch(`${BASE_URL}/orderdetails/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Error deleting order detail");
  }
};

// Define OrderDetail type
export interface OrderDetail {
  id?: number;
  order: Order;
  orderbook: Book;
  quantity: number;
  unitprice: number;
}

// Define OrderDetail type
export interface OrderDetailDTO {
  orderdetailID?: number;
  orderID: number;
  bookID: number;
  bookTitle: string;
  bookImage: string;
  quantity: number;
  unitprice: number;
}

// ----------- API cho bảng Employee -----------

export const getAllEmployees = async (): Promise<Employee[]> => {
  const response = await fetch(`${BASE_URL}/employees`);
  return handleResponse(response);
};

export const getEmployeeById = async (id: number): Promise<Employee> => {
  const response = await fetch(`${BASE_URL}/employees/${id}`);
  return handleResponse(response);
};

export const createEmployee = async (employee: Employee): Promise<Employee> => {
  const response = await fetch(`${BASE_URL}/employees`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(employee),
  });
  return handleResponse(response);
};

export const updateEmployee = async (
  id: number,
  employee: Employee
): Promise<Employee> => {
  const response = await fetch(`${BASE_URL}/employees/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(employee),
  });
  return handleResponse(response);
};

export const deleteEmployee = async (id: number): Promise<void> => {
  const response = await fetch(`${BASE_URL}/employees/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Error deleting employee");
  }
};

// Define Employee type
export interface Employee {
  id?: number;
  name: string;
  position: string;
  salary?: number;
  hireDate?: string;
  email?: string;
  phoneNumber?: string;
}

// dang nhap
// Định nghĩa kiểu dữ liệu cho LoginRequest
export interface LoginRequest {
  phone: string;
  password: string;
}

// Định nghĩa kiểu dữ liệu cho LoginResponse
export interface LoginResponse {
  data: {
    customer: number;
    name: string;
    email: string;
    phonenumber: string;
    address: string;
    bookReviews: BookReview[]; // Định kiểu cho BookReview nếu cần chi tiết
    orders: Order[]; // Định kiểu cho Orders nếu cần chi tiết
  };
}

// Phương thức gọi API để đăng nhập
export const login = async (
  loginRequest: LoginRequest
): Promise<LoginResponse> => {
  const response = await fetch(`${BASE_URL}/customers/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginRequest),
  });

  if (!response.ok) {
    throw new Error("Đăng nhập thất bại.");
  }

  const data: LoginResponse = await response.json();
  return data;
};
